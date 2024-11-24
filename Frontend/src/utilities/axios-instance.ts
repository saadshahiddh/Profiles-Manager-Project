import axios from "axios";
import { API_BASE_URL } from "./environment";

const axiosInstance = axios.create({ baseURL: API_BASE_URL });

// API delay
// axiosInstance.interceptors.request.use(async (config) => {
//     await new Promise(resolve => setTimeout(resolve, 5000));
//     return config;
// }, (error) => {
//     return Promise.reject(error);
// });


export default axiosInstance