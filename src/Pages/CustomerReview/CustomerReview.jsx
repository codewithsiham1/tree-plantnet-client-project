import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure/useAxiosSecure';
import { format } from 'date-fns';

import Container from '../../Shared/Container/Container';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

const CustomerReview = () => {
  const [reviews, setReviews] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axiosSecure.get('/review');
        setReviews(res.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [axiosSecure]);

  return (
    <Container>
      <div className="py-10 max-w-6xl mx-auto my-9 px-4 sm:px-0">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2, spaceBetween: 25 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          modules={[Pagination, Autoplay]}
        >
          {reviews.map((review, idx) => (
            <SwiperSlide key={idx}>
              <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col h-full items-center text-center transition-all duration-300 hover:shadow-xl max-w-sm mx-auto">
                <img
                  src={review.userInfo?.image || 'https://i.ibb.co/QpV6ZDp/user.png'}
                  alt={review.userInfo?.name || 'Anonymous'}
                  className="w-12 h-12 min-w-[48px] min-h-[48px] rounded-full object-cover border-2 border-green-400 mb-3"
                />
                <h3 className="text-sm font-semibold text-gray-800">
                  {review.userInfo?.name || 'Anonymous'}
                </h3>
                <p className="text-xs text-gray-500 mb-1">
                  {format(new Date(review.createdAt), 'MMMM dd, yyyy')}
                </p>
                <p className="text-yellow-500 font-semibold mb-1 text-xs">⭐ {review.rating} Stars</p>
                <p className="text-gray-600 text-xs italic leading-relaxed text-justify max-w-[260px] mx-auto">
                  "{review.comment}"
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Container>
  );
};

export default CustomerReview;
