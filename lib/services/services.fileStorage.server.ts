import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { Service } from './services.schema';

const DATA_DIR = join(process.cwd(), 'data');
const SERVICES_FILE = join(DATA_DIR, 'services.json');

// Ensure data directory exists
function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
}

// Get default services data
function getDefaultServices(): Service[] {
  return [
    {
      name: 'Expert Roofing Services',
      slug: 'roofing-services',
      shortDescription:
        'Professional roofing installation, repair, and maintenance for residential and commercial properties.',
      description:
        'Our expert roofing services provide comprehensive solutions for all your roofing needs. From new installations to emergency repairs, we use only the highest quality materials and proven techniques to ensure your roof provides lasting protection for your property.',
      features: [
        'New roof installation and replacement',
        'Roof repair and maintenance',
        'Emergency roofing services',
        'Gutter installation and cleaning',
        'Roof inspections and assessments',
        'Insurance claim assistance',
      ],
      faqs: [
        {
          question: 'How long does a typical roof installation take?',
          answer:
            'Most residential roof installations take 1-3 days depending on the size and complexity of the project. Weather conditions may affect the timeline.',
        },
        {
          question: 'Do you provide warranties on your roofing work?',
          answer:
            'Yes, we provide comprehensive warranties on both materials and workmanship. Material warranties vary by manufacturer, and our workmanship is guaranteed for 10 years.',
        },
      ],
      images: [
        '/images/services/roofing-1.jpg',
        '/images/services/roofing-2.jpg',
      ],
      highlights: [
        'Licensed and insured contractors',
        '10-year workmanship warranty',
        'Emergency repair services',
        'Free estimates',
      ],
      order: 1,
      seo: {
        title: 'Expert Roofing Services | Installation, Repair & Maintenance',
        description:
          'Professional roofing services for residential and commercial properties. Expert installation, repairs, and maintenance with 10-year warranty.',
        keywords: [
          'roofing services',
          'roof installation',
          'roof repair',
          'roofing contractor',
          'roof replacement',
        ],
      },
      active: true,
      lastUpdated: new Date('2024-01-25'),
    },
    {
      name: 'Waterproofing Solutions',
      slug: 'waterproofing-solutions',
      shortDescription:
        'Comprehensive waterproofing services to protect your property from water damage and moisture issues.',
      description:
        'Protect your investment with our professional waterproofing solutions. We specialize in basement waterproofing, foundation sealing, and moisture control systems to keep your property dry and secure.',
      features: [
        'Basement waterproofing',
        'Foundation sealing and repair',
        'Exterior waterproofing systems',
        'Moisture control and ventilation',
        'Drainage system installation',
        'Waterproof coating application',
      ],
      faqs: [
        {
          question: 'How do I know if I need waterproofing?',
          answer:
            'Signs include water stains, musty odors, visible mold, efflorescence on walls, or actual water seepage. We offer free inspections to assess your needs.',
        },
        {
          question: 'How long do waterproofing solutions last?',
          answer:
            'Our waterproofing systems are designed to last 15-25 years with proper maintenance. We provide warranties on all our waterproofing work.',
        },
      ],
      images: [
        '/images/services/waterproofing-1.jpg',
        '/images/services/waterproofing-2.jpg',
      ],
      highlights: [
        'Free moisture inspections',
        '15-year system warranty',
        'Advanced waterproofing technology',
        'Emergency water damage response',
      ],
      order: 2,
      seo: {
        title: 'Professional Waterproofing Solutions | Basement & Foundation',
        description:
          'Expert waterproofing services for basements and foundations. Advanced moisture control systems with 15-year warranty.',
        keywords: [
          'waterproofing',
          'basement waterproofing',
          'foundation sealing',
          'moisture control',
          'water damage prevention',
        ],
      },
      active: true,
      lastUpdated: new Date('2024-01-25'),
    },
    {
      name: 'Kitchen & Bathroom Renovations',
      slug: 'kitchen-bathroom-renovations',
      shortDescription:
        'Complete kitchen and bathroom renovation services with custom design and professional installation.',
      description:
        'Transform your living spaces with our comprehensive renovation services. From modern kitchen upgrades to luxury bathroom remodels, we handle every aspect of your renovation project with attention to detail and quality craftsmanship.',
      features: [
        'Custom kitchen design and installation',
        'Bathroom remodeling and upgrades',
        'Countertop and cabinet installation',
        'Tile and flooring services',
        'Plumbing and electrical work',
        'Project management and coordination',
      ],
      faqs: [
        {
          question: 'How long does a typical renovation take?',
          answer:
            'Kitchen renovations typically take 3-6 weeks, while bathroom renovations take 2-4 weeks. Timeline depends on the scope of work and material availability.',
        },
        {
          question: 'Do you handle permits and inspections?',
          answer:
            'Yes, we handle all necessary permits and coordinate inspections as required by local building codes.',
        },
      ],
      images: [
        '/images/services/renovation-1.jpg',
        '/images/services/renovation-2.jpg',
      ],
      highlights: [
        'Custom design services',
        'Licensed contractors',
        'Quality materials and fixtures',
        'Permit and inspection handling',
      ],
      order: 3,
      seo: {
        title: 'Kitchen & Bathroom Renovation | Complete Home Remodeling',
        description:
          'Expert kitchen and bathroom renovations. Custom designs, quality materials, full-service remodeling from planning to completion.',
        keywords: [
          'kitchen renovation',
          'bathroom remodeling',
          'home renovation',
          'custom kitchen',
          'bathroom renovation',
        ],
      },
      active: true,
      lastUpdated: new Date('2024-01-25'),
    },
  ];
}

// Read services from file (server-side only)
function readServicesFromFile(): Service[] {
  ensureDataDir();

  if (!existsSync(SERVICES_FILE)) {
    const defaultServices = getDefaultServices();
    writeFileSync(SERVICES_FILE, JSON.stringify(defaultServices, null, 2));
    return defaultServices;
  }

  try {
    const data = readFileSync(SERVICES_FILE, 'utf-8');
    const services = JSON.parse(data);

    // Convert date strings back to Date objects
    return services.map((service: any) => ({
      ...service,
      lastUpdated: new Date(service.lastUpdated),
    }));
  } catch (error) {
    console.error('Error reading services file:', error);
    return getDefaultServices();
  }
}

// Write services to file (server-side only)
async function writeServicesToFile(services: Service[]): Promise<void> {
  ensureDataDir();

  try {
    const data = JSON.stringify(services, null, 2);
    writeFileSync(SERVICES_FILE, data);
  } catch (error) {
    console.error('Error writing services file:', error);
    throw new Error('Failed to save services');
  }
}

// Server-side CRUD operations for API routes
export async function getAllServices(): Promise<Service[]> {
  try {
    return readServicesFromFile();
  } catch (error) {
    console.error('Error getting all services:', error);
    throw new Error('Failed to retrieve services');
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const services = readServicesFromFile();
    const service = services.find((s) => s.slug === slug);
    return service || null;
  } catch (error) {
    console.error('Error getting service by slug:', error);
    throw new Error('Failed to retrieve service');
  }
}

export async function createService(
  serviceData: Omit<Service, 'lastUpdated'>
): Promise<Service> {
  try {
    const services = readServicesFromFile();

    // Check if slug already exists
    if (services.some((s) => s.slug === serviceData.slug)) {
      throw new Error('Service with this slug already exists');
    }

    const newService: Service = {
      ...serviceData,
      lastUpdated: new Date(),
    };

    services.push(newService);
    await writeServicesToFile(services);

    return newService;
  } catch (error) {
    console.error('Error creating service:', error);
    throw error;
  }
}

export async function updateService(
  slug: string,
  updateData: Partial<Omit<Service, 'slug' | 'lastUpdated'>>
): Promise<Service> {
  try {
    const services = readServicesFromFile();
    const serviceIndex = services.findIndex((s) => s.slug === slug);

    if (serviceIndex === -1) {
      throw new Error('Service not found');
    }

    services[serviceIndex] = {
      ...services[serviceIndex],
      ...updateData,
      lastUpdated: new Date(),
    };

    await writeServicesToFile(services);

    return services[serviceIndex];
  } catch (error) {
    console.error('Error updating service:', error);
    throw error;
  }
}

export async function deleteService(slug: string): Promise<void> {
  try {
    const services = readServicesFromFile();
    const serviceIndex = services.findIndex((s) => s.slug === slug);

    if (serviceIndex === -1) {
      throw new Error('Service not found');
    }

    services.splice(serviceIndex, 1);
    await writeServicesToFile(services);
  } catch (error) {
    console.error('Error deleting service:', error);
    throw error;
  }
}

// Helper function to get services for SSR (synchronous)
export function getServicesForSSR(): Service[] {
  try {
    return readServicesFromFile();
  } catch (error) {
    console.error('Error reading services for SSR:', error);
    return getDefaultServices();
  }
}

export function getActiveServicesForSSR(): Service[] {
  return getServicesForSSR()
    .filter((service) => service.active)
    .sort((a, b) => a.order - b.order);
}

export function getServiceBySlugForSSR(slug: string): Service | undefined {
  return getServicesForSSR().find((service) => service.slug === slug);
}
