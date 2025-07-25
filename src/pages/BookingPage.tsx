import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BookingForm from '../components/BookingForm';
import { useApi } from '../hooks/useApi';
import apiService from '../services/api';
import { Booking } from '../types';
import './BookingPage.css';

const BookingPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const queryParams = new URLSearchParams(location.search);
  const preselectedCourseId = queryParams.get('course');
  
  const { data: courses, loading } = useApi(() => apiService.getCourses());

  const handleSubmitBooking = async (bookingData: Omit<Booking, 'id' | 'status' | 'createdAt'>) => {
    setSubmitting(true);
    try {
      await apiService.createBooking(bookingData);
      setBookingSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Failed to submit booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="booking-page">
      <div className="container">
        {bookingSuccess ? (
          <div className="booking-success">
            <div className="success-icon">✅</div>
            <h2>Booking Successful!</h2>
            <p>Thank you for your booking. We'll contact you within 24 hours to confirm your lesson.</p>
            <p>Redirecting to home page...</p>
          </div>
        ) : (
          <>
            <section className="booking-hero">
              <h1>Book Your Lesson</h1>
              <p className="lead">
                Take the first step towards mastering Turkish or English
              </p>
            </section>
            
            <div className="booking-content">
              <div className="booking-form-wrapper">
                <BookingForm
                  courses={courses || []}
                  onSubmit={handleSubmitBooking}
                />
              </div>
              
              <div className="booking-info">
                <div className="info-card">
                  <h3>How It Works</h3>
                  <ol>
                    <li>Fill out the booking form</li>
                    <li>Choose your preferred course and schedule</li>
                    <li>Receive confirmation within 24 hours</li>
                    <li>Start your language journey!</li>
                  </ol>
                </div>
                
                <div className="info-card">
                  <h3>Payment Methods</h3>
                  <ul>
                    <li>💳 Bank Transfer</li>
                    <li>💰 E-Wallet (GoPay, OVO, Dana)</li>
                    <li>💵 Cash (for offline lessons)</li>
                  </ul>
                </div>
                
                <div className="info-card">
                  <h3>Cancellation Policy</h3>
                  <p>
                    Free cancellation up to 24 hours before your scheduled lesson. 
                    Late cancellations may be subject to a fee.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingPage;