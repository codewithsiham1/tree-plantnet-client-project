import { BsFingerprint } from 'react-icons/bs'
import { GrUserAdmin } from 'react-icons/gr'

import { useState } from 'react'

import MenuItem from '../MenuItem/MenuItem'
import BecomeSellerModal from '../../Modal/BecomeSellerModal/BecomeSellerModal'
import useAxiosSecure from '../../Hooks/useAxiosSecure/useAxiosSecure'
import Useauth from '../../Hooks/Useauth'
import { toast } from 'react-toastify'
const CustomerMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
 const axiosSecure=useAxiosSecure()
 const {user}=Useauth()
  const closeModal = () => {
    setIsOpen(false)
  }
const requesthandler=async()=>{
try{
// send a request to server
const {data}= await axiosSecure.patch(`/user/${user?.email}`)
console.log(data)
toast.success('Successfully Applyied to Become a Seller')
}catch (err){
  console.log(err.response.data)
  toast.success(err.response.data)
}
finally{
  closeModal()
}
}
  return (
    <>
      <MenuItem icon={BsFingerprint} label='My Orders' address='my-orders' />

      <div
        onClick={() => setIsOpen(true)}
        className='flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer'
      >
        <GrUserAdmin className='w-5 h-5' />

        <span className='mx-4 font-medium'>Become A Seller</span>
      </div>

      <BecomeSellerModal requesthandler={requesthandler} closeModal={closeModal} isOpen={isOpen} />
    </>
  )
}

export default CustomerMenu