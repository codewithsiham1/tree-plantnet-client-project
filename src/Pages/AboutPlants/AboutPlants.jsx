import React from 'react';
import image1 from "../../assets/images/cms-banner-1.jpg";
import Container from '../../Shared/Container/Container';
import waterimage from "../../assets/images/watering-plants.png";
import plantpotimage from "../../assets/images/plant.png";
import planetec from "../../assets/images/plant-pot.png";


const AboutPlants = () => {
  const features = [
    {
      title: "Plant Watering",
      description: "Check the soil before watering to keep plants healthy.",
      icon: waterimage,
    },
    {
      title: "Potted Plant",
      description: "Perfect for decorating any indoor or outdoor space.",
      icon: plantpotimage,
    },
    {
      title: "Plant Ecology",
      description: "Understanding how plants interact with their environment.",
      icon: planetec,
    },
  ];

  return (
    <>
   
      <Container>
        <div className="mt-12 lg:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-16 items-center">
          {/* Left Image */}
          <div className="overflow-hidden rounded-xl shadow-lg">
            <img
              src={image1}
              alt="About Plants"
              className="w-full h-64 sm:h-80 md:h-[400px] object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Right Text Section */}
          <div className="space-y-5 px-2 sm:px-4 md:px-0">
            <h2 className="text-[#2b6e42] text-base sm:text-lg font-semibold uppercase tracking-wide">
              About Plants
            </h2>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 leading-snug">
              We Offer Landscape <br /> and Tree Plantation
            </h3>

            <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
              Plants are more than just greenery—they are life-enhancing companions
              that bring beauty, balance, and freshness into our daily spaces. Whether
              placed in your living room, office desk, or garden, plants help purify the
              air, reduce stress, and create a calming environment.
            </p>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-4">
              {features.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="w-12 h-12 flex-shrink-0"
                  />
                  <div>
                    <h4 className="text-md font-semibold text-gray-800">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default AboutPlants;
