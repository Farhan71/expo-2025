// Form validation utilities and guards

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhone(phone: string): boolean {
  // Basic phone validation - accepts various formats
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  const cleaned = phone.replace(/[\s\-\(\)\.]/g, '');
  return phoneRegex.test(cleaned) && cleaned.length >= 10;
}

export function sanitizeInput(input: string): string {
  // Basic sanitization - remove potentially dangerous characters
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
}

export function validateContactForm(data: {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  honeypot?: string;
  timestamp?: number;
}) {
  const errors: Record<string, string> = {};

  // Honeypot check (anti-spam)
  if (data.honeypot && data.honeypot.trim().length > 0) {
    errors.honeypot = 'Bot detected';
    return { isValid: false, errors };
  }

  // Timestamp check (prevent rapid submissions)
  if (data.timestamp && Date.now() - data.timestamp < 3000) {
    errors.timestamp = 'Form submitted too quickly';
    return { isValid: false, errors };
  }

  // Required fields
  if (!data.name || data.name.trim().length === 0) {
    errors.name = 'Name is required';
  } else if (data.name.length > 100) {
    errors.name = 'Name must be 100 characters or less';
  }

  if (!data.email || data.email.trim().length === 0) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!data.message || data.message.trim().length === 0) {
    errors.message = 'Message is required';
  } else if (data.message.length > 1000) {
    errors.message = 'Message must be 1000 characters or less';
  }

  // Optional fields validation
  if (data.phone && data.phone.trim().length > 0) {
    if (!isValidPhone(data.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }
  }

  if (data.service && data.service.length > 100) {
    errors.service = 'Service selection is too long';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateAdminPassword(password: string): {
  isValid: boolean;
  error?: string;
} {
  if (!password || password.trim().length === 0) {
    return { isValid: false, error: 'Password is required' };
  }

  // In production, you would compare against a hashed password
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return { isValid: false, error: 'Admin password not configured' };
  }

  if (password !== adminPassword) {
    return { isValid: false, error: 'Invalid password' };
  }

  return { isValid: true };
}

// Rate limiting helper (basic in-memory implementation)
const rateLimitMap = new Map<string, { count: number; firstAttempt: number }>();

export function checkRateLimit(
  identifier: string,
  maxAttempts: number = 5,
  windowMs: number = 15 * 60 * 1000 // 15 minutes
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const existing = rateLimitMap.get(identifier);

  if (!existing) {
    rateLimitMap.set(identifier, { count: 1, firstAttempt: now });
    return {
      allowed: true,
      remaining: maxAttempts - 1,
      resetTime: now + windowMs,
    };
  }

  // Reset if window has passed
  if (now - existing.firstAttempt > windowMs) {
    rateLimitMap.set(identifier, { count: 1, firstAttempt: now });
    return {
      allowed: true,
      remaining: maxAttempts - 1,
      resetTime: now + windowMs,
    };
  }

  // Increment count
  existing.count++;

  if (existing.count > maxAttempts) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: existing.firstAttempt + windowMs,
    };
  }

  return {
    allowed: true,
    remaining: maxAttempts - existing.count,
    resetTime: existing.firstAttempt + windowMs,
  };
}

// Clean up old rate limit entries periodically
setInterval(
  () => {
    const now = Date.now();
    const keysToDelete: string[] = [];

    rateLimitMap.forEach((value, key) => {
      if (now - value.firstAttempt > 15 * 60 * 1000) {
        // 15 minutes
        keysToDelete.push(key);
      }
    });

    keysToDelete.forEach((key) => rateLimitMap.delete(key));
  },
  5 * 60 * 1000
); // Clean up every 5 minutes
