import React, { useState } from 'react';
import CourseCard from '../components/CourseCard';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import apiService from '../services/api';
import { Course } from '../types';
import './CoursesPage.css';

const CoursesPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: courses, loading, error } = useApi(() => apiService.getCourses());
  const [filter, setFilter] = useState<'all' | 'Turkish' | 'English'>('all');
  const [levelFilter, setLevelFilter] = useState<'all' | 'Beginner' | 'Intermediate' | 'Advanced'>('all');

  const handleBookCourse = (courseId: string) => {
    navigate(`/booking?course=${courseId}`);
  };

  const filteredCourses = courses?.filter(course => {
    const languageMatch = filter === 'all' || course.language === filter;
    const levelMatch = levelFilter === 'all' || course.level === levelFilter;
    return languageMatch && levelMatch;
  }) || [];

  if (loading) return <div className="loading">Loading courses...</div>;
  if (error) return <div className="error">Error loading courses. Please try again.</div>;

  return (
    <div className="courses-page">
      <div className="container">
        <section className="courses-hero">
          <h1>Our Courses</h1>
          <p className="lead">
            Choose from a variety of Turkish and English language courses designed for all levels
          </p>
        </section>
        
        <section className="courses-filters">
          <div className="filter-group">
            <label>Language:</label>
            <div className="filter-buttons">
              <button 
                className={filter === 'all' ? 'active' : ''}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button 
                className={filter === 'Turkish' ? 'active' : ''}
                onClick={() => setFilter('Turkish')}
              >
                Turkish
              </button>
              <button 
                className={filter === 'English' ? 'active' : ''}
                onClick={() => setFilter('English')}
              >
                English
              </button>
            </div>
          </div>
          
          <div className="filter-group">
            <label>Level:</label>
            <div className="filter-buttons">
              <button 
                className={levelFilter === 'all' ? 'active' : ''}
                onClick={() => setLevelFilter('all')}
              >
                All Levels
              </button>
              <button 
                className={levelFilter === 'Beginner' ? 'active' : ''}
                onClick={() => setLevelFilter('Beginner')}
              >
                Beginner
              </button>
              <button 
                className={levelFilter === 'Intermediate' ? 'active' : ''}
                onClick={() => setLevelFilter('Intermediate')}
              >
                Intermediate
              </button>
              <button 
                className={levelFilter === 'Advanced' ? 'active' : ''}
                onClick={() => setLevelFilter('Advanced')}
              >
                Advanced
              </button>
            </div>
          </div>
        </section>
        
        <section className="courses-list">
          {filteredCourses.length === 0 ? (
            <div className="no-courses">
              <p>No courses found matching your criteria.</p>
            </div>
          ) : (
            <div className="courses-grid">
              {filteredCourses.map(course => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onBook={handleBookCourse}
                />
              ))}
            </div>
          )}
        </section>
        
        <section className="course-packages">
          <h2>Special Packages</h2>
          <div className="packages-grid">
            <div className="package-card">
              <h3>Starter Package</h3>
              <p className="package-price">Rp 1,500,000</p>
              <ul>
                <li>10 lessons (1 hour each)</li>
                <li>Free learning materials</li>
                <li>Progress tracking</li>
                <li>Certificate of completion</li>
              </ul>
              <button className="btn btn-primary">Choose Package</button>
            </div>
            
            <div className="package-card featured">
              <div className="badge">Most Popular</div>
              <h3>Professional Package</h3>
              <p className="package-price">Rp 2,800,000</p>
              <ul>
                <li>20 lessons (1 hour each)</li>
                <li>All learning materials included</li>
                <li>Weekly conversation practice</li>
                <li>24/7 chat support</li>
                <li>Certificate of completion</li>
              </ul>
              <button className="btn btn-primary">Choose Package</button>
            </div>
            
            <div className="package-card">
              <h3>Intensive Package</h3>
              <p className="package-price">Rp 5,000,000</p>
              <ul>
                <li>40 lessons (1 hour each)</li>
                <li>Premium learning materials</li>
                <li>Daily conversation practice</li>
                <li>Personal learning plan</li>
                <li>Priority support</li>
                <li>Advanced certificate</li>
              </ul>
              <button className="btn btn-primary">Choose Package</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CoursesPage;