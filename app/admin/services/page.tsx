'use client';

import { UiButton } from '@/components/ui/UiButton';
import { UiCard } from '@/components/ui/UiCard';
import { UiSection, UiSectionHeader } from '@/components/ui/UiSection';
import { getAllServices } from '@/lib/services/services.data';
import { Service } from '@/lib/services/services.schema';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminServicesPage() {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load services from API to get the latest data
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/services');
      if (response.ok) {
        const data = await response.json();
        setServices(data.services);
      } else {
        console.error('Failed to fetch services');
        // Fallback to static data if API fails
        const allServices = await getAllServices();
        setServices(allServices);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      // Fallback to static data if API fails
      const allServices = await getAllServices();
      setServices(allServices);
    } finally {
      setLoading(false);
    }
  };

  const handleEditService = (slug: string) => {
    router.push(`/admin/services/edit/${slug}`);
  };

  const handleCreateNew = () => {
    router.push('/admin/services/new');
  };

  const handleDeleteService = async (slug: string) => {
    if (
      confirm(
        'Are you sure you want to delete this service? This action cannot be undone.'
      )
    ) {
      try {
        const response = await fetch(`/api/admin/services/${slug}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('Service deleted successfully!');
          // Refresh the services list from server
          await fetchServices();
        } else {
          const errorData = await response.json();
          alert(`Failed to delete service: ${errorData.error}`);
        }
      } catch (error) {
        console.error('Error deleting service:', error);
        alert('Failed to delete service. Please try again.');
      }
    }
  };

  const handleLogout = () => {
    window.location.href = '/api/admin/logout';
  };

  if (loading) {
    return (
      <div className="bg-bg-primary flex min-h-screen items-center justify-center">
        <div className="text-text-primary">Loading...</div>
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
                Admin Dashboard
              </h1>
              <p className="text-text-secondary">EXPO 2025 Construction Inc.</p>
            </div>
            <div className="flex items-center gap-4">
              <UiButton variant="subtle" onClick={() => router.push('/')}>
                View Site
              </UiButton>
              <UiButton variant="secondary" onClick={handleLogout}>
                Logout
              </UiButton>
            </div>
          </div>
        </div>
      </div>

      <UiSection>
        {/* Action Bar */}
        <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <UiSectionHeader
            title="Services Management"
            description="Manage your construction services and offerings"
          />
          <div className="flex gap-3">
            <UiButton variant="secondary" onClick={() => router.push('/')}>
              View Public Site
            </UiButton>
            <UiButton variant="primary" onClick={handleCreateNew} size="lg">
              + Add New Service
            </UiButton>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <UiCard variant="elevated" padding="lg">
            <div className="text-center">
              <div className="mb-1 text-2xl font-bold text-primary">
                {services.length}
              </div>
              <div className="text-sm text-text-secondary">Total Services</div>
            </div>
          </UiCard>
          <UiCard variant="elevated" padding="lg">
            <div className="text-center">
              <div className="mb-1 text-2xl font-bold text-success">
                {services.filter((s) => s.active).length}
              </div>
              <div className="text-sm text-text-secondary">Active Services</div>
            </div>
          </UiCard>
          <UiCard variant="elevated" padding="lg">
            <div className="text-center">
              <div className="mb-1 text-2xl font-bold text-text-secondary">
                {services.filter((s) => !s.active).length}
              </div>
              <div className="text-sm text-text-secondary">
                Inactive Services
              </div>
            </div>
          </UiCard>
        </div>

        {/* Services Table */}
        <UiCard variant="elevated" padding="none">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-bg-secondary">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider text-text-secondary">
                    Service
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider text-text-secondary">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider text-text-secondary">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider text-text-secondary">
                    Featured
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider text-text-secondary">
                    Updated
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-medium uppercase tracking-wider text-text-secondary">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {services.map((service) => (
                  <tr key={service.slug} className="hover:bg-bg-secondary">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                            <span className="text-sm font-medium text-white">
                              {service.name.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-text-primary">
                            {service.name}
                          </div>
                          <div className="text-sm text-text-secondary">
                            {service.slug}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className="inline-flex rounded-full bg-bg-secondary px-2 py-1 text-xs font-medium text-text-secondary">
                        General
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                          service.active
                            ? 'bg-success/10 text-success'
                            : 'bg-text-secondary/10 text-text-secondary'
                        }`}
                      >
                        {service.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className="inline-flex rounded-full bg-text-secondary/10 px-2 py-1 text-xs font-medium text-text-secondary">
                        Standard
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-text-secondary">
                      {new Date(service.lastUpdated).toLocaleDateString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <UiButton
                          variant="subtle"
                          size="sm"
                          onClick={() => handleEditService(service.slug)}
                        >
                          Edit
                        </UiButton>
                        <UiButton
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteService(service.slug)}
                        >
                          Delete
                        </UiButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </UiCard>

        {services.length === 0 && (
          <UiCard variant="elevated" padding="lg">
            <div className="py-12 text-center">
              <div className="mb-6">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-bg-secondary">
                  <span className="text-2xl text-text-secondary">📝</span>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-text-primary">
                  No services found
                </h3>
                <p className="mb-6 text-text-secondary">
                  Get started by creating your first service offering. You can
                  add details like descriptions, features, and pricing.
                </p>
              </div>
              <UiButton variant="primary" size="lg" onClick={handleCreateNew}>
                + Create Your First Service
              </UiButton>
            </div>
          </UiCard>
        )}
      </UiSection>
    </div>
  );
}
