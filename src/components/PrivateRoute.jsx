import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import typeUserEnum from '../constants/enums/typeUserEnum';

function PrivateRoute({ children, acessControll }) {
    const [isLoading, setIsLoading] = useState(true);
    const { user, onLoadUser } = useAuth();

    useEffect(() => {
        const loadUser = async () => {
            await onLoadUser();
            setIsLoading(false);
        };

        if (isLoading) {
            loadUser();
        }
    }, [isLoading, onLoadUser]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        if (acessControll && acessControll.includes(typeUserEnum.ADMIN)) {
            console.log("entrou");
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
