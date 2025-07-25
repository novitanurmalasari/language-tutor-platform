import React from 'react';
import HeroSection from '../components/HeroSection';
import CourseCard from '../components/CourseCard';
import TestimonialCard from '../components/TestimonialCard';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import apiService from '../services/api';
import './HomePage.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { data: courses, loading: coursesLoading } = useApi(() => apiService.getCourses());
  const { data: testimonials, loading: testimonialsLoading } = useApi(() => apiService.getTestimonials());

  const handleBookCourse = (courseId: string) => {
    navigate(`/booking?course=${courseId}`);
  };

  const featuredCourses = courses?.slice(0, 3) || [];
  const featuredTestimonials = testimonials?.slice(0, 3) || [];

  return (
    <div className="home-page">
      <HeroSection />
      
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose Me?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎓</div>
              <h3>Certified Teacher</h3>
              <p>Professional certification in language teaching with proven methodologies</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌐</div>
              <h3>Bilingual Expert</h3>
              <p>Native Turkish speaker with fluent English proficiency</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3>Customized Lessons</h3>
              <p>Tailored curriculum based on your goals and learning style</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💻</div>
              <h3>Online & Offline</h3>
              <p>Flexible learning options to suit your schedule</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="courses-preview">
        <div className="container">
          <h2 className="section-title">Popular Courses</h2>
          {coursesLoading ? (
            <div className="loading">Loading courses...</div>
          ) : (
            <div className="courses-grid">
              {featuredCourses.map(course => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onBook={handleBookCourse}
                />
              ))}
            </div>
          )}
          <div className="section-cta">
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/courses')}
            >
              View All Courses
            </button>
          </div>
        </div>
      </section>
      
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">What Students Say</h2>
          {testimonialsLoading ? (
            <div className="loading">Loading testimonials...</div>
          ) : (
            <div className="testimonials-grid">
              {featuredTestimonials.map(testimonial => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Language Journey?</h2>
            <p>Book your first lesson today and get 20% off!</p>
            <button 
              className="btn btn-primary btn-large"
              onClick={() => navigate('/booking')}
            >
              Get Started Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;