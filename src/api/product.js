import useSWR from 'swr';
import { useMemo } from 'react';
// utils
import { fetcher, endpoints } from 'src/utils/axios';
// Shakirat
import {data}  from 'src/_mock/_coorperation';
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
  const products = data.data.items; // Use the items array from your data
  return {
    products,
    productsLoading: false, // Set to false since you are using static data
    productsError: null, // Set to null since there is no error
    productsValidating: false, // Set to false since you are using static data
    productsEmpty: products.length === 0,
  };
}


// ----------------------------------------------------------------------

export function useGetProduct(productId) {
  const URL = productId ? [endpoints.product.details, { params: { productId } }] : null;

  const { isLoading, error, isValidating } = useSWR(URL, fetcher);

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
  const searchResults = data.data.items.filter(item => item.corp_Name.toLowerCase().includes(query.toLowerCase())); // Filter items based on the query
  return {
    searchResults,
    searchLoading: false, // Set to false since you are using static data
    searchError: null, // Set to null since there is no error
    searchValidating: false, // Set to false since you are using static data
    searchEmpty: searchResults.length === 0,
  };
}
