// import React from 'react';
// import './chaitra.css'; // Importing  CSS
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import Font Awesome component
// import { faCalendarAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'; // Import specific icons
// import PreEvents from './pre_events';
// import { useRef, useEffect, useState } from 'react';


// const Chaitra = () => {
//     const [isVisible, setIsVisible] = useState(false);
//     const sectionRef = useRef(null);
  
//     useEffect(() => {
//       const observer = new IntersectionObserver(
//         (entries) => {
//           const [entry] = entries;
//           if (entry.isIntersecting) {
//             setIsVisible(true);
//             observer.unobserve(entry.target); // Stop observing after animation is triggered
//           }
//         },
//         { threshold: 0.5 } // Adjust threshold to control when the animation should start
//       );
  
//       if (sectionRef.current) {
//         observer.observe(sectionRef.current);
//       }
  
//       return () => {
//         if (sectionRef.current) {
//           observer.unobserve(sectionRef.current);
//         }
//       };
//     }, []);

// const Chaitra = () => {
//     return (
//         <>
//             <div className="event-banner-container">
//                 <div className="event-banner-content">
//                     <h1>Chaitra 2K24</h1>
//                     <p>
//                         Enjoy the Ugadi festival with your friends in the campus environment.
//                     </p>
                    
//                     {/* Event date and location */}
//                     <div className="event-info">
//                         <div className="event-date">
//                             <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
//                             <span>March 22, 2024</span> {/* Add your event date here */}
//                         </div>
//                         <div className="event-location">
//                             <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
//                             <span>Main Campus, Event Hall</span> {/* Add your event location here */}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             {/* <section className="chaitra-section">
//       <div className="content">
//         <h2>Chaitra - Ugadi Celebration</h2>
//         <p>
//           Welcome to Chaitra, an event organized by HHO at the university to
//           celebrate the Ugadi festival. Join us for a day filled with cultural
//           performances, traditional food, and much more!
//         </p>
//       </div>
//       <div className="logo mt-3">
//         <img src="https://res.cloudinary.com/dnbeeynnu/image/upload/b_rgb:050500/c_pad,w_1000,h_750,ar_4:3/v1710766757/WhatsApp_Image_2024-03-17_at_12.05.32_PM_jwctjg.jpg" alt="Chaitra Logo" />
//       </div>
//     </section> */}
//     <section
//       ref={sectionRef}
//       className={`chaitra-section ${isVisible ? 'animate' : ''}`}
//     >
//       <div className="content">
//         <h2>Chaitra - Ugadi Celebration</h2>
//         <p>
//           Welcome to Chaitra, an event organized by HHO at the university to
//           celebrate the Ugadi festival. Join us for a day filled with cultural
//           performances, traditional food, and much more!
//         </p>
//       </div>
//       <div className="logo">
//         <img src="https://res.cloudinary.com/dnbeeynnu/image/upload/b_rgb:050500/c_pad,w_1000,h_750,ar_4:3/v1710766757/WhatsApp_Image_2024-03-17_at_12.05.32_PM_jwctjg.jpg" alt="Chaitra Logo" />
//       </div>
//     </section>


//             <PreEvents />
//         </>
//     );
// }
// }
// export default Chaitra;


// import React, { useRef, useEffect, useState } from 'react';
// import './chaitra.css'; // Importing CSS
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCalendarAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
// import PreEvents from './pre_events';

// const Chaitra = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const sectionRef = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         const [entry] = entries;
//         setIsVisible(entry.isIntersecting);
//       },
//       { threshold: 0.5 }
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => {
//       if (sectionRef.current) {
//         observer.unobserve(sectionRef.current);
//       }
//     };
//   }, []);

//   return (
//     <>
//       <div className="event-banner-container">
//         <div className="event-banner-content">
//           <h1>Chaitra 2K24</h1>
//           <p>Enjoy the Ugadi festival with your friends in the campus environment.</p>
//           <div className="event-info">
//             <div className="event-date">
//               <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
//               <span>March 22, 2024</span>
//             </div>
//             <div className="event-location">
//               <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
//               <span>Main Campus, Event Hall</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <section ref={sectionRef} className={`chaitra-section ${isVisible ? 'animate' : ''}`}>
//         <div className="content">
//           <h2 className='event-name'>Chaitra <span className='span-el'>2K24</span></h2>
//           <p className='event-des'>
//             Welcome to Chaitra, an event organized by HHO at the university to
//             celebrate the Ugadi festival. It is to bring the festive vibe and home vibe in the campus.Join us for a day filled with fungames,rangoli and many others and refresh yourself by actively participating in them.
           
//           </p>
//         </div>
//         <div className="logo">
//           <img src="https://res.cloudinary.com/dnbeeynnu/image/upload/b_rgb:050500/c_pad,w_1000,h_750,ar_4:3/v1710766757/WhatsApp_Image_2024-03-17_at_12.05.32_PM_jwctjg.jpg" alt="Chaitra Logo" />
//         </div>
//       </section>

//       <PreEvents />
//     </>
//   );
// };

// export default Chaitra;


import React, { useRef, useEffect, useState } from 'react';
import './chaitra.css'; // Importing CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import PreEvents from './pre_events';
import EventsGallery from './img_gallery';

const Chaitra = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.35 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <>
      <div className="event-banner-container">
        <div className="event-banner-content">
          <h1>Chaitra 2K24</h1>
          <p>Enjoy the Ugadi festival with your friends in the campus environment.</p>
          <div className="event-info">
            <div className="event-date">
              <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
              <span>March 22, 2024</span>
            </div>
            <div className="event-location">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
              <span>Student Activivity Center</span>
            </div>
          </div>
        </div>
      </div>

      <section ref={sectionRef} className={`chaitra-section ${isVisible ? 'animate' : ''}`}>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6 order-2 order-md-1">
              <div className="content">
                <h2 className='event-name'>Chaitra <span className='span-el'>2K24</span></h2>
                <p className='event-des'>
                  Welcome to Chaitra, an event organized by HHO at the university to
                  celebrate the Ugadi festival. It is to bring the festive vibe and home vibe in the campus. Join us for a day filled with fun games, rangoli, and many other activities to refresh yourself by actively participating in them.
                </p>
              </div>
            </div>
            <div className="col-12 col-md-6 order-1 order-md-2">
              <div className="logo">
                <img src="https://res.cloudinary.com/dnbeeynnu/image/upload/b_rgb:050500/c_pad,w_1000,h_750,ar_4:3/v1710766757/WhatsApp_Image_2024-03-17_at_12.05.32_PM_jwctjg.jpg" alt="Chaitra Logo"/>
              </div>
            </div>
          </div>
        </div>
        
        
      </section>

      <PreEvents />
      <EventsGallery />
    </>
  );
};

export default Chaitra;
