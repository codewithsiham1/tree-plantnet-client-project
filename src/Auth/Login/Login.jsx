import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { Authcontext } from '../../Provider/Authprovider';
import { toast } from 'react-toastify';
import axios from 'axios';

const Login = () => {
  const { signIn, googlelogin } = useContext(Authcontext);
  const navigate = useNavigate();

  const handlelogin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await signIn(email, password);
      const loggedUser = result.user;

      await axios.post(
        `${import.meta.env.VITE_API_URL}/jwt`,
        { email: loggedUser.email },
        { withCredentials: true }
      );

      toast.success('Login Successful');
      navigate('/');
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await googlelogin();
      const user = result.user;

      await axios.post(`${import.meta.env.VITE_API_URL}/user/${user.email}`, {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      });

      await axios.post(
        `${import.meta.env.VITE_API_URL}/jwt`,
        { email: user.email },
        { withCredentials: true }
      );

      toast.success('Login Successful with Google');
      navigate('/');
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>PlanNet || Login Page</title>
      </Helmet>
      <div className="flex justify-center items-center min-h-screen bg-white px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md p-6 sm:p-8 md:p-10 bg-gray-100 rounded-lg shadow-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Log In</h1>
            <p className="text-sm text-gray-500 mt-2">Sign in to access your account</p>
          </div>

          <form onSubmit={handlelogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block mb-1 text-sm text-gray-600">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lime-500 bg-gray-200 text-gray-900"
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-1 text-sm text-gray-600">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="current-password"
                required
                placeholder="******"
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lime-500 bg-gray-200 text-gray-900"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2 bg-lime-500 hover:bg-lime-600 text-white rounded-md font-semibold transition duration-300"
              >
                Continue
              </button>
            </div>
          </form>

          <div className="mt-3 text-right">
            <button className="text-xs text-gray-500 hover:text-lime-500 hover:underline">
              Forgot Password?
            </button>
          </div>

          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300"></div>
            <p className="mx-3 text-sm text-gray-500">or login with</p>
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
            Don't have an account yet?{' '}
            <Link
              to="/signup"
              className="text-gray-700 hover:text-lime-500 hover:underline font-medium"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
