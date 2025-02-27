import { useEffect, useState } from "react";
import Auth from "./Auth";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import baseURL from "../components/config/baseURL";
import { useNavigate } from "react-router-dom";

function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const token = localStorage.getItem('token');
        return token ? true : false;
    });

    const navigate = useNavigate()


        // **Set up Axios interceptor**
        useEffect(() => {
            axios.defaults.withCredentials = true;  // allowing all req to have withCredentials to true


            const responseInterceptor = axios.interceptors.response.use(
                (response) => response,
                async (error) => {
                    // console.log('this is responseInterceptor', error.response)
                    if (error.response?.status === 401) {
                        try {
                            // Refresh token request
                            const { data } = await axios.post(`${baseURL}/api/auth/refresh`, {}, { withCredentials: true });
                            localStorage.setItem('token', data.token);
    
                            // Retry the original request
                            error.config.headers.Authorization = `Bearer ${data.token}`;
                            return axios(error.config);
                        } catch (refreshError) {
                            console.error('Refresh token failed, logging out.');
                            logout();
                            window.location.href = '/login';
                        }
                    }
                    return Promise.reject(error);
                }
            );
    
            // Cleanup interceptors on unmount
            return () => {
                axios.interceptors.response.eject(responseInterceptor);
            };
        }, []);
    
    const [userRole, setUserRole] = useState(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            // console.log(decodedToken)
            return decodedToken.role; 
        }
        return null;
    });

    const login = (token) => {
        localStorage.setItem('token', token);
        const decodedToken = jwtDecode(token);
        // console.log(decodedToken)
        setUserRole(decodedToken.role);
        setIsLoggedIn(true);
    };

    const logout = async() => {
        await axios.post(`${baseURL}/api/auth/logout`);
        localStorage.removeItem('token');
        navigate('/login')
        // window.location.href = '/login';
        setUserRole(null);
        setIsLoggedIn(false);
    };



    return (
        <Auth.Provider value={{ isLoggedIn, userRole, login, logout }}>
            {children}
        </Auth.Provider>
    );
}

export default AuthProvider;