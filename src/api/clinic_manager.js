import useSWR from 'swr';
import { useMemo } from 'react';
// utils
import { fetcher, endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

export function useGetPms() {
//   const URL = endpoints.product.list;
  const URL = endpoints.clinic_manager.list;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      products: data?.products || [],
      productsLoading: isLoading,
      productsError: error,
      productsValidating: isValidating,
      productsEmpty: !isLoading && !data?.products.length,
    }),
    [data?.products, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useSearchProducts(query) {
    // const URL = query ? [endpoints.product.search, { params: { query } }] : null;
    const URL = query ? [endpoints.clinic_manager._clinic_data, { params: { query } }] : null;
  
    const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, {
      keepPreviousData: true,
    });
  
    const memoizedValue = useMemo(
      () => ({
        searchResults: data?.results || [],
        searchLoading: isLoading,
        searchError: error,
        searchValidating: isValidating,
        searchEmpty: !isLoading && !data?.results.length,
      }),
      [data?.results, error, isLoading, isValidating]
    );
  
    return memoizedValue;
  }
  