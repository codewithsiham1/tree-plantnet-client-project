import {
  Dialog,
  Transition,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from '@headlessui/react'
import { Fragment, useState } from 'react'

import Useauth from '../Hooks/Useauth'
import { toast } from 'react-toastify'

import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from '../Components/CheckoutForm/CheckoutForm'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

const PurchaseModal = ({ closeModal, isOpen, plant, refetch }) => {
  const { user } = Useauth()
  const { name, category, quantity, price, _id, seller } = plant || {}
  const [totalQuantity, setTotalQuantity] = useState(1)
  const [totalPrice, setTotalPrice] = useState(price)

  const [purchaseInfo, setPurchaseInfo] = useState({
    customer: {
      name: user?.displayName,
      email: user?.email,
      image: user?.photoURL,
    },
    plantId: _id,
    price: totalPrice,
    quantity: totalQuantity,
    seller: seller?.email,
    address: '',
    status: 'pending',
  })

  const handleTotalQuantity = (value) => {
    if (value > quantity) {
      setTotalQuantity(quantity)
      return toast.error('Quantity exceeds available stock!')
    }
    if (value < 1 || isNaN(value)) {
      setTotalQuantity(1)
      return toast.error('Quantity cannot be less than 1')
    }
    setTotalQuantity(value)
    setTotalPrice(value * price)
    setPurchaseInfo((prev) => ({
      ...prev,
      quantity: value,
      price: value * price,
    }))
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-30' />
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
              <DialogPanel className='w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 sm:p-8 text-left align-middle shadow-xl transition-all'>
                <DialogTitle
                  as='h3'
                  className='text-lg sm:text-xl font-semibold text-center text-gray-900 mb-6'
                >
                  Review Info Before Purchase
                </DialogTitle>

                <div className='space-y-4 text-gray-700 text-sm sm:text-base'>
                  <p><strong>Plant:</strong> {name}</p>
                  <p><strong>Category:</strong> {category}</p>
                  <p><strong>Customer:</strong> {user?.displayName}</p>
                  <p><strong>Price:</strong> $ {price}</p>
                  <p><strong>Available Quantity:</strong> {quantity}</p>

                  {/* Quantity Input */}
                  <div className='flex flex-col sm:flex-row sm:items-center gap-2'>
                    <label htmlFor='quantity' className='w-full sm:w-auto text-gray-600'>
                      Quantity:
                    </label>
                    <input
                      id='quantity'
                      name='quantity'
                      type='number'
                      min={1}
                      max={quantity}
                      value={totalQuantity}
                      onChange={(e) => handleTotalQuantity(parseInt(e.target.value))}
                      className='w-full sm:w-24 p-2 border border-lime-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 text-gray-800'
                      required
                    />
                  </div>

                  {/* Address Input */}
                  <div className='flex flex-col sm:flex-row sm:items-center gap-2'>
                    <label htmlFor='address' className='w-full sm:w-auto text-gray-600'>
                      Address:
                    </label>
                    <input
                      id='address'
                      name='address'
                      type='text'
                      placeholder='Shipping Address'
                      onChange={(e) =>
                        setPurchaseInfo((prev) => ({ ...prev, address: e.target.value }))
                      }
                      className='w-full p-2 border border-lime-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 text-gray-800'
                      required
                    />
                  </div>
                </div>

                {/* Checkout Form */}
                <div className='mt-6'>
                  <Elements stripe={stripePromise}>
                    <CheckoutForm
                      totalQuantity={totalQuantity}
                      closeModal={closeModal}
                      purchaseInfo={purchaseInfo}
                      refetch={refetch}
                    />
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
