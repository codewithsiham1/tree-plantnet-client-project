import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import image from "../../assets/images/male-hands-cutting-bushes-with-big-scissors.jpg";

const AboutUs = () => {
  return (
    <>
      <Helmet>
        <title>PlantNet || About Us</title>
      </Helmet>

      <div>
        {/* ✅ Banner Section */}
        <div className='relative'>
          <img className='w-full h-60 sm:h-72 md:h-96 object-cover' src={image} alt="About Banner" />
          <div className='absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center px-4'>
            <h1 className='text-2xl sm:text-3xl md:text-5xl font-bold'>About Us</h1>
            <p className='mt-2 text-sm md:text-base'>
              <Link to="/" className='hover:underline text-green-300'>Home</Link> &nbsp;/&nbsp; About Us
            </p>
          </div>
        </div>

        {/* ✅ About Content Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2b6e42]">Who We Are</h2>
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
            Welcome to <span className="font-semibold text-[#2b6e42]">PlantNet</span>, your trusted destination for premium quality indoor and outdoor plants.
            Our mission is to bring nature closer to you and create greener homes, one plant at a time.
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold text-[#2b6e42]">Our Vision</h2>
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
            We envision a world where every home has a green companion — purifying the air, soothing the soul,
            and beautifying the environment. Through sustainability and love for nature, we aim to inspire a
            plant-loving community.
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold text-[#2b6e42]">Why Choose Us?</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm sm:text-base space-y-2">
            <li>Wide variety of curated indoor & outdoor plants</li>
            <li>Expert tips on plant care and maintenance</li>
            <li>Fast and safe delivery with quality assurance</li>
            <li>Eco-friendly packaging & support for green initiatives</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
