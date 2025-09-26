import type { Service } from './services.schema';

// Default services data (fallback for client-side)
const defaultServicesData: Service[] = [
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

// Helper function to get data from server or fallback to default
function getServicesData(): Service[] {
  // Try to get from server-side file storage if available
  if (typeof window === 'undefined') {
    try {
      // Only import server-side module when on server
      const { getServicesForSSR } = require('./services.fileStorage.server');
      return getServicesForSSR();
    } catch (error) {
      console.warn(
        'Server-side services loading failed, using defaults:',
        error
      );
      return defaultServicesData;
    }
  }

  // Use default data for client-side
  return defaultServicesData;
}

// Helper functions for working with services data
export function getServiceBySlug(slug: string): Service | undefined {
  const services = getServicesData();
  return services.find((service) => service.slug === slug && service.active);
}

export function getAllActiveServices(): Service[] {
  const services = getServicesData();
  return services
    .filter((service) => service.active)
    .sort((a, b) => a.order - b.order);
}

export function getAllServices(): Service[] {
  const services = getServicesData();
  return services.sort((a, b) => a.order - b.order);
}

export function getServicesByCategory(category?: string): Service[] {
  // For future categorization if needed
  return getAllActiveServices();
}

// Legacy export - kept for backwards compatibility
export const servicesData: Service[] = defaultServicesData;
