import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import Card from '../../HomePage/Card/Card';
import Container from '../../Shared/Container/Container';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';
import { Helmet } from 'react-helmet-async';

const Allplants = () => {
  const { data: plants = [], isLoading } = useQuery({
    queryKey: ['allPlants'],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/plants`);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <Helmet>
        <title>PlantNet || All Plants</title>
      </Helmet>

      <Container>
        <div className="text-center py-10 space-y-2">
          <h3 className="text-[#2b6e42] text-xl font-semibold">All Products</h3>
          <h2 className="text-3xl font-bold">Explore Our Green Collection</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
          {plants.map((plant) => (
            <Card key={plant._id} plant={plant} showRating={true} />
          ))}
        </div>
      </Container>
    </>
  );
};

export default Allplants;
