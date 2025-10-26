import React from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useAuth();
    const location = useLocation();

    if (!currentUser) {
        // Redirect to login page with the current location as state
        // This allows us to redirect back after login
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
