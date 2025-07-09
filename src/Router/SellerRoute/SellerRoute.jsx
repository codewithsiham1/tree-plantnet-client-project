import React from 'react';
import Useauth from '../../Hooks/Useauth';
import { Navigate} from 'react-router-dom';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';
import Userole from '../../Hooks/Userole/Userole';

const SellerRoute = ({children}) => {
   const [role,isLoading]=Userole()
    
    if(isLoading) return <LoadingSpinner/>
    if(role==='seller') return children
    return <Navigate to='/dashboard'  replace='true'></Navigate>
};

export default SellerRoute;