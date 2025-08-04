import { Booking, Course, Testimonial } from "../types";

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }

  // Course endpoints
  async getCourses() {
    return this.request<Course[]>('/courses');
  }

  async getCourse(id: string) {
    return this.request<Course>(`/courses/${id}`);
  }

  // Booking endpoints
  async createBooking(booking: Omit<Booking, 'id' | 'status' | 'createdAt'>) {
    return this.request<Booking>('/bookings', {
      method: 'POST',
      body: JSON.stringify(booking),
    });
  }

  async getBookings() {
    return this.request<Booking[]>('/bookings');
  }

  // Testimonial endpoints
  async getTestimonials() {
    return this.request<Testimonial[]>('/testimonials');
  }

  // Contact endpoints
  async sendContactMessage(data: { name: string; email: string; subject: string; message: string }) {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Admin endpoints
  async adminLogin(credentials: { username: string; password: string }) {
    return this.request<{ token: string; admin: any }>('/admin/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }
  
  // Teacher endpoints
  async getTeachers() {
    return this.request<Teacher[]>('/teachers');
  }
  
  async createCourse(course: Partial<Course>) {
    return this.request<Course>('/courses', {
      method: 'POST',
      body: JSON.stringify(course),
    });
  }
  
  async updateCourse(id: string, course: Partial<Course>) {
    return this.request<Course>(`/courses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(course),
    });
  }
  
  async deleteCourse(id: string) {
    return this.request(`/courses/${id}`, {
      method: 'DELETE',
    });
  }
  
  async updateBookingStatus(id: string, status: string) {
    return this.request<Booking>(`/bookings/${id}/status?status=${status}`, {
      method: 'PATCH',
    });
  }
  
  async updateTestimonialStatus(id: string) {
    return this.request<Testimonial>(`/testimonials/${id}/approve`, {
      method: 'PATCH',
    });
  }
  
  async getMessages() {
    return this.request<any[]>('/contact/messages');
  }
  
  async markMessageAsRead(id: string) {
    return this.request(`/contact/messages/${id}/read`, {
      method: 'PATCH',
    });
  }

  async getPendingTestimonials() {
    return this.request<Testimonial[]>('/testimonials/pending');
  }
  
  async deleteTestimonial(id: string) {
    return this.request(`/testimonials/${id}`, {
      method: 'DELETE',
    });
  }
  
  async deleteMessage(id: string) {
    return this.request(`/contact/messages/${id}`, {
      method: 'DELETE',
    });
  }
}

export default new ApiService();