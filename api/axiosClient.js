import axios from "axios";


const axiosClient = axios.create({
  baseURL: "http://localhost:8080",
  // headers: {
  //   "Content-Type": "application/json; charset=UTF-8",
  // },
});

// Interceptors
// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {

    // const token = getToken(); 
    // if (token) {

    //   config.headers["Authorization"] = `Bearer ${token}`;
    // }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Handle response error
    return Promise.reject(error);
  }
);

export default axiosClient;
