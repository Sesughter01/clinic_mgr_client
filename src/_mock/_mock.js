import { sub } from 'date-fns';
// config
import { ASSETS_API } from 'src/config-global';
//
import {
  _id,
  _ages,
  _roles,
  _prices,
  _emails,
  _ratings,
  _nativeS,
  _nativeM,
  _nativeL,
  _percents,
  _booleans,
  _sentences,
  _lastNames,
  _fullNames,
  _tourNames,
  _jobTitles,
  _taskNames,
  _postTitles,
  _firstNames,
  _fullAddress,
  _companyNames,
  _productNames,
  _descriptions,
  _phoneNumbers,
  //new data from blessing
  _clinic_names,
  _corpNames,
  _pmss,
  _stages,
  _todos,
  _actioBys,
  _asana_url,

  clinic_data,
} from './assets';
// import { _status } from './_product';

// ----------------------------------------------------------------------

export const _mock = {
  id: (index) => _id[index],
  time: (index) => sub(new Date(), { days: index, hours: index }),
  boolean: (index) => _booleans[index],
  role: (index) => _roles[index],
  // Text
  taskNames: (index) => _taskNames[index],
  postTitle: (index) => _postTitles[index],
  jobTitle: (index) => _jobTitles[index],
  tourName: (index) => _tourNames[index],
  productName: (index) => _productNames[index],
  sentence: (index) => _sentences[index],
  description: (index) => _descriptions[index],
  // Contact
  email: (index) => _emails[index],
  phoneNumber: (index) => _phoneNumbers[index],
  fullAddress: (index) => _fullAddress[index],
  // Name
  firstName: (index) => _firstNames[index],
  lastName: (index) => _lastNames[index],
  fullName: (index) => _fullNames[index],
  companyName: (index) => _companyNames[index],

  //Clinic Manager 
  clinic_name: (index) => _clinic_names[index],
  corpName: (index) => _corpNames[index],
  pms: (index) => _pmss[index],
  stage: (index) => _stages[index],
  todo: (index) => _todos[index],
  actioBy: (index) => _actioBys[index],
  asana_url: (index) => _asana_url[index],

  //Corperation
  status: (index) => _status[index],

  // Number
  number: {
    percent: (index) => _percents[index],
    rating: (index) => _ratings[index],
    age: (index) => _ages[index],
    price: (index) => _prices[index],
    nativeS: (index) => _nativeS[index],
    nativeM: (index) => _nativeM[index],
    nativeL: (index) => _nativeL[index],
  },
  // Image
  image: {
    cover: (index) => `${ASSETS_API}/assets/images/cover/cover_${index + 1}.jpg`,
    avatar: (index) => `${ASSETS_API}/assets/images/avatar/avatar_${index + 1}.jpg`,
    travel: (index) => `${ASSETS_API}/assets/images/travel/travel_${index + 1}.jpg`,
    company: (index) => `${ASSETS_API}/assets/images/company/company_${index + 1}.png`,
    product: (index) => `${ASSETS_API}/assets/images/m_product/product_${index + 1}.jpg`,
    portrait: (index) => `${ASSETS_API}/assets/images/portrait/portrait_${index + 1}.jpg`,
  },
};
