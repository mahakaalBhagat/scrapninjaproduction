import axios, { AxiosInstance, AxiosError } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        const token = this.getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          this.clearAuthToken();
          // Redirect to login if needed
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  private getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  private clearAuthToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.client.post('/auth/login', { email, password });
  }

  async register(data: any) {
    return this.client.post('/auth/register', data);
  }

  async logout() {
    return this.client.post('/auth/logout');
  }

  async refreshToken() {
    return this.client.post('/auth/refresh');
  }

  // User endpoints
  async getProfile() {
    return this.client.get('/users/profile');
  }

  async updateProfile(data: any) {
    return this.client.put('/users/profile', data);
  }

  // Pickup endpoints
  async createPickupRequest(data: any) {
    return this.client.post('/pickups', data);
  }

  async getPickupRequests() {
    return this.client.get('/pickups');
  }

  async getPickupRequest(id: string) {
    return this.client.get(`/pickups/${id}`);
  }

  async updatePickupRequest(id: string, data: any) {
    return this.client.put(`/pickups/${id}`, data);
  }

  // Pricing endpoints
  async getPriceEstimate(scrapType: string, weight: number) {
    return this.client.get('/pricing/estimate', {
      params: { scrapType, weight },
    });
  }

  async getPricingRules() {
    return this.client.get('/pricing/rules');
  }

  // Tracking endpoints
  async trackPickup(pickupId: string) {
    return this.client.get(`/tracking/${pickupId}`);
  }

  // Payment endpoints
  async processPayment(data: any) {
    return this.client.post('/payments', data);
  }

  async getPaymentHistory() {
    return this.client.get('/payments/history');
  }

  // Reports endpoints
  async generateReport(pickupId: string) {
    return this.client.post(`/reports/${pickupId}`);
  }

  async getReports() {
    return this.client.get('/reports');
  }

  // Lead capture endpoints
  async captureLead(data: { name: string; phone: string; source: string; flow?: string }) {
    return this.client.post('/leads', data);
  }

  // Contact endpoints
  async submitContactForm(data: any) {
    return this.client.post('/contact', data);
  }

  // Collectors endpoints
  async getCollectors() {
    return this.client.get('/collectors');
  }

  async getCollectorProfile(id: string) {
    return this.client.get(`/collectors/${id}`);
  }
}

export const apiClient = new ApiClient();
