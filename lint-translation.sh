#!/bin/bash

# Function to recursively extract all keys from JSON (up to 5 levels deep)
extract_keys_recursive() {
    local json_file="$1"
    local prefix="${2:-}"
    local level="${3:-0}"
    local max_level=5
    
    if [ "$level" -ge "$max_level" ]; then
        return
    fi
    
    # Get all keys at current level
    local keys=$(jq -r "keys[]" "$json_file" 2>/dev/null)
    
    for key in $keys; do
        # Create the full key path
        local full_key="${prefix}${key}"
        echo "$full_key"
        
        # Check if the value is an object and recursively extract keys
        if jq -e ".[\"$key\"] | type == \"object\"" "$json_file" >/dev/null 2>&1; then
            # Extract nested keys directly using jq
            local nested_keys=$(jq -r ".[\"$key\"] | keys[]" "$json_file" 2>/dev/null)
            for nested_key in $nested_keys; do
                echo "${full_key}.${nested_key}"
                
                # Check if the nested value is also an object
                if jq -e ".[\"$key\"][\"$nested_key\"] | type == \"object\"" "$json_file" >/dev/null 2>&1; then
                    local deep_nested_keys=$(jq -r ".[\"$key\"][\"$nested_key\"] | keys[]" "$json_file" 2>/dev/null)
                    for deep_key in $deep_nested_keys; do
                        echo "${full_key}.${nested_key}.${deep_key}"
                    done
                fi
            done
        fi
    done
}

# Check if a specific file was provided as an argument
if [ $# -eq 1 ] && [ -n "$1" ]; then
    TARGET_FILE="$1"
    
    # Validate that the target file exists
    if [ ! -f "$TARGET_FILE" ]; then
        echo "❌ Error: File '$TARGET_FILE' does not exist"
        exit 1
    fi
    
    # Validate that it's a JSON file in the messages directory
    if [[ ! "$TARGET_FILE" =~ \.json$ ]] || [[ ! "$TARGET_FILE" =~ src/i18n/messages/ ]]; then
        echo "❌ Error: Please provide a JSON file from src/i18n/messages/"
        exit 1
    fi
    
    echo "Checking single file: $TARGET_FILE"
    
    # Get all unique keys from all translation files (including nested ones)
    ALL_KEYS=""
    for file in src/i18n/messages/*.json; do
        if [ -f "$file" ]; then
            keys=$(extract_keys_recursive "$file")
            ALL_KEYS=$(printf "%s\n%s" "$ALL_KEYS" "$keys" | sort -u | grep -v '^$')
        fi
    done
    
    # Get all keys from the target file
    FILE_KEYS=$(extract_keys_recursive "$TARGET_FILE")
    
    # Check if the target file has all required keys
    MISSING_KEYS=""
    for key in $ALL_KEYS; do
        if ! echo "$FILE_KEYS" | grep -q "^${key}$"; then
            MISSING_KEYS="${MISSING_KEYS}${key}
"
        fi
    done
    
    if [ -n "$MISSING_KEYS" ]; then
        echo "❌ Missing keys in $TARGET_FILE:"
        printf "%s" "$MISSING_KEYS" | grep -v '^$'
        exit 1
    fi
    
    echo "✅ $TARGET_FILE is complete"
    echo "🎉 File check completed successfully!"
    
else
    # Original behavior: check all files
    echo "Checking all translation files..."
    
    # Get all unique keys from all translation files (including nested ones)
    ALL_KEYS=""
    for file in src/i18n/messages/*.json; do
        if [ -f "$file" ]; then
            keys=$(extract_keys_recursive "$file")
            ALL_KEYS=$(printf "%s\n%s" "$ALL_KEYS" "$keys" | sort -u | grep -v '^$')
        fi
    done
    
    # Check each translation file
    for file in src/i18n/messages/*.json; do
        if [ ! -f "$file" ]; then
            continue
        fi
        
        echo "Checking $file..."
        
        # Get all keys from current file (including nested ones)
        FILE_KEYS=$(extract_keys_recursive "$file")
        
        # Check if current file has all required keys
        MISSING_KEYS=""
        for key in $ALL_KEYS; do
            if ! echo "$FILE_KEYS" | grep -q "^${key}$"; then
                MISSING_KEYS="${MISSING_KEYS}${key}
"
            fi
        done
        
        if [ -n "$MISSING_KEYS" ]; then
            echo "❌ Missing keys in $file:"
            printf "%s" "$MISSING_KEYS" | grep -v '^$'
            exit 1
        fi
        
        echo "✅ $file is complete"
    done
    
    echo "🎉 All translation files are complete!"
fi