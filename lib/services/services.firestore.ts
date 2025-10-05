import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { Service } from './services.schema';

// Collection name in Firestore
const SERVICES_COLLECTION = 'services';

// Helper function to convert Firestore timestamp to Date
function convertTimestamps(data: any): Service {
  return {
    ...data,
    lastUpdated: data.lastUpdated?.toDate() || new Date(),
  };
}

// Helper function to prepare data for Firestore
function prepareForFirestore(service: Partial<Service>) {
  return {
    ...service,
    lastUpdated: Timestamp.now(),
  };
}

// Get all services
export async function getAllServices(): Promise<Service[]> {
  try {
    const servicesRef = collection(db, SERVICES_COLLECTION);
    const q = query(servicesRef, orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);

    const services: Service[] = [];
    querySnapshot.forEach((doc: any) => {
      services.push({
        id: doc.id,
        ...convertTimestamps(doc.data()),
      } as Service);
    });

    return services;
  } catch (error) {
    console.error('Error getting all services:', error);
    throw new Error('Failed to fetch services');
  }
}

// Get active services (for public display)
export async function getActiveServices(): Promise<Service[]> {
  try {
    const servicesRef = collection(db, SERVICES_COLLECTION);
    const q = query(
      servicesRef,
      where('active', '==', true),
      orderBy('order', 'asc')
    );
    const querySnapshot = await getDocs(q);

    const services: Service[] = [];
    querySnapshot.forEach((doc: any) => {
      services.push({
        id: doc.id,
        ...convertTimestamps(doc.data()),
      } as Service);
    });

    return services;
  } catch (error) {
    console.error('Error getting active services:', error);
    throw new Error('Failed to fetch active services');
  }
}

// Get service by slug
export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const servicesRef = collection(db, SERVICES_COLLECTION);
    const q = query(servicesRef, where('slug', '==', slug));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      ...convertTimestamps(doc.data()),
    } as Service;
  } catch (error) {
    console.error('Error getting service by slug:', error);
    return null;
  }
}

// Get service by ID
export async function getServiceById(id: string): Promise<Service | null> {
  try {
    const docRef = doc(db, SERVICES_COLLECTION, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...convertTimestamps(docSnap.data()),
      } as Service;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting service by ID:', error);
    return null;
  }
}

// Create new service
export async function createService(
  serviceData: Omit<Service, 'id' | 'lastUpdated'>
): Promise<Service> {
  try {
    // Check if slug already exists
    const existingService = await getServiceBySlug(serviceData.slug);
    if (existingService) {
      throw new Error('Service with this slug already exists');
    }

    const servicesRef = collection(db, SERVICES_COLLECTION);
    const docData = prepareForFirestore(serviceData);
    const docRef = await addDoc(servicesRef, docData);

    // Return the created service
    const newService = await getServiceById(docRef.id);
    if (!newService) {
      throw new Error('Failed to retrieve created service');
    }

    return newService;
  } catch (error) {
    console.error('Error creating service:', error);
    throw error;
  }
}

// Update service
export async function updateService(
  slug: string,
  updateData: Partial<Omit<Service, 'id' | 'slug' | 'lastUpdated'>>
): Promise<Service> {
  try {
    const service = await getServiceBySlug(slug);
    if (!service || !service.id) {
      throw new Error('Service not found');
    }

    const docRef = doc(db, SERVICES_COLLECTION, service.id);
    const docData = prepareForFirestore(updateData);
    await updateDoc(docRef, docData);

    // Return the updated service
    const updatedService = await getServiceById(service.id);
    if (!updatedService) {
      throw new Error('Failed to retrieve updated service');
    }

    return updatedService;
  } catch (error) {
    console.error('Error updating service:', error);
    throw error;
  }
}

// Delete service
export async function deleteService(slug: string): Promise<void> {
  try {
    const service = await getServiceBySlug(slug);
    if (!service || !service.id) {
      throw new Error('Service not found');
    }

    const docRef = doc(db, SERVICES_COLLECTION, service.id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting service:', error);
    throw error;
  }
}

// Batch import services (useful for initial setup)
export async function batchImportServices(
  services: Omit<Service, 'id' | 'lastUpdated'>[]
): Promise<void> {
  try {
    const promises = services.map((service) => createService(service));
    await Promise.all(promises);
    console.log(`Successfully imported ${services.length} services`);
  } catch (error) {
    console.error('Error batch importing services:', error);
    throw error;
  }
}

// Default fallback data for when Firebase fails
const defaultServicesData: Omit<Service, 'id'>[] = [
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

// Helper functions for SSR (Server-Side Rendering) with fallback support
export async function getServicesForSSR(): Promise<Service[]> {
  try {
    console.log('🔥 Attempting to fetch all services from Firebase...');
    const services = await getAllServices();
    console.log(
      '✅ Successfully fetched',
      services.length,
      'services from Firebase'
    );
    return services;
  } catch (error) {
    console.warn('⚠️ Firebase failed, using fallback data:', error);
    return defaultServicesData.map((service, index) => ({
      id: `fallback-${index}`,
      ...service,
    })) as Service[];
  }
}

// Direct Firebase query for SSR - bypasses existing functions
export async function getActiveServicesForSSR(): Promise<Service[]> {
  try {
    console.log('🔥 Direct Firebase query for active services...');
    console.log('🔍 Environment check:', {
      isServer: typeof window === 'undefined',
      hasApiKey: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      hasProjectId: !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });

    // Direct Firebase query - order in JavaScript to avoid index requirement
    const servicesRef = collection(db, SERVICES_COLLECTION);
    const q = query(servicesRef, where('active', '==', true));
    const querySnapshot = await getDocs(q);

    const services: Service[] = [];
    querySnapshot.forEach((doc: any) => {
      services.push({
        id: doc.id,
        ...convertTimestamps(doc.data()),
      } as Service);
    });

    // Sort by order in JavaScript instead of in the query
    services.sort((a, b) => a.order - b.order);

    console.log(
      '✅ Direct Firebase query successful:',
      services.length,
      'services'
    );
    console.log(
      '📋 Service names:',
      services.map((s) => s.name)
    );
    return services;
  } catch (error) {
    console.error('❌ Direct Firebase query failed:', error);
    console.log(
      '📋 Using fallback data with',
      defaultServicesData.length,
      'services'
    );
    return defaultServicesData
      .filter((service) => service.active)
      .map((service, index) => ({
        id: `fallback-${index}`,
        ...service,
      })) as Service[];
  }
}

export async function getServiceBySlugForSSR(
  slug: string
): Promise<Service | null> {
  try {
    console.log('🔥 Attempting to fetch service by slug from Firebase:', slug);
    const service = await getServiceBySlug(slug);
    if (service) {
      console.log(
        '✅ Successfully fetched service from Firebase:',
        service.name
      );
    } else {
      console.log('❌ Service not found in Firebase for slug:', slug);
    }
    return service;
  } catch (error) {
    console.warn(
      '⚠️ Firebase failed for slug:',
      slug,
      'using fallback data:',
      error
    );
    const fallbackService = defaultServicesData.find(
      (service) => service.slug === slug
    );
    return fallbackService
      ? ({
          id: `fallback-${slug}`,
          ...fallbackService,
        } as Service)
      : null;
  }
}
