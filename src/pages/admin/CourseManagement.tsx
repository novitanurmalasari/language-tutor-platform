import React, { useState, useEffect } from 'react';
import { Course, Teacher } from '../../types';
import apiService from '../../services/api';
import CourseForm from './CourseForm';
import './CourseManagement.css';

const CourseManagement: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [coursesData, teachersData] = await Promise.all([
        apiService.getCourses(),
        apiService.getTeachers()
      ]);
      setCourses(coursesData);
      setTeachers(teachersData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCourse = () => {
    setEditingCourse(null);
    setShowForm(true);
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
    setShowForm(true);
  };

  const handleDeleteCourse = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await apiService.deleteCourse(id);
        fetchData();
      } catch (error) {
        console.error('Error deleting course:', error);
      }
    }
  };

  const handleFormSubmit = async (courseData: Partial<Course>) => {
    try {
      if (editingCourse) {
        await apiService.updateCourse(editingCourse.id, courseData);
      } else {
        await apiService.createCourse(courseData);
      }
      setShowForm(false);
      fetchData();
    } catch (error) {
      console.error('Error saving course:', error);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="course-management">
      <div className="management-header">
        <h1>Course Management</h1>
        <button onClick={handleAddCourse} className="btn btn-primary">
          Add New Course
        </button>
      </div>

      {showForm && (
        <CourseForm
          course={editingCourse}
          teachers={teachers}
          onSubmit={handleFormSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="courses-table">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Language</th>
              <th>Level</th>
              <th>Duration</th>
              <th>Price</th>
              <th>Max Students</th>
              <th>Current Students</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course.id}>
                <td>{course.title}</td>
                <td>{course.language}</td>
                <td>{course.level}</td>
                <td>{course.duration} min</td>
                <td>Rp {course.price.toLocaleString('id-ID')}</td>
                <td>{course.maxStudents}</td>
                <td>{course.currentStudents}</td>
                <td>
                  <span className={`status ${course.isActive ? 'active' : 'inactive'}`}>
                    {course.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <button 
                    onClick={() => handleEditCourse(course)}
                    className="btn btn-sm btn-edit"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteCourse(course.id)}
                    className="btn btn-sm btn-delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseManagement;