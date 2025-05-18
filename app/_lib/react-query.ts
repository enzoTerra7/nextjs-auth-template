import { QueryClient } from "@tanstack/react-query";

// Default stale time - how long data is considered fresh
const STALE_TIME = 1000 * 60 * 5; // 5 minutes

// Default cache time - how long inactive data remains in cache
const CACHE_TIME = 1000 * 60 * 60; // 1 hour

// Retry configuration
const RETRY_CONFIG = {
  retry: 3,
  retryDelay: (attemptIndex: number) =>
    Math.min(1000 * 2 ** attemptIndex, 30000),
};

// Custom error type
declare module "@tanstack/react-query" {
  interface Register {
    // The Error interface is extended to include your custom error types
    defaultError: Error & {
      errors?: {
        [x: string]: string;
      };
    };
  }
}

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: STALE_TIME,
      gcTime: CACHE_TIME,
      refetchOnWindowFocus: false, // Disable automatic refetch on window focus
      refetchOnMount: true, // Refetch on component mount
      refetchOnReconnect: true, // Refetch when reconnecting
      ...RETRY_CONFIG,
    },
    mutations: {
      ...RETRY_CONFIG,
      // Optimistic updates configuration
      onError: (error) => {
        // Handle mutation errors
        console.error("Mutation error:", error);
      },
    },
  },
});

// Cache manipulation helpers
export const cacheHelpers = {
  // Update cache data
  updateCache: <T>(queryKey: string[], updater: (oldData: T) => T) => {
    queryClient.setQueryData(queryKey, updater);
  },

  // Remove specific data from cache
  removeFromCache: (queryKey: string[]) => {
    queryClient.removeQueries({ queryKey });
  },

  // Clear all cache
  clearCache: () => {
    queryClient.clear();
  },
};
