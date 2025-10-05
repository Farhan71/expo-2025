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

// Helper functions for SSR (Server-Side Rendering)
export async function getServicesForSSR(): Promise<Service[]> {
  return getAllServices();
}

export async function getActiveServicesForSSR(): Promise<Service[]> {
  return getActiveServices();
}

export async function getServiceBySlugForSSR(
  slug: string
): Promise<Service | null> {
  return getServiceBySlug(slug);
}
