import { VendorLoginFormData, AuthResponse, LoginError } from '@/types/vendor-login';

class VendorAuthService {
  // Multiple test case credentials
  private static readonly TEST_CREDENTIALS = [
    {
      email: 'vendor@scrapninja.com',
      password: 'Vendor@123',
      testCaseId: 'TC001',
      companyName: 'EcoScrap Inc.',
    },
    {
      email: 'test.vendor1@scrapninja.com',
      password: 'TestVendor@123',
      testCaseId: 'TC002',
      companyName: 'Green Waste Solutions',
    },
    {
      email: 'test.vendor2@scrapninja.com',
      password: 'TestVendor@456',
      testCaseId: 'TC003',
      companyName: 'Recycling Masters LLC',
    },
    {
      email: 'test.vendor3@scrapninja.com',
      password: 'TestVendor@789',
      testCaseId: 'TC004',
      companyName: 'Metal Recovery Services',
    },
    {
      email: 'demo@scrapninja.com',
      password: 'Demo@123',
      testCaseId: 'TC005',
      companyName: 'Demo Waste Management',
    },
  ];

  async login(credentials: VendorLoginFormData): Promise<AuthResponse> {
    await this.delay(1000);

    const foundCredential = VendorAuthService.TEST_CREDENTIALS.find(
      (cred) => cred.email === credentials.email && cred.password === credentials.password
    );

    if (foundCredential) {
      const mockUser = {
        id: `vendor-${foundCredential.testCaseId}`,
        email: credentials.email,
        companyName: foundCredential.companyName,
        testCaseId: foundCredential.testCaseId,
        role: 'vendor' as const,
        token: `token-${Date.now()}`,
      };

      return {
        user: mockUser,
        token: mockUser.token,
        refreshToken: `refresh-token-${Date.now()}`,
      };
    }

    throw {
      message: 'Invalid email or password',
      code: 'INVALID_CREDENTIALS',
    };
  }

  async sendOTP(email: string): Promise<{ message: string }> {
    await this.delay(800);

    if (email) {
      return {
        message: `OTP sent to ${email}. Check your email for the verification code.`,
      };
    }

    throw {
      message: 'Please enter a valid email',
      code: 'INVALID_EMAIL',
    };
  }

  async validateEmail(email: string): Promise<{ isValid: boolean }> {
    await this.delay(300);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return { isValid: emailRegex.test(email) };
  }

  // Get all test credentials for display
  getTestCredentials() {
    return VendorAuthService.TEST_CREDENTIALS.map((cred) => ({
      testCaseId: cred.testCaseId,
      email: cred.email,
      password: cred.password,
      companyName: cred.companyName,
    }));
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export const vendorAuthService = new VendorAuthService();
