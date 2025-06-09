import { useState, useEffect } from 'react';

interface FetchState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

interface FetchOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
  dependencies?: any[];
}

export function useDataFetching<T>(
  fetchFn: () => Promise<T>,
  options: FetchOptions = {}
): FetchState<T> & { refetch: () => Promise<void> } {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    isLoading: true,
    error: null,
  });

  const { onSuccess, onError, dependencies = [] } = options;

  const fetchData = async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const data = await fetchFn();
      setState({ data, isLoading: false, error: null });
      
      if (onSuccess) {
        onSuccess(data);
      }
    } catch (error) {
      setState({ data: null, isLoading: false, error: error as Error });
      
      if (onError) {
        onError(error as Error);
      }
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  const refetch = async () => {
    await fetchData();
  };

  return { ...state, refetch };
}

export function useInfiniteScroll<T>(
  fetchFn: (page: number) => Promise<{ data: T[]; hasMore: boolean }>,
  options: FetchOptions = {}
) {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<T[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { onSuccess, onError, dependencies = [] } = options;

  const loadMore = async () => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await fetchFn(page);
      setItems(prev => [...prev, ...result.data]);
      setHasMore(result.hasMore);
      setPage(prev => prev + 1);
      
      if (onSuccess) {
        onSuccess(result);
      }
    } catch (error) {
      setError(error as Error);
      
      if (onError) {
        onError(error as Error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setItems([]);
    setHasMore(true);
    loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return { items, isLoading, error, hasMore, loadMore };
}