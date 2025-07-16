import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import image from "../../assets/images/two-plant-branches-with-white-keyboards-blank-background.jpg";
import Container from '../../Shared/Container/Container';
import { CiLocationOn } from "react-icons/ci";
import { IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { toast } from 'react-toastify';

const ContactUs = () => {
  const [agree, setAgree] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agree) {
      toast.error("Please agree to the terms and conditions.");
      return;
    }

    const form = e.target;
    const subject = form.subject.value;
    const email = form.email.value;
    const message = form.message.value;

    const contactData = {
      subject,
      email,
      message,
      createdAt: new Date()
    };

    try {
      const res = await fetch("https://y-pied-phi.vercel.app/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(contactData)
      });

      const data = await res.json();

      if (data.insertedId) {
        toast.success("Message sent successfully!");
        form.reset();
        setAgree(false);
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message.");
    }
  };

  return (
    <>
      <Helmet>
        <title>PlantNet || Contact Us</title>
      </Helmet>

      <div>
        {/* Banner Section */}
        <div className='relative w-full h-60 sm:h-72 md:h-96'>
          <img
            className='w-full h-full object-cover'
            src={image}
            alt="Contact Banner"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center text-white text-center px-4">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Contact Us</h1>
            <p className="text-sm sm:text-base">
              <span
                className="underline hover:text-green-400 cursor-pointer transition"
                onClick={() => window.location.href = '/'}
              >
                Home
              </span>
              {' '}|| Contact Us
            </p>
          </div>
        </div>

        <Container>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-10 py-10'>
            {/* Store Info */}
            <div className='space-y-8 px-4 md:px-0'>
              <h1 className='text-2xl font-bold text-[#2b6e42] border-b-2 pb-2 border-[#2b6e42] w-fit'>
                Store Information
              </h1>

              <div className='flex items-start gap-3'>
                <CiLocationOn className='text-3xl text-[#2b6e42]' />
                <p className='text-gray-700'>
                  <span className='font-semibold'>PlantNet Green Project</span><br />
                  507-Mirpur, Dhaka Trade Center<br />
                  Bangladesh
                </p>
              </div>

              <div className='flex items-start gap-3'>
                <IoCall className='text-2xl text-[#2b6e42]' />
                <p className='text-gray-700'>
                  <span className='font-semibold'>Call us:</span><br />
                  (+91) 9876-543-210
                </p>
              </div>

              <div className='flex items-start gap-3'>
                <MdEmail className='text-2xl text-[#2b6e42]' />
                <p className='text-gray-700'>
                  <span className='font-semibold'>Email us:</span><br />
                  plantnet@gmail.com
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className='border border-gray-200 rounded-lg p-6 shadow-sm'>
              <h2 className='text-xl font-bold mb-6 text-[#2b6e42] text-center md:text-left'>
                Send us a message
              </h2>
              <form onSubmit={handleSubmit} className='space-y-5'>

                <div>
                  <label htmlFor='subject' className='block text-sm font-medium mb-1'>
                    Subject
                  </label>
                  <input
                    id='subject'
                    type='text'
                    name='subject'
                    placeholder='e.g. Order help, Website issue'
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2b6e42]'
                    required
                  />
                </div>

                <div>
                  <label htmlFor='email' className='block text-sm font-medium mb-1'>
                    Your Email
                  </label>
                  <input
                    id='email'
                    type='email'
                    name='email'
                    placeholder='Enter your email'
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2b6e42]'
                    required
                  />
                </div>

                <div>
                  <label htmlFor='message' className='block text-sm font-medium mb-1'>
                    Message
                  </label>
                  <textarea
                    id='message'
                    name='message'
                    rows='5'
                    placeholder='Write your message here...'
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2b6e42]'
                    required
                  />
                </div>

                <div className='flex items-start gap-2'>
                  <input
                    id='agree'
                    type='checkbox'
                    checked={agree}
                    onChange={() => setAgree(!agree)}
                    className='mt-1'
                  />
                  <label htmlFor='agree' className='text-sm select-none'>
                    I agree to the <span className='text-[#2b6e42] underline cursor-pointer'>terms</span> and <span className='text-[#2b6e42] underline cursor-pointer'>privacy policy</span>.
                  </label>
                </div>

                <button
                  type='submit'
                  className='w-full bg-[#2b6e42] text-white px-6 py-3 rounded-md hover:bg-green-700 transition duration-300'
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default ContactUs;
