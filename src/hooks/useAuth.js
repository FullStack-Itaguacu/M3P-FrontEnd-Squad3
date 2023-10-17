
import { useContext } from 'react'; 
import { AuthContext } from '../contexts/AuthContext';


export default function useAuth() {

  const {adminLogin, userLogin,user,onLoadUser} = useContext(AuthContext);


 

  return {
    adminLogin,
    userLogin,
    user,
    onLoadUser
  }

}