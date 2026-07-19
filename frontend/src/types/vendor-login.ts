export interface VendorLoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface VendorUser {
  id: string;
  email: string;
  companyName: string;
  role: 'vendor' | 'admin';
  token: string;
}

export interface AuthResponse {
  user: VendorUser;
  token: string;
  refreshToken: string;
}

export interface LoginError {
  message: string;
  code?: string;
}
