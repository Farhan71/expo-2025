import { Service } from './services.schema';

// In-memory storage for serverless environments
let servicesCache: Service[] | undefined = undefined;

// Default services data
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

// Initialize services cache
function initializeServices(): Service[] {
  if (!servicesCache) {
    // Try to load from environment variable or fallback to defaults
    const envServices = process.env.SERVICES_DATA;
    if (envServices) {
      try {
        const parsedServices = JSON.parse(envServices);
        servicesCache = parsedServices.map((service: any) => ({
          ...service,
          lastUpdated: new Date(service.lastUpdated),
        }));
      } catch (error) {
        console.warn(
          'Failed to parse services from environment, using defaults'
        );
        servicesCache = getDefaultServices();
      }
    } else {
      servicesCache = getDefaultServices();
    }
  }
  // TypeScript guarantee: servicesCache is always defined at this point
  return servicesCache!;
}

// Server-side CRUD operations (serverless compatible)
export async function getAllServices(): Promise<Service[]> {
  try {
    return initializeServices();
  } catch (error) {
    console.error('Error getting all services:', error);
    return getDefaultServices();
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const services = initializeServices();
    const service = services.find((s) => s.slug === slug);
    return service || null;
  } catch (error) {
    console.error('Error getting service by slug:', error);
    return null;
  }
}

export async function createService(
  serviceData: Omit<Service, 'lastUpdated'>
): Promise<Service> {
  try {
    const services = initializeServices();

    // Check if slug already exists
    if (services.some((s) => s.slug === serviceData.slug)) {
      throw new Error('Service with this slug already exists');
    }

    const newService: Service = {
      ...serviceData,
      lastUpdated: new Date(),
    };

    services.push(newService);
    servicesCache = services;

    // Note: In serverless environment, changes are temporary
    console.log('Service created (in-memory only):', newService.slug);

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
    const services = initializeServices();
    const serviceIndex = services.findIndex((s) => s.slug === slug);

    if (serviceIndex === -1) {
      throw new Error('Service not found');
    }

    services[serviceIndex] = {
      ...services[serviceIndex],
      ...updateData,
      lastUpdated: new Date(),
    };

    servicesCache = services;

    // Note: In serverless environment, changes are temporary
    console.log('Service updated (in-memory only):', slug);

    return services[serviceIndex];
  } catch (error) {
    console.error('Error updating service:', error);
    throw error;
  }
}

export async function deleteService(slug: string): Promise<void> {
  try {
    const services = initializeServices();
    const serviceIndex = services.findIndex((s) => s.slug === slug);

    if (serviceIndex === -1) {
      throw new Error('Service not found');
    }

    services.splice(serviceIndex, 1);
    servicesCache = services;

    // Note: In serverless environment, changes are temporary
    console.log('Service deleted (in-memory only):', slug);
  } catch (error) {
    console.error('Error deleting service:', error);
    throw error;
  }
}

// Helper function for SSR (same as server functions in serverless)
export function getServicesForSSR(): Service[] {
  return initializeServices();
}

export function getActiveServicesForSSR(): Service[] {
  return getServicesForSSR()
    .filter((service) => service.active)
    .sort((a, b) => a.order - b.order);
}

export function getServiceBySlugForSSR(slug: string): Service | undefined {
  return getServicesForSSR().find((service) => service.slug === slug);
}
