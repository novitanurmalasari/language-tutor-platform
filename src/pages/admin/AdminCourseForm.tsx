import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Course } from '../../types';
import apiService from '../../services/api';
import './AdminCourseForm.css';

const AdminCourseForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: '',
    language: 'English' as 'Turkish' | 'English',
    level: 'Beginner' as 'Beginner' | 'Intermediate' | 'Advanced',
    description: '',
    duration: 60,
    price: 0,
    maxStudents: 5,
    schedule: [] as string[],
    isActive: true
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  useEffect(() => {
    if (isEdit) {
      fetchCourse();
    }
  }, [id]);

  const fetchCourse = async () => {
    try {
      const course = await apiService.getCourse(id!);
      setFormData({
        title: course.title,
        language: course.language,
        level: course.level,
        description: course.description,
        duration: course.duration,
        price: course.price,
        maxStudents: course.maxStudents,
        schedule: course.schedule,
        isActive: course.isActive
      });
    } catch (error) {
      console.error('Error fetching course:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handleScheduleChange = (day: string) => {
    setFormData(prev => ({
      ...prev,
      schedule: prev.schedule.includes(day)
        ? prev.schedule.filter(d => d !== day)
        : [...prev.schedule, day]
    }));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title) newErrors.title = 'Title is required';
    if (formData.duration < 30) newErrors.duration = 'Duration must be at least 30 minutes';
    if (formData.price < 0) newErrors.price = 'Price cannot be negative';
    if (formData.maxStudents < 1) newErrors.maxStudents = 'Must allow at least 1 student';
    if (formData.schedule.length === 0) newErrors.schedule = 'Select at least one day';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      if (isEdit) {
        await apiService.updateCourse(id!, formData);
      } else {
        await apiService.createCourse(formData);
      }
      navigate('/admin/courses');
    } catch (error) {
      console.error('Error saving course:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-course-form">
      <div className="form-header">
        <h1>{isEdit ? 'Edit Course' : 'Add New Course'}</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="title">Course Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={errors.title ? 'error' : ''}
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="language">Language *</label>
            <select
              id="language"
              name="language"
              value={formData.language}
              onChange={handleChange}
            >
              <option value="English">English</option>
              <option value="Turkish">Turkish</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="level">Level *</label>
            <select
              id="level"
              name="level"
              value={formData.level}
              onChange={handleChange}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div className="form-group full-width">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
            />
          </div>

          <div className="form-group">
            <label htmlFor="duration">Duration (minutes) *</label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              min="30"
              max="180"
              className={errors.duration ? 'error' : ''}
            />
            {errors.duration && <span className="error-message">{errors.duration}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="price">Price (IDR) *</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              className={errors.price ? 'error' : ''}
            />
            {errors.price && <span className="error-message">{errors.price}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="maxStudents">Max Students *</label>
            <input
              type="number"
              id="maxStudents"
              name="maxStudents"
              value={formData.maxStudents}
              onChange={handleChange}
              min="1"
              max="20"
              className={errors.maxStudents ? 'error' : ''}
            />
            {errors.maxStudents && <span className="error-message">{errors.maxStudents}</span>}
          </div>

          <div className="form-group full-width">
            <label>Schedule Days *</label>
            <div className="schedule-grid">
              {daysOfWeek.map(day => (
                <label key={day} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.schedule.includes(day)}
                    onChange={() => handleScheduleChange(day)}
                  />
                  {day}
                </label>
              ))}
            </div>
            {errors.schedule && <span className="error-message">{errors.schedule}</span>}
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
              />
              Course is active
            </label>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/admin/courses')}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : (isEdit ? 'Update Course' : 'Create Course')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminCourseForm;