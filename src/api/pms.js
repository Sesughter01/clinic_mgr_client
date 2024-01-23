import useSWR from 'swr';
import { useMemo } from 'react';
// utils
import { fetcher, endpoints, $get } from 'src/utils/axios';
import { fetcher_Three } from '@/utils/axios';

// ----------------------------------------------------------------------

export function useGetPmss(pageNumber = 1) {
  // const URL = endpoints.product.list;
  const URL = endpoints.pms.pms_data;

  // const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const { data, isLoading, error, isValidating } = useSWR(`${URL}?pageNumber=${pageNumber}`, $get);
  
  
  const memoizedValue = useMemo(
    () => ({
      pmss:data?.result || [], 
      totalCount:data?.totalCount || 0,
      pageSize:data?.pageSize || 15,
      currentPage:data?.currentPage || 0,
      totalPages:data?.totalPages || 0,
      hasNext:data?.hasNext || true,
      hasPrevious:data?.hasPrevious || false,
      loading: isLoading,
      error: error,
      validating: isValidating,
      // pmss: data?.data?.result || [], 
      // pmssLoading: isLoading,
      // pmssError: error,
      // pmssValidating: isValidating,
      // pmssEmpty: !isLoading && !data?.pmss.length,
    }),
    // [data?.data?.result, error, isLoading, isValidating]
    [data?.result, error, isLoading, isValidating]
  );
  // console.log(data);
  return memoizedValue;
}


// ----------------------------------------------------------------------

export function useGetPms(pmsId) {
  const URL = pmsId ? [endpoints.pms.pms + pmsId, { params: { pmsId } }] : null;

  // const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const { data, isLoading, error, isValidating } = useSWR(URL, $get);
   console.log(pmsId)
  const memoizedValue = useMemo(
    () => ({
      pms: data?.data,
      pmsLoading: isLoading,
      pmsError: error,
      pmsValidating: isValidating,
    }),
    [data?.data, error, isLoading, isValidating]
    
  );
  // console.log(data);
  return memoizedValue;
}

export function usePostPms() {
  const addPms = async (pms_add) => {
    try {
      const response = await fetcher_Three({
        // url: '/your-post-endpoint', // Replace with your actual POST endpoint
        url: '/your-post-endpoint', // Replace with your actual POST endpoint
        data: pms_add, // Data to be sent in the POST request
        method: 'post', // This indicates a POST request
      });
      // Optionally, handle the response here
      console.log('Pms added:', response);
      return response;
    } catch (error) {
      // Handle errors if the POST request fails
      console.error('Error adding pms:', error);
      throw new Error('Failed to add pms');
    }
  };

  return { addPms };
}


// ----------------------------------------------------------------------


export function useSearchClinics(query) {
  const URL = query ? [endpoints.pms.search, { params: { query } }] : null;

  // const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, {
  const { data, isLoading, error, isValidating } = useSWR(URL, $get, {
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
