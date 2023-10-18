import { createContext, useState } from 'react';
import { loginAdmin, loginUser } from '../Services/api';
import jwtDecode from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);



    const onLoadUser = () => {
        const token = localStorage.getItem('token');

        if (token) {
            const decoded = jwtDecode(token);

            if (!isTokenValid(decoded)) {
                logout();
            } else {
                setUser(decoded);
            }
        }
    };

    function isTokenValid(decoded) {
        return (decoded.exp * 1000) > new Date().getTime();

    }


    const adminLogin = async (email, password) => {

        try {
            const response = await loginAdmin(email, password);
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                return { status: response.status };
            }
        } catch (error) {
            return {
                error: error.response.data.message,
                code: error.response.data.code,
                status: error.response.status,
            };
        }
    }

    const userLogin = async (email, password) => {


        try {
            const response = await loginUser(email, password);
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                return { status: response.status };
            }
        } catch (error) {
            return {
                error: error.response.data.message,
                code: error.response.data.code,
                status: error.response.status,
            };
        }
    }

    function logout() {
        localStorage.removeItem('token');
        setUser(null);
    }






    return (
        <AuthContext.Provider
            value={{
                adminLogin,
                userLogin,
                user,
                onLoadUser,

            }}
        >
            {children}
        </AuthContext.Provider>
    )


}

