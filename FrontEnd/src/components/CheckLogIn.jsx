import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
const CheckLogin = ({children}) => {
    const {isAuthenticated} = useAuth();

    if (!isAuthenticated) {
        return children;
    }else{
        return <Navigate to="/home" />;
    }
}

export default CheckLogin