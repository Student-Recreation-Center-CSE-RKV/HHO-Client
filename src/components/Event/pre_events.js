// import React from 'react';
// import './pre_events.css'; // Your provided CSS
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCalendarAlt, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
// import { useInView } from 'react-intersection-observer';

// const PreEventCard = ({ imageSrc, title, date, fee }) => {
//   const { ref, inView } = useInView({
//     triggerOnce: true, // Load only once when in view
//     threshold: 0.1,    // Load when 10% of the card is in view
//   });

//   return (
//     <div className={`col-6 col-md-6 col-lg-3 mt-2`}>
//       <div ref={ref} className={`shadow text-center pre-event-card p-2 mb-4 ${inView ? 'in-view' : ''}`}>
//         {inView ? (
//           <>
//             <img src={imageSrc} className="pre-event-image w-100" alt={title} />
//             <h1 className="pre-event-title mt-3">{title}</h1>
//             <p className='text-left ml-3'>
//               <FontAwesomeIcon icon={faCalendarAlt} className="card-icon me-2" />
//               {date}
//             </p>
//             <p className='text-left ml-3'>
//               <FontAwesomeIcon icon={faMoneyBillWave} className="card-icon me-2" />
//               {fee}
//             </p>
//           </>
//         ) : (
//           <div style={{ height: '200px', backgroundColor: '#f0f0f0' }}></div> // Placeholder while loading
//         )}
//       </div>
//     </div>
//   );
// };

// const PreEvents = () => {
//   return (
//     <div className="sectionPreEvent pt-5 pb-5">
//       <div className="container">
//         <div className="row">
//           <div className="col-12 p-0">
//             <h2 className='banner-title text-center'> Pre <span className='span'> Events </span> </h2>
//           </div>

//           {/* List of PreEventCard components */}
//           <PreEventCard
//             imageSrc="https://img.freepik.com/free-photo/magic-fairytale-book-concept_23-2150171884.jpg?t=st=1710653314~exp=1710656914~hmac=cef4d0894d83e3634ab25416283ed24cbabf8a5c34d991177c6128d67250fb1f&w=740"
//             title="Mythology Quiz"
//             date="March 15, 2024"
//             fee="₹100"
//           />
//           <PreEventCard
//             imageSrc="https://img.freepik.com/premium-photo/alzheimer-amnesia-mental-health-concept-brain-model-missing-puzzle-pieces_577978-437.jpg?w=740"
//             title="Aptitude Quiz"
//             date="March 16, 2024"
//             fee="₹100"
//           />
//           <PreEventCard
//             imageSrc="https://img.freepik.com/premium-photo/studio-microphone-pop-shield-mic-empty-recording-studio_43263-2762.jpg?w=740"
//             title="Singing"
//             date="March 17, 2024"
//             fee="₹200"
//           />
//           <PreEventCard
//             imageSrc="https://img.freepik.com/free-photo/watercolor-painting-with-multi-colored-abstract-backgrounds-generative-ai_188544-7811.jpg?t=st=1710652859~exp=1710656459~hmac=fbfc4a105020f8f7ceff60af4edd6837464ea616ee9a77bc923301e4fd4f3aad&w=740"
//             title="Drawing"
//             date="March 18, 2024"
//             fee="₹150"
//           />
//           <PreEventCard
//             imageSrc="https://img.freepik.com/free-photo/diwali-festival-lights-tradition_23-2148688432.jpg?w=740"
//             title="Rangoli"
//             date="March 19, 2024"
//             fee="₹50"
//           />
//           <PreEventCard
//             imageSrc="https://img.freepik.com/free-photo/person-playing-3d-video-games-device_23-2151005751.jpg?t=st=1710652990~exp=1710656590~hmac=c754e702a937f92a3ffa1c188b8c126a7e1dc52348106e06377acd5637bcfc79&w=740"
//             title="Coding Contest"
//             date="March 20, 2024"
//             fee="₹300"
//           />
//           <PreEventCard
//             imageSrc="https://img.freepik.com/premium-photo/arafed-soldier-with-gun-dark-room-with-flames-generative-ai_771703-50637.jpg?w=740"
//             title="Free Fire"
//             date="March 21, 2024"
//             fee="₹400"
//           />
//           <PreEventCard
//             imageSrc="https://img.freepik.com/free-photo/high-angle-hands-holding-smartphone_23-2149711481.jpg?t=st=1710653614~exp=1710657214~hmac=98757177c41e8ccc30733adf466b9c01eb454af3d016702f74636a70d2620210&w=740"
//             title="Reel Contest"
//             date="March 22, 2024"
//             fee="₹50"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PreEvents;


// import React from 'react';
// import './pre_events.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCalendarAlt, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
// import { useInView } from 'react-intersection-observer';

// const PreEventCard = ({ imageSrc, title, date, fee, isVisible }) => {
//   return (
//     <div className={`col-6 col-md-6 col-lg-3 mt-2`}>
//       <div className={`shadow text-center pre-event-card p-2 mb-4 ${isVisible ? 'in-view' : ''}`}>
//         <img src={imageSrc} className="pre-event-image w-100" alt={title} />
//         <h1 className="pre-event-title mt-3">{title}</h1>
//         <p className="text-left ml-3">
//           <FontAwesomeIcon icon={faCalendarAlt} className="card-icon me-2" />
//           {date}
//         </p>
//         <p className="text-left ml-3">
//           <FontAwesomeIcon icon={faMoneyBillWave} className="card-icon me-2" />
//           {fee}
//         </p>
//       </div>
//     </div>
//   );
// };

// const PreEvents = () => {
  

//   return (
//     <div className="sectionPreEvent pt-5 pb-5">
//       <div className="container">
//         <div className="row">
//           <div className="col-12 p-0">
//             <h2 className="banner-title text-center">
//               Pre <span className="span">Events</span>
//             </h2>
//           </div>

//           {/* List of PreEventCard components */}
//           <PreEventCard
//             imageSrc="https://img.freepik.com/free-photo/magic-fairytale-book-concept_23-2150171884.jpg"
//             title="Mythology Quiz"
//             date="March 15, 2024"
//             fee="₹100"
        
//           />
//           <PreEventCard
//             imageSrc="https://img.freepik.com/premium-photo/alzheimer-amnesia-mental-health-concept-brain-model-missing-puzzle-pieces_577978-437.jpg"
//             title="Aptitude Quiz"
//             date="March 16, 2024"
//             fee="₹100"
          
//           />
//           <PreEventCard
//             imageSrc="https://img.freepik.com/premium-photo/studio-microphone-pop-shield-mic-empty-recording-studio_43263-2762.jpg"
//             title="Singing"
//             date="March 17, 2024"
//             fee="₹200"
            
//           />
//           <PreEventCard
//             imageSrc="https://img.freepik.com/free-photo/watercolor-painting-with-multi-colored-abstract-backgrounds-generative-ai_188544-7811.jpg"
//             title="Drawing"
//             date="March 18, 2024"
//             fee="₹150"
            
//           />
//           <PreEventCard
//             imageSrc="https://img.freepik.com/free-photo/diwali-festival-lights-tradition_23-2148688432.jpg"
//             title="Rangoli"
//             date="March 19, 2024"
//             fee="₹50"
          
//           />
//           <PreEventCard
//             imageSrc="https://img.freepik.com/free-photo/person-playing-3d-video-games-device_23-2151005751.jpg"
//             title="Coding Contest"
//             date="March 20, 2024"
//             fee="₹300"
         
//           />
//           <PreEventCard
//             imageSrc="https://img.freepik.com/premium-photo/arafed-soldier-with-gun-dark-room-with-flames-generative-ai_771703-50637.jpg"
//             title="Free Fire"
//             date="March 21, 2024"
//             fee="₹400"
          
//           />
//           <PreEventCard
//             imageSrc="https://img.freepik.com/free-photo/high-angle-hands-holding-smartphone_23-2149711481.jpg"
//             title="Reel Contest"
//             date="March 22, 2024"
//             fee="₹50"
            
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PreEvents;



import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faMoneyBillWave, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import './pre_events.css';

const PreEventCard = ({ imageSrc, title, date, fee, isFlipped, onClick }) => {
  return (
    <div className="col-6 col-md-6 col-lg-3 mt-2" onClick={onClick}>
      <div className={`pre-event-card shadow text-center p-2 mb-4 ${isFlipped ? 'flipped' : ''}`}>
        <div className="card-front">
          <img src={imageSrc} className="pre-event-image w-100" alt={title} />
          <h1 className="pre-event-title mt-3">{title}</h1>
          <p className="text-left ml-3">
            <FontAwesomeIcon icon={faCalendarAlt} className="card-icon me-2" />
            {date}
          </p>
          <p className="text-left ml-3">
            <FontAwesomeIcon icon={faMoneyBillWave} className="card-icon me-2" />
            {fee}
          </p>
          {/* <button className="flip-button">
            <FontAwesomeIcon icon={faInfoCircle} />
          </button> */}
        </div>
        <div className="card-back">
          <p>Event Details for {title}</p>
          {/* Add additional event details here */}
        </div>
      </div>
    </div>
  );
};

const PreEvents = () => {
  const [flippedCardIndex, setFlippedCardIndex] = useState(null);

  const handleCardClick = (index) => {
    setFlippedCardIndex(flippedCardIndex === index ? null : index);
  };

  const eventCards = [
    { imageSrc: "https://img.freepik.com/free-photo/magic-fairytale-book-concept_23-2150171884.jpg", title: "Mythology Quiz", date: "March 15, 2024", fee: "₹100" },
    { imageSrc: "https://img.freepik.com/premium-photo/alzheimer-amnesia-mental-health-concept-brain-model-missing-puzzle-pieces_577978-437.jpg", title: "Aptitude Quiz", date: "March 16, 2024", fee: "₹100" },
    { imageSrc: "https://img.freepik.com/premium-photo/studio-microphone-pop-shield-mic-empty-recording-studio_43263-2762.jpg", title: "Singing", date: "March 17, 2024", fee: "₹200" },
    { imageSrc: "https://img.freepik.com/free-photo/watercolor-painting-with-multi-colored-abstract-backgrounds-generative-ai_188544-7811.jpg", title: "Drawing", date: "March 18, 2024", fee: "₹150" },
    { imageSrc: "https://img.freepik.com/free-photo/diwali-festival-lights-tradition_23-2148688432.jpg", title: "Rangoli", date: "March 19, 2024", fee: "₹50" },
    { imageSrc: "https://img.freepik.com/free-photo/person-playing-3d-video-games-device_23-2151005751.jpg", title: "Coding Contest", date: "March 20, 2024", fee: "₹300" },
    { imageSrc: "https://img.freepik.com/premium-photo/arafed-soldier-with-gun-dark-room-with-flames-generative-ai_771703-50637.jpg", title: "Free Fire", date: "March 21, 2024", fee: "₹400" },
    { imageSrc: "https://img.freepik.com/free-photo/high-angle-hands-holding-smartphone_23-2149711481.jpg", title: "Reel Contest", date: "March 22, 2024", fee: "₹50" }
  ];

  return (
    <div className="sectionPreEvent pt-5 pb-5">
      <div className="container">
        <div className="row">
          <div className="col-12 p-0">
            <h2 className="banner-title text-center">
              Pre <span className="span">Events</span>
            </h2>
          </div>

          {eventCards.map((card, index) => (
            <PreEventCard
              key={index}
              imageSrc={card.imageSrc}
              title={card.title}
              date={card.date}
              fee={card.fee}
              isFlipped={flippedCardIndex === index}
              onClick={() => handleCardClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreEvents;
