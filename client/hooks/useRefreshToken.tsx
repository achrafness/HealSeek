import React from 'react'
import axios from '../api/axios';
import { useAuthStore } from '../store/store';
import { useRouter } from 'next/navigation';

const useRefreshToken = () => {
    const { setAuthState, accessToken } = useAuthStore(state => state)
    const router = useRouter()
    const refreshToken = async () => {
        try {
            const res: any = await axios.get(`/auth/refresh`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            })
            console.log(res)
            const data = await res.data
            console.log('data : ', data);
            // localStorage.setItem('accessToken', data.accessToken);
            setAuthState({
                user: data.user,
                accessToken: data.accessToken,
                role: data.user.role
            });
            return data.accessToken;

        } catch (error: any) {
            console.log(error);
            router.push('/')
        }
        return refreshToken;
    }

    return refreshToken;
}

export default useRefreshToken  