#!/bin/bash

# Get all unique keys from all translation files
ALL_KEYS=$(jq -s 'add | keys' src/i18n/messages/*.json)

# Check each translation file
for file in src/i18n/messages/*.json; do
    echo "Checking $file..."
    
    # Get keys from current file
    FILE_KEYS=$(jq 'keys' "$file")
    
    # Check if current file has all required keys
    MISSING_KEYS=$(jq -n --argjson all "$ALL_KEYS" --argjson file "$FILE_KEYS" '$all - $file')
    
    if [ "$(echo "$MISSING_KEYS" | jq 'length')" -gt 0 ]; then
        echo "❌ Missing keys in $file:"
        echo "$MISSING_KEYS" | jq -r '.[]'
        exit 1
    fi
    
    echo "✅ $file is complete"
done

echo "🎉 All translation files are complete!"