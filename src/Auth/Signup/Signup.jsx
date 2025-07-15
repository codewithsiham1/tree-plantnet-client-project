import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaGoogle } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import Authprovider, { Authcontext } from '../../Provider/Authprovider';
import { toast } from 'react-toastify';
import Useauth from '../../Hooks/Useauth';
import axios from 'axios';

const Signup = () => {
  const { createuser, updateprofile, googlelogin } = useContext(Authcontext);
  const navigate = useNavigate();
  const { user } = Useauth();

  const handleSignup = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const imageFile = form.image.files[0];

    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_KEY}`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await res.json();
      const photoURL = data.data.display_url;

      const result = await createuser(email, password);
      const Createuser = result.user;

      await updateprofile(name, photoURL);
      await axios.post(`${import.meta.env.VITE_API_URL}/user/${email}`, {
        name,
        image: photoURL,
        email,
      });

      await axios.post(
        `${import.meta.env.VITE_API_URL}/jwt`,
        { email },
        { withCredentials: true }
      );

      toast.success('User registered and profile updated!');
      form.reset();
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await googlelogin();
      const email = result.user.email;

      await axios.post(
        `${import.meta.env.VITE_API_URL}/jwt`,
        { email },
        { withCredentials: true }
      );

      toast.success('Signup Successful');
      navigate('/');
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>PlanNet || Signup Page</title>
      </Helmet>

      <div className="flex items-center justify-center min-h-screen bg-white px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md p-6 sm:p-8 md:p-10 bg-gray-100 rounded-lg shadow-md text-gray-900">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold">Sign Up</h1>
            <p className="text-sm text-gray-500 mt-2">Welcome to PlantNet</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-1 text-sm">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                placeholder="Enter your name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-lime-500"
              />
            </div>

            <div>
              <label htmlFor="image" className="block mb-1 text-sm">
                Profile Photo
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                required
                className="w-full text-sm text-gray-700"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-1 text-sm">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-lime-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-1 text-sm">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="new-password"
                required
                placeholder="*****"
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-lime-500"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2 bg-lime-500 hover:bg-lime-600 text-white font-semibold rounded-md transition duration-300"
              >
                Continue
              </button>
            </div>
          </form>

          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300"></div>
            <p className="mx-3 text-sm text-gray-500">Signup with social accounts</p>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-md py-2 hover:bg-gray-200 transition duration-200"
          >
            <FaGoogle size={20} />
            <span className="text-sm font-medium text-gray-700">Continue with Google</span>
          </button>

          <p className="mt-6 text-sm text-center text-gray-500">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-gray-700 hover:text-lime-500 hover:underline font-medium"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
