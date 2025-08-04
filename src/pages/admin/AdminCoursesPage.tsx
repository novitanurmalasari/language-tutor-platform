import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../../types';
import apiService from '../../services/api';
import './AdminCoursesPage.css';

const AdminCoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLanguage, setFilterLanguage] = useState<'all' | 'Turkish' | 'English'>('all');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await apiService.getCourses();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await apiService.deleteCourse(id);
        fetchCourses();
      } catch (error) {
        console.error('Error deleting course:', error);
      }
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      await apiService.updateCourse(id, { isActive: !currentStatus });
      fetchCourses();
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLanguage = filterLanguage === 'all' || course.language === filterLanguage;
    return matchesSearch && matchesLanguage;
  });

  if (loading) return <div className="loading">Loading courses...</div>;

  return (
    <div className="admin-courses-page">
      <div className="page-header">
        <h1>Manage Courses</h1>
        <Link to="/admin/courses/new" className="btn btn-primary">
          Add New Course
        </Link>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        
        <select
          value={filterLanguage}
          onChange={(e) => setFilterLanguage(e.target.value as any)}
          className="filter-select"
        >
          <option value="all">All Languages</option>
          <option value="Turkish">Turkish</option>
          <option value="English">English</option>
        </select>
      </div>

      <div className="courses-table">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Language</th>
              <th>Level</th>
              <th>Duration</th>
              <th>Price</th>
              <th>Students</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.map(course => (
              <tr key={course.id}>
                <td>{course.title}</td>
                <td>
                  <span className={`badge badge-${course.language.toLowerCase()}`}>
                    {course.language}
                  </span>
                </td>
                <td>{course.level}</td>
                <td>{course.duration} min</td>
                <td>Rp {course.price.toLocaleString('id-ID')}</td>
                <td>{course.currentStudents}/{course.maxStudents}</td>
                <td>
                  <button
                    className={`status-toggle ${course.isActive ? 'active' : 'inactive'}`}
                    onClick={() => handleToggleActive(course.id, course.isActive)}
                  >
                    {course.isActive ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td>
                  <div className="action-buttons">
                    <Link to={`/admin/courses/edit/${course.id}`} className="btn-edit">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(course.id)}
                      className="btn-delete"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCoursesPage;