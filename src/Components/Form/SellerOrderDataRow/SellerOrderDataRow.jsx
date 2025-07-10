import PropTypes from 'prop-types'
import { useState } from 'react'
import DeleteModal from '../../../Modal/DeleteModal/DeleteModal'
import useAxiosSecure from '../../../Hooks/useAxiosSecure/useAxiosSecure'
import { toast } from 'react-toastify'

const SellerOrderDataRow = ({orderData,refetch}) => {
  const {name,customer,quantity,price,_id,status,address}=orderData || {}
  let [isOpen, setIsOpen] = useState(false)
  const [orderStatus, setOrderStatus] = useState(status)
  const closeModal = () => setIsOpen(false)
  const axiosSecure=useAxiosSecure()
// handle sellerorder delete/cancel
const handleDelete=async()=>{
  try{
// fetch delete request
await axiosSecure.delete(`/order/${_id}`)
 // increase qunatity form plant collection
await axiosSecure.patch(`/plants/quantity/${_id}`,{ quantityToUpdate:quantity,status:'increase' })
// call refetch to ferresh
refetch()
toast.success('Order Cancled Confirmed')
  }catch (err){
    console.log(err)
    toast.error(err.response.data)
  }
  finally{
    closeModal()
  }
}
// handle status chance
const handleStatus=async(newStatus)=>{
  if(orderStatus===newStatus)return
 
  // patch request to server
  try{

 // increase qunatity form plant collection
await axiosSecure.patch(`/orders/${_id}`,{status:newStatus, })
// call refetch to ferresh
setOrderStatus(newStatus)
refetch()
toast.success('Status Updated Successfully')
  }catch (err){
    console.log(err)
    toast.error(err.response.data)
  }
 
}

  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{name}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{customer?.email}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>${price}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{quantity}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{address}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{status}</p>
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <div className='flex items-center gap-2'>
          <select
          defaultValue={orderStatus}
          onChange={(e)=>handleStatus(e.target.value)}
          disabled={orderStatus==='Delivered'}
            required
            className='p-1 border-2 border-lime-300 focus:outline-lime-500 rounded-md text-gray-900 whitespace-no-wrap bg-white'
            name='category'
          >
            <option value='Pending'>Pending</option>
            <option value='In Progress'>Start Processing</option>
            <option value='Delivered'>Deliver</option>
          </select>
          <button
            onClick={() => setIsOpen(true)}
            className='relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
          >
            <span
              aria-hidden='true'
              className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
            ></span>
            <span className='relative'>Cancel</span>
          </button>
        </div>
        <DeleteModal  handleDelete={handleDelete} isOpen={isOpen} closeModal={closeModal} />
      </td>
    </tr>
  )
}

SellerOrderDataRow.propTypes = {
  order: PropTypes.object,
  refetch: PropTypes.func,
}

export default SellerOrderDataRow