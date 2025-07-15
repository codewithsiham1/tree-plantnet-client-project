import React from 'react';
import image1 from "../../assets/images/naturalization_10568027.png";
import image2 from "../../assets/images/farming_10531348.png";
import image3 from "../../assets/images/plant_7003130.png";
import image4 from "../../assets/images/plants.png";

const ServicesCard = () => {
  const services = [
    {
      title: 'Pick Your Plant',
      description: 'Choose from a wide variety of indoor & outdoor plants.',
      icon: (
        <img
          src={image1}
          alt="Pick Your Plant"
          className="w-10 h-10 md:w-12 md:h-12 filter brightness-0 saturate-100 invert-39 sepia-73 saturate-641 hue-rotate-69 brightness-94 contrast-92"
        />
      ),
    },
    {
      title: 'Choose a Pot Color',
      description: 'Select from a variety of stylish pot designs & colors.',
      icon: (
        <img
          src={image2}
          alt="Choose Pot Color"
          className="w-10 h-10 md:w-12 md:h-12 filter brightness-0 saturate-100 invert-39 sepia-73 saturate-641 hue-rotate-69 brightness-94 contrast-92"
        />
      ),
    },
    {
      title: 'Have it Shipped',
      description: 'We deliver right to your doorstep with care.',
      icon: (
        <img
          src={image3}
          alt="Have it Shipped"
          className="w-10 h-10 md:w-12 md:h-12 filter brightness-0 saturate-100 invert-39 sepia-73 saturate-641 hue-rotate-69 brightness-94 contrast-92"
        />
      ),
    },
    {
      title: 'Watch It Grow',
      description: 'Take care of your plant and enjoy its growth!',
      icon: (
        <img
          src={image4}
          alt="Watch It Grow"
          className="w-10 h-10 md:w-12 md:h-12 filter brightness-0 saturate-100 invert-39 sepia-73 saturate-641 hue-rotate-69 brightness-94 contrast-92"
        />
      ),
    },
  ];

  return (
    <section className="py-14 px-4 md:px-8 lg:px-16 bg-white text-center">
      <h3 className="text-[#2b6e42] font-medium text-base md:text-lg mb-2">What We Do</h3>
      <h2 className="text-2xl md:text-4xl font-bold mb-10">OUR SERVICES</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center space-y-4 hover:shadow-xl p-4 rounded-xl transition-all duration-300"
          >
            <div className="w-20 h-20 flex items-center justify-center rounded-full shadow-md transition-all duration-300 hover:bg-lime-500">
              {service.icon}
            </div>
            <h4 className="text-base md:text-lg font-semibold">{service.title}</h4>
            <p className="text-sm text-gray-600 max-w-xs">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesCard;
