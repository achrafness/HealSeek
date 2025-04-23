import axios from 'axios';

const BASE_URL: string = "https://healseek-0b244fb67ca5.herokuapp.com/"

// Default configuration for all axios instances
const defaultConfig = {
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
    timeout: 10000, // 10 second default timeout
};

// Create standard axios instance
const instance = axios.create(defaultConfig);

// Create private axios instance for authenticated requests
export const axiosPrivate = axios.create(defaultConfig);

// Add response interceptor to handle common errors
instance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle network errors more gracefully
        if (error.code === 'ECONNABORTED') {
            console.error('Request timeout - server may be unavailable');
        } else if (!error.response) {
            console.error('Network error - unable to connect to server');
        }
        return Promise.reject(error);
    }
);

// Add the same interceptor to axiosPrivate
axiosPrivate.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle network errors more gracefully
        if (error.code === 'ECONNABORTED') {
            console.error('Request timeout - server may be unavailable');
        } else if (!error.response) {
            console.error('Network error - unable to connect to server');
        }
        return Promise.reject(error);
    }
);

export default instance;
