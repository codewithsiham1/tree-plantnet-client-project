import PropTypes from 'prop-types'
import { useState } from 'react'
import DeleteModal from '../../../Modal/DeleteModal/DeleteModal'
import useAxiosSecure from '../../../Hooks/useAxiosSecure/useAxiosSecure'
import { toast } from 'react-toastify'

import ReviewModal from '../../../Modal/ReviewModal/ReviewModal'


const CustomerOrderDataRow = ({orderData,refetch}) => {
  const axiosSecure=useAxiosSecure()
  let [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false)
  const [showReviewModal,setShowReviewModal]=useState(false)
const {name,image,category,quantity,price,_id,status,plantId, review}=orderData
// handle order delete/cancel
const handledelete=async()=>{
  try{
// fetch delete request
await axiosSecure.delete(`/order/${_id}`)
 // increase qunatity form plant collection
await axiosSecure.patch(`/plants/quantity/${plantId}`,{ quantityToUpdate:quantity,status:'increase' })
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
// review button ad korbay
const isReviewEligible=(status?.toLowerCase()==='delivered'||status?.toLowerCase()==='in progress') && !review
  return (
   <tr>
  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
    <div className="flex items-center">
      <div className="flex-shrink-0">
        <div className="block relative">
          <img
            alt="profile"
            src={image}
            className="mx-auto object-cover rounded h-10 w-15"
          />
        </div>
      </div>
    </div>
  </td>

  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
    <p className="text-gray-900 whitespace-no-wrap">{name}</p>
  </td>

  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
    <p className="text-gray-900 whitespace-no-wrap">{category}</p>
  </td>

  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
    <p className="text-gray-900 whitespace-no-wrap">${price}</p>
  </td>

  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
    <p className="text-gray-900 whitespace-no-wrap">{quantity}</p>
  </td>

  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
    <p className="text-gray-900 whitespace-no-wrap">{status}</p>
  </td>

  {/* ✅ Separate cell for Review Button */}
  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
    {isReviewEligible && (
      <button
        onClick={() => setShowReviewModal(true)}
        className="bg-lime-600 text-white text-xs px-2 py-1 rounded hover:bg-lime-700 transition"
      >
        Write Review
      </button>
    )}
  </td>

  {/* ✅ Separate cell for Cancel button and modals */}
  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
    <button
      onClick={() => setIsOpen(true)}
      className="relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-lime-900 leading-tight"
    >
      <span className="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
      <span className="relative">Cancel</span>
    </button>

    <DeleteModal handledelete={handledelete} isOpen={isOpen} closeModal={closeModal} />

    {showReviewModal && (
      <ReviewModal
        plantId={plantId}
        orderId={_id}
        closeModal={() => setShowReviewModal(false)}
        refetch={refetch}
      />
    )}
  </td>
</tr>

  )
}

CustomerOrderDataRow.propTypes = {
  order: PropTypes.object.isRequired,
  refetch: PropTypes.func,
}

export default CustomerOrderDataRow