import axios from "../api/axios";
import { useAuthStore } from "../store/store";

const useLogout = () => {
    const { setAuthState } = useAuthStore(state => state);
    const logout = async () => {
        setAuthState({
            accessToken: '',
            user: null,
            role: ''
        });
        try {
            const response = await axios.get('/auth/logout', {
                withCredentials: true
            });
            // localStorage.removeItem('token');
        } catch (error) {
            console.log(error);
        }

    }
    return logout;
}

export default useLogout;