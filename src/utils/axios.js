import axios from 'axios';
// config
import { HOST_API, HOST_API_TWO } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};


//ADDED BY BLESSINGG
export const axiosInstance_Two = axios.create({ baseURL: HOST_API_TWO });
 
axiosInstance_Two.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);



// ----------------------------------------------------------------------

export const fetcher_Two = async (args) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance_Two.get(url, { ...config });

  return res.data;
};
// ----------------------------------------------------------------------

export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  auth: {
    me: '/api/auth/me',
    login: '/api/auth/login',
    register: '/api/auth/register',
  },
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },
  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },
  product: {
    list: '/api/product/list',
    // details: '/api/product/details',
    search: '/api/product/search',

    // Added by Blessing NEXT_PUBLIC_HOST_API_TWO
    corp_data: '/api/Corps',
    details: '/api/Corps/corpNum',

  },

  //Added by Blessing
  clinic_manager: {
    list: '/api/clinicmanager/list',
    details: '/api/clinicmanager/details',
    search: '/api/clinicmanager/search',
    _clinic_data: 'http://vnicomhub-001-site10.gtempurl.com/api/clinics',

  },

};


//Added by blessing
// Function to process the _clinic_data object
const processClinicData = (_clinic_data) => {
  // Check if _clinic_data is not null and contains the 'data' property
  if (_clinic_data && _clinic_data.data && _clinic_data.data.result) {
    const resultArray = _clinic_data.data.result;

    // Initialize an array to hold arrays of clinic values
    const arrayOfArrays = [];

    // Map through each clinic object and extract values into sub arrays
    resultArray.forEach(clinic => {
      // Extract values of each property in the clinic object
      const clinicValues = Object.values(clinic);
      // Push the clinicValues array into the arrayOfArrays
      arrayOfArrays.push(clinicValues);
    });

    return arrayOfArrays;
  }

  return null; // Return null if _clinic_data is incomplete or malformed
};
