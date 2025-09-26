import { UiButton } from '@/components/ui/UiButton';
import { UiCard } from '@/components/ui/UiCard';
import { UiTag } from '@/components/ui/UiFormFields';
import { UiSection, UiSectionHeader } from '@/components/ui/UiSection';
import { getAllActiveServices } from '@/lib/services/services.data';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Services | Complete Construction Solutions',
  description:
    'Comprehensive construction services including roofing, waterproofing, renovations, and more. Licensed contractors serving New York City with quality workmanship.',
  keywords: [
    'construction services',
    'roofing',
    'waterproofing',
    'renovation',
    'NYC contractors',
  ],
};

export default function ServicesPage() {
  const services = getAllActiveServices();

  return (
    <UiSection>
      <UiSectionHeader
        title="Our Services"
        description="We provide comprehensive construction services for residential and commercial properties throughout New York City. Every project is backed by our commitment to quality, reliability, and customer satisfaction."
      />

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <UiCard
            key={service.slug}
            variant="elevated"
            className="group flex h-full flex-col transition-all duration-300 hover:shadow-2xl"
          >
            <div className="flex-1">
              <div className="mb-4 flex items-center justify-between">
                <UiTag variant="primary" size="sm">
                  Service
                </UiTag>
                <span className="text-sm text-text-secondary">
                  #{service.order}
                </span>
              </div>

              <h2 className="mb-4 text-2xl font-bold text-text-primary transition-colors group-hover:text-primary">
                {service.name}
              </h2>

              <p className="mb-6 text-text-secondary">
                {service.shortDescription}
              </p>

              {service.features.length > 0 && (
                <div className="mb-6">
                  <h3 className="mb-3 text-sm font-semibold text-text-primary">
                    What's Included:
                  </h3>
                  <ul className="space-y-2">
                    {service.features.slice(0, 4).map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start text-sm text-text-secondary"
                      >
                        <span className="mr-2 mt-1 text-xs text-success">
                          ✓
                        </span>
                        {feature}
                      </li>
                    ))}
                    {service.features.length > 4 && (
                      <li className="text-sm italic text-text-secondary">
                        And {service.features.length - 4} more...
                      </li>
                    )}
                  </ul>
                </div>
              )}

              {service.highlights.length > 0 && (
                <div className="mb-6">
                  <h3 className="mb-3 text-sm font-semibold text-text-primary">
                    Key Benefits:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {service.highlights.slice(0, 3).map((highlight, index) => (
                      <UiTag key={index} variant="secondary" size="sm">
                        {highlight}
                      </UiTag>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-3 border-t border-border pt-6">
              <UiButton variant="primary" size="md" className="w-full">
                <Link href={`/services/${service.slug}`}>
                  Learn More & Get Quote
                </Link>
              </UiButton>
              <p className="text-center text-xs text-text-secondary">
                Last updated: {service.lastUpdated.toLocaleDateString()}
              </p>
            </div>
          </UiCard>
        ))}
      </div>

      <div className="mt-16 text-center">
        <UiCard variant="outline" padding="lg" className="mx-auto max-w-2xl">
          <h2 className="mb-4 text-2xl font-bold text-text-primary">
            Need a Custom Solution?
          </h2>
          <p className="mb-6 text-text-secondary">
            Don't see exactly what you need? We provide custom construction
            solutions tailored to your specific requirements. Contact us to
            discuss your project.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <UiButton variant="primary" size="lg">
              <Link href="/contact">Get Custom Quote</Link>
            </UiButton>
            <UiButton variant="secondary" size="lg">
              <a href="tel:3474209759">Call (347) 420-9759</a>
            </UiButton>
          </div>
        </UiCard>
      </div>
    </UiSection>
  );
}
