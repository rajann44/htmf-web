import { useState, useCallback } from 'react';

interface ApiState<T> {
  data: T | null;
  error: string | null;
  isLoading: boolean;
}

interface UseApiOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

const useApi = <T>(options: UseApiOptions = {}) => {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    error: null,
    isLoading: false,
  });

  const execute = useCallback(
    async (url: string, config: RequestInit = {}) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const response = await fetch(url, {
          ...config,
          headers: {
            'Content-Type': 'application/json',
            ...config.headers,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setState({ data, error: null, isLoading: false });
        options.onSuccess?.(data);
        return data;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        setState({ data: null, error: errorMessage, isLoading: false });
        options.onError?.(errorMessage);
        throw error;
      }
    },
    [options]
  );

  const get = useCallback(
    (url: string, config: RequestInit = {}) => {
      return execute(url, { ...config, method: 'GET' });
    },
    [execute]
  );

  const post = useCallback(
    (url: string, data: any, config: RequestInit = {}) => {
      return execute(url, {
        ...config,
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    [execute]
  );

  const put = useCallback(
    (url: string, data: any, config: RequestInit = {}) => {
      return execute(url, {
        ...config,
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },
    [execute]
  );

  const del = useCallback(
    (url: string, config: RequestInit = {}) => {
      return execute(url, { ...config, method: 'DELETE' });
    },
    [execute]
  );

  return {
    ...state,
    get,
    post,
    put,
    delete: del,
  };
};

export default useApi; 