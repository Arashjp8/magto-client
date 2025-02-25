import { useCallback, useEffect, useState } from "react";

interface IQueryState<T> {
    data: T | null;
    error: Error | null;
    isLoading: boolean;
    isFetching: boolean;
}

interface IMapValue<T> {
    data: T;
    timeStamp: number;
    staleTime: number;
}

interface IUseQueryReturn<T> {
    refetch: () => Promise<void>;
    state: IQueryState<T>;
}

const cache = new Map<string, IMapValue<unknown>>();

/**
 * Custom hook for data fetching with caching and cache invalidation based on `staleTime`.
 *
 * This hook will attempt to fetch data using the provided `queryFn`. It checks the cache first and returns cached data
 * if it's still valid (within the `staleTime` period). If the data is not available or is stale, it triggers a fetch
 * operation to retrieve fresh data.
 *
 * @template T The type of data returned by the query function.
 *
 * @param {string} queryKey The unique key for the query to use for caching.
 * @param {() => Promise<T>} queryFn The function that fetches the data, which should return a Promise.
 * @param {number} [staleTime=10 * 60 * 1000] The time in milliseconds before the cached data is considered stale. Defaults to 10 minutes.
 *
 * @returns {IUseQueryReturn<T>} The result of the query containing the current query state and a refetch function.
 *
 * @example
 * ```typescript
 * const { state, refetch } = useQuery('search-movies', fetchMovies);
 *
 * if (state.isLoading) {
 *     // Show loading indicator
 * }
 *
 * if (state.error) {
 *     // Handle error
 * }
 *
 * // To refetch data
 * refetch();
 * ```
 */
export default function useQuery<T>(
    queryKey: string,
    queryFn: () => Promise<T>,
    staleTime: number = 10 * 60 * 1000, // 10 minutes
): IUseQueryReturn<T> {
    const [state, setState] = useState<IQueryState<T>>({
        data: null,
        error: null,
        isLoading: false,
        isFetching: false,
    });

    const fetchData = useCallback(async () => {
        const existingData = cache.get(queryKey) as IMapValue<T> | undefined;
        const nowTimeStamp = Date.now();

        if (
            existingData &&
            nowTimeStamp - existingData.timeStamp <= existingData.staleTime
        ) {
            setState((prev) =>
                prev.data === existingData.data
                    ? prev
                    : {
                          data: existingData.data,
                          error: null,
                          isLoading: false,
                          isFetching: false,
                      },
            );
            return;
        }

        setState((prev) => ({
            ...prev,
            isLoading: true,
            isFetching: true,
        }));

        try {
            const result = await queryFn();

            setState({
                data: result,
                error: null,
                isLoading: false,
                isFetching: false,
            });

            cache.set(queryKey, {
                data: result,
                timeStamp: nowTimeStamp,
                staleTime,
            });
            return;
        } catch (err) {
            setState((prev) => ({
                ...prev,
                error: err as Error,
            }));
        } finally {
            setState((prev) => ({
                ...prev,
                isLoading: false,
                isFetching: false,
            }));
        }
    }, [queryKey, queryFn, staleTime]);

    useEffect(() => {
        fetchData();
    }, [queryKey, fetchData]);

    return { state, refetch: fetchData };
}
