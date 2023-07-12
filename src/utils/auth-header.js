import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'https://smart-ktx.bsa9e8h5bkhrbrbh.eastasia.azurecontainer.io/api/v1/'
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
