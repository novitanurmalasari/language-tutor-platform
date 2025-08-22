import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import apiService from '../../services/api';
import './AdminDashboard.css';

interface DashboardStats {
  totalCourses: number;
  totalBookings: number;
  pendingBookings: number;
  totalTestimonials: number;
  totalRevenue: number;
}

const AdminDashboard: React.FC = () => {
  const { user } = useAdminAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalCourses: 0,
    totalBookings: 0,
    pendingBookings: 0,
    totalTestimonials: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch all data needed for dashboard
      const [courses, bookings, testimonials] = await Promise.all([
        apiService.getCourses(),
        apiService.getBookings(),
        apiService.getTestimonials()
      ]);

      // Calculate stats
      const pendingBookings = bookings.filter(b => b.status === 'pending').length;
      const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
      
      // Calculate revenue from confirmed bookings (simplified)
      const revenue = confirmedBookings * 250000; // Example fixed price

      setStats({
        totalCourses: courses.length,
        totalBookings: bookings.length,
        pendingBookings: pendingBookings,
        totalTestimonials: testimonials.length,
        totalRevenue: revenue
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <h1>Dashboard Overview</h1>
        <p>Welcome back, {user?.username}!</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-info">
            <h3>Total Courses</h3>
            <p className="stat-number">{stats.totalCourses}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-info">
            <h3>Total Bookings</h3>
            <p className="stat-number">{stats.totalBookings}</p>
            <span className="stat-detail">{stats.pendingBookings} pending</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-info">
            <h3>Testimonials</h3>
            <p className="stat-number">{stats.totalTestimonials}</p>
          </div>
        </div>

        <div className="stat-card revenue">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>Total Revenue</h3>
            <p className="stat-number">
              Rp {stats.totalRevenue.toLocaleString('id-ID')}
            </p>
          </div>
        </div>
      </div>

      <div className="recent-activities">
        <h2>Quick Actions</h2>
        <div className="quick-actions-grid">
          <button className="quick-action-card">
            <span className="action-icon">➕</span>
            <span>Add New Course</span>
          </button>
          <button className="quick-action-card">
            <span className="action-icon">👁️</span>
            <span>View Bookings</span>
          </button>
          <button className="quick-action-card">
            <span className="action-icon">✉️</span>
            <span>Check Messages</span>
          </button>
          <button className="quick-action-card">
            <span className="action-icon">📊</span>
            <span>View Reports</span>
          </button>
        </div>
      </div>

      <div className="dashboard-info">
        <div className="info-card">
          <h3>Recent Activity</h3>
          <ul className="activity-list">
            <li>New booking received from John Doe</li>
            <li>Course "Turkish for Beginners" updated</li>
            <li>3 new testimonials pending approval</li>
            <li>Weekly report generated</li>
          </ul>
        </div>
        
        <div className="info-card">
          <h3>System Status</h3>
          <div className="status-item">
            <span className="status-label">Website</span>
            <span className="status-indicator online">Online</span>
          </div>
          <div className="status-item">
            <span className="status-label">Database</span>
            <span className="status-indicator online">Connected</span>
          </div>
          <div className="status-item">
            <span className="status-label">Last Backup</span>
            <span className="status-indicator">2 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;