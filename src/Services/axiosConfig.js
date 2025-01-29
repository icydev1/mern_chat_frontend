import axios from 'axios';
import { localStorageData } from '../helpers/token';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

console.log(baseUrl,'baseUrl');


const axiosInstance = axios.create({
  baseURL: baseUrl,
//   timeout: 5000, // Adjust timeout as needed
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token = localStorageData.get('token');
    if (token) {
      config.headers.Authorization = `${token}`;
      // config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response && error.response.status === 401) {
        // console.log("hii");
      // Redirect to login page or perform any other action for 401 errors
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
