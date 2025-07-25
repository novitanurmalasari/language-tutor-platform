import React from 'react';
import { Course } from '../types';
import './CourseCard.css';

interface CourseCardProps {
  course: Course;
  onBook: (courseId: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onBook }) => {
  const availableSlots = course.maxStudents - course.currentStudents;
  
  return (
    <div className="course-card">
      <div className="course-header">
        <h3 className="course-title">{course.title}</h3>
        <span className={`language-badge ${course.language.toLowerCase()}`}>
          {course.language}
        </span>
      </div>
      
      <div className="course-details">
        <p className="course-level">Level: {course.level}</p>
        <p className="course-description">{course.description}</p>
        
        <div className="course-info">
          <div className="info-item">
            <span className="info-icon">⏱️</span>
            <span>{course.duration} minutes/session</span>
          </div>
          <div className="info-item">
            <span className="info-icon">💰</span>
            <span>Rp {course.price.toLocaleString('id-ID')}</span>
          </div>
          <div className="info-item">
            <span className="info-icon">👥</span>
            <span>{availableSlots} slots available</span>
          </div>
        </div>
        
        <div className="course-schedule">
          <p className="schedule-label">Available:</p>
          <div className="schedule-days">
            {course.schedule.map((day, index) => (
              <span key={index} className="schedule-day">{day}</span>
            ))}
          </div>
        </div>
        
        <button 
          className="btn btn-book"
          onClick={() => onBook(course.id)}
          disabled={availableSlots === 0}
        >
          {availableSlots > 0 ? 'Book This Course' : 'Fully Booked'}
        </button>
      </div>
    </div>
  );
};

export default CourseCard;