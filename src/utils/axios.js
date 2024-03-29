import axios from 'axios';
import Cors from 'cors';
// config
import { HOST_API, EDMS_API } from 'src/config-global';
import corsMiddleware from 'src/utils/cors'; 

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
export const axiosInstance_Two = axios.create({
  baseURL: EDMS_API,
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'edms'}
});
 
axiosInstance_Two.interceptors.response.use(
  (res) => res,
  (error) => {
    console.log("---API ERROR---");
    console.log(error);
    console.log("--------------");
    Promise.reject((error.response && error.response.data) || 'Something went wrong')
  }
);

// Apply CORS middleware to the Axios instance
// Set CORS headers directly in Axios instance configuration
// axiosInstance_Two.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// axiosInstance_Two.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';


// ----------------------------------------------------------------------
export const $get = async (args) => {
  const [url, config] = Array.isArray(args) ? args : [args];
  console.log("--- GET REQUEST ---");
  console.log("URL :", url);

  try {
    const res = await axiosInstance_Two.get(url, { ...config });
    console.log("RESPONSE SUCCESS:", (res.data));
    console.log("----------------");
    return res.data.data;
  } catch (error) {
    return error
  }
};

export const $post = async (url, body) => {
  // const [url, body] = Array.isArray(args) ? args : [args];
  console.log("--- POST REQUEST ---");
  console.log("URL :", url);
  console.log("BODY :", body);

  const res = await axiosInstance_Two.post(url, body);
  console.log("RESPONSE:", (res.data));
  console.log("----------------");
  return res.data.data;
};
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export const fetcher_Three = async (args) => {
  const [url, data, config] = Array.isArray(args) ? args : [args, null, {}];

  const res = await axiosInstance_Two.post(url, data, { ...config });
  console.log("Response:", res.data);
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

    // Added by Blessing NEXT_PUBLIC_EDMS_API
    corp_data: '/api/corps',
    corp: '/api/corps/',
    corp_add: 'api/corps',
    corp_delete: 'api/corps',

  },

  corps: {
    // Added by Blessing NEXT_PUBLIC_EDMS_API
    names: '/api/corps/names',
    corp_data: '/api/corps',
    corp: '/api/corps/',
    corp_add: 'api/corps',
    corp_delete: 'api/corps',
  },
//Added by Shakirat

 pms: {
  // list: '/api/pms/list',
   details: '/api/pms/details',
   search: '/api/pms/search',
   names: '/api/pms/names',
   pms: '/api/pms',
   pms_data: '/api/pms',
   pms_add: '/api/pms',
   pms_update: '/api/pms',
   pms_delete: 'api/pms',
 },

 
  clinic_manager: {
    clinic: '/api/clinics/',

    clinic_corp: '/api/clinics/corp/',
    clinic_pms: '/api/clinics/pms/',

    clinic_adjustments: '/api/clinics/adjustments/',

    clinic_paymethod: '/api/clinics/paymethod/',

    clinic_employee: '/api/clinics/employee/',

    clinic_appointment: '/api/clinics/appointment/',
  },

};


