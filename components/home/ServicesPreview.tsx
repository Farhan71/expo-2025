import { UiButton } from '@/components/ui/UiButton';
import { UiCard } from '@/components/ui/UiCard';
import { UiTag } from '@/components/ui/UiFormFields';
import { UiSection, UiSectionHeader } from '@/components/ui/UiSection';
import { Service } from '@/lib/services/services.schema';
import Link from 'next/link';

interface ServicesPreviewProps {
  services: Service[];
}

export function ServicesPreview({ services }: ServicesPreviewProps) {
  return (
    <UiSection>
      <UiSectionHeader
        subtitle="Our Services"
        title="Complete Construction Solutions"
        description="From roofing to renovations, we provide comprehensive construction services for residential and commercial properties."
      />

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <UiCard
            key={service.slug}
            variant="elevated"
            className="flex h-full flex-col"
          >
            <div className="flex-1">
              <div className="mb-4 flex items-center justify-between">
                <UiTag variant="primary" size="sm">
                  Service
                </UiTag>
                <span className="text-sm text-text-secondary">
                  Order #{service.order}
                </span>
              </div>

              <h3 className="mb-3 text-2xl font-bold text-text-primary">
                {service.name}
              </h3>

              <p className="mb-4 flex-1 text-text-secondary">
                {service.shortDescription}
              </p>

              {service.highlights.length > 0 && (
                <div className="mb-6">
                  <h4 className="mb-2 text-sm font-semibold text-text-primary">
                    Key Benefits:
                  </h4>
                  <ul className="space-y-1">
                    {service.highlights.slice(0, 3).map((highlight, index) => (
                      <li
                        key={index}
                        className="flex items-start text-sm text-text-secondary"
                      >
                        <span className="mr-2 mt-0.5 text-success">•</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="border-t border-border pt-4">
              <UiButton variant="secondary" size="md" className="w-full">
                <Link href={`/services/${service.slug}`}>Learn More</Link>
              </UiButton>
            </div>
          </UiCard>
        ))}
      </div>

      <div className="mt-12 text-center">
        <UiButton variant="primary" size="lg">
          <Link href="/services">View All Services</Link>
        </UiButton>
      </div>
    </UiSection>
  );
}
