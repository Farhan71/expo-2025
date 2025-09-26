import { servicesData } from './services.data';
import type { Service, ServiceCreate, ServiceUpdate } from './services.schema';

// In-memory service repository
// This simulates a database and should be replaced with actual database operations in production
class ServiceRepository {
  private services: Service[] = [...servicesData];

  // Get all services
  async getAll(): Promise<Service[]> {
    return this.services.filter((service) => service.active);
  }

  // Get service by slug
  async getBySlug(slug: string): Promise<Service | null> {
    const service = this.services.find((s) => s.slug === slug && s.active);
    return service || null;
  }

  // Create new service
  async create(serviceData: ServiceCreate): Promise<Service> {
    const newService: Service = {
      ...serviceData,
      lastUpdated: new Date(),
    };

    // Check if slug already exists
    const existingService = this.services.find(
      (s) => s.slug === serviceData.slug
    );
    if (existingService) {
      throw new Error('Service with this slug already exists');
    }

    this.services.push(newService);
    return newService;
  }

  // Update existing service
  async update(slug: string, serviceData: ServiceUpdate): Promise<Service> {
    const serviceIndex = this.services.findIndex((s) => s.slug === slug);
    if (serviceIndex === -1) {
      throw new Error('Service not found');
    }

    // If updating slug, check for conflicts
    if (serviceData.slug && serviceData.slug !== slug) {
      const existingService = this.services.find(
        (s) => s.slug === serviceData.slug
      );
      if (existingService) {
        throw new Error('Service with this slug already exists');
      }
    }

    const updatedService: Service = {
      ...this.services[serviceIndex],
      ...serviceData,
      lastUpdated: new Date(),
    };

    this.services[serviceIndex] = updatedService;
    return updatedService;
  }

  // Delete service (soft delete by setting active to false)
  async delete(slug: string): Promise<boolean> {
    const serviceIndex = this.services.findIndex((s) => s.slug === slug);
    if (serviceIndex === -1) {
      return false;
    }

    this.services[serviceIndex] = {
      ...this.services[serviceIndex],
      active: false,
      lastUpdated: new Date(),
    };

    return true;
  }

  // Search services (basic text search across name and description)
  async search(query: string): Promise<Service[]> {
    const lowercaseQuery = query.toLowerCase();
    return this.services.filter(
      (service) =>
        service.active &&
        (service.name.toLowerCase().includes(lowercaseQuery) ||
          service.description.toLowerCase().includes(lowercaseQuery) ||
          service.shortDescription.toLowerCase().includes(lowercaseQuery))
    );
  }

  // Get services by order
  async getByOrder(): Promise<Service[]> {
    return this.services
      .filter((service) => service.active)
      .sort((a, b) => a.order - b.order);
  }
}

// Export singleton instance
export const serviceRepository = new ServiceRepository();

// Note: In a production application, you would replace this with:
// - Database operations using Prisma, Drizzle, or similar ORM
// - Redis caching for frequently accessed data
// - Proper error handling and logging
// - Input sanitization and validation
// - Connection pooling and transaction management

/*
Example with Prisma:

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  return await prisma.service.findFirst({
    where: { slug, active: true }
  });
}

export async function createService(data: ServiceCreate): Promise<Service> {
  return await prisma.service.create({
    data: { ...data, lastUpdated: new Date() }
  });
}
*/
