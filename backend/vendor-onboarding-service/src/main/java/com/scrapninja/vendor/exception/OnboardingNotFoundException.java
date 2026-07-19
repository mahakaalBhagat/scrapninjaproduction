package com.scrapninja.vendor.exception;

public class OnboardingNotFoundException extends RuntimeException {
    public OnboardingNotFoundException(String message) {
        super(message);
    }
    
    public OnboardingNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
