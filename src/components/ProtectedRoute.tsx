import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
    component: React.ComponentType;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({component: Component}) => {
    const {user} = useAuth();

    if (!user) {
        return <Navigate to="/"/>;
    }

    return <Component/>;
};

export default ProtectedRoute;
