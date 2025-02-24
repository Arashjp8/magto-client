import { useCallback, useEffect, useRef, useState } from "react";
import { apiClient } from "../services/apiClient";
import { SearchApiResponse } from "../types/searchApiResponse";

interface ApiClientParams {
    endpoint: string;
    queryParams: Record<string, string>;
}

function useQuery(
    queryKey: string,
    apiClientParams: ApiClientParams,
    staleTime: number,
) {
    const cacheRef = useRef(new Map());
    const [data, setData] = useState<SearchApiResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const modifiedQueryKey = queryKey.split(" ").join("-");

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const fetchedData = await apiClient(
                apiClientParams.endpoint,
                "GET",
                "application/json",
                apiClientParams.queryParams,
            );

            setData(fetchedData);
            cacheRef.current.set(modifiedQueryKey, {
                data: fetchedData,
                timeStamp: Date.now(),
            });
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    }, [
        apiClientParams.endpoint,
        apiClientParams.queryParams,
        modifiedQueryKey,
    ]);

    useEffect(() => {
        if (cacheRef.current.has(modifiedQueryKey)) {
            const cachedData = cacheRef.current.get(modifiedQueryKey);
            const nowTimeStamp = Date.now();

            if (nowTimeStamp - cachedData.timeStamp >= staleTime) {
                fetchData();
            } else {
                setData(cachedData.data);
            }
        } else {
            fetchData();
        }
    }, [modifiedQueryKey, apiClientParams.endpoint, staleTime, fetchData]);

    return { queryKey: modifiedQueryKey, data, isLoading };
}

export default useQuery;
