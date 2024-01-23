import useSWR from 'swr';
import { useMemo } from 'react';
// utils
import { fetcher, endpoints, $get } from 'src/utils/axios';
import { fetcher_Three } from '@/utils/axios';
// ----------------------------------------------------------------------

export function useGetFiles(clinicId = 1) {
  // const URL = endpoints.product.list;
  const URL = endpoints.cinics.clinic;

  // const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const { data, isLoading, error, isValidating } = useSWR(`${URL}?clinicId=${clinicId}`, $get);
  
  
  const memoizedValue = useMemo(
    () => ({
      // products: data?.products || [],
      files:data?.data || [], 
    //   url:data?.totalCount || 0,
    //   pageSize:data?.pageSize || 15,
    //   currentPage:data?.currentPage || 0,
    //   totalPages:data?.totalPages || 0,
    //   hasNext:data?.hasNext || true,
    //   hasPrevious:data?.hasPrevious || false,
      loading: isLoading,
      error: error,
      validating: isValidating,
      productsEmpty: !isLoading && !data?.products.length,
    }),
    // [data?.data?.items, error, isLoading, isValidating]
    [data?.data, error, isLoading, isValidating]
  );
  // console.log(data);
  return memoizedValue;
}


// ----------------------------------------------------------------------

export function useGetFile(Id) {
//   const URL = Id ? [endpoints.clinics.clinic + Id + `documents`, { params: { Id } }] : null;
  const URL = Id ? endpoints.clinics.clinic + Id.id + `/documents` : null;

  // const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const { data, isLoading, error, isValidating } = useSWR(URL, $get);
  console.log(Id)

  const memoizedValue = useMemo(
    () => ({
      // product: data?.product,
      file: data?.data,
      fileLoading: isLoading,
      fileError: error,
      fileValidating: isValidating,
    }),
    [data?.data, error, isLoading, isValidating]
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


export function useSearchFiles(query) {
  const URL = query ? [endpoints.product.search, { params: { query } }] : null;

  // const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, {
  const { data, isLoading, error, isValidating } = useSWR(URL, $get, {
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.items || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !data?.items.length,
    }),
    [data?.items, error, isLoading, isValidating]
  );

  return memoizedValue;
}
