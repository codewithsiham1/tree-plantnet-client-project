import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '../../Shared/Container/Container';
import Heading from '../../Shared/Heading/Heading';
import PurchaseModal from '../../Modal/PurchaseModal';
import Button from"../../Shared/Button/Button"
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Userole from '../../Hooks/Userole/Userole';
import Useauth from '../../Hooks/Useauth';


const PlantDetails = () => {
  const [role]=Userole()
  const {user}=Useauth()
  const {id}=useParams()
    const [isOpen,setIsOpen]=useState(false)
    const {data:plant={},isLoading,refetch}=useQuery({
    queryKey:['plant',id],
    queryFn:async()=>{
   const {data}=await axios(`${import.meta.env.VITE_API_URL}/plants/${id}`)
   return data
    }
    })
    console.log('Plant details:', plant);
    const {name,category,quantity,price,image,_id,description,seller}=plant ||{}
    const closeModal=()=>{
        setIsOpen(false)
    }
    if (isLoading) return <div>Loading...</div>
    return (
       <>
      <Container>
               <Helmet>
         <title>PlanNet || PlantNet Details</title>
       </Helmet>
       <div className='mx-auto flex flex-col lg:flex-row justify-between w-full gap-12 p-20'>
        {/* Header */}
        <div className='flex flex-col gap-6 flex-1'>
          <div>
            <div className='w-full overflow-hidden rounded-xl'>
              <img
                className='object-cover w-full'
                src={image}
                alt='header image'
              />
            </div>
          </div>
        </div>
        <div className='md:gap-10 flex-1'>
          {/* Plant Info */}
          <Heading
            title={name}
            subtitle={`Category: ${category}`} center={true}
          />
          <hr className='my-6' />
          <div
            className='
          text-lg font-light text-neutral-500'
          >
          {description}
          </div>
          <hr className='my-6' />

          <div
            className='
                text-xl 
                font-semibold 
                flex 
                flex-row 
                items-center
                gap-2
              '
          >
            <div>Seller:{seller?.name}</div>

            <img
              className='rounded-full'
              height='30'
              width='30'
              alt='Avatar'
              referrerPolicy='no-referrer'
              src={seller?.image}
            />
          </div>
          <hr className='my-6' />
          <div>
            <p
              className='
                gap-4 
                font-light
                text-neutral-500
              '
            >
              Quantity: {quantity}
            </p>
          </div>
          <hr className='my-6' />
          <div className='flex justify-between'>
            <p className='font-bold text-3xl text-gray-500'>Price: {price}</p>
            <div>
              <Button disabled={!user || user?.email===seller?.email || role!='customer'||quantity===0} label={quantity>0?'purchase':'out of stock'}  onClick={() => setIsOpen(true)}/>
            </div>
          </div>
          <hr className='my-6' />

          <PurchaseModal plant={plant} refetch={refetch} closeModal={closeModal} isOpen={isOpen} />
        </div>
      </div>
      </Container>
       </>
    );
};

export default PlantDetails;