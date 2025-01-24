import axios from "../api/axios";
import { useAuthStore } from "../store/store";
import useAxiosPrivate from "./useAxiosPrivate";

const useLogout = () => {
    const { setAuthState } = useAuthStore(state => state);
    const axiosPrivate = useAxiosPrivate();

    const logout = async () => {
        try {
            const response = await axiosPrivate.get('/auth/logout');
            // localStorage.removeItem('token');
        } catch (error) {
            console.log(error);
        }

        setAuthState({
            accessToken: '',
            user: null,
            role: ''
        });

    }
    return logout;
}

export default useLogout;