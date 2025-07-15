import React from 'react';
import Navbar from '../../Shared/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../../Pages/Footer/Footer';

const Mainlayouts = () => {
    return (
        <div>
           <Navbar></Navbar>
           <Outlet></Outlet>
           <Footer></Footer>
        </div>
    );
};

export default Mainlayouts;