import { Helmet } from 'react-helmet-async';
import PlantDataRow from '../PlantDataRow/PlantDataRow';
import Useauth from '../../Hooks/Useauth';
import useAxiosSecure from '../../Hooks/useAxiosSecure/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';
import { useEffect } from 'react';

const MyInventory = () => {
  const { user } = Useauth();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    console.log("User email:", user?.email);
  }, [user]);

  const { data: plants = [], isLoading, refetch } = useQuery({
    queryKey: ['plants'],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get('/plants/seller');
      return data;
    }
  });

  if (!user || isLoading) return <LoadingSpinner />;

  return (
    <>
      <Helmet>
        <title>My Inventory</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center text-green-700">
          My Inventory ({plants.length})
        </h2>

        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-green-100 text-xs uppercase text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left">Image</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Quantity</th>
                <th className="px-4 py-3 text-left">Delete</th>
                <th className="px-4 py-3 text-left">Update</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {plants.map((plant) => (
                <PlantDataRow key={plant._id} refetch={refetch} plant={plant} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MyInventory;
