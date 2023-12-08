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
  // console.log("Response:",(res.data));
  console.log("Response:",(res.data));
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
    corp: '/api/Corps/',

  },
//Added by Shakirat

pms: {
  // list: '/api/pms/list',
  pms_data: '/api/pms',
  details: '/api/pms/details',
  search: '/api/pms/search',
},
  //Added by Blessing
  clinic_manager: {
    list: '/api/clinicmanager/list',
    details: '/api/clinicmanager/details',
    search: '/api/clinicmanager/search',
    clinic_data: '/api/clinics',
    clinic: '/api/clinics/',

  },

};


