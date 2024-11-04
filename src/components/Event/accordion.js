import React, { useState } from "react";
import "./accordion.css";

const AccordionMenu = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const questions = [
    "What are the events conducted by HHO?",
    "Why do we celebrate events in our university?",
    "On which occasions , do we celebrate them?",
    "What are the events conducted by HHO?",
    "Why do we celebrate events in our university?",
  ];

  const contentText = [
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti beatae necessitatibus, libero neque ullam molestiae ab, temporibus cupiditate hic illo blanditiis sapiente amet dolorum eveniet ipsum! Et repellat fugiat saepe!",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti beatae necessitatibus, libero neque ullam molestiae ab, temporibus cupiditate hic illo blanditiis sapiente amet dolorum eveniet ipsum! Et repellat fugiat saepe!",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti beatae necessitatibus, libero neque ullam molestiae ab, temporibus cupiditate hic illo blanditiis sapiente amet dolorum eveniet ipsum! Et repellat fugiat saepe!",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti beatae necessitatibus, libero neque ullam molestiae ab, temporibus cupiditate hic illo blanditiis sapiente amet dolorum eveniet ipsum! Et repellat fugiat saepe!",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti beatae necessitatibus, libero neque ullam molestiae ab, temporibus cupiditate hic illo blanditiis sapiente amet dolorum eveniet ipsum! Et repellat fugiat saepe!",
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="accordion-container p-3">
      <h2 className='event-name mt-3 mb-3 text-center'>Things to be <span className='span-el'>Known</span></h2>
      {questions.map((question, index) => (
        <div className="accordion" key={index}>
          <button
            className={`menu-button ${activeIndex === index ? "open" : ""}`}
            onClick={() => toggleAccordion(index)}
          >
            {question}
            <span className="icon">{activeIndex === index ? "-" : "+"}</span>
          </button>
          <div
            className="content mt-1"
            style={{
              height: activeIndex === index ? "auto" : "0",
              overflow: "hidden",
            }}
          >
            <p>{contentText[index]}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccordionMenu;
