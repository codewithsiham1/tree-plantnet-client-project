import React, { useEffect, useState } from 'react';
import Container from '../../Shared/Container/Container';
import Card from '../../HomePage/Card/Card';

// Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Swiper modules
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const PopularProduct = () => {
  const [popularPlants, setPopularPlants] = useState([]);

  useEffect(() => {
    const fetchPopularPlants = async () => {
      try {
        const res = await fetch('http://localhost:5000/popular-products');
        const data = await res.json();
        setPopularPlants(data); // ✅ ঠিক নাম ব্যবহার করা হয়েছে
      } catch (error) {
        console.error('Failed to fetch popular plants:', error);
      }
    };
    fetchPopularPlants();
  }, []);

  return (
    <Container>
      <div className="flex flex-col justify-center items-center mt-6 mb-10 px-4 sm:px-0">
        <h1 className="text-lg sm:text-xl font-semibold text-[#2b6e42]">Top Rated Products</h1>
        <p className="text-2xl sm:text-3xl font-bold text-black">Popular Products</p>
      </div>

      {/* Swiper Slider */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 25,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        }}
        className="pb-10"
      >
        {popularPlants.length > 0 ? (
          popularPlants.map((plant) => (
            <SwiperSlide key={plant._id} className="mb-8">
              <Card plant={plant} showRating={true} />
            </SwiperSlide>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No popular products found</p>
        )}
      </Swiper>
    </Container>
  );
};

export default PopularProduct;
