import { UiButton } from '@/components/ui/UiButton';
import { UiCard } from '@/components/ui/UiCard';
import { UiTag } from '@/components/ui/UiFormFields';
import { UiSection, UiSectionHeader } from '@/components/ui/UiSection';
import {
  getAllActiveServices,
  getServiceBySlug,
} from '@/lib/services/services.data';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface ServicePageProps {
  params: {
    slug: string;
  };
}

// Generate metadata for each service page
export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    return {
      title: 'Service Not Found',
      description: 'The requested service could not be found.',
    };
  }

  const title =
    service.seo?.title || `${service.name} | EXPO 2025 Construction`;
  const description = service.seo?.description || service.shortDescription;

  return {
    title,
    description,
    keywords: service.seo?.keywords || [
      service.name.toLowerCase(),
      'construction',
      'NYC',
    ],
    openGraph: {
      title,
      description,
      type: 'article',
      url: `/services/${service.slug}`,
    },
    alternates: {
      canonical: `/services/${service.slug}`,
    },
  };
}

// Generate static params for all services
export async function generateStaticParams() {
  const services = getAllActiveServices();
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  // Generate JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'LocalBusiness',
      name: 'EXPO 2025 Construction Inc',
      telephone: ['347-420-9759', '718-825-6465'],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'New York',
        addressRegion: 'NY',
        addressCountry: 'US',
      },
    },
    areaServed: {
      '@type': 'City',
      name: 'New York City',
    },
    ...(service.faqs.length > 0 && {
      mainEntity: service.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    }),
  };

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <UiSection className="gradient-bg">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-6 flex items-center gap-4">
              <UiTag variant="primary">Service</UiTag>
              <span className="text-text-secondary">
                Professional • Licensed • Insured
              </span>
            </div>

            <h1 className="mb-6 text-4xl font-bold text-text-primary md:text-5xl">
              {service.name}
            </h1>

            <p className="mb-8 text-xl leading-relaxed text-text-secondary">
              {service.shortDescription}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <UiButton variant="primary" size="lg">
                <Link href="/contact">Get Free Quote</Link>
              </UiButton>
              <UiButton variant="secondary" size="lg">
                <a href="tel:3474209759">Call (347) 420-9759</a>
              </UiButton>
            </div>
          </div>

          <div className="relative">
            <div className="flex aspect-square items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 p-8">
              <div className="space-y-4 text-center">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary">
                  <span className="text-3xl font-bold text-white">
                    {service.name.charAt(0)}
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold text-text-primary">
                    Expert Service
                  </p>
                  <p className="text-text-secondary">Licensed & Insured</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UiSection>

      {/* Service Details */}
      <UiSection>
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-8 lg:col-span-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-text-primary">
                Service Overview
              </h2>
              <div className="prose max-w-none">
                {service.description.split('\n\n').map((paragraph, index) => (
                  <p
                    key={index}
                    className="mb-4 leading-relaxed text-text-secondary"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Features */}
            {service.features.length > 0 && (
              <div>
                <h2 className="mb-6 text-3xl font-bold text-text-primary">
                  What's Included
                </h2>
                <UiCard variant="outline" padding="lg">
                  <div className="grid gap-4 md:grid-cols-2">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <span className="mr-3 mt-1 text-lg text-success">
                          ✓
                        </span>
                        <span className="text-text-secondary">{feature}</span>
                      </div>
                    ))}
                  </div>
                </UiCard>
              </div>
            )}

            {/* FAQs */}
            {service.faqs.length > 0 && (
              <div>
                <h2 className="mb-6 text-3xl font-bold text-text-primary">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {service.faqs.map((faq, index) => (
                    <UiCard key={index} variant="outline">
                      <h3 className="mb-3 text-lg font-semibold text-text-primary">
                        {faq.question}
                      </h3>
                      <p className="leading-relaxed text-text-secondary">
                        {faq.answer}
                      </p>
                    </UiCard>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Key Benefits */}
            {service.highlights.length > 0 && (
              <UiCard variant="elevated" padding="lg">
                <h3 className="mb-4 text-xl font-bold text-text-primary">
                  Key Benefits
                </h3>
                <div className="space-y-3">
                  {service.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start">
                      <span className="mr-2 mt-1 text-primary">•</span>
                      <span className="text-sm text-text-secondary">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </UiCard>
            )}

            {/* Contact Card */}
            <UiCard variant="elevated" padding="lg" className="text-center">
              <h3 className="mb-4 text-xl font-bold text-text-primary">
                Ready to Get Started?
              </h3>
              <p className="mb-6 text-text-secondary">
                Contact us today for a free consultation and quote.
              </p>
              <div className="space-y-3">
                <UiButton variant="primary" size="md" className="w-full">
                  <Link href="/contact">Get Free Quote</Link>
                </UiButton>
                <div className="space-y-1 text-sm text-text-secondary">
                  <p>
                    <a
                      href="tel:3474209759"
                      className="transition-colors hover:text-primary"
                    >
                      Nouros: (347) 420-9759
                    </a>
                  </p>
                  <p>
                    <a
                      href="tel:7188256465"
                      className="transition-colors hover:text-primary"
                    >
                      Hossain: (718) 825-6465
                    </a>
                  </p>
                </div>
              </div>
            </UiCard>

            {/* Service Info */}
            <UiCard variant="outline" padding="lg">
              <h3 className="mb-4 text-lg font-semibold text-text-primary">
                Service Information
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Service ID:</span>
                  <span className="text-text-primary">#{service.order}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Status:</span>
                  <UiTag variant="success" size="sm">
                    Active
                  </UiTag>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Updated:</span>
                  <span className="text-text-primary">
                    {service.lastUpdated.toLocaleDateString()}
                  </span>
                </div>
              </div>
            </UiCard>
          </div>
        </div>
      </UiSection>

      {/* Related Services */}
      <UiSection className="bg-bg-secondary">
        <UiSectionHeader
          title="Other Services"
          description="Explore our complete range of construction services."
          centered={true}
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {getAllActiveServices()
            .filter((s) => s.slug !== service.slug)
            .slice(0, 3)
            .map((relatedService) => (
              <UiCard
                key={relatedService.slug}
                variant="elevated"
                className="text-center transition-shadow duration-300 hover:shadow-xl"
              >
                <h3 className="mb-3 text-xl font-semibold text-text-primary">
                  {relatedService.name}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-text-secondary">
                  {relatedService.shortDescription}
                </p>
                <UiButton variant="secondary" size="sm" className="w-full">
                  <Link href={`/services/${relatedService.slug}`}>
                    Learn More
                  </Link>
                </UiButton>
              </UiCard>
            ))}
        </div>

        <div className="mt-8 text-center">
          <UiButton variant="primary" size="lg">
            <Link href="/services">View All Services</Link>
          </UiButton>
        </div>
      </UiSection>
    </>
  );
}
