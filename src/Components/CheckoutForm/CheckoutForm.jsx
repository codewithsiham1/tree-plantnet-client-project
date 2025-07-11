import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import './Styles/Common.css';
import Button from '../../Shared/Button/Button';
import useAxiosSecure from '../../Hooks/useAxiosSecure/useAxiosSecure';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const CheckoutForm = ({closeModal,purchaseInfo,refetch,totalQuantity}) => {
    const [clientSecret,setClientSecret]=useState('')
    const [processing,setProcessing]=useState(false)
    const stripe = useStripe();
    const navigate=useNavigate()
    const elements = useElements();
    const axiosSecure=useAxiosSecure()
  useEffect(()=>{
 getpaymentIntent()

  },[purchaseInfo])
  console.log(clientSecret)
  const getpaymentIntent=async()=>{
    try{
const {data}= await axiosSecure.post('/create-payment',{quantity:purchaseInfo?.quantity,plantId:purchaseInfo?.plantId})
setClientSecret(data.clientSecret);
    }catch(error){
        console.log(error)
    }
    
 
  }
    const handleSubmit = async (event) => {
      setProcessing(true)
      // Block native form submission.
      event.preventDefault();
  
      if (!stripe || !elements) {
        // Stripe.js has not loaded yet. Make sure to disable
        // form submission until Stripe.js has loaded.
        return;
      }
  
      // Get a reference to a mounted CardElement. Elements knows how
      // to find your CardElement because there can only ever be one of
      // each type of element.
      const card = elements.getElement(CardElement);
  
      if (card == null) {
        setProcessing(false)
        return;
      }
  
      // Use your card Element with other Stripe.js APIs
      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card,
      
      });
  
      if (error) {
        setProcessing(false)
       return console.log('[error]', error);
        
      }
       else {
        console.log('[PaymentMethod]', paymentMethod);
      }
      // confirm payment
    const {paymentIntent}=await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: card,
      billing_details: {
        name: purchaseInfo?.customer?.name?.trim() || 'Unknown User',
        email: purchaseInfo?.customer?.email?.trim() || 'noemail@unknown.com',
      },
    },
  })
  if(paymentIntent.status==='succeeded'){
try{
  // save data in db
  await axiosSecure.post('/order',{...purchaseInfo,transactionId:paymentIntent?.id,})
  // decrase qunatity form plant collection
await axiosSecure.patch(`/plants/quantity/${purchaseInfo?.plantId}`,{ quantityToUpdate: totalQuantity,status:'decrease' })

  toast.success('order successfull')
  refetch()
  navigate('/dashboard/my-orders')
}catch(err){
console.log(err)
}finally{
  setProcessing(false)
  closeModal()
}
  }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
          {/* button */}
                          <div className='mt-3 flex justify-around gap-3'>
                            <Button disabled={!stripe ||!clientSecret || processing} type='submit' label={`Pay:${purchaseInfo?.price}$`}/>
                            <Button outline={true} onClick={closeModal} label={'Cancel'}/>
                          </div>
      
      </form>
    );
};

export default CheckoutForm;