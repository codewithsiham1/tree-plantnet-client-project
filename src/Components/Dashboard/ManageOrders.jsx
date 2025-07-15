import { Helmet } from 'react-helmet-async'
import SellerOrderDataRow from '../Form/SellerOrderDataRow/SellerOrderDataRow'
import Useauth from '../../Hooks/Useauth'
import useAxiosSecure from '../../Hooks/useAxiosSecure/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner'

const ManageOrders = () => {
  const { user } = Useauth()
  const axiosSecure = useAxiosSecure()

  const { data: orders = [], isLoading, refetch } = useQuery({
    queryKey: ['orders', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure('/seller-orders')
      return data
    }
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <>
      <Helmet>
        <title>Manage Orders</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-semibold mb-6">Manage Orders</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-800">
                <th className="px-4 py-3 text-left font-medium">Name</th>
                <th className="px-4 py-3 text-left font-medium">Customer</th>
                <th className="px-4 py-3 text-left font-medium">Price</th>
                <th className="px-4 py-3 text-left font-medium">Quantity</th>
                <th className="px-4 py-3 text-left font-medium">Address</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Action</th>
              </tr>
            </thead>

            <tbody>
              {
                orders.map(orderData => (
                  <SellerOrderDataRow
                    key={orderData?._id}
                    orderData={orderData}
                    refetch={refetch}
                  />
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default ManageOrders
