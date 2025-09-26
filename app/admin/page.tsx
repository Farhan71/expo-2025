'use client';

import { UiButton } from '@/components/ui/UiButton';
import { UiCard } from '@/components/ui/UiCard';
import { UiInput } from '@/components/ui/UiFormFields';
import { UiSection } from '@/components/ui/UiSection';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const result = await response.json();

      if (result.success) {
        // Redirect to admin dashboard
        router.push('/admin/services');
      } else {
        setError(result.error || 'Invalid password');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <UiSection className="flex min-h-[80vh] items-center">
      <div className="mx-auto w-full max-w-md">
        <UiCard variant="elevated" padding="lg">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
              <span className="text-2xl font-bold text-white">E</span>
            </div>
            <h1 className="mb-2 text-2xl font-bold text-text-primary">
              Admin Access
            </h1>
            <p className="text-text-secondary">
              Enter password to access the admin panel
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <UiInput
              label="Admin Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={error}
              required
              disabled={isSubmitting}
              placeholder="Enter admin password"
              autoComplete="current-password"
            />

            <UiButton
              type="submit"
              variant="primary"
              size="lg"
              loading={isSubmitting}
              disabled={isSubmitting || !password.trim()}
              className="w-full"
            >
              {isSubmitting ? 'Authenticating...' : 'Access Admin Panel'}
            </UiButton>
          </form>

          <div className="mt-6 border-t border-border pt-6 text-center">
            <p className="text-sm text-text-secondary">
              This area is restricted to authorized personnel only.
            </p>
          </div>
        </UiCard>
      </div>
    </UiSection>
  );
}
