import React from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

const Dashboardlayouts = () => {
    return (
        <div className='relative min-h-screen md:flex bg-white'> 
        {/* left side:Sidebar components */}
            <Sidebar></Sidebar>
            {/* Right side:Dashboard Dynamic content */}
            <div className='flex-1 md:ml-64'>
           <div className='p-5'>
         <Outlet></Outlet>
           </div>
            </div>
        </div>
    );
};

export default Dashboardlayouts;