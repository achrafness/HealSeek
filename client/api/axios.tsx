import axios from 'axios';

const BASE_URL: string = "https://healseek-0b244fb67ca5.herokuapp.com/"

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
