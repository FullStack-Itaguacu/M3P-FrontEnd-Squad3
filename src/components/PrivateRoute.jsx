import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import typeUserEnum from '../constants/enums/typeUserEnum';

function PrivateRoute({ children, acessControll }) {

    const [ready, setReady] = useState(false);
    const { user, onLoadUser } = useAuth();

    useEffect(() => {
        onLoadUser(); 
        setReady(true);
    }, []);

    if (!ready) {
        return (
            <div> <h1>Loading...</h1> </div>
        );
    }
    if (!user) {
        if (acessControll && acessControll.includes(typeUserEnum.ADMIN)) {
            return <Navigate to="/login/admin" />;
        }
        return <Navigate to="/login" />;
    }

    if (acessControll && !acessControll.includes(user.role)) {
        return <Navigate to="/unauthorized" />;
    }
    return children;
}
export default PrivateRoute;