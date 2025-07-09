import React from 'react';
import Userole from '../../Hooks/Userole/Userole';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({children}) => {
    const [role,isLoading]=Userole()
    
    if(isLoading) return <LoadingSpinner/>
    if(role==='admin') return children
    return <Navigate to='/dashboard'  replace='true'></Navigate>
};

export default AdminRoute;