import useSWR from 'swr';
import { useMemo } from 'react';
// utils
import { fetcher, endpoints, fetcher_Two } from 'src/utils/axios';

// ----------------------------------------------------------------------

export function useGetClinics() {
  // const URL = endpoints.product.list;
  const URL = endpoints.clinic_manager.clinic_data;

  // const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher_Two);
  
  
  const memoizedValue = useMemo(
    () => ({
      // products: data?.products || [],
      clinics: data?.data?.result || [], 
      clinicsLoading: isLoading,
      clinicsError: error,
      clinicsValidating: isValidating,
      // clinicsEmpty: !isLoading && !data?.clinics.length,
    }),
    // [data?.products, error, isLoading, isValidating]
    [data?.data?.result, error, isLoading, isValidating]
  );
  // console.log(data);
  return memoizedValue;
}


// ----------------------------------------------------------------------

export function useGetClinic(clinicId) {
  const URL = clinicId ? [endpoints.clinic_manager.clinic + clinicId, { params: { clinicId } }] : null;

  // const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher_Two);
   console.log(clinicId)
  const memoizedValue = useMemo(
    () => ({
      clinic: data?.data,
      clinicLoading: isLoading,
      clinicError: error,
      clinicValidating: isValidating,
    }),
    [data?.data, error, isLoading, isValidating]
    
  );
  // console.log(data);
  return memoizedValue;
}



// ----------------------------------------------------------------------


export function useSearchClinics(query) {
  const URL = query ? [endpoints.clinic_manager.search, { params: { query } }] : null;

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
