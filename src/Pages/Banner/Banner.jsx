import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';

import Banner1 from "../../assets/images/sample-1.jpg";
import Banner2 from "../../assets/images/sample-2.jpg";

import 'swiper/css';
import 'swiper/css/pagination';
import '../Bannercss/Banner.css';

const Banner = () => {
  const [slideKey, setSlideKey] = useState(0);

  return (
    <div className="relative z-0">
      <Swiper
        className="mySwiper swiper-h"
        spaceBetween={30}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        onSlideChange={() => setSlideKey(prev => prev + 1)}
      >
        {/* Common slide structure function */}
        {[Banner1, Banner2].map((img, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full rounded-xl overflow-hidden h-[250px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
              <img src={img} alt={`Banner ${index + 1}`} className="w-full h-full object-cover" />

              <motion.div
                key={slideKey + index}
                initial={{ x: 150, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              className={`
  absolute inset-0 flex flex-col
  items-start justify-start z-10 text-left
  lg:items-start lg:text-left lg:flex-row md:flex-row md:items-start md:text-left
  text-white px-4 lg:py-6 md:py-6
  md:space-y-4 lg:space-y-0 lg:space-x-10
  lg:ml-[47rem] ml-[13rem] md:ml-[25rem]
`}
              >
                <div className="max-w-full md:max-w-lg">
           <h3
  style={{ display: 'inline-block', transform: 'skewX(-25deg)' }}
  className="text-[#1d4d2b] bg-white bg-opacity-70 px-1 py-1 rounded-md text-[10px] sm:text-xs md:text-base w-fit mx-auto lg:mx-0"
>
  {index === 0 ? "Hot Sale 50% Discount" : "Hot Sale 40% Discount"}
</h3>

<h2 className="font-bold leading-tight text-black text-[10px] sm:text-base md:text-3xl lg:text-5xl">
  {index === 0 ? "Green Indoor Plant" : "Colorful Plant Pots"}
</h2>
<h2 className="font-bold leading-tight text-black text-[10px] sm:text-base md:text-3xl lg:text-5xl">
  For Home Decor
</h2>

<p className="mb-1 sm:mb-1 md:mb-6 text-[8px] sm:text-sm md:text-base max-w-full text-black bg-white bg-opacity-70 p-1 sm:p-2 rounded">
  {index === 0
    ? "Want to reconnect with nature? PlantNet is more than just a marketplace – it’s a community of plant lovers where you can buy, sell, and share your green passion. Join us in creating a greener."
    : "Buying and selling plants has never been this easy! Whether you’re selling your nurtured plants or looking for the perfect one to brighten up your space – PlantNet has you covered."}
</p>

<button className="bg-[#1d4d2b] hover:bg-yellow-600 text-white py-1 px-3 sm:px-4 md:px-6 rounded-md max-w-max text-[8px] sm:text-sm md:text-base">
  Shop Now
</button>
                </div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
