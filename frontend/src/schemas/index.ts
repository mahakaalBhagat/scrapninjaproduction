import { z } from 'zod';

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(100, { message: 'Name must not exceed 100 characters' })
    .regex(/^[a-zA-Z\s'-]+$/, { message: 'Name can only contain letters, spaces, hyphens, and apostrophes' }),
  email: z
    .string()
    .email({ message: 'Please enter a valid email address' })
    .max(255, { message: 'Email must not exceed 255 characters' }),
  phone: z
    .string()
    .regex(/^[+0-9\s-()]+$/, { message: 'Please enter a valid phone number' })
    .optional()
    .or(z.literal('')),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters' })
    .max(2000, { message: 'Message must not exceed 2000 characters' }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const pickupRequestSchema = z.object({
  scrapType: z.string().min(1, { message: 'Please select a scrap type' }),
  weight: z
    .string()
    .transform((v) => parseFloat(v))
    .refine((v) => !isNaN(v) && v > 0, { message: 'Weight must be a positive number' }),
  address: z
    .string()
    .min(10, { message: 'Address must be at least 10 characters' })
    .max(500, { message: 'Address must not exceed 500 characters' }),
  preferredDate: z.date({ invalid_type_error: 'Please select a valid date' }),
  preferredTime: z.enum(['morning', 'afternoon', 'evening'], {
    invalid_type_error: 'Please select a preferred time slot',
  }),
  notes: z
    .string()
    .max(500, { message: 'Notes must not exceed 500 characters' })
    .optional(),
});

export type PickupRequestData = z.infer<typeof pickupRequestSchema>;

export const userRegistrationSchema = z.object({
  email: z
    .string()
    .email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(/[A-Z]/, { message: 'Password must contain an uppercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain a number' })
    .regex(/[!@#$%^&*]/, { message: 'Password must contain a special character' }),
  confirmPassword: z.string(),
  firstName: z.string().min(2, { message: 'First name is required' }),
  lastName: z.string().min(2, { message: 'Last name is required' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export type UserRegistrationData = z.infer<typeof userRegistrationSchema>;

export const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
  rememberMe: z.boolean().optional(),
});

export type LoginData = z.infer<typeof loginSchema>;
