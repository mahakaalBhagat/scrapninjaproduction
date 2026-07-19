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

  // Auth endpoints (UNUSED - auth is handled in useAuth.tsx via direct axios calls)
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

  // User endpoints (UNUSED)
  async getProfile() {
    return this.client.get('/users/profile');
  }

  async updateProfile(data: any) {
    return this.client.put('/users/profile', data);
  }

  // Pickup endpoints (UNUSED)
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

  // ====== DEPRECATED: Below endpoints are not actively used in current codebase ======
  // These are preserved for future use and documentation purposes

  // Pricing endpoints (UNUSED)
  async getPriceEstimate(scrapType: string, weight: number) {
    return this.client.get('/pricing/estimate', {
      params: { scrapType, weight },
    });
  }

  async getPricingRules() {
    return this.client.get('/pricing/rules');
  }

  // Tracking endpoints (UNUSED)
  async trackPickup(pickupId: string) {
    return this.client.get(`/tracking/${pickupId}`);
  }

  // Payment endpoints (UNUSED)
  async processPayment(data: any) {
    return this.client.post('/payments', data);
  }

  async getPaymentHistory() {
    return this.client.get('/payments/history');
  }

  // Reports endpoints (UNUSED)
  async generateReport(pickupId: string) {
    return this.client.post(`/reports/${pickupId}`);
  }

  async getReports() {
    return this.client.get('/reports');
  }

  // ====== ACTIVE: These endpoints are currently used ======

  // Lead capture endpoints (ACTIVE - used in Chatbot.tsx)
  async captureLead(data: { name: string; phone: string; source: string; flow?: string }) {
    return this.client.post('/leads', data);
  }

  // Contact endpoints (ACTIVE - used in ContactSection.tsx)
  async submitContactForm(data: any) {
    return this.client.post('/contact', data);
  }

  // Collectors endpoints (UNUSED - use direct axios in vendor-onboarding instead)
  async getCollectors() {
    return this.client.get('/collectors');
  }

  async getCollectorProfile(id: string) {
    return this.client.get(`/collectors/${id}`);
  }

  // Generic HTTP methods for direct use
  async post(url: string, data: any, config?: any) {
    return this.client.post(url, data, config);
  }

  async get(url: string, config?: any) {
    return this.client.get(url, config);
  }

  async put(url: string, data: any, config?: any) {
    return this.client.put(url, data, config);
  }

  async delete(url: string, config?: any) {
    return this.client.delete(url, config);
  }
}

export const apiClient = new ApiClient();
