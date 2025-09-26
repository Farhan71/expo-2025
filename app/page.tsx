import { Features } from '@/components/home/Features';
import { Hero } from '@/components/home/Hero';
import { ServicesPreview } from '@/components/home/ServicesPreview';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <ServicesPreview />
    </>
  );
}
