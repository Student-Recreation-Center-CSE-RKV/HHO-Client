import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@mui/material'; // Import CircularProgress from Material UI
import "./herosection.css";
import axios from 'axios';
import { AppContext } from '../../context/Context';

export default function HeroSection() {
  const { setAlertMsg, setErrorOcc, setOpen,apiUrl } = useContext(AppContext);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for the button
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    year: "",
    title: "",
    description: "",
    email: ""
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form is submitted
    try {
      const response = await fetch(`${apiUrl}/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      setAlertMsg(result.message);
      setErrorOcc(false);
      setOpen(true);
      setFormData({
        name: "",
        id: "",
        year: "",
        title: "",
        description: "",
        email: ""
      });
    } catch (error) {
      console.error("Error sending email:", error);
      setAlertMsg(error.message);
      setErrorOcc(true);
      setOpen(true);
    } finally {
      setLoading(false); // Reset loading state after request completion
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
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
    <div>
      <section className="banner-container">
        <div className="banner-content">
          <h1 className="banner-title">
            Welcome to <span className="span">HHO Family</span>
          </h1>
          <p className="banner-subtitle text-center">Help For The Needy</p>
          <div>
            <button
              className="btn about-button mt-md-5"
              onClick={() => setShowModal(true)}
            >
              Get Help
            </button>
            <button
              className="btn about-button mt-md-5"
              style={{ marginLeft: "20px" }}
            >
              Our Services
            </button>
          </div>
        </div>
      </section>

      <div
        className={`container-fluid p-3 ${isVisible ? "animate" : ""}`}
        style={{ backgroundColor: "white" }}
        ref={sectionRef}
      >
        <div className="row" style={{ backgroundColor: "whitesmoke" }}>
          <div className="col-12">
            <h1 className="about-head text-center mt-5 banner-title">
              About <span className="span">HHO</span>
            </h1>
          </div>
          <div className="col-12 col-md-6">
            <img
              src="https://res.cloudinary.com/dnbeeynnu/image/upload/v1726826896/HHO/navbar/hho_logo_s548ea.png"
              alt="pic"
              className="w-100"
            />
          </div>
          <div className="col-12 col-md-6">
            <p className="about-head-text text-center mt-md-5">
              HELPING HANDS ORGANISATION
            </p>
            <p className="about-text desc-about-hho">
              At Helping Hands Organization, we believe in the power of community and
              compassion. Our mission is to uplift lives through meaningful service,
              empowering individuals to make a positive impact in their communities.
              Whether it's providing support during emergencies, organizing fundraising
              campaigns, or offering leadership and skill-building opportunities, HHO
              stands as a beacon of hope and generosity. Together, we foster a spirit
              of teamwork, empathy, and service, transforming lives and shaping a
              brighter future for all. Join us in making a difference—because with
              Helping Hands, every hand matters.
            </p>
            <div className="text-center">
              <Link to="/about">
                <button className="btn about-button mt-md-5 rm-btn">Read More</button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">Get Help</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <div className="floating-label">
                    <input
                      type="text"
                      name="name"
                      placeholder=" "
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                    <label>Name</label>
                  </div>
                </div>
                <div className="form-group">
                  <div className="floating-label">
                    <input
                      type="text"
                      name="id"
                      placeholder=" "
                      value={formData.id}
                      onChange={handleInputChange}
                      required
                    />
                    <label>ID</label>
                  </div>
                </div>
                <div className="form-group">
                  <div className="floating-label">
                    <select
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="" disabled>
                        Select Year
                      </option>
                      <option value="P1">P1</option>
                      <option value="P2">P2</option>
                      <option value="E1">E1</option>
                      <option value="E2">E2</option>
                      <option value="E3">E3</option>
                      <option value="E4">E4</option>
                    </select>
                    <label>Year</label>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <div className="floating-label">
                  <input
                    type="email"
                    name="email"
                    placeholder=" "
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <label>Email</label>
                </div>
              </div>

              <div className="form-group">
                <div className="floating-label">
                  <input
                    type="text"
                    name="title"
                    placeholder=" "
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                  <label>Title</label>
                </div>
              </div>

              <div className="form-group">
                <div className="floating-label">
                  <textarea
                    name="description"
                    placeholder=" "
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                  <label>Description</label>
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  className="btn about-button"
                  disabled={loading} // Disable button when loading
                  style={{ position: "relative", width: "100px" }} // Fixed width for button
                >
                  {loading ? (
                    <CircularProgress
                      size={24}
                      color="inherit"
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  ) : (
                    "Submit"
                  )}
                </button>
                <button
                  type="button"
                  className="btn about-button"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
