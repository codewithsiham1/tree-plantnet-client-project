import React, { useState } from 'react';
import logo from "../../assets/images/logo-flat.png";
import { Link, useLocation } from 'react-router-dom';
import Container from '../Container/Container';
import { AiOutlineMenu } from 'react-icons/ai';
import Useauth from '../../Hooks/Useauth';
import avatarImg from "../../assets/images/placeholder.jpg";

const Navbar = () => {
  const { user, logout } = Useauth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path) => currentPath === path;

  return (
    <div className='w-full bg-white z-50 shadow-sm sticky top-0'>
      <div className='py-4 border-b-[1px]'>
        <Container>
          <div className='flex items-center justify-between'>
            {/* Logo */}
            <Link to='/'>
              <img src={logo} alt="logo" className='w-24 h-auto' />
            </Link>

            {/* Desktop Menu */}
            <div className='hidden md:flex items-center gap-6'>
              <Link
                to="/"
                className={`transition font-medium ${
                  isActive('/')
                    ? 'text-lime-600 border-b-2 border-lime-600'
                    : 'text-gray-700 hover:text-lime-600'
                }`}
              >
                Home
              </Link>

              <Link
                to="/all-plant"
                className={`transition font-medium ${
                  isActive('/all-plant')
                    ? 'text-lime-600 border-b-2 border-lime-600'
                    : 'text-gray-700 hover:text-lime-600'
                }`}
              >
                All Plants
              </Link>

              <Link
                to="/contact"
                className={`transition font-medium ${
                  isActive('/contact')
                    ? 'text-lime-600 border-b-2 border-lime-600'
                    : 'text-gray-700 hover:text-lime-600'
                }`}
              >
                Contact Us
              </Link>

              <Link
                to="/about"
                className={`transition font-medium ${
                  isActive('/about')
                    ? 'text-lime-600 border-b-2 border-lime-600'
                    : 'text-gray-700 hover:text-lime-600'
                }`}
              >
                About Us
              </Link>
            </div>

            {/* Dropdown Menu */}
            <div className='relative'>
              <div className='flex items-center gap-3'>
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className='p-3 border border-neutral-200 flex items-center gap-2 rounded-full cursor-pointer hover:shadow-md transition'
                >
                  <AiOutlineMenu className="text-black" size={20} />
                  <img
                    className='rounded-full w-8 h-8'
                    referrerPolicy='no-referrer'
                    src={user?.photoURL || avatarImg}
                    alt="profile"
                  />
                </div>
              </div>

              {/* Dropdown Content */}
              {isOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg z-50 text-sm">
                  <div className='flex flex-col py-2' onClick={() => setIsOpen(false)}>
                    {/* Show Home link on small devices only */}
                    <Link
                      to='/'
                      className='block md:hidden px-4 py-2 hover:bg-neutral-100 transition'
                    >
                      Home
                    </Link>

                    {user ? (
                      <>
                        <Link
                          to='/dashboard'
                          className='px-4 py-2 hover:bg-neutral-100 transition'
                        >
                          Dashboard
                        </Link>
                        <button
                          onClick={logout}
                          className='px-4 py-2 hover:bg-neutral-100 transition text-left'
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to='/login'
                          className='px-4 py-2 hover:bg-neutral-100 transition'
                        >
                          Login
                        </Link>
                        <Link
                          to='/signup'
                          className='px-4 py-2 hover:bg-neutral-100 transition'
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
