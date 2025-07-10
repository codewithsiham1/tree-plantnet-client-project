import { Helmet } from 'react-helmet-async'
import PlantDataRow from '../PlantDataRow/PlantDataRow'
import Useauth from '../../Hooks/Useauth'
import useAxiosSecure from '../../Hooks/useAxiosSecure/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner'



const MyInventory = () => {
  const {user}=Useauth()  
  const axiosSecure=useAxiosSecure()
   const {data:plants=[],isLoading,refetch}=useQuery({
    queryKey:['plants'],
    enabled: !!user?.email,
    queryFn:async()=>{
   const {data}=await axiosSecure(`/plants/seller`)
   return data
    }
    })
    console.log("Orders data:", plants)
    if(!user || isLoading) return <LoadingSpinner></LoadingSpinner>
  return (
    <>
      <Helmet>
        <title>My Inventory</title>
      </Helmet>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-8'>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Image
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Name
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Category
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Price
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Quantity
                    </th>

                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Delete
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Update
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    plants.map(plant=><PlantDataRow key={plant._id} refetch={refetch} plant={plant}/>)
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyInventory