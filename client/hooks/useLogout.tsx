import axios from "../api/axios";
import { useAuthStore } from "../store/store";
import useAxiosPrivate from "./useAxiosPrivate";

const useLogout = () => {
    const { setAuthState } = useAuthStore(state => state);
    const axiosPrivate = useAxiosPrivate();
    const logout = async () => {
        setAuthState({
            accessToken: '',
            user: null,
            role: ''
        });
        try {
            const response = await axiosPrivate.get('/auth/logout');
            // localStorage.removeItem('token');
        } catch (error) {
            console.log(error);
        }

    }
    return logout;
}

export default useLogout;