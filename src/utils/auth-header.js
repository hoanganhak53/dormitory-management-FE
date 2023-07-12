import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_URL
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);
