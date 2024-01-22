import useSWR from 'swr';
import { useMemo } from 'react';
// utils
import { fetcher, endpoints, fetcher_Two } from 'src/utils/axios';

// ----------------------------------------------------------------------



export function useGetPmss() {
  const URL = endpoints.pms.pms_data;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher_Two);
  
  
  const memoizedValue = useMemo(
    () => ({
      pmss: data?.data?.result || [], 
      pmssLoading: isLoading,
      pmssError: error,
      pmssValidating: isValidating,
    }),
    [data?.data?.result, error, isLoading, isValidating]
  );
  console.log(data);
  return memoizedValue;
}


// ----------------------------------------------------------------------

export function useGetPms(id) {
  const URL = id ? [endpoints.pms.details, { params: { id } }] : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher_Two);

  const memoizedValue = useMemo(
    () => ({
      pms: data?.data?.result,
      pmsLoading: isLoading,
      pmsError: error,
      pmsValidating: isValidating,
    }),
    [data?.data?.result, error, isLoading, isValidating]
  );
  console.log(data?.data?.result)
  return memoizedValue;
}




// ----------------------------------------------------------------------



export function useSearchProducts(query) {
  const URL = query ? [endpoints.pms.search, { params: { query } }] : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher_Two, {
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.result || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !data?.result.length,
    }),
    [data?.data?.result, error, isLoading, isValidating]
  );

  return memoizedValue;
}
