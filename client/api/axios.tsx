import axios from 'axios';

const BASE_URL: string = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
export default axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});