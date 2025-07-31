import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure/useAxiosSecure';

import Card from '../../HomePage/Card/Card';
import Container from '../../Shared/Container/Container';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';
import { Helmet } from 'react-helmet-async';

const Allplants = () => {
  const axiosSecure = useAxiosSecure();

  const { data: plants = [], isLoading, error } = useQuery({
    queryKey: ['allPlants'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('http://localhost:5000/plants');
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  if (error) return <div>Error loading plants</div>;

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
