import axios from '../api/axios';
import { useAuthStore } from '../store/store';
import { useRouter } from 'next/navigation';
import { useLanguageStore } from '../store/store';

const useRefreshToken = () => {
    const { setAuthState, accessToken } = useAuthStore(state => state);
    const { language } = useLanguageStore(state => state);
    const router = useRouter();

    const refreshToken = async () => {
        // Create an AbortController for this request
        const controller = new AbortController();
        
        // Auto-abort after 4 seconds to prevent hanging
        const timeoutId = setTimeout(() => controller.abort(), 4000);
        
        try {
            // Request a new access token with abort signal
            const res = await axios.get(`/auth/refresh`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken || ''}`
                },
                withCredentials: true,
                signal: controller.signal,
                timeout: 4000 // Axios timeout as additional safety
            });

            // Clear the timeout since request completed
            clearTimeout(timeoutId);
            
            // Validate response data
            if (!res?.data || typeof res.data !== 'object') {
                throw new Error('Invalid response format from refresh token endpoint');
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
                    timeout: 4000
                });
                
                // Validate user profile response
                if (!res2?.data || typeof res2.data !== 'object') {
                    throw new Error('Invalid user profile response');
                }
                
                // Update auth state with new token and user data
                setAuthState({
                    user: res2.data,
                    accessToken: res.data.accessToken,
                    role: res2.data.role
                });
                
                return res.data.accessToken;
            } catch (profileError: any) {
                console.error('Error fetching user profile:', profileError?.response?.data || profileError.message);
                
                // Even without profile, we can still use the access token
                // This prevents login loops if profile fetch fails but token is valid
                setAuthState({
                    accessToken: res.data.accessToken,
                    // Keep existing user data if available
                    user: null,
                    role: ''
                });
                
                // Still throw to indicate there was an error in the process
                throw profileError;
            }
        } catch (error: any) {
            // Clear the timeout if we're handling an error
            clearTimeout(timeoutId);
            
            // Handle specific axios errors
            if (axios.isAxiosError(error)) {
                // Handle timeout/abort cases explicitly
                if (error.code === 'ECONNABORTED' || error.message.includes('timeout') || error.message.includes('aborted')) {
                    console.error('Network timeout during token refresh');
                } 
                // Handle server errors
                else if (error.response) {
                    console.error('Server error during refresh:', error.response.status, error.response.data);
                } 
                // Handle network errors
                else if (error.request) {
                    console.error('Network error during token refresh - no response received');
                }
            } else {
                console.error('Refresh token error:', error?.message || 'Unknown error');
            }
            
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