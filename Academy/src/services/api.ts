// Base API service for handling requests to the backend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.techacademy.example.com';

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: any;
  headers?: Record<string, string>;
}

export async function apiRequest<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  const token = localStorage.getItem('auth_token');
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const config: RequestInit = {
    method: options.method || 'GET',
    headers,
    credentials: 'include',
  };
  
  if (options.body) {
    config.body = JSON.stringify(options.body);
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    // Handle unauthorized errors (expired token, etc.)
    if (response.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/auth/login';
      throw new Error('Unauthorized access. Please log in again.');
    }
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'An error occurred');
    }
    
    return data;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
}

// Auth API endpoints
export const authApi = {
  login: (email: string, password: string) => 
    apiRequest('/auth/login', { method: 'POST', body: { email, password } }),
  
  register: (name: string, email: string, password: string) => 
    apiRequest('/auth/register', { method: 'POST', body: { name, email, password } }),
  
  getCurrentUser: () => 
    apiRequest('/auth/me'),
  
  logout: () => 
    apiRequest('/auth/logout', { method: 'POST' }),
};

// Courses API endpoints
export const coursesApi = {
  getAll: (filters?: Record<string, any>) => 
    apiRequest('/courses', { method: 'GET', body: filters }),
  
  getById: (id: string) => 
    apiRequest(`/courses/${id}`),
  
  getProgress: (id: string) => 
    apiRequest(`/courses/${id}/progress`),
  
  getRoadmap: (id: string) => 
    apiRequest(`/courses/${id}/roadmap`),
};

// Learning resources API endpoints
export const resourcesApi = {
  getLabs: (filters?: Record<string, any>) => 
    apiRequest('/resources/labs', { method: 'GET', body: filters }),
  
  getWorksheets: (filters?: Record<string, any>) => 
    apiRequest('/resources/worksheets', { method: 'GET', body: filters }),
  
  getCheatSheets: (filters?: Record<string, any>) => 
    apiRequest('/resources/cheat-sheets', { method: 'GET', body: filters }),
};

// Learning content API endpoints
export const learningApi = {
  getLesson: (id: string) => 
    apiRequest(`/lessons/${id}`),
  
  trackLessonProgress: (id: string, progress: number) => 
    apiRequest(`/lessons/${id}/progress`, { method: 'POST', body: { progress } }),
  
  getAssignment: (id: string) => 
    apiRequest(`/assignments/${id}`),
  
  submitAssignment: (id: string, submission: any) => 
    apiRequest(`/assignments/${id}/submit`, { method: 'POST', body: submission }),
};

// User profile and certificates API endpoints
export const userApi = {
  getProfile: () => 
    apiRequest('/user/profile'),
  
  updateProfile: (data: any) => 
    apiRequest('/user/profile', { method: 'PUT', body: data }),
  
  getCertificates: () => 
    apiRequest('/user/certificates'),
  
  getStats: () => 
    apiRequest('/user/stats'),
};