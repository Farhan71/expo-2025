import { Features } from '@/components/home/Features';
import { Hero } from '@/components/home/Hero';
import { ServicesPreview } from '@/components/home/ServicesPreview';
import { getAllActiveServices } from '@/lib/services/services.data';

export default async function HomePage() {
  const services = await getAllActiveServices();

  return (
    <>
      <Hero />
      <Features />
      <ServicesPreview services={services.slice(0, 3)} />
    </>
  );
}
