import React, { useEffect, useState } from 'react';
import { FcRating } from 'react-icons/fc';
import { Link } from 'react-router-dom';

const Card = ({ plant, showRating = false }) => {
  const { name, category, quantity, price, image, _id } = plant || {};
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/plants/${_id}`)
      .then(res => res.json())
      .then(data => {
        setAverageRating(data?.averageRating?.toFixed(1) || 0);
      })
      .catch(err => console.log(err));
  }, [_id]);

  return (
    <Link
      to={`/plant/${_id}`}
      className="w-full sm:w-[90%] md:w-[95%] lg:w-full mx-auto
                 bg-white shadow-md hover:shadow-xl transition rounded-xl p-4
                 flex flex-col gap-4"
    >
      {/* Image */}
      <div className="h-[220px] sm:h-[250px] md:h-[280px] w-full overflow-hidden rounded-lg">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Text Content */}
      <div className="space-y-1">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-600">Category: {category}</p>
        <p className="text-sm text-gray-600">Quantity: {quantity}</p>
        <p className="text-sm font-medium text-gray-700">Price: ${price}</p>

        {showRating && averageRating > 0 && (
          <div className="flex items-center gap-2 mt-2 text-sm">
            <div className="flex">
              {Array.from({ length: Math.floor(averageRating) }).map((_, i) => (
                <FcRating key={i} />
              ))}
            </div>
            <span className="text-gray-600">{averageRating}/5</span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default Card;
