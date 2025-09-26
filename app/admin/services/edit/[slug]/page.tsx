'use client';

import { UiButton } from '@/components/ui/UiButton';
import { UiCard } from '@/components/ui/UiCard';
import { UiFormFields } from '@/components/ui/UiFormFields';
import { UiSection } from '@/components/ui/UiSection';
import { getServiceBySlug } from '@/lib/services/services.data';
import {
  ServiceUpdate,
  ServiceUpdateSchema,
} from '@/lib/services/services.schema';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminEditServicePage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<Partial<ServiceUpdate>>({
    name: '',
    slug: '',
    shortDescription: '',
    description: '',
    features: [],
    faqs: [],
    highlights: [],
    order: 0,
    active: true,
  });

  useEffect(() => {
    // Load service data from API to get the latest data
    fetchServiceData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, router]);

  const fetchServiceData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/services');
      if (response.ok) {
        const data = await response.json();
        const service = data.services.find((s: any) => s.slug === slug);

        if (!service) {
          alert('Service not found');
          router.push('/admin/services');
          return;
        }

        setFormData({
          name: service.name,
          slug: service.slug,
          shortDescription: service.shortDescription,
          description: service.description,
          features: service.features || [],
          highlights: service.highlights || [],
          faqs: service.faqs || [],
          order: service.order,
          active: service.active,
        });
      } else {
        // Fallback to static data if API fails
        const service = getServiceBySlug(slug);
        if (!service) {
          alert('Service not found');
          router.push('/admin/services');
          return;
        }

        setFormData({
          name: service.name,
          slug: service.slug,
          shortDescription: service.shortDescription,
          description: service.description,
          features: service.features || [],
          highlights: service.highlights || [],
          faqs: service.faqs || [],
          order: service.order,
          active: service.active,
        });
      }
    } catch (error) {
      console.error('Error fetching service data:', error);
      // Fallback to static data
      const service = getServiceBySlug(slug);
      if (!service) {
        alert('Service not found');
        router.push('/admin/services');
        return;
      }

      setFormData({
        name: service.name,
        slug: service.slug,
        shortDescription: service.shortDescription,
        description: service.description,
        features: service.features || [],
        highlights: service.highlights || [],
        faqs: service.faqs || [],
        order: service.order,
        active: service.active,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof ServiceUpdate, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleArrayChange = (
    field: 'features' | 'highlights',
    index: number,
    value: string
  ) => {
    const currentArray = formData[field] || [];
    const newArray = [...currentArray];
    newArray[index] = value;
    handleInputChange(field, newArray);
  };

  const addArrayItem = (field: 'features' | 'highlights') => {
    const currentArray = formData[field] || [];
    handleInputChange(field, [...currentArray, '']);
  };

  const removeArrayItem = (field: 'features' | 'highlights', index: number) => {
    const currentArray = formData[field] || [];
    const newArray = currentArray.filter((_, i) => i !== index);
    handleInputChange(field, newArray);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrors({});

    try {
      // Validate form data
      const validatedData = ServiceUpdateSchema.parse(formData);

      // Send to API endpoint to update service
      const response = await fetch(`/api/admin/services/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      });

      if (response.ok) {
        const result = await response.json();
        alert('Service updated successfully!');
        router.push('/admin/services');
      } else {
        const errorData = await response.json();
        if (errorData.details) {
          // Handle Zod validation errors from API
          const fieldErrors: Record<string, string> = {};
          errorData.details.forEach((err: any) => {
            const field = err.path.join('.');
            fieldErrors[field] = err.message;
          });
          setErrors(fieldErrors);
        } else {
          alert(`Failed to update service: ${errorData.error}`);
        }
      }
    } catch (error: any) {
      if (error.errors) {
        // Handle Zod validation errors
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err: any) => {
          const field = err.path.join('.');
          fieldErrors[field] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        console.error('Error updating service:', error);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/services');
  };

  if (loading) {
    return (
      <div className="bg-bg-primary flex min-h-screen items-center justify-center">
        <div className="text-text-primary">Loading service...</div>
      </div>
    );
  }

  return (
    <div className="bg-bg-primary min-h-screen">
      {/* Admin Header */}
      <div className="border-b border-border bg-bg-secondary">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-text-primary">
                Edit Service
              </h1>
              <p className="text-text-secondary">
                Update service: {formData.name}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <UiButton variant="subtle" onClick={handleCancel}>
                Cancel
              </UiButton>
              <UiButton
                variant="secondary"
                onClick={() => router.push('/admin/services')}
              >
                Back to Services
              </UiButton>
            </div>
          </div>
        </div>
      </div>

      <UiSection>
        <form onSubmit={handleSubmit} className="mx-auto max-w-4xl">
          <UiCard variant="elevated" padding="lg">
            <div className="space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">
                  Basic Information
                </h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <UiFormFields
                    label="Service Name"
                    error={errors.name}
                    required
                  >
                    <input
                      type="text"
                      value={formData.name || ''}
                      onChange={(e) =>
                        handleInputChange('name', e.target.value)
                      }
                      className="bg-bg-primary w-full rounded-lg border border-border px-3 py-2 text-text-primary focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="e.g., Roofing Services"
                    />
                  </UiFormFields>

                  <UiFormFields
                    label="URL Slug"
                    error={errors.slug}
                    description="Used in the URL (lowercase, no spaces)"
                  >
                    <input
                      type="text"
                      value={formData.slug || ''}
                      onChange={(e) =>
                        handleInputChange('slug', e.target.value)
                      }
                      className="bg-bg-primary w-full rounded-lg border border-border px-3 py-2 text-text-primary focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="e.g., roofing-services"
                    />
                  </UiFormFields>
                </div>

                <UiFormFields
                  label="Short Description"
                  error={errors.shortDescription}
                  required
                  description="Brief description (max 160 characters) for SEO and previews"
                >
                  <textarea
                    value={formData.shortDescription || ''}
                    onChange={(e) =>
                      handleInputChange('shortDescription', e.target.value)
                    }
                    className="bg-bg-primary w-full rounded-lg border border-border px-3 py-2 text-text-primary focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={3}
                    maxLength={160}
                    placeholder="Brief description of the service..."
                  />
                  <div className="mt-1 text-sm text-text-secondary">
                    {(formData.shortDescription || '').length}/160 characters
                  </div>
                </UiFormFields>

                <UiFormFields
                  label="Full Description"
                  error={errors.description}
                  required
                  description="Detailed description of the service"
                >
                  <textarea
                    value={formData.description || ''}
                    onChange={(e) =>
                      handleInputChange('description', e.target.value)
                    }
                    className="bg-bg-primary w-full rounded-lg border border-border px-3 py-2 text-text-primary focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={6}
                    placeholder="Detailed description of what this service includes..."
                  />
                </UiFormFields>
              </div>

              {/* Features */}
              <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">
                  Service Features
                </h3>
                <div className="space-y-3">
                  {formData.features?.map((feature, index) => (
                    <div key={index} className="flex gap-3">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) =>
                          handleArrayChange('features', index, e.target.value)
                        }
                        className="bg-bg-primary flex-1 rounded-lg border border-border px-3 py-2 text-text-primary focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Feature description..."
                      />
                      <UiButton
                        type="button"
                        variant="danger"
                        size="sm"
                        onClick={() => removeArrayItem('features', index)}
                      >
                        Remove
                      </UiButton>
                    </div>
                  ))}
                  <UiButton
                    type="button"
                    variant="subtle"
                    onClick={() => addArrayItem('features')}
                  >
                    Add Feature
                  </UiButton>
                </div>
              </div>

              {/* Highlights */}
              <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">
                  Key Highlights
                </h3>
                <div className="space-y-3">
                  {formData.highlights?.map((highlight, index) => (
                    <div key={index} className="flex gap-3">
                      <input
                        type="text"
                        value={highlight}
                        onChange={(e) =>
                          handleArrayChange('highlights', index, e.target.value)
                        }
                        className="bg-bg-primary flex-1 rounded-lg border border-border px-3 py-2 text-text-primary focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Key highlight..."
                      />
                      <UiButton
                        type="button"
                        variant="danger"
                        size="sm"
                        onClick={() => removeArrayItem('highlights', index)}
                      >
                        Remove
                      </UiButton>
                    </div>
                  ))}
                  <UiButton
                    type="button"
                    variant="subtle"
                    onClick={() => addArrayItem('highlights')}
                  >
                    Add Highlight
                  </UiButton>
                </div>
              </div>

              {/* Settings */}
              <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">
                  Settings
                </h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <UiFormFields
                    label="Display Order"
                    error={errors.order}
                    description="Lower numbers appear first"
                  >
                    <input
                      type="number"
                      value={formData.order || 0}
                      onChange={(e) =>
                        handleInputChange(
                          'order',
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="bg-bg-primary w-full rounded-lg border border-border px-3 py-2 text-text-primary focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                      min="0"
                    />
                  </UiFormFields>

                  <UiFormFields label="Status">
                    <div className="flex items-center gap-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="active"
                          checked={formData.active === true}
                          onChange={() => handleInputChange('active', true)}
                          className="mr-2"
                        />
                        Active
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="active"
                          checked={formData.active === false}
                          onChange={() => handleInputChange('active', false)}
                          className="mr-2"
                        />
                        Inactive
                      </label>
                    </div>
                  </UiFormFields>
                </div>
              </div>

              {/* Submit Actions */}
              <div className="flex justify-end gap-4 border-t border-border pt-6">
                <UiButton
                  type="button"
                  variant="secondary"
                  onClick={handleCancel}
                  disabled={saving}
                >
                  Cancel
                </UiButton>
                <UiButton
                  type="submit"
                  variant="primary"
                  loading={saving}
                  disabled={saving}
                >
                  Update Service
                </UiButton>
              </div>
            </div>
          </UiCard>
        </form>
      </UiSection>
    </div>
  );
}
