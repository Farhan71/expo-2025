import { UiButton } from '@/components/ui/UiButton';
import { UiSection } from '@/components/ui/UiSection';
import Link from 'next/link';

export function Hero() {
  return (
    <UiSection className="gradient-bg flex min-h-[80vh] items-center">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold leading-tight text-text-primary md:text-5xl lg:text-6xl">
              Professional Construction
              <span className="block text-primary">You Can Trust</span>
            </h1>
            <p className="max-w-2xl text-lg text-text-secondary md:text-xl">
              EXPO 2025 Construction Inc provides expert roofing, waterproofing,
              renovation, and construction services throughout New York City.
              Quality workmanship, reliable service, and customer satisfaction
              guaranteed.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <UiButton variant="primary" size="lg">
              <Link href="/contact">Get Free Quote</Link>
            </UiButton>
            <UiButton variant="secondary" size="lg">
              <Link href="/services">Our Services</Link>
            </UiButton>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-6 border-t border-border pt-4 sm:flex-row">
            <div>
              <p className="text-sm text-text-secondary">Call Nouros</p>
              <a
                href="tel:3474209759"
                className="text-lg font-semibold text-text-primary transition-colors hover:text-primary"
              >
                (347) 420-9759
              </a>
            </div>
            <div>
              <p className="text-sm text-text-secondary">Call Hossain</p>
              <a
                href="tel:7188256465"
                className="text-lg font-semibold text-text-primary transition-colors hover:text-primary"
              >
                (718) 825-6465
              </a>
            </div>
          </div>
        </div>

        {/* Image/Visual */}
        <div className="relative">
          <div className="flex aspect-square items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 p-8">
            {/* Placeholder for hero image */}
            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary">
                <span className="text-3xl font-bold text-white">E</span>
              </div>
              <div className="space-y-2">
                <p className="font-semibold text-text-primary">
                  Licensed & Insured
                </p>
                <p className="text-text-secondary">Serving NYC Since 2020</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UiSection>
  );
}
