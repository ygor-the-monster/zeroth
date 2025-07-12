import { useCallback, useEffect, useState } from "react";

export const usePromise = <T>(promise: Promise<T>) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const [data, setData] = useState<T | null>(null);

	useEffect(() => {
		setIsLoading(true);
		setError(null);
		setData(null);

		promise
			.then(setData)
			.catch(setError)
			.finally(() => setIsLoading(false));
	}, [promise]);

	return { data, error, isLoading };
};

export const useAsync = <T>(
	asyncFunction: (...args: unknown[]) => Promise<T>,
) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const [data, setData] = useState<T | null>(null);

	const execute = useCallback(
		async (...args: Parameters<typeof asyncFunction>) => {
			setIsLoading(true);
			setError(null);
			setData(null);

			asyncFunction(...args)
				.then(setData)
				.catch(setError)
				.finally(() => setIsLoading(false));
		},
		[asyncFunction],
	);

	return { data, error, execute, isLoading };
};
