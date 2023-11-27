import useSWR from 'swr';
import { useMemo } from 'react';
// utils
import { fetcher, endpoints, fetcher_Two } from 'src/utils/axios';

// ----------------------------------------------------------------------

// export function useGetProducts() {
//   const URL = endpoints.product.list;

//   const { isLoading, error, isValidating } = useSWR(URL, fetcher);

//   const memoizedValue = useMemo(
//     () => ({
//       products: data?.products || [],
//       productsLoading: isLoading,
//       productsError: error,
//       productsValidating: isValidating,
//       productsEmpty: !isLoading && !data?.products.length,
//     }),
//     [data?.products, error, isLoading, isValidating]
//   );

//   return memoizedValue;
// }

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
      // product: data?.product,
      product: data?.data?.item,
      productLoading: isLoading,
      productError: error,
      productValidating: isValidating,
    }),
    [data?.data?.item, error, isLoading, isValidating]
  );
  console.log(data?.data?.item)
  return memoizedValue;
}

// export function useGetProduct(productId) {
//   const product = data.data.items.find(item => item.corpId === productId); // Find the product by corpId
//   return {
//     product,
//     productLoading: false, // Set to false since you are using static data
//     productError: null, // Set to null since there is no error
//     productValidating: false, // Set to false since you are using static data
//   };
// }


// ----------------------------------------------------------------------

// export function useSearchProducts(query) {
//   const URL = query ? [endpoints.product.search, { params: { query } }] : null;

//   const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, {
//     keepPreviousData: true,
//   });

//   const memoizedValue = useMemo(
//     () => ({
//       searchResults: data?.results || [],
//       searchLoading: isLoading,
//       searchError: error,
//       searchValidating: isValidating,
//       searchEmpty: !isLoading && !data?.results.length,
//     }),
//     [data?.results, error, isLoading, isValidating]
//   );

//   return memoizedValue;
// }


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
