import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { Fragment, useState } from 'react'

import Useauth from '../Hooks/Useauth'
import { toast } from 'react-toastify'

import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from '../Components/CheckoutForm/CheckoutForm'


const stripePromise=loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
const PurchaseModal = ({ closeModal, isOpen,plant,refetch }) => {
   const {user}=Useauth()
   const {name,category,quantity,price,_id,seller}=plant ||{}
 const[totalQuantity,setTotalQuantity]=useState(1)
 const[totalprice,settotalPrice]=useState(price)

 const [purchaseInfo,setPurchaseInfo]=useState({
  customer:{
    name:user?.displayName,
    email:user?.email,
    image:user?.photoURL
  },
  plantId:_id,
  price:totalprice,
  quantity:totalQuantity,
  seller:seller?.email,
  address:'',
  status:'pending',
 })
 
  
  const handletotalQuantity=value=>{
    if(value>quantity){
      setTotalQuantity(quantity)
      return toast.error('Quantity Exciets available stock !')
    }
    if(value<0){
           setTotalQuantity(1)
      return toast.error('Quantity cannot be less then 1')
    }
    setTotalQuantity(value)
    settotalPrice(value*price)
    setPurchaseInfo(prv=>{
                    return {...prv,quantity:value,price:value*price}
                  })
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </TransitionChild>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <DialogPanel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                <DialogTitle
                  as='h3'
                  className='text-lg font-medium text-center leading-6 text-gray-900'
                >
                  Review Info Before Purchase
                </DialogTitle>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>Plant: {name}</p>
                </div>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>Category: {category}</p>
                </div>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>Customer: {user?.displayName}</p>
                </div>

                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>Price: $ {price}</p>
                </div>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>Available Quantity: {quantity}</p>
                  {/* quantity input field */}
                       <div className='space-x-2 text-sm mt-2'>
                <label htmlFor='quantity' className=' text-gray-600'>
                  Quantity:
                </label>
                <input
               
                value={totalQuantity}
                onChange={(e)=>handletotalQuantity(parseInt(e.target.value))}
                  className=' p-2 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                  name='quantity'
                  id='quantity'
                  type='number'
                  placeholder='Available quantity'
                  required
                />
              </div>
                  {/* addreess input field */}
                   <div className='space-x-2 text-sm mt-2'>
                <label htmlFor='address' className=' text-gray-600'>
                  Address:
                </label>
                <input
                
                  className=' p-2 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                  name='address'
                  id='address'
                  onChange={(e)=>setPurchaseInfo(prv=>{
                    return {...prv,address:e.target.value}
                  })}
                  type='text'
                  placeholder='Shipping Address'
                  required
                />
              </div>
              {/* checkout form */}
              <Elements stripe={stripePromise}>
                {/* form components */}
                <CheckoutForm totalQuantity={totalQuantity} closeModal={closeModal} purchaseInfo={purchaseInfo} refetch={refetch}/>
              </Elements>
                
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default PurchaseModal