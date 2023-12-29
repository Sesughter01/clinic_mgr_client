import useSWR from 'swr';
import { useMemo } from 'react';
// utils
import { fetcher, endpoints, fetcher_Two } from 'src/utils/axios';
import { fetcher_Three } from '@/utils/axios';

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

export function usePostClinic() {
  const addClinic = async (clinic_add) => {
    try {
      const response = await fetcher_Three({
        // url: '/your-post-endpoint', // Replace with your actual POST endpoint
        url: '/your-post-endpoint', // Replace with your actual POST endpoint
        data: clinic_add, // Data to be sent in the POST request
        method: 'post', // This indicates a POST request
      });
      // Optionally, handle the response here
      console.log('Clinic added:', response);
      return response;
    } catch (error) {
      // Handle errors if the POST request fails
      console.error('Error adding clinic:', error);
      throw new Error('Failed to add clinic');
    }
  };

  return { addClinic };
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
