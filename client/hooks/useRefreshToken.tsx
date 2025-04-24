import axios from '../api/axios';
import { useAuthStore } from '../store/store';
import { useRouter } from 'next/navigation';
import { useLanguageStore } from '../store/store';

const useRefreshToken = () => {
    const { setAuthState, accessToken } = useAuthStore(state => state);
    const { language } = useLanguageStore(state => state);
    const router = useRouter();

    const refreshToken = async () => {
        try {
            // Request a new access token
            const res = await axios.get(`/auth/refresh`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                withCredentials: true,
                // Add a timeout for the request
                timeout: 5000
            });

            // If no accessToken in response, throw error
            if (!res.data?.accessToken) {
                throw new Error('No access token in refresh response');
            }

            // Get user profile with new token
            const res2 = await axios.get(`/users/profile`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${res.data.accessToken}`
                },
                withCredentials: true,
                // Add a timeout for the request
                timeout: 5000
            });

            const data = res.data;
            
            // Update auth state with new token and user data
            setAuthState({
                user: res2.data,
                accessToken: data.accessToken,
                role: res2.data.role
            });
            
            return data.accessToken;

        } catch (error: any) {
            console.error('Refresh token error:', error?.response?.data || error.message);
            
            // Clear auth state on error
            setAuthState({
                accessToken: '',
                user: null,
                role: ''
            });
            
            // Only redirect if there's a genuine auth error
            if (error?.response?.status === 401 || error?.response?.status === 403) {
                router.push(`/${language}/auth/login`);
            }
            
            // Rethrow to allow proper handling in PersistLogin
            throw error;
        }
    };

    return refreshToken;
};

export default useRefreshToken;