import React, { useState, useEffect } from 'react';
import { Course, Teacher } from '../../types';
import './CourseForm.css';

interface CourseFormProps {
  course: Course | null;
  teachers: Teacher[];
  onSubmit: (data: Partial<Course>) => void;
  onCancel: () => void;
}

const CourseForm: React.FC<CourseFormProps> = ({ course, teachers, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    language: 'English' as 'Turkish' | 'English',
    level: 'Beginner' as 'Beginner' | 'Intermediate' | 'Advanced',
    description: '',
    duration: 60,
    price: 0,
    maxStudents: 5,
    isActive: true,
    schedule: [] as string[],
    teacherId: ''
  });

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title,
        language: course.language,
        level: course.level,
        description: course.description,
        duration: course.duration,
        price: course.price,
        maxStudents: course.maxStudents,
        isActive: course.isActive,
        schedule: course.schedule,
        teacherId: course.teacherId || ''
      });
    }
  }, [course]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: target.checked }));
    } else if (name === 'price' || name === 'duration' || name === 'maxStudents') {
      setFormData(prev => ({ ...prev, [name]: Number(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleScheduleChange = (day: string) => {
    setFormData(prev => ({
      ...prev,
      schedule: prev.schedule.includes(day)
        ? prev.schedule.filter(d => d !== day)
        : [...prev.schedule, day]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="course-form-modal">
      <div className="course-form">
        <h2>{course ? 'Edit Course' : 'Add New Course'}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="title">Course Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="teacherId">Teacher</label>
              <select
                id="teacherId"
                name="teacherId"
                value={formData.teacherId}
                onChange={handleChange}
              >
                <option value="">Select Teacher</option>
                {teachers.map(teacher => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="language">Language *</label>
              <select
                id="language"
                name="language"
                value={formData.language}
                onChange={handleChange}
                required
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
                required
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
            />
          </div>
          
          <div className="form-row">
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
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="price">Price (Rp) *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                required
              />
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
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Schedule Days</label>
            <div className="schedule-checkboxes">
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
          </div>
          
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
              />
              Active Course
            </label>
          </div>
          
          <div className="form-actions">
            <button type="button" onClick={onCancel} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {course ? 'Update Course' : 'Create Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseForm;