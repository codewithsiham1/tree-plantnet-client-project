import React from 'react';
import image1 from "../../assets/images/sub-banner-1.jpg";
import image2 from "../../assets/images/sub-banner-2.jpg";
import { useNavigate } from 'react-router-dom';

const SupperBanner = () => {
  const navigate=useNavigate()
  const handleshopnow=()=>{
    navigate('/all-plant')
  }
  const banners = [
    {
      image: image1,
      title: "Farm Snake Plant",
      subtitle: "Greenery Nursery\nSnake Plant",
    },
    {
      image: image2,
      title: "Fresh Indoor Plant",
      subtitle: "Nature's Best\nAir Purifier",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-10 py-10">
      {banners.map((banner, index) => (
        <div
          key={index}
          className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] rounded-xl overflow-hidden"
        >
          <img
            className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
            src={banner.image}
            alt={`Banner ${index + 1}`}
          />
          <div
            className="absolute inset-0 flex flex-col justify-center items-start md:items-start lg:items-start ml-[12rem]  lg:[11rem] md:ml-[10rem] space-y-3 
                       text-left pl-4 sm:pl-10 md:pl-20 lg:pl-40"
          >
            <h3 className="text-[12px] sm:text-[10px] md:text-xl font-semibold text-black">
              {banner.title}
            </h3>
            <p className="text-[8px]sm:text-[8px] md:text-2xl font-bold text-black whitespace-pre-line">
              {banner.subtitle}
            </p>
            <button onClick={handleshopnow} className="bg-[#2b6e42] text-white px-5 py-2 rounded hover:bg-lime-700 transition text-sm sm:text-base">
              Shop Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SupperBanner;
