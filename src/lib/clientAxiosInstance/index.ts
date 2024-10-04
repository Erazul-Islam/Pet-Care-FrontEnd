/* eslint-disable prettier/prettier */
// src/lib/axiosInstance/clientAxiosInstance.ts

import axios from "axios";
import { getCookie } from "cookies-next"; // You can use any cookie library

import envConfig from "@/src/config/envConfig";

const clientAxiosInstance = axios.create({
    baseURL: envConfig.baseApi,
});

// Request interceptor to add Authorization header from client-side cookies
clientAxiosInstance.interceptors.request.use(
    function (config) {
        const accessToken = getCookie("accessToken"); 

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default clientAxiosInstance;
