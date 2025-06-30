import React from 'react';
import Plants from '../../HomePage/Plants/Plants';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
     <>
           <Helmet   >
       <title>PlanNet|| Home Page</title>
     </Helmet>
        <div>
            <Plants></Plants>
        </div>
     </>
    );
};

export default Home;