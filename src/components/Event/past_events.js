// import React from 'react';
// import './past_events.css';

// const Card = ({ imageSrc, title, description }) => (
//   <div className="event-card mb-3">
//     <img src={imageSrc} alt={title} />
//     <div className="info">
//       <h1>{title}</h1>
//       <p>{description}</p>
//       <button>Read More</button>
//     </div>
//   </div>
// );

// const PastEvents = () => (
// 	<>
// 		<h2 className='event-name p-5 text-center'>Past <span className='span-el'>Events</span></h2>
  
//     <div className="container">
// 		<div className="wrapper">
//         <div className="row">
//             <div className="col-12 col-lg-3">
//                 <Card
//                     imageSrc="https://images.unsplash.com/photo-1477666250292-1419fac4c25c?auto=format&fit=crop&w=667&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"
//                     title="Pramidha 2K23"
//                     description="Lorem Ipsum is simply dummy text from the printing and typesetting industry"
//                 />
//             </div>
//             <div className="col-12 col-lg-3">
//                 <Card
//                     imageSrc="https://images.unsplash.com/photo-1425342605259-25d80e320565?auto=format&fit=crop&w=750&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"
//                     title="Vasista 2K23"
//                     description="Lorem Ipsum is simply dummy text from the printing and typesetting industry"
//                 />
//             </div>
//             <div className="col-12 col-lg-3">
//                 <Card
//                     imageSrc="https://images.unsplash.com/photo-1503249023995-51b0f3778ccf?auto=format&fit=crop&w=311&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"
//                     title="Chaitra 2K23"
//                     description="Lorem Ipsum is simply dummy text from the printing and typesetting industry"
//                 />
//             </div>
//             <div className="col-12 col-lg-3">
//                 <Card
//                     imageSrc="https://images.unsplash.com/photo-1503249023995-51b0f3778ccf?auto=format&fit=crop&w=311&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"
//                     title="Pramidha 2K22"
//                     description="Lorem Ipsum is simply dummy text from the printing and typesetting industry"
//                 />
//             </div>
//         </div>
//     </div>
    
    
    
//   </div>
// 	</>
  
// );

// export default PastEvents;



import React from 'react';
import { Link } from 'react-router-dom';
import './past_events.css';

const Card = ({ imageSrc, title, description }) => (
  <div className="event-card mb-3">
    <img src={imageSrc} alt={title} />
    <div className="info">
      <h1>{title}</h1>
      <p>{description}</p>
      <Link to={`/events/${title.replace(/\s+/g, '').toLowerCase()}`} className="event-card-button">
        Read More
      </Link>
    </div>
  </div>
);

const PastEvents = () => (
  <>
    <h2 className="event-name p-5 text-center">Past <span className="span-el">Events</span></h2>
    <div className="container">
      <div className="wrapper">
        <div className="row">
          <div className="col-12 col-lg-3">
            <Card
              imageSrc="https://images.unsplash.com/photo-1477666250292-1419fac4c25c?auto=format&fit=crop&w=667&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"
              title="Pramidha 2K23"
              description="Lorem Ipsum is simply dummy text from the printing and typesetting industry"
            />
          </div>
          <div className="col-12 col-lg-3">
            <Card
              imageSrc="https://images.unsplash.com/photo-1425342605259-25d80e320565?auto=format&fit=crop&w=750&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"
              title="Vasista 2K23"
              description="Lorem Ipsum is simply dummy text from the printing and typesetting industry"
            />
          </div>
          <div className="col-12 col-lg-3">
            <Card
              imageSrc="https://images.unsplash.com/photo-1503249023995-51b0f3778ccf?auto=format&fit=crop&w=311&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"
              title="Chaitra 2K23"
              description="Lorem Ipsum is simply dummy text from the printing and typesetting industry"
            />
          </div>
          <div className="col-12 col-lg-3">
            <Card
              imageSrc="https://images.unsplash.com/photo-1503249023995-51b0f3778ccf?auto=format&fit=crop&w=311&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"
              title="Pramidha 2K22"
              description="Lorem Ipsum is simply dummy text from the printing and typesetting industry"
            />
          </div>
        </div>
      </div>
    </div>
  </>
);

export default PastEvents;
