import React from 'react';
import { Link } from 'react-router-dom';
import './HeroSection.css';

const HeroSection: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Learn <span className="highlight">Turkish</span> & <span className="highlight">English</span>
          <br />
          with a Professional Teacher
        </h1>
        <p className="hero-subtitle">
          Personalized lessons tailored to your learning style and goals
        </p>
        <div className="hero-buttons">
          <Link to="/booking" className="btn btn-primary">
            Book Your First Lesson
          </Link>
          <Link to="/courses" className="btn btn-secondary">
            View Courses
          </Link>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">500+</span>
            <span className="stat-label">Happy Students</span>
          </div>
          <div className="stat">
            <span className="stat-number">10+</span>
            <span className="stat-label">Years Experience</span>
          </div>
          <div className="stat">
            <span className="stat-number">4.9</span>
            <span className="stat-label">Average Rating</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;