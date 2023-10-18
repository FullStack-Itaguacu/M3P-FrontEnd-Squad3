import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
function PrivateRoute({ children, acessControll }) {
    const [ready, setReady] = useState(false);
    const { user, onLoadUser } = useAuth();
    useEffect(() => {
        onLoadUser(); setReady(true);
    }, []);

    if (!ready) {
        return (
            <div> <h1>Loading...</h1> </div>
        );
    }
    if (!user) {
        return <Navigate to="/login" />;
    }
    if (acessControll && !acessControll.includes(user.acessControll)) {
        return <Navigate to="/unauthorized" />;
    }
    return children;
}
export default PrivateRoute;