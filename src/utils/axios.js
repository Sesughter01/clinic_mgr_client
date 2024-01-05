import axios from 'axios';
import Cors from 'cors';
// config
import { HOST_API, HOST_API_TWO } from 'src/config-global';
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

    // Added by Blessing NEXT_PUBLIC_HOST_API_TWO
    corp_data: '/api/Corps',
    corp: '/api/Corps/',
    corp_add: 'api/Corps',
    corp_delete: 'api/Corps',

  },
//Added by Shakirat

 pms: {
  // list: '/api/pms/list',
   details: '/api/pms/details',
   search: '/api/pms/search',
   pms: '/api/pms',
   pms_data: '/api/pms',
   pms_add: '/api/pms',
   pms_update: '/api/pms',
   pms_delete: 'api/pms',
 },
  //Added by Blessing
  clinic_manager: {
    list: '/api/clinicmanager/list',
    details: '/api/clinicmanager/details',
    search: '/api/clinicmanager/search',
    clinic_data: '/api/clinics',
    clinic: '/api/clinics/',

    clinic_add: '/api/clinics/',
    clinic_update: '/api/clinics/',
    clinic_data_update: '/api/clinics',
    clinic_corp: '/api/clinics/corp',
    clinic_pms: '/api/clinics/pms',
    clinic_adjustments: '/api/clinics/adjustments',
    clinic_adjustments_update: '/api/clinics/adjustments',
    clinic_paymethod_update: '/api/clinics/paymethod',
    clinic_employee_update: '/api/clinics/employee',
    clinic_appointment_update: '/api/clinics/appointment',

  },

};


