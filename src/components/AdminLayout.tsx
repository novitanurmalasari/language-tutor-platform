import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import './AdminLayout.css';

const AdminLayout: React.FC = () => {
  const { user, logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <h2>LinguaTeach Admin</h2>
        </div>
        
        <nav className="admin-nav">
          <Link to="/admin/dashboard" className="nav-item">
            <span className="icon">📊</span> Dashboard
          </Link>
          <Link to="/admin/courses" className="nav-item">
            <span className="icon">📚</span> Courses
          </Link>
          <Link to="/admin/teachers" className="nav-item">
            <span className="icon">👨‍🏫</span> Teachers
          </Link>
          <Link to="/admin/bookings" className="nav-item">
            <span className="icon">📅</span> Bookings
          </Link>
          <Link to="/admin/testimonials" className="nav-item">
            <span className="icon">⭐</span> Testimonials
          </Link>
          <Link to="/admin/messages" className="nav-item">
            <span className="icon">✉️</span> Messages
          </Link>
        </nav>
        
        <div className="admin-user">
          <p>Logged in as:</p>
          <p className="username">{user?.username}</p>
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
      </aside>
      
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;