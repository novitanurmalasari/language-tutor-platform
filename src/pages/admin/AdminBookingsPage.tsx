import React, { useState, useEffect } from 'react';
import { Booking } from '../../types';
import apiService from '../../services/api';
import { formatters } from '../../utils/formatters';
import './AdminBookingsPage.css';

const AdminBookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await apiService.getBookings();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    try {
      await apiService.updateBookingStatus(bookingId, newStatus);
      fetchBookings();
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  const filteredBookings = bookings.filter(booking => 
    filterStatus === 'all' || booking.status === filterStatus
  );

  if (loading) return <div className="loading">Loading bookings...</div>;

  return (
    <div className="admin-bookings-page">
      <div className="page-header">
        <h1>Manage Bookings</h1>
        <div className="stats">
          <span>Total: {bookings.length}</span>
          <span>Pending: {bookings.filter(b => b.status === 'pending').length}</span>
          <span>Confirmed: {bookings.filter(b => b.status === 'confirmed').length}</span>
        </div>
      </div>

      <div className="filters">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="bookings-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Student</th>
              <th>Course</th>
              <th>Contact</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map(booking => (
              <tr key={booking.id}>
                <td>{formatters.date(booking.date)}</td>
                <td>{formatters.time(booking.time)}</td>
                <td>{booking.studentName}</td>
                <td>
                  <div className="course-info">
                    <span>{booking.courseTitle}</span>
                    <small>{booking.courseLanguage} - {booking.courseLevel}</small>
                  </div>
                </td>
                <td>
                  <div className="contact-info">
                    <small>{booking.studentEmail}</small>
                    <small>{booking.studentPhone}</small>
                  </div>
                </td>
                <td>
                  <span className={`status status-${booking.status}`}>
                    {booking.status}
                  </span>
                </td>
                <td>
                  <select
                    value={booking.status}
                    onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                    className="status-select"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="completed">Completed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBookingsPage;