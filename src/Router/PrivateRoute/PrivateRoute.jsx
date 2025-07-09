import React from 'react';
import Useauth from '../../Hooks/Useauth';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';

const PrivateRoute = ({children}) => {
    const {user,loading}=Useauth()
    const location=useLocation()
    if(loading) return <LoadingSpinner/>
    if(user) return children
    return <Navigate to='/login' state={{from:location}} replace='true'></Navigate>
};

export default PrivateRoute;