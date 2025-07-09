import React from 'react';
import AdminStatistics from './AdminStatistics';
import { Helmet } from 'react-helmet-async';
import Userole from '../../Hooks/Userole/Userole';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';
import { Navigate } from 'react-router-dom';

const Statictics = () => {
    const {role,isLoading}=Userole()
    if(isLoading) return <LoadingSpinner></LoadingSpinner>
    if(role?.role==="customer") return <Navigate to="/dashboard/my-orders"/>
    if(role?.role==="seller") return <Navigate to="/dashboard/my-inventory"/>
    return (
       <>
       <Helmet>
        <title>Statics</title>
       </Helmet>
        <div>
          {role==="admin" &&  <AdminStatistics></AdminStatistics>}
        </div>
       </>
    );
};

export default Statictics;