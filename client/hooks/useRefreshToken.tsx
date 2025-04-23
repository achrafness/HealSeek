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
                    'Authorization': `Bearer ${accessToken || ''}`
                },
                withCredentials: true,
                timeout: 8000 // 8 second timeout
            });

            // Validate response data
            if (!res?.data) {
                throw new Error('Invalid response from refresh token endpoint');
            }

            // Check for access token in response
            if (!res.data.accessToken) {
                throw new Error('No access token in refresh response');
            }

            try {
                // Get user profile with new token
                const res2 = await axios.get(`/users/profile`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${res.data.accessToken}`
                    },
                    withCredentials: true,
                    timeout: 8000
                });
                
                // Update auth state with new token and user data
                setAuthState({
                    user: res2.data,
                    accessToken: res.data.accessToken,
                    role: res2.data.role
                });
                
                return res.data.accessToken;
            } catch (profileError) {
                console.error('Error fetching user profile');
                
                // Even without profile, we can still use the access token
                setAuthState({
                    accessToken: res.data.accessToken,
                    user: null,
                    role: ''
                });
                
                // Still throw to indicate there was an error in the process
                throw profileError;
            }
        } catch (error) {
            console.error('Refresh token error');
            
            // Clear auth state on any error
            setAuthState({
                accessToken: '',
                user: null,
                role: ''
            });
            
            // Rethrow to allow proper handling in PersistLogin
            throw error;
        }
    };

    return refreshToken;
};

export default useRefreshToken;