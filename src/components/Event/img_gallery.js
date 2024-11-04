import React from "react";
import "./img_gallery.css";

const Gallery = () => {
  const images = [
    "https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=MnwxfDB8MXxyYW5kb218MHx8bGFuZHNjYXBlfHx8fHx8MTY2MjEyMDE3MQ&ixlib=rb-1.2.1&q=80",
    "https://images.unsplash.com/photo-1551978429-3dbfed5cacc9?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=MnwxfDB8MXxyYW5kb218MHx8bGFuZHNjYXBlfHx8fHx8MTY2MjEyMDE3NA&ixlib=rb-1.2.1&q=80",
    "https://images.unsplash.com/photo-1472396961693-142e6e269027?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=MnwxfDB8MXxyYW5kb218MHx8bGFuZHNjYXBlfHx8fHx8MTY2MjEyMDE3Nw&ixlib=rb-1.2.1&q=80",
    "https://images.unsplash.com/photo-1523437237164-d442d57cc3c9?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=MnwxfDB8MXxyYW5kb218MHx8bGFuZHNjYXBlfHx8fHx8MTY2MjEyMDE3OA&ixlib=rb-1.2.1&q=80",
    "https://images.unsplash.com/photo-1494625927555-6ec4433b1571?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=MnwxfDB8MXxyYW5kb218MHx8bGFuZHNjYXBlfHx8fHx8MTY2MjEyMDE4MA&ixlib=rb-1.2.1&q=80",
    "https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=MnwxfDB8MXxyYW5kb218MHx8bGFuZHNjYXBlfHx8fHx8MTY2MjEyMDE3MQ&ixlib=rb-1.2.1&q=80",
    "https://images.unsplash.com/photo-1551978429-3dbfed5cacc9?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=MnwxfDB8MXxyYW5kb218MHx8bGFuZHNjYXBlfHx8fHx8MTY2MjEyMDE3NA&ixlib=rb-1.2.1&q=80",
    "https://images.unsplash.com/photo-1472396961693-142e6e269027?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=MnwxfDB8MXxyYW5kb218MHx8bGFuZHNjYXBlfHx8fHx8MTY2MjEyMDE3Nw&ixlib=rb-1.2.1&q=80",
    "https://images.unsplash.com/photo-1523437237164-d442d57cc3c9?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=MnwxfDB8MXxyYW5kb218MHx8bGFuZHNjYXBlfHx8fHx8MTY2MjEyMDE3OA&ixlib=rb-1.2.1&q=80",
    "https://images.unsplash.com/photo-1494625927555-6ec4433b1571?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=MnwxfDB8MXxyYW5kb218MHx8bGFuZHNjYXBlfHx8fHx8MTY2MjEyMDE4MA&ixlib=rb-1.2.1&q=80",
  ];

  return (
    <>
    <h2 className="event-name mb-2 mt-4 text-center">Memories of <span className="span-el">Event</span></h2>
    <div className="mb-5 d-flex flex-row justify-content-center">
        <ul className="gallery">
      {images.map((src, index) => (
        <li className="gallery-item" key={index}>
          <a href="#" className="gallery-link">
            <img src={src} alt={`Image ${index + 1}`} className="gallery-image" />
          </a>
        </li>
      ))}
    </ul>
    </div>
    </>
  );
};

export default Gallery;
