import React from 'react';
import Card from '../Card/Card';
import Container from '../../Shared/Container/Container';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const Plants =() => {
    const {data:plants,isLoading}=useQuery({
        queryKey:['plants'],
        queryFn:async()=>{
     const {data}= await axios(`${import.meta.env. VITE_API_URL}/plants`)
     return data;
        }
    })
    
    return (
       <Container>
     {
        plants &&plants.length>0 ?<div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
           {plants.map(plant=><Card key={plant._id} plant={plant}></Card>)}
        </div>: <p>No Data Found</p>
     }
       </Container>
    );
};

export default Plants;