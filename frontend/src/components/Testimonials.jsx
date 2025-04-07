import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';

// Placeholder avatar images from Unsplash (or use local files)
const Avatar1 = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80';
const Avatar2 = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80';
const Avatar3 = 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80';

const Testimonials = () => {
  const reviews = [
    {
      name: 'John Doe',
      text: 'Amazing products and fast delivery! I’ve been a customer for years and never disappointed.',
      rating: 5,
      avatar: Avatar1,
    },
    {
      name: 'Jane Smith',
      text: 'Great quality at affordable prices. The customer service team was super helpful!',
      rating: 4,
      avatar: Avatar2,
    },
    {
      name: 'Alex Carter',
      text: 'Loved the variety of products. Shipping was quick, and everything arrived in perfect condition.',
      rating: 5,
      avatar: Avatar3,
    },
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={index < rating ? 'star filled' : 'star'}>
        ★
      </span>
    ));
  };

  return (
    <section className="testimonials py-5">
      <div className="container">
        <h2 className="text-center mb-5">What Our Customers Say</h2>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          navigation
          modules={[Autoplay, Navigation]}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="testimonials-swiper"
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="testimonial-card">
                <div className="avatar">
                  <img src={review.avatar} alt={`${review.name}'s avatar`} />
                </div>
                <div className="content">
                  <p className="review-text">"{review.text}"</p>
                  <div className="rating">{renderStars(review.rating)}</div>
                  <h5 className="reviewer-name">- {review.name}</h5>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;