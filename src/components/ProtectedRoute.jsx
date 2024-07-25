// src/components/ProtectedRoute.jsx
import React from 'react';
import {Navigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext.jsx';

const ProtectedRoute = ({component: Component}) => {
    const {user} = useAuth();

    if (!user) {
        return <Navigate to="/"/>;
    }

    return <Component/>;
};

export default ProtectedRoute;
