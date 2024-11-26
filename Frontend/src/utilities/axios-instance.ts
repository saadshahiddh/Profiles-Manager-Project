import axios from "axios";
import { API_BASE_URL } from "./environment";
import { getAuthToken, onLogoutUser } from "./auth";
import { BackendApiResponse } from "../types/global.types";
import { showApiErrorToast } from "./tool";

const axiosInstance = axios.create({ baseURL: API_BASE_URL });

// API delay
// axiosInstance.interceptors.request.use(async (config) => {
//     await new Promise(resolve => setTimeout(resolve, 5000));
//     return config;
// }, (error) => {
//     return Promise.reject(error);
// });

axiosInstance.interceptors.request.use(
    (config: any) => {
        const token = getAuthToken();
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


// Response interceptor for error handling
axiosInstance.interceptors.response.use(
    (resp) => { return resp.data },
    async (err) => {
        const error: BackendApiResponse = err.response.data;
        showApiErrorToast(error.message);
        const noAuthRoutes: string[] = ['/login', 'register'];
        if (error.statusCode == 401 && !noAuthRoutes.includes(window.location.pathname)) {
            window.location.href = '/logged-out-redirect';
            onLogoutUser();
        }
        return Promise.reject(error);
    }
);

export default axiosInstance