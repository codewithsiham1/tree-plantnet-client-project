import { Helmet } from 'react-helmet-async';
import CustomerOrderDataRow from '../Form/CustomerOrderDataRow/CustomerOrderDataRow';
import Useauth from '../../Hooks/Useauth';

import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure/useAxiosSecure';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';

const MyOrders = () => {
  const { user } = Useauth();
  const axiosSecure = useAxiosSecure();

  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['orders', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/customer-orders/${user?.email}`);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <Helmet>
        <title>My Orders</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center text-green-800">
          My Orders ({orders.length})
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 bg-white shadow rounded-lg text-sm">
            <thead className="bg-green-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Image</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Price</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Quantity</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"> </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {orders.map((orderData) => (
                <CustomerOrderDataRow
                  key={orderData._id}
                  orderData={orderData}
                  refetch={refetch}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MyOrders;
