import React from 'react';
import Card from '../Card/Card';
import Container from '../../Shared/Container/Container';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

const Plants = () => {
  const { data: plants, isLoading } = useQuery({
    queryKey: ['plants'],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/plants`);
      return data;
    }
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <Container>
      {/* Section Title */}
      <div className="pt-8 text-center space-y-2">
        <h3 className="text-[#2b6e42] text-xl font-semibold">New Product</h3>
        <h2 className="text-3xl font-bold">Latest Product</h2>
      </div>

      {/* Swiper Slider */}
      {plants && plants.length > 0 ? (
        <div className="pt-12">
          <Swiper
            spaceBetween={20}              // spacing between slides
            slidesPerView={1}              // default slides per view
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },   // small screens
              768: { slidesPerView: 3, spaceBetween: 25 },   // tablets
              1024: { slidesPerView: 4, spaceBetween: 30 },  // laptops
              1280: { slidesPerView: 5, spaceBetween: 35 },  // large desktops
            }}
            navigation
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
            className="mySwiper"
            style={{ paddingBottom: '3rem' }}  // enough space for pagination dots
          >
            {plants.map((plant) => (
              <SwiperSlide key={plant._id} className="flex justify-center">
                {/* flex justify-center centers the card within slide */}
                <Card plant={plant} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-8">No Data Found</p>
      )}
    </Container>
  );
};

export default Plants;
