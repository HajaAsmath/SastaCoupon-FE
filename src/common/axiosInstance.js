import axios from 'axios';
import { BACKEND_BASE_URL, SESSION_STORAGE_KEY } from '../constants/Constants';

const authHeader = () => {
  let user;
  const userData = localStorage.getItem(SESSION_STORAGE_KEY);
  if (userData !== null) {
    user = JSON.parse(userData);
  } else {
    user = {};
  }
  if (user && user.token) {
    return user.token;
  }
  return '';
};

// const axiosClient = () => {
//   axios.create({
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${authHeader()}`
//     },
//     baseURL: BACKEND_BASE_URL
//   });

//   return axios;
// }

const axiosClient = axios.create({
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authHeader()}`,
  },
  baseURL: BACKEND_BASE_URL,
});

// const create = () => {
//   return axiosClient();
// }

export default axiosClient;
