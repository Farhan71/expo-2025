import { Features } from '@/components/home/Features';
import { Hero } from '@/components/home/Hero';
import { ServicesPreview } from '@/components/home/ServicesPreview';
import { getActiveServicesForSSR } from '@/lib/services/services.firestore';

// Disable caching for this page to ensure fresh data
export const revalidate = 0;

export default async function HomePage() {
  console.log('🏠 HomePage: Fetching services data...');
  const services = await getActiveServicesForSSR();
  console.log('🏠 HomePage: Got', services.length, 'services');

  return (
    <>
      <Hero />
      <Features />
      <ServicesPreview services={services.slice(0, 3)} />
    </>
  );
}
