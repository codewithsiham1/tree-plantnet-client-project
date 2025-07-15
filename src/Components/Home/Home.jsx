import React from 'react';
import Plants from '../../HomePage/Plants/Plants';
import { Helmet } from 'react-helmet-async';
import Banner from '../../Pages/Banner/Banner';
import ServicesCard from '../../Pages/ServicesCard/ServicesCard';
import SupperBanner from '../../Pages/SupperBanner/SupperBanner';
import AboutPlants from '../../Pages/AboutPlants/AboutPlants';
import DisCountCard from '../../Pages/DisCountCard/DisCountCard';
import PopularProduct from '../../Pages/PopularProduct/PopularProduct';
import CustomerReview from '../../Pages/CustomerReview/CustomerReview';


const Home = () => {
    return (
     <>
           <Helmet   >
       <title>PlanNet|| Home Page</title>
     </Helmet>
        <div className=''>
             <Banner/>
             <ServicesCard/>
             <SupperBanner/>
            <Plants></Plants>
            <AboutPlants/>
            <DisCountCard/>
            <PopularProduct/>
            <CustomerReview/>
        </div>
     </>
    );
};

export default Home;