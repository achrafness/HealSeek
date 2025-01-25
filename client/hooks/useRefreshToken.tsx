// import React from 'react'
import axios from '../api/axios';
import { useAuthStore } from '../store/store';
import { useRouter } from 'next/navigation';
// import useAxiosPrivate from './useAxiosPrivate';

const useRefreshToken = () => {
    const { setAuthState, accessToken } = useAuthStore(state => state)
    const router = useRouter()
    const refreshToken = async () => {
        try {
            const res = await axios.get(`/auth/refresh`, {
                headers: {
                    'Content-Type': 'application/json',
                    
                    'Authorization' : `Bearer ${accessToken}`
                },
                withCredentials: true
            })

            console.log("hada response : " ,res)

            const res2 = await axios.get(`/users/profile`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${res.data.accessToken}`
                },
                withCredentials: true
            })


            console.log(res)
            const data = await res.data
            console.log('data : ', data);
            // localStorage.setItem('accessToken', data.accessToken);
            setAuthState({
                user: res2.data,
                accessToken: data.accessToken,
                role: res2.data.role
            });
            return data.accessToken;

        } catch (error: unknown) {
            console.log(error);
            router.push('/')
        }
        return refreshToken;
    }

    return refreshToken;
}

export default useRefreshToken  