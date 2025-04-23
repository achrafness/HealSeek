import axios from 'axios';

const BASE_URL: string = "https://healseek-0b244fb67ca5.herokuapp.com/"

// Create standard axios instance
const instance = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
    timeout: 10000 // 10 second default timeout
});

// Create private axios instance for authenticated requests
export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
    timeout: 10000 // 10 second default timeout
});

export default instance;
