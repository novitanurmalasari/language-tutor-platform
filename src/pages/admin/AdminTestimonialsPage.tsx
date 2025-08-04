mport React, { useState, useEffect } from 'react';
import { Testimonial } from '../../types';
import apiService from '../../services/api';
import './AdminTestimonialsPage.css';

const AdminTestimonialsPage: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPending, setShowPending] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, [showPending]);

  const fetchTestimonials = async () => {
    try {
      const data = showPending 
        ? await apiService.getPendingTestimonials()
        : await apiService.getTestimonials();
      setTestimonials(data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await apiService.approveTestimonial(id);
      fetchTestimonials();
    } catch (error) {
      console.error('Error approving testimonial:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await apiService.deleteTestimonial(id);
        fetchTestimonials();
      } catch (error) {
        console.error('Error deleting testimonial:', error);
      }
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'star filled' : 'star'}>★</span>
    ));
  };

  if (loading) return <div className="loading">Loading testimonials...</div>;

  return (
    <div className="admin-testimonials-page">
      <div className="page-header">
        <h1>Manage Testimonials</h1>
        <div className="toggle-switch">
          <button
            className={showPending ? 'active' : ''}
            onClick={() => setShowPending(true)}
          >
            Pending ({testimonials.filter(t => !t.isApproved).length})
          </button>
          <button
            className={!showPending ? 'active' : ''}
            onClick={() => setShowPending(false)}
          >
            Approved
          </button>
        </div>
      </div>

      <div className="testimonials-grid">
        {testimonials.map(testimonial => (
          <div key={testimonial.id} className="testimonial-card">
            <div className="testimonial-header">
              <h3>{testimonial.studentName}</h3>
              <div className="rating">{renderStars(testimonial.rating)}</div>
            </div>
            <p className="course">{testimonial.course}</p>
            <p className="comment">"{testimonial.comment}"</p>
            <p className="date">{testimonial.date}</p>
            
            <div className="actions">
              {!testimonial.isApproved && (
                <button
                  className="btn btn-approve"
                  onClick={() => handleApprove(testimonial.id)}
                >
                  Approve
                </button>
              )}
              <button
                className="btn btn-delete"
                onClick={() => handleDelete(testimonial.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTestimonialsPage;