import { ContactForm } from '@/components/forms/ContactForm';
import { UiCard } from '@/components/ui/UiCard';
import { UiSection, UiSectionHeader } from '@/components/ui/UiSection';
import { getAllActiveServices } from '@/lib/services/services.data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Get Your Free Construction Quote',
  description:
    'Contact EXPO 2025 Construction Inc for professional construction services in NYC. Get your free quote today. Call (347) 420-9759 or (718) 825-6465.',
  keywords: [
    'contact',
    'free quote',
    'construction services',
    'NYC contractors',
    'EXPO 2025 Construction',
  ],
};

export default async function ContactPage() {
  const services = await getAllActiveServices();
  return (
    <>
      {/* Hero Section */}
      <UiSection className="gradient-bg">
        <UiSectionHeader
          title="Get Your Free Quote"
          description="Ready to start your construction project? Contact us today for a free consultation and detailed quote. We're here to help bring your vision to life."
          centered={true}
        />

        <div className="grid items-start gap-12 lg:grid-cols-2">
          {/* Contact Information */}
          <div className="space-y-8">
            <UiCard variant="elevated" padding="lg">
              <h2 className="mb-6 text-2xl font-bold text-text-primary">
                Contact Information
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-text-primary">
                    Call Us Directly
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="mr-3 text-text-secondary">Nouros:</span>
                      <a
                        href="tel:3474209759"
                        className="text-lg font-medium text-primary transition-colors hover:text-primary-hover"
                      >
                        (347) 420-9759
                      </a>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-3 text-text-secondary">Hossain:</span>
                      <a
                        href="tel:7188256465"
                        className="text-lg font-medium text-primary transition-colors hover:text-primary-hover"
                      >
                        (718) 825-6465
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-semibold text-text-primary">
                    Service Area
                  </h3>
                  <p className="text-text-secondary">
                    New York City & Surrounding Areas
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-semibold text-text-primary">
                    Business Hours
                  </h3>
                  <div className="space-y-1 text-text-secondary">
                    <p>Monday - Friday: 7:00 AM - 6:00 PM</p>
                    <p>Saturday: 8:00 AM - 4:00 PM</p>
                    <p>Sunday: Emergency calls only</p>
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-semibold text-text-primary">
                    Response Time
                  </h3>
                  <div className="space-y-1 text-text-secondary">
                    <p>Email inquiries: Within 24 hours</p>
                    <p>Phone calls: Same day</p>
                    <p>Emergency services: Immediate</p>
                  </div>
                </div>
              </div>
            </UiCard>

            {/* Why Choose Us */}
            <UiCard variant="outline" padding="lg">
              <h2 className="mb-6 text-2xl font-bold text-text-primary">
                Why Choose EXPO 2025 Construction?
              </h2>

              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="mr-3 mt-1 text-lg text-success">✓</span>
                  <div>
                    <h4 className="font-semibold text-text-primary">
                      Licensed & Insured
                    </h4>
                    <p className="text-sm text-text-secondary">
                      Fully licensed contractors with comprehensive insurance
                      coverage
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="mr-3 mt-1 text-lg text-success">✓</span>
                  <div>
                    <h4 className="font-semibold text-text-primary">
                      Free Estimates
                    </h4>
                    <p className="text-sm text-text-secondary">
                      Detailed quotes with no hidden fees or surprises
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="mr-3 mt-1 text-lg text-success">✓</span>
                  <div>
                    <h4 className="font-semibold text-text-primary">
                      Quality Workmanship
                    </h4>
                    <p className="text-sm text-text-secondary">
                      Expert craftsmanship using premium materials
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="mr-3 mt-1 text-lg text-success">✓</span>
                  <div>
                    <h4 className="font-semibold text-text-primary">
                      Warranty Backed
                    </h4>
                    <p className="text-sm text-text-secondary">
                      All work comes with comprehensive warranties
                    </p>
                  </div>
                </div>
              </div>
            </UiCard>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="mb-6 text-2xl font-bold text-text-primary">
              Send us a Message
            </h2>
            <ContactForm services={services} />
          </div>
        </div>
      </UiSection>

      {/* Emergency Contact Section */}
      <UiSection className="bg-bg-secondary">
        <UiCard
          variant="elevated"
          padding="lg"
          className="mx-auto max-w-4xl text-center"
        >
          <div className="mb-6">
            <h2 className="mb-4 text-3xl font-bold text-text-primary">
              Emergency Services Available
            </h2>
            <p className="text-lg text-text-secondary">
              We provide 24/7 emergency construction services for urgent repairs
              and situations that can't wait. Don't hesitate to call us for
              immediate assistance.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <div className="flex items-center">
              <span className="mr-2 text-2xl text-error">🚨</span>
              <span className="font-semibold text-text-primary">
                Emergency Hotline:
              </span>
            </div>
            <div className="flex gap-6">
              <a
                href="tel:3474209759"
                className="text-xl font-bold text-primary transition-colors hover:text-primary-hover"
              >
                (347) 420-9759
              </a>
              <a
                href="tel:7188256465"
                className="text-xl font-bold text-primary transition-colors hover:text-primary-hover"
              >
                (718) 825-6465
              </a>
            </div>
          </div>

          <div className="mt-6 border-t border-border pt-6">
            <p className="text-sm text-text-secondary">
              Emergency services include: roof leaks, structural damage, water
              damage, electrical hazards, and other urgent construction-related
              issues.
            </p>
          </div>
        </UiCard>
      </UiSection>
    </>
  );
}
