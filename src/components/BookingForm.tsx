import React, { useState } from 'react';
import { Course, Booking } from '../types';
import './BookingForm.css';

interface BookingFormProps {
  courses: Course[];
  onSubmit: (booking: Omit<Booking, 'id' | 'status' | 'createdAt'>) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ courses, onSubmit }) => {
  const [formData, setFormData] = useState({
    studentName: '',
    studentEmail: '',
    studentPhone: '',
    courseId: '',
    date: '',
    time: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.studentName) newErrors.studentName = 'Name is required';
    if (!formData.studentEmail) newErrors.studentEmail = 'Email is required';
    if (!formData.studentPhone) newErrors.studentPhone = 'Phone is required';
    if (!formData.courseId) newErrors.courseId = 'Please select a course';
    if (!formData.date) newErrors.date = 'Please select a date';
    if (!formData.time) newErrors.time = 'Please select a time';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <h2>Book Your Lesson</h2>
      
      <div className="form-group">
        <label htmlFor="studentName">Full Name *</label>
        <input
          type="text"
          id="studentName"
          name="studentName"
          value={formData.studentName}
          onChange={handleChange}
          className={errors.studentName ? 'error' : ''}
        />
        {errors.studentName && <span className="error-message">{errors.studentName}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="studentEmail">Email *</label>
        <input
          type="email"
          id="studentEmail"
          name="studentEmail"
          value={formData.studentEmail}
          onChange={handleChange}
          className={errors.studentEmail ? 'error' : ''}
        />
        {errors.studentEmail && <span className="error-message">{errors.studentEmail}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="studentPhone">Phone Number *</label>
        <input
          type="tel"
          id="studentPhone"
          name="studentPhone"
          value={formData.studentPhone}
          onChange={handleChange}
          className={errors.studentPhone ? 'error' : ''}
        />
        {errors.studentPhone && <span className="error-message">{errors.studentPhone}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="courseId">Select Course *</label>
        <select
          id="courseId"
          name="courseId"
          value={formData.courseId}
          onChange={handleChange}
          className={errors.courseId ? 'error' : ''}
        >
          <option value="">-- Select a course --</option>
          {courses.map(course => (
            <option key={course.id} value={course.id}>
              {course.title} - {course.language} ({course.level})
            </option>
          ))}
        </select>
        {errors.courseId && <span className="error-message">{errors.courseId}</span>}
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="date">Preferred Date *</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            className={errors.date ? 'error' : ''}
          />
          {errors.date && <span className="error-message">{errors.date}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="time">Preferred Time *</label>
          <select
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className={errors.time ? 'error' : ''}
          >
            <option value="">-- Select time --</option>
            <option value="09:00">09:00 AM</option>
            <option value="10:00">10:00 AM</option>
            <option value="11:00">11:00 AM</option>
            <option value="14:00">02:00 PM</option>
            <option value="15:00">03:00 PM</option>
            <option value="16:00">04:00 PM</option>
            <option value="17:00">05:00 PM</option>
            <option value="18:00">06:00 PM</option>
            <option value="19:00">07:00 PM</option>
          </select>
          {errors.time && <span className="error-message">{errors.time}</span>}
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="message">Additional Message (Optional)</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          placeholder="Tell me about your learning goals..."
        />
      </div>
      
      <button type="submit" className="btn btn-primary btn-submit">
        Submit Booking Request
      </button>
    </form>
  );
};

export default BookingForm;