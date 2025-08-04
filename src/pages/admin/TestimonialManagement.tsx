import React, { useState, useEffect } from 'react';
import { Testimonial } from '../../types';
import apiService from '../../services/api';
import './TestimonialManagement.css';

const TestimonialManagement: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'approved' | 'pending'>('all');

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const [approvedData, pendingData] = await Promise.all([
        apiService.getTestimonials(),
        apiService.getPendingTestimonials()
      ]);
      setTestimonials([...approvedData, ...pendingData]);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await apiService.updateTestimonialStatus(id);
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

  const filteredTestimonials = testimonials.filter(testimonial => {
    if (filter === 'approved') return testimonial.isApproved;
    if (filter === 'pending') return !testimonial.isApproved;
    return true;
  });

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="testimonial-management">
      <div className="management-header">
        <h1>Testimonial Management</h1>
        <div className="filter-buttons">
          <button 
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All ({testimonials.length})
          </button>
          <button 
            className={filter === 'approved' ? 'active' : ''}
            onClick={() => setFilter('approved')}
          >
            Approved ({testimonials.filter(t => t.isApproved).length})
          </button>
          <button 
            className={filter === 'pending' ? 'active' : ''}
            onClick={() => setFilter('pending')}
          >
            Pending ({testimonials.filter(t => !t.isApproved).length})
          </button>
        </div>
      </div>

      <div className="testimonials-grid">
        {filteredTestimonials.map(testimonial => (
          <div key={testimonial.id} className="testimonial-admin-card">
            <div className="header">
              <div>
                <h3>{testimonial.studentName}</h3>
                <p className="course">{testimonial.course}</p>
              </div>
              <div className="rating">
                {'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}
              </div>
            </div>
            
            <p className="comment">"{testimonial.comment}"</p>
            
            <div className="footer">
              <span className="date">{testimonial.date}</span>
              <div className="actions">
                {!testimonial.isApproved ? (
                  <button 
                    onClick={() => handleApprove(testimonial.id)}
                    className="btn btn-sm btn-approve"
                  >
                    Approve
                  </button>
                ) : (
                  <span className="approved-badge">Approved</span>
                )}
                <button 
                  onClick={() => handleDelete(testimonial.id)}
                  className="btn btn-sm btn-delete"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialManagement;