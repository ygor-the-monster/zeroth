const isUndefined = (item: unknown): item is undefined | null =>
	item === undefined || item === null;
const isObject = (item: unknown): item is object =>
	!isUndefined(item) && typeof item === "object";

export const deepMerge = <T1, T2, TOut = T1 & T2>(obj1: T1, obj2: T2): TOut => {
	if (isUndefined(obj1)) return obj2 as unknown as TOut;
	if (!isObject(obj1) && !isObject(obj2)) return obj2 as unknown as TOut;

	const mergedObj = { ...obj1 } as unknown as TOut;
	if (isObject(obj2))
		for (const key in obj2)
			if (Object.hasOwn(obj2, key)) {
				mergedObj[key as unknown as keyof TOut] = deepMerge(
					obj1?.[key as unknown as keyof T1],
					obj2[key as unknown as keyof T2],
				);
			}

	return mergedObj;
};
