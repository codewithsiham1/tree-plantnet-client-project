import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '../../Shared/Container/Container';
import Heading from '../../Shared/Heading/Heading';
import PurchaseModal from '../../Modal/PurchaseModal';
import Button from "../../Shared/Button/Button";
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Userole from '../../Hooks/Userole/Userole';
import Useauth from '../../Hooks/Useauth';

const PlantDetails = () => {
  const [role] = Userole();
  const { user } = Useauth();
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  const { data: plant = {}, isLoading, refetch } = useQuery({
    queryKey: ['plant', id],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/plants/${id}`);
      return data;
    }
  });

  if (isLoading) return <div className="text-center py-20">Loading...</div>;

  const { name, category, quantity, price, image, description, seller } = plant || {};

  const closeModal = () => setIsOpen(false);

  return (
    <>
      <Container>
        <Helmet>
          <title>PlantNet || Plant Details</title>
        </Helmet>

        <div className="flex flex-col lg:flex-row gap-12 p-6 sm:p-10 md:p-16 max-w-7xl mx-auto">
          {/* Image Section */}
          <div className="flex-1 rounded-xl overflow-hidden shadow-lg max-h-[400px] sm:max-h-[450px] lg:max-h-[600px]">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          {/* Details Section */}
          <div className="flex-1 flex flex-col">
            <Heading
              title={name}
              subtitle={`Category: ${category}`}
              center={false}
            />
            <hr className="my-6" />
            
            <p className="text-neutral-600 text-base sm:text-lg leading-relaxed flex-grow">
              {description}
            </p>

            <hr className="my-6" />

            <div className="flex items-center gap-3 mb-6">
              <p className="font-semibold text-gray-700">Seller: {seller?.name}</p>
              {seller?.image && (
                <img
                  src={seller.image}
                  alt="Seller Avatar"
                  className="w-10 h-10 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
              )}
            </div>

            <hr className="my-6" />

            <p className="text-neutral-600 text-lg mb-6">Quantity: {quantity}</p>

            <hr className="my-6" />

            <div className="flex justify-between items-center">
              <p className="text-3xl font-bold text-gray-700">Price: ${price}</p>
              <Button
                disabled={
                  !user ||
                  user?.email === seller?.email ||
                  role === 'admin' ||
                  quantity === 0
                }
                label={quantity > 0 ? 'Purchase' : 'Out of Stock'}
                onClick={() => setIsOpen(true)}
              />
            </div>
          </div>
        </div>

        <PurchaseModal
          plant={plant}
          refetch={refetch}
          closeModal={closeModal}
          isOpen={isOpen}
        />
      </Container>
    </>
  );
};

export default PlantDetails;
