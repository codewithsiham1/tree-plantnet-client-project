import { Helmet } from 'react-helmet-async'
import UserDataRow from '../Form/UserDataRow/UserDataRow'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../Hooks/useAxiosSecure/useAxiosSecure'
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner'
import Useauth from '../../Hooks/Useauth'

const ManageUsers = () => {
  const { user } = Useauth()
  const axiosSecure = useAxiosSecure()

  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ['users', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/all-user/${user?.email}`)
      return data
    }
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <>
      <Helmet>
        <title>Manage Users</title>
      </Helmet>

      <div className="container mx-auto px-2 sm:px-4 md:px-8 py-6">
        <div className="overflow-x-auto w-full">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-[600px] w-full leading-normal text-[10px] sm:text-xs md:text-sm">
              <thead>
                <tr>
                  <th className="px-2 py-1 bg-white border-b border-gray-200 text-gray-800 text-left uppercase font-semibold tracking-wide">
                    Email
                  </th>
                  <th className="px-2 py-1 bg-white border-b border-gray-200 text-gray-800 text-left uppercase font-semibold tracking-wide">
                    Role
                  </th>
                  <th className="px-2 py-1 bg-white border-b border-gray-200 text-gray-800 text-left uppercase font-semibold tracking-wide">
                    Status
                  </th>
                  <th className="px-2 py-1 bg-white border-b border-gray-200 text-gray-800 text-left uppercase font-semibold tracking-wide">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map(userData => (
                  <UserDataRow
                    key={userData?._id}
                    userData={userData}
                    refetch={refetch}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default ManageUsers
