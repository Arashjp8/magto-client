import { useCallback, useEffect, useState } from "react";

interface QueryState<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  isFetching: boolean;
}

// using strings as object keys for caching
const cache: { [key: string]: any } = {};

const useQuery = <T>(queryKey: string, queryFn: () => Promise<T>) => {
  const [state, setState] = useState<QueryState<T>>({
    data: null,
    error: null,
    isLoading: false,
    isFetching: false,
  });

  const fetchData = useCallback(async () => {
    if (cache[queryKey]) {
      setState({
        data: cache[queryKey],
        error: null,
        isLoading: false,
        isFetching: false,
      });
      return;
    }

    setState((prevState) => ({
      ...prevState,
      isLoading: true,
      isFetching: true,
    }));

    try {
      const data = await queryFn();
      cache[queryKey] = data;

      setState({ data, error: null, isLoading: false, isFetching: false });
    } catch (err) {
      setState({
        data: null,
        error: err as Error,
        isLoading: false,
        isFetching: false,
      });
    }
  }, [queryFn, queryKey]);

  const refetch = useCallback(() => {
    setState({
      data: null,
      error: null,
      isLoading: true,
      isFetching: true,
    });
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [queryKey, fetchData]);

  return { ...state, refetch };
};

export default useQuery;
