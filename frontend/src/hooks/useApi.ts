import { useEffect, useState } from 'react';

interface UseApiOptions {
  skip?: boolean;
  retries?: number;
  retryDelay?: number;
}

/**
 * Generic hook for handling async API calls
 * @param operation - Async function to execute
 * @param initial - Initial state value
 * @param options - Configuration options
 */
export function useApi<T>(
  operation: (() => Promise<T>) | null,
  initial: T,
  options: UseApiOptions = {}
) {
  const { skip = false, retries = 2, retryDelay = 1000 } = options;
  const [data, setData] = useState<T>(initial);
  const [loading, setLoading] = useState(!skip && operation !== null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (skip || !operation) {
      setLoading(false);
      return;
    }

    let active = true;
    let retryCount = 0;

    const executeOperation = async () => {
      try {
        const result = await operation();
        if (active) {
          setData(result);
          setError(null);
          setLoading(false);
        }
      } catch (err) {
        if (!active) return;

        if (retryCount < retries) {
          retryCount++;
          // Exponential backoff
          const delay = retryDelay * Math.pow(2, retryCount - 1);
          setTimeout(executeOperation, delay);
        } else {
          setError(String(err instanceof Error ? err.message : err));
          setLoading(false);
        }
      }
    };

    executeOperation();

    return () => {
      active = false;
    };
  }, [operation, skip, retries, retryDelay]);

  return { data, loading, error };
}
