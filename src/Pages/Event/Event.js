import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Slider from '../../components/Event/Slider';
import PastEvents from '../../components/Event/past_events';
import  Accordion  from '../../components/Event/accordion'; // Adjust the path as necessary


function Event() {
  return (
    <>
        <Slider />
        <PastEvents />
        <Accordion />
    </>
    
  );
}

export default Event;
