import { Helmet } from 'react-helmet-async'
import coverImg from '../../assets/images/cover.jpg'
import Useauth from '../../Hooks/Useauth'
import Userole from '../../Hooks/Userole/Userole'
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner'
import { useState } from 'react'
import Updateprofile from '../Form/Updateprofile/Updateprofile'
import ChangePasswordForm from '../Form/ChangePasswordForm/ChangePasswordForm'

const Profile = () => {
  const [showModal, setshowModal] = useState(false)
  const [passwordShowModal, setPasswordShowModal] = useState(false)
  const { user } = Useauth()
  const [role, isLoading] = Userole()
  if (isLoading) return <LoadingSpinner />

  return (
    <div className='min-h-screen flex justify-center items-center p-4 bg-gray-50'>
      <Helmet>
        <title>Profile</title>
      </Helmet>

      <div className='bg-white shadow-lg rounded-2xl w-full max-w-4xl md:w-4/5 lg:w-3/5 overflow-hidden'>
        <img
          alt='cover photo'
          src={coverImg}
          className='w-full h-40 sm:h-52 md:h-56 object-cover rounded-t-2xl'
        />
        <div className='flex flex-col items-center justify-center p-4 -mt-16'>
          <a href='#' className='relative block'>
            <img
              alt='profile'
              src={user?.photoURL}
              className='mx-auto object-cover rounded-full h-20 w-20 sm:h-24 sm:w-24 border-4 border-white shadow-md'
            />
          </a>

          <p className='mt-2 px-3 py-1 text-xs sm:text-sm text-white bg-lime-500 rounded-full'>
            {role}
          </p>

          <p className='mt-2 text-sm sm:text-lg font-semibold text-gray-800'>
            User Id: <span className='font-normal'>{user?.uid}</span>
          </p>

          <div className='w-full px-4 sm:px-10 mt-6'>
            <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0 text-gray-700 text-sm sm:text-base'>
              <div className='flex flex-col'>
                <span className='uppercase text-xs sm:text-sm text-gray-500'>Name</span>
                <span className='font-bold text-lg sm:text-xl text-gray-900'>{user?.displayName}</span>
              </div>
              <div className='flex flex-col'>
                <span className='uppercase text-xs sm:text-sm text-gray-500'>Email</span>
                <span className='font-bold text-lg sm:text-xl text-gray-900'>{user?.email}</span>
              </div>
            </div>

            <div className='mt-6 flex flex-col sm:flex-row sm:justify-start sm:space-x-4 space-y-4 sm:space-y-0'>
              <button
                onClick={() => setshowModal(true)}
                className='bg-lime-500 hover:bg-lime-700 text-black px-8 py-2 rounded-lg font-semibold transition'
              >
                Update Profile
              </button>
              {showModal && <Updateprofile user={user} setshowModal={setshowModal} />}

              <button
                onClick={() => setPasswordShowModal(true)}
                className='bg-lime-500 hover:bg-lime-700 text-black px-6 py-2 rounded-lg font-semibold transition'
              >
                Change Password
              </button>
              {passwordShowModal && <ChangePasswordForm user={user} setshowModal={setPasswordShowModal} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
