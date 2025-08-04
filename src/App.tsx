import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { AdminAuthProvider } from './contexts/AdminAuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminLayout from './components/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CoursesPage from './pages/CoursesPage';
import BookingPage from './pages/BookingPage';
import ContactPage from './pages/ContactPage';

// Admin Pages
import LoginPage from './pages/admin/LoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import AdminCoursesPage from './pages/admin/CoursesPage';
import CourseFormPage from './pages/admin/CourseFormPage';
import AdminBookingsPage from './pages/admin/BookingsPage';
import TestimonialsPage from './pages/admin/TestimonialsPage';

import './App.css';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AdminAuthProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={
                <div className="app">
                  <Header />
                  <main className="main-content">
                    <HomePage />
                  </main>
                  <Footer />
                </div>
              } />
              
              <Route path="/about" element={
                <div className="app">
                  <Header />
                  <main className="main-content">
                    <AboutPage />
                  </main>
                  <Footer />
                </div>
              } />
              
              <Route path="/courses" element={
                <div className="app">
                  <Header />
                  <main className="main-content">
                    <CoursesPage />
                  </main>
                  <Footer />
                </div>
              } />
              
              <Route path="/booking" element={
                <div className="app">
                  <Header />
                  <main className="main-content">
                    <BookingPage />
                  </main>
                  <Footer />
                </div>
              } />
              
              <Route path="/contact" element={
                <div className="app">
                  <Header />
                  <main className="main-content">
                    <ContactPage />
                  </main>
                  <Footer />
                </div>
              } />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<LoginPage />} />
              
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }>
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="courses" element={<AdminCoursesPage />} />
                <Route path="courses/new" element={<CourseFormPage />} />
                <Route path="courses/:id/edit" element={<CourseFormPage />} />
                <Route path="bookings" element={<AdminBookingsPage />} />
                <Route path="testimonials" element={<TestimonialsPage />} />
                {/* Add more admin routes as needed */}
              </Route>
            </Routes>
          </Router>
        </AdminAuthProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;