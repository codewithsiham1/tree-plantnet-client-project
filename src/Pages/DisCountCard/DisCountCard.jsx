import React from 'react';
import image1 from "../../assets/images/cms-banner-2.jpg";
import image2 from "../../assets/images/cms-banner-3.jpg";
import Container from '../../Shared/Container/Container';
import { useNavigate } from 'react-router-dom';

const DisCountCard = () => {
  const navigate=useNavigate()
  const handleShopnow=()=>{
    navigate('/all-plant')
  }
  return (
    <Container>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-10'>

        {/* image1 */}
        <div className='relative w-full h-[200px] rounded-xl overflow-hidden group'>
          <img
            className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
            src={image1}
            alt="Discount Banner 1"
          />
          <div className='absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-start p-8 text-white'>
            <h1 className='text-3xl font-bold mb-2'>Flat 20% Discount</h1>
            <p className='mb-4 text-lg'>The Elliot Modular Planters</p>
            <button onClick={handleShopnow} className='btn bg-[#2b6e42] hover:bg-lime-600 text-white px-5 py-2 rounded'>Shop Now</button>
          </div>
        </div>

        {/* image2 */}
        <div className='relative w-full h-[200px] rounded-xl overflow-hidden group'>
          <img
            className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
            src={image2}
            alt="Discount Banner 2"
          />
          <div className='absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-start p-8 text-white'>
            <h1 className='text-3xl font-bold mb-2'>Were Spring Plant</h1>
            <p className='text-2xl font-bold mb-4 text-white'>Cloud Farm Peace Lily Plant</p>
            <button onClick={handleShopnow} className='btn bg-[#2b6e42] hover:bg-lime-600 text-white px-5 py-2 rounded'>Shop Now</button>
          </div>
        </div>

      </div>
    </Container>
  );
};

export default DisCountCard;
