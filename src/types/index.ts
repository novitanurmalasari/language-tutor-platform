export interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  bio: string;
  specializations: string[];
  experience: number;
  rating: number;
  profileImage: string;
}

export interface Course {
  id: string;
  title: string;
  language: 'Turkish' | 'English';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  duration: number;
  price: number;
  schedule: string[];
  maxStudents: number;
  currentStudents: number;
  isActive: boolean;
  teacherId?: string;
}

export interface Booking {
  id: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  courseId: string;
  courseTitle?: string;
  courseLanguage?: string;
  courseLevel?: string;
  date: string;
  time: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: Date;
}

export interface Testimonial {
  id: string;
  studentName: string;
  course: string;
  rating: number;
  comment: string;
  date: string;
  isApproved: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}