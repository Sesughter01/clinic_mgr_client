import useSWR from 'swr';
import { useMemo } from 'react';
// utils
import { fetcher, endpoints, fetcher_Two } from 'src/utils/axios';

// ----------------------------------------------------------------------

export function useGetProducts() {
  // const URL = endpoints.product.list;
  const URL = endpoints.product.corp_data;

  // const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher_Two);
  
  
  const memoizedValue = useMemo(
    () => ({
      // products: data?.products || [],
      products: data?.data?.items || [], 
      productsLoading: isLoading,
      productsError: error,
      productsValidating: isValidating,
      // productsEmpty: !isLoading && !data?.products.length,
    }),
    // [data?.products, error, isLoading, isValidating]
    [data?.data?.items, error, isLoading, isValidating]
  );
  console.log(data);
  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetProduct(productId) {
  const URL = productId ? [endpoints.product.details, { params: { productId } }] : null;

  // const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher_Two);

  const memoizedValue = useMemo(
    () => ({
      product: data?.product,
      productLoading: isLoading,
      productError: error,
      productValidating: isValidating,
    }),
    [data?.product, error, isLoading, isValidating]
  );
  
  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useSearchProducts(query) {
  const URL = query ? [endpoints.product.search, { params: { query } }] : null;

  // const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, {
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher_Two, {
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
