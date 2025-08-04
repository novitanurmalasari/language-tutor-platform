import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAdmin } from '../../contexts/AdminContext';
import './AdminDashboard.css';

const AdminDashboard: React.FC = () => {
  const { admin, logout } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
          <p>Welcome, {admin?.username}</p>
        </div>
        
        <nav className="admin-nav">
          <Link to="/admin/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/admin/courses" className="nav-link">Manage Courses</Link>
          <Link to="/admin/bookings" className="nav-link">Manage Bookings</Link>
          <Link to="/admin/testimonials" className="nav-link">Manage Testimonials</Link>
          <Link to="/admin/messages" className="nav-link">Contact Messages</Link>
        </nav>
        
        <button onClick={handleLogout} className="btn btn-logout">
          Logout
        </button>
      </aside>
      
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;