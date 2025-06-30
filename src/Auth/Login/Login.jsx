import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { Authcontext } from '../../Provider/Authprovider';
import { toast } from 'react-toastify';

const Login = () => {
  const {signIn}=useContext(Authcontext)
  const navigate=useNavigate()
  const handlelogin=(event)=>{
    event.preventDefault()
    const form=event.target
    const email=form.email.value;
    const password=form.password.value;
    signIn(email,password)
    .then((result)=>{
      const logeduser=result.user
         toast.success('Login successful!');
         navigate('/')
    })
  }
    return (
      <>
      <Helmet>
  <title>PlanNet|| Login Page</title>
</Helmet>
        <div className='flex justify-center items-center min-h-screen bg-white'>
            <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
              <div className='mb-8 text-center'>
            <h1 className='my-3 text-4xl font-bold'>Log In</h1>
            <p className='text-sm text-gray-400'> Sign in to access your account</p>
              </div>
              <form onSubmit={handlelogin} action="" noValidate='' className='space-y-6 ng-untouched ng-pristine ng-valid'>
               <div className='space-y-4'>
              <div>
                <label htmlFor="email" className='block mb-2 text-sm'>
                    Email Address
                </label>
                <input type="email" name='email' id='email' required placeholder='Enter Your Email Here' className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900' data-temp-mail-org='0'/>
              </div>
              <div>
                <div className='flex justify-between'>
                   <label htmlFor="password" className='text-sm mb-2'>Password </label>
                </div>
                <input type="password" name='password' autoComplete='current-Password' id='password' required  placeholder='******' className='w-full px-9 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900'/>
              </div>
               </div>
               <div>
                <button type='submit' className='bg-lime-500 w-full rounded-md py-3 text-white'> Continue </button>
               </div>
              </form>
              <div className='space-y-1'>
               <button className='text-xs hover:underline hover:text-lime-500 text-gray-400'>Forgot Password ?</button>
              </div>
              <div className='flex items-center pt-4 space-x-1'>
                 <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'> </div>
                 <p className='px-3 text-sm dark:text-gray-400'>
                  Login with social accounts
                 </p>
                 <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'> </div>
              </div>
              <div className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'>
              <FaGoogle size={32}></FaGoogle>
              <p>Continue with Google</p>
              </div>
              <p className='px-6 text-sm text-center text-gray-400'>
                 Don&apos;t have an account yet?{''}
                 <Link to='/signup' className="hover:underline hover:text-lime-500 text-gray-600">
                 Sign Up
                 </Link>
              </p>
            </div>
        </div>
      </>
    );
};

export default Login;