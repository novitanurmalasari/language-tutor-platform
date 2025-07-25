import React from 'react';
import { Testimonial } from '../types';
import './TestimonialCard.css';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>
        ★
      </span>
    ));
  };

  return (
    <div className="testimonial-card">
      <div className="testimonial-header">
        <h4 className="student-name">{testimonial.studentName}</h4>
        <div className="rating">{renderStars(testimonial.rating)}</div>
      </div>
      <p className="course-name">{testimonial.course}</p>
      <p className="testimonial-comment">"{testimonial.comment}"</p>
      <p className="testimonial-date">{testimonial.date}</p>
    </div>
  );
};

export default TestimonialCard;