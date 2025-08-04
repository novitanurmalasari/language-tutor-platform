import { Booking, ContactMessage, Course, Teacher, Testimonial } from "../types";

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

class ApiService {
  private token: string | null = null;

  setAuthToken(token: string | null) {
    this.token = token;
  }

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


  // Auth endpoints
  async login(username: string, password: string) {
    return this.request<{ token: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  }

  async getCurrentUser() {
    return this.request<any>('/auth/me');
  }

  // Course endpoints
  async getCourses() {
    return this.request<Course[]>('/courses');
  }

  async getCourse(id: string) {
    return this.request<Course>(`/courses/${id}`);
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

  async updateBookingStatus(id: string, status: string) {
    return this.request<Booking>(`/bookings/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  // Testimonial endpoints
  async getTestimonials() {
    return this.request<Testimonial[]>('/testimonials');
  }

  async getPendingTestimonials() {
    return this.request<Testimonial[]>('/testimonials/pending');
  }

  async approveTestimonial(id: string) {
    return this.request<Testimonial>(`/testimonials/${id}/approve`, {
      method: 'PATCH',
    });
  }
  
  async deleteTestimonial(id: string) {
    return this.request(`/testimonials/${id}`, {
      method: 'DELETE',
    });
  }

  // Contact endpoints
  async sendContactMessage(data: { name: string; email: string; subject: string; message: string }) {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getMessages() {
    return this.request<ContactMessage[]>('/contact/messages');
  }
  
  async markMessageAsRead(id: string) {
    return this.request(`/contact/messages/${id}/read`, {
      method: 'PATCH',
    });
  }
  
  async deleteMessage(id: string) {
    return this.request(`/contact/messages/${id}`, {
      method: 'DELETE',
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
  
  async updateTestimonialStatus(id: string) {
    return this.request<Testimonial>(`/testimonials/${id}/approve`, {
      method: 'PATCH',
    });
  }
  
}

export default new ApiService();