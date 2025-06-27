import React from 'react';
import logo from"../../assets/images/logo-flat.png"
import { Link } from 'react-router-dom';
import Container from '../Container/Container';



const Navbar = () => {
    return (
        <div className='fixed w-full bg-white z-10 shadow-sm'>
            <div className='py-4 border-b-[1px]'>
        <Container>
     <div className='flex flex-row gap-10'>
     <Link>
           <img src={logo} alt="logo" width='100' height='100' />
           </Link>
           <div>
            <Link to="/" className=' px-4 py-3 hover:bg-neutral-100 transition font-semibold'>
              Home
            </Link>
            <Link to="/signup">Sign Up</Link>
           </div>
     </div>
        </Container>
            </div>
        </div>
    );
};

export default Navbar;