export const deepFreeze = <T>(obj: T): T => {
	if (typeof obj !== "object" && typeof obj !== "function") return obj;
	if (obj === null) return obj;

	for (const key in obj) if (Object.hasOwn(obj, key)) deepFreeze(obj[key]);

	return Object.freeze(obj);
};
