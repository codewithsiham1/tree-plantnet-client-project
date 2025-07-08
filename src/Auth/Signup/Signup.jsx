import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaGoogle } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import Authprovider, { Authcontext } from '../../Provider/Authprovider';
import { toast } from 'react-toastify';
import Useauth from '../../Hooks/Useauth';
import axios from 'axios';

const Signup = () => {
  const {createuser,updateprofile}=useContext(Authcontext)
  const navigate=useNavigate()
  const {user}=Useauth()
const handleSignup = async (event) => {
  event.preventDefault();
  const form = event.target;
  const name = form.name.value;
  const email = form.email.value;
  const password = form.password.value;
  const imageFile = form.image.files[0]; // ✅ image name must match input

  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    // ✅ Correct API endpoint usage with template string
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_KEY}`, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    const photoURL = data.data.display_url;

    // ✅ Create user
    const result = await createuser(email, password);
    const Createuser = result.user;

    // ✅ Update profile with name and photoURL
    await updateprofile(name, photoURL);
    await axios.post(`${import.meta.env.VITE_API_URL}/user/${email}`, {
        name,
        image: photoURL,
        email,
      });
// get jwt
      await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, { email }, { withCredentials: true });
    toast.success('User registered and profile updated!');
    form.reset();
    navigate('/');
  } catch (error) {
    toast.error(error.message);
  }
};


    return (
      <>
            <Helmet>
        <title>PlanNet|| Signup Page</title>
      </Helmet>
        <div className='flex justify-center items-center min-h-screen bg-white'>
        <div className='flex flex-col p-6 max-w-md rounded-md sm:p-10 bg-gray-100 text-gray-900'>
        <div className='mb-8 text-center'>
                <h1 className='my-3 text-4xl font-bold'>Sign Up</h1>
                <p className='text-sm text-gray-400'>Welcome to PlantNet</p>
            </div>
            <form onSubmit={handleSignup} className='space-y-6 ng-untouched ng-pristine ng-valid'>
          <div className='space-y-4'>
           <div>
            <label htmlFor="name" className='block mb-2 text-sm'> Name</label>
            <input type="text" name='name'  id='name' placeholder='Enter Your Name Here' className=' w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900' data-temp-mail-org='0'/>
           </div>
           <div>
            <label htmlFor="image" className='block mb-2 text-sm'>
                Select Image:
            </label>
            <input type="file" id='image' name='image' accept='image/*' required/>
           </div>
           <div>
            <label htmlFor="email" className='block mb-2 text-sm'>
                Email Address:
            </label>
            <input type="email" name='email' id='email' required placeholder='Enter Your Email Here' className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900' />
           </div>
           <div>
            <div className='flex justify-between'>
             <label htmlFor="password" className='text-sm mb-2'>Password</label>
            </div>
            <input type="password" name='password' autoComplete='new password' id='password' required placeholder='*****' className='w-full px-3 py-2 border rounded-md border-gray-300  focus:outline-lime-500 bg-gray-200 text-gray-900' />
           </div>
          </div>
          <div>
            <button type='submit' className='bg-lime-500 w-full rounded-md py-3 text-white'>Continue</button>
          </div>
            </form>
          <div className='flex items-center pt-4 space-x-1'>
         <div className='flex-1 h-px sm-w-16 dark:bg-gray-700'></div>
         <p className='px-3 text-sm dark:text-gray-400'>
            Signup With Social Accounts
         </p>
         <div className='flex-1 h-px sm-w-16 dark:bg-gray-700'></div>
          </div>
          <div className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'>
             <FaGoogle size={32}></FaGoogle>
             <p>Continue With Google</p>
          </div>
          <p className='px-6 text-sm text-center text-gray-400'>
            Already Have An Account?{''}
            <Link to="/login" className='hover:underline hover:text-lime-500 text-gray-600'>
            Login
            </Link>
          </p>
        </div>
        </div>
      </>
    );
};

export default Signup;