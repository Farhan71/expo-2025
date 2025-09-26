'use client';

import { UiButton } from '@/components/ui/UiButton';
import { UiCard } from '@/components/ui/UiCard';
import { UiInput, UiTextArea } from '@/components/ui/UiFormFields';
import { getAllActiveServices } from '@/lib/services/services.data';
import React, { useState } from 'react';

interface ContactFormProps {
  selectedService?: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  honeypot: string; // Anti-spam field
}

interface FormState {
  isSubmitting: boolean;
  success: boolean;
  errors: Record<string, string>;
  message: string;
}

export function ContactForm({ selectedService = '' }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: selectedService,
    message: '',
    honeypot: '',
  });

  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    success: false,
    errors: {},
    message: '',
  });

  const services = getAllActiveServices();
  const formTimestamp = React.useRef(Date.now());

  const handleInputChange =
    (field: keyof FormData) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));

      // Clear field error when user starts typing
      if (formState.errors[field]) {
        setFormState((prev) => ({
          ...prev,
          errors: {
            ...prev.errors,
            [field]: '',
          },
        }));
      }
    };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    // Required fields
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.length > 100) {
      errors.name = 'Name must be 100 characters or less';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.length > 1000) {
      errors.message = 'Message must be 1000 characters or less';
    }

    // Optional phone validation
    if (formData.phone.trim()) {
      const cleaned = formData.phone.replace(/[\s\-\(\)\.]/g, '');
      if (!/^[\+]?[1-9][\d]{0,15}$/.test(cleaned) || cleaned.length < 10) {
        errors.phone = 'Please enter a valid phone number';
      }
    }

    // Anti-spam checks
    if (formData.honeypot.trim()) {
      errors.honeypot = 'Bot detected';
    }

    const timeDiff = Date.now() - formTimestamp.current;
    if (timeDiff < 3000) {
      errors.timestamp = 'Form submitted too quickly';
    }

    setFormState((prev) => ({ ...prev, errors }));
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setFormState((prev) => ({ ...prev, isSubmitting: true, message: '' }));

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: formTimestamp.current,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setFormState({
          isSubmitting: false,
          success: true,
          errors: {},
          message:
            "Thank you for your message! We'll get back to you within 24 hours.",
        });

        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: '',
          honeypot: '',
        });
        formTimestamp.current = Date.now();
      } else {
        setFormState((prev) => ({
          ...prev,
          isSubmitting: false,
          success: false,
          message: result.error || 'Something went wrong. Please try again.',
        }));
      }
    } catch (error) {
      setFormState((prev) => ({
        ...prev,
        isSubmitting: false,
        success: false,
        message: 'Network error. Please check your connection and try again.',
      }));
    }
  };

  return (
    <UiCard variant="elevated" padding="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Honeypot field - hidden from users */}
        <input
          type="text"
          name="website"
          value={formData.honeypot}
          onChange={handleInputChange('honeypot')}
          style={{ display: 'none' }}
          tabIndex={-1}
          autoComplete="off"
        />

        <div className="grid gap-6 md:grid-cols-2">
          <UiInput
            label="Full Name"
            type="text"
            value={formData.name}
            onChange={handleInputChange('name')}
            error={formState.errors.name}
            required
            disabled={formState.isSubmitting}
            placeholder="Your full name"
          />

          <UiInput
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={handleInputChange('email')}
            error={formState.errors.email}
            required
            disabled={formState.isSubmitting}
            placeholder="your@email.com"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <UiInput
            label="Phone Number"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange('phone')}
            error={formState.errors.phone}
            disabled={formState.isSubmitting}
            placeholder="(555) 123-4567"
            helperText="Optional - we'll call you for urgent matters"
          />

          <div className="space-y-1">
            <label className="block text-sm font-medium text-text-primary">
              Service Interest
            </label>
            <select
              value={formData.service}
              onChange={handleInputChange('service')}
              disabled={formState.isSubmitting}
              className="w-full rounded-lg border border-border px-3 py-2 transition-colors focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select a service (optional)</option>
              {services.map((service) => (
                <option key={service.slug} value={service.name}>
                  {service.name}
                </option>
              ))}
              <option value="Other">Other / Custom Project</option>
            </select>
            {formState.errors.service && (
              <p className="text-sm text-error">{formState.errors.service}</p>
            )}
          </div>
        </div>

        <UiTextArea
          label="Message"
          value={formData.message}
          onChange={handleInputChange('message')}
          error={formState.errors.message}
          required
          disabled={formState.isSubmitting}
          rows={6}
          placeholder="Tell us about your project, timeline, and any specific requirements..."
          helperText={`${formData.message.length}/1000 characters`}
        />

        {/* Status Messages */}
        {formState.message && (
          <div
            className={`rounded-lg p-4 ${
              formState.success
                ? 'border border-success/20 bg-success/10 text-success'
                : 'border border-error/20 bg-error/10 text-error'
            }`}
          >
            <p className="text-sm">{formState.message}</p>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <UiButton
            type="submit"
            variant="primary"
            size="lg"
            loading={formState.isSubmitting}
            disabled={formState.isSubmitting}
            className="flex-1"
          >
            {formState.isSubmitting ? 'Sending Message...' : 'Send Message'}
          </UiButton>

          <div className="flex flex-col justify-center text-center sm:text-left">
            <p className="text-sm text-text-secondary">Or call us directly:</p>
            <div className="flex justify-center gap-4 text-sm sm:justify-start">
              <a
                href="tel:3474209759"
                className="text-primary transition-colors hover:text-primary-hover"
              >
                (347) 420-9759
              </a>
              <a
                href="tel:7188256465"
                className="text-primary transition-colors hover:text-primary-hover"
              >
                (718) 825-6465
              </a>
            </div>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="border-t border-border pt-4 text-xs text-text-secondary">
          <p>
            By submitting this form, you agree to be contacted by EXPO 2025
            Construction Inc regarding your inquiry. We respect your privacy and
            will never share your information with third parties.
          </p>
        </div>
      </form>
    </UiCard>
  );
}
