import { useContext, useState } from 'react'
import { GrLogout } from 'react-icons/gr'
import { FcSettings } from 'react-icons/fc'
import { AiOutlineBars } from 'react-icons/ai'





import { Link, useNavigate } from 'react-router-dom'


import logo from '../../assets/images/logo-flat.png'

import Useauth from '../../Hooks/Useauth'
import AdminMenu from '../AdminMenu/AdminMenu'
import SellerMenu from '../SellerMenu/SellerMenu'
import CustomerMenu from '../CustomerMenu/CustomerMenu'
import MenuItem from '../MenuItem/MenuItem'
import Userole from '../../Hooks/Userole/Userole'
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner'
import { Authcontext } from '../../Provider/Authprovider'
const Sidebar = () => {
  const {handlelogOut}=useContext(Authcontext)
  const navigate=useNavigate()
  const [isActive, setActive] = useState(false)
const [role,isLoading]=Userole()
// handlelogout
const handleLogoutClick=async()=>{
  const success=await handlelogOut()
  if(success){
    navigate('/login')
  }
}
  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive)
  }
  if (isLoading) {
  return <div className='p-5'><LoadingSpinner/></div>
}
  return (
    <>
      {/* Small Screen Navbar */}
      <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
        <div>
          <div className='block cursor-pointer p-4 font-bold'>
            <Link to='/'>
              <img
                // className='hidden md:block'
                src={logo}
                alt='logo'
                width='100'
                height='100'
              />
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
        >
          <AiOutlineBars className='h-5 w-5' />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && '-translate-x-full'
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-lime-100 mx-auto'>
              <Link to='/'>
                <img
                  // className='hidden md:block'
                  src={logo}
                  alt='logo'
                  width='100'
                  height='100'
                />
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className='flex flex-col justify-between flex-1 mt-6'>
            <nav>
              {/*  Menu Items */}
              {role === 'customer' && <CustomerMenu />}
              {role === 'seller' && <SellerMenu />}
              {role === 'admin' && <AdminMenu />}
            </nav>
          </div>
        </div>

        <div>
          <hr />

          <MenuItem
            icon={FcSettings}
            label='Profile'
            address='/dashboard/profile'
          />
          <button
            onClick={handleLogoutClick}
            className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'
          >
            <GrLogout className='w-5 h-5' />

            <span className='mx-4 font-medium'>Logout</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default Sidebar