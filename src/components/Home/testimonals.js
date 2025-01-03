import React, { useContext, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './testimonals.css'; 
import axios from 'axios';
import { AppContext } from '../../context/Context';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const testimonialsRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const {apiUrl} = useContext(AppContext);
  useEffect(() => {
    axios.get(`${apiUrl}/api/testimonials`)
      .then((res) => {
        setTestimonials(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error fetching testimonials:", error);
      });
  }, []);

  useEffect(() => {
    // Only set up the interval when testimonials are loaded
    if (testimonials.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 2500);

      return () => clearInterval(interval); // Cleanup interval on unmount
    }
  }, [testimonials]);

  useEffect(() => {
    if (testimonialsRef.current && testimonials.length > 0) {
      const container = testimonialsRef.current;
      const cardWidth = container.scrollWidth / testimonials.length;

      // Check if it's the last item, and then jump instantly to the first
      if (currentIndex === testimonials.length - 1) {
        container.scrollTo({
          left: 0,
          behavior: 'auto', // Instantly jump to the first testimonial
        });
      } else {
        container.scrollTo({
          left: currentIndex * cardWidth,
          behavior: 'smooth', // Smooth scrolling effect
        });
      }
    }
  }, [currentIndex, testimonials]);

  return (
    <section className="testimonials">
      <h2 className='banner-title'>What People Say <span className='span'>About Us</span></h2>
      <p style={{ fontFamily: 'Playpen Sans, cursive' }}>Some of our members, staff, and students shared their thoughts.</p>
      <div className="testimonials-container" ref={testimonialsRef}>
        {testimonials.map((testimonial) => (
          <div className="testimonial-card" key={testimonial._id}>
            <div className="stars">{'★'.repeat(testimonial.rating)}</div>
            <p className='ml-3 mb-4 mt-2 mr-3 quote-text'>{testimonial.message}</p>
            <div className="client-info">
              <div className="d-flex flex-row">
                <FontAwesomeIcon icon={faUser} className="mr-4 mt-3 text-white" style={{ width: '30px', height: '30px' }} />
                <div className="mt-2">
                  <h3>{testimonial.name}</h3>
                  <p>{testimonial.discipline}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;