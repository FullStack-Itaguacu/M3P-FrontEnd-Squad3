import { createContext, useState } from 'react';
import { loginAdmin, loginUser } from '../Services/api';
import validateToken from '../utils/validateToken';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);



    const onLoadUser = async () => {
        try {
          const decoded = await validateToken.decodeToken();
          if (decoded) {
            setUser(decoded);
          } else {
            logout(); 
          }
        } catch (error) {
          logout(); 
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
            return error.response;
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
                logout

            }}
        >
            {children}
        </AuthContext.Provider>
    )


}

