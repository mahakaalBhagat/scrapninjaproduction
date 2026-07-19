'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { EmailInput } from './EmailInput';
import { PasswordInput } from './PasswordInput';
import { RememberMe } from './RememberMe';
import { ForgotPasswordLink } from './ForgotPasswordLink';
import { LoginButton } from './LoginButton';
import { Divider } from './Divider';
import { OTPButton } from './OTPButton';
import { vendorLoginSchema, VendorLoginSchemaType } from '@/schemas/vendor-login';
import { vendorAuthService } from '@/services/vendorAuthService';

interface LoginFormProps {
  onSuccess?: (token: string) => void;
  onError?: (error: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onError }) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<VendorLoginSchemaType>({
    resolver: zodResolver(vendorLoginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    mode: 'onBlur',
  });

  const [generalError, setGeneralError] = useState<string | null>(null);
  const [otpMode, setOtpMode] = useState(false);
  const [otpEmail, setOtpEmail] = useState('');

  const email = watch('email');
  const password = watch('password');
  const rememberMe = watch('rememberMe');

  const onSubmit = async (data: VendorLoginSchemaType) => {
    try {
      setGeneralError(null);
      const response = await vendorAuthService.login(data);

      if (onSuccess) {
        onSuccess(response.token);
      }

      localStorage.setItem('vendorToken', response.token);
      if (data.rememberMe) {
        localStorage.setItem('vendorEmail', data.email);
      }

      window.location.href = '/vendor-dashboard/collectors';
    } catch (error: any) {
      const errorMessage = error.message || 'Login failed. Please try again.';
      setGeneralError(errorMessage);
      if (onError) {
        onError(errorMessage);
      }
    }
  };

  const handleOTPClick = async () => {
    if (!email) {
      setGeneralError('Please enter your email address first');
      return;
    }

    try {
      setGeneralError(null);
      setOtpMode(true);
      setOtpEmail(email);
      await vendorAuthService.sendOTP(email);
      setGeneralError(`OTP sent to ${email}. Check your email for the code.`);
    } catch (error: any) {
      setGeneralError(error.message || 'Failed to send OTP');
    }
  };

  const handleForgotPassword = () => {
    setGeneralError('Password reset link would be sent to your email');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* General Error */}
      {generalError && (
        <motion.div
          variants={itemVariants}
          className={`p-4 rounded-lg text-sm font-medium ${
            otpMode && otpEmail === email
              ? 'bg-blue-50 text-blue-700 border border-blue-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
          role="alert"
        >
          {generalError}
        </motion.div>
      )}

      {/* Email Input */}
      <motion.div variants={itemVariants}>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          {VENDOR_LOGIN_CONSTANTS.content.email}
        </label>
        <EmailInput
          value={email}
          onChange={(value) => setValue('email', value)}
          error={errors.email?.message}
          disabled={isSubmitting}
        />
      </motion.div>

      {/* Password Input */}
      <motion.div variants={itemVariants}>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          {VENDOR_LOGIN_CONSTANTS.content.password}
        </label>
        <PasswordInput
          value={password}
          onChange={(value) => setValue('password', value)}
          error={errors.password?.message}
          disabled={isSubmitting}
        />
      </motion.div>

      {/* Remember Me & Forgot Password */}
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-between gap-2 flex-wrap"
      >
        <RememberMe
          checked={rememberMe}
          onChange={(value) => setValue('rememberMe', value)}
          disabled={isSubmitting}
        />
        <ForgotPasswordLink onClick={handleForgotPassword} disabled={isSubmitting} />
      </motion.div>

      {/* Login Button */}
      <motion.div variants={itemVariants}>
        <LoginButton isLoading={isSubmitting} disabled={isSubmitting} />
      </motion.div>

      {/* Divider */}
      <motion.div variants={itemVariants}>
        <Divider />
      </motion.div>

      {/* OTP Button */}
      <motion.div variants={itemVariants}>
        <OTPButton onClick={handleOTPClick} isLoading={isSubmitting} disabled={isSubmitting} />
      </motion.div>
    </motion.form>
  );
};

const VENDOR_LOGIN_CONSTANTS = {
  content: {
    email: 'Email address',
    password: 'Password',
  },
};
