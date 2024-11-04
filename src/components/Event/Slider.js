import React, { useEffect } from 'react';
import './slider.css'; // Import the CSS for styling
import { Link } from 'react-router-dom';

const Slider = () => {

  useEffect(() => {
    const next = document.querySelector('.next');
    const prev = document.querySelector('.prev');

    next.addEventListener('click', handleNext);
    prev.addEventListener('click', handlePrev);

    return () => {
      next.removeEventListener('click', handleNext);
      prev.removeEventListener('click', handlePrev);
    };
  }, []);

  const handleNext = () => {
    let items = document.querySelectorAll('.item');
    document.querySelector('.slide').appendChild(items[0]);
  };

  const handlePrev = () => {
    let items = document.querySelectorAll('.item');
    document.querySelector('.slide').prepend(items[items.length - 1]);
  };

  return (
    <div>
    <div className="container-slider d-none d-lg-block">
      <div className="slide">
        <div
          className="item"
          style={{ backgroundImage: 'url(https://i.ibb.co/qCkd9jS/img1.jpg)' }}
        >
          <div className="content">
            <div className="name">Vasista 2K24</div>
            <div className="des">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!
            </div>
            <Link to="/events/vasista2k24" className='slider-button'>See More</Link>
          </div>
        </div>
        <div
          className="item"
          style={{ backgroundImage: 'url(https://i.ibb.co/jrRb11q/img2.jpg)' }}
        >
          <div className="content">
            <div className="name">Chaitra 2K24</div>
            <div className="des">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!
            </div>
            <Link to="/events/chaitra2k24" className='slider-button'>See More</Link>
          </div>
        </div>
        <div
          className="item"
          style={{ backgroundImage: 'url(https://i.ibb.co/NSwVv8D/img3.jpg)' }}
        >
          <div className="content">
            <div className="name">Pramidha 2K24</div>
            <div className="des">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!
            </div>
            <Link to="/events/pramidha2k24" className='slider-button'>See More</Link>
          </div>
        </div>
        <div
          className="item"
          style={{ backgroundImage: 'url(https://i.ibb.co/Bq4Q0M8/img4.jpg)' }}
        >
          <div className="content">
            <div className="name">Vasista 2K23</div>
            <div className="des">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!
            </div>
            <Link to="/events/vasista2k23" className='slider-button'>See More</Link>
          </div>
        </div>
        <div
          className="item"
          style={{ backgroundImage: 'url(https://i.ibb.co/jTQfmTq/img5.jpg)' }}
        >
          <div className="content">
            <div className="name">Chaitra 2K23</div>
            <div className="des">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!
            </div>
            <Link to="/events/chaitra2k23" className='slider-button'>See More</Link>
          </div>
        </div>
      </div>

      <div className="button">
        <button className="prev">
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <button className="next">
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
    <div className='d-lg-none'>
      <div id="CarouselEx" className="carousel slide" data-ride="carousel" data-interval="2000">
        <ol className="carousel-indicators">
          <li data-target="#CarouselEx" data-slide-to="0" className="active"></li>
          <li data-target="#CarouselEx" data-slide-to="1"></li>
          <li data-target="#CarouselEx" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://res.cloudinary.com/dnbeeynnu/image/upload/v1710768089/invitation_xi9izy.jpg"
              className="d-block w-100 car-img"
              alt="..."
            />
            <div className="content-mob">
                  <div className="name-mob">Chaitra 2K23</div>
                  <div className="des-mob">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!
                  </div>
                  <Link to="/events/chaitra2k24" class="button-mob">See More</Link>
                </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://img.freepik.com/free-vector/realistic-happy-ugadi-festival_23-2148448218.jpg?t=st=1710766812~exp=1710770412~hmac=fae5aefb5813cbb9042ad5d5ba68ba56ef98d9da68d5f94b9bbd638a1688dd03&w=740"
              className="d-block w-100 car-img"
              alt="..."
            />
            <div className="content-mob">
                  <div className="name-mob">Chaitra 2K23</div>
                  <div className="des-mob">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!
                  </div>
                  <Link to="/events/pramidha2k24" class="button-mob">See More</Link>
                </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://res.cloudinary.com/dnbeeynnu/image/upload/b_rgb:050500/c_pad,w_1000,h_750,ar_4:3/v1710766757/WhatsApp_Image_2024-03-17_at_12.05.32_PM_jwctjg.jpg"
              className="d-block w-100 car-img"
              alt="..."
            />
            <div className="content-mob">
                  <div className="name-mob">Chaitra 2K23</div>
                  <div className="des-mob">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!
                  </div>
                  <Link to="/events/vasista2k23" class="button-mob">See More</Link>
                </div>
          </div>
        </div>
        <a className="carousel-control-prev" href="#CarouselEx" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only"></span>
        </a>
        <a className="carousel-control-next" href="#CarouselEx" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only"></span>
        </a>
      </div> 
    </div>

       

      
    </div>
  );
};

export default Slider;
