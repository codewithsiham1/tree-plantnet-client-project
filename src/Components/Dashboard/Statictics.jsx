import React from 'react';
import AdminStatistics from './AdminStatistics';
import { Helmet } from 'react-helmet-async';

import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';
import { Navigate } from 'react-router-dom';
import Userole from '../../Hooks/Userole/Userole';

const Statictics = () => {
    const [role,isLoading]=Userole()
    console.log("role:", role, "loading:", isLoading)
    if(isLoading) return <LoadingSpinner></LoadingSpinner>
    if(role==="customer") return <Navigate to="/dashboard/my-orders"/>
    if(role==="seller") return <Navigate to="/dashboard/my-inventory"/>
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