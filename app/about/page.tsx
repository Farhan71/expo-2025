import { UiCard } from '@/components/ui/UiCard';
import { UiSection, UiSectionHeader } from '@/components/ui/UiSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | EXPO 2025 Construction Inc',
  description:
    'Learn about EXPO 2025 Construction Inc, a trusted construction company serving New York City. Professional contractors Nouros and Hossain provide quality construction services.',
  keywords: [
    'about us',
    'construction company',
    'NYC contractors',
    'EXPO 2025 Construction',
    'professional builders',
  ],
};

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <UiSection className="gradient-bg">
        <UiSectionHeader
          title="About EXPO 2025 Construction Inc"
          description="Professional construction services you can trust. We've been serving New York City with quality workmanship and reliable service since 2020."
          centered={true}
        />
      </UiSection>

      {/* Company Story */}
      <UiSection>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-3xl font-bold text-text-primary">
              Our Story
            </h2>
            <p className="mb-4 leading-relaxed text-text-secondary">
              EXPO 2025 Construction Inc was founded with a simple mission: to
              provide exceptional construction services that exceed our clients'
              expectations. Based in New York City, we've built our reputation
              on quality workmanship, honest communication, and reliable
              service.
            </p>
            <p className="mb-4 leading-relaxed text-text-secondary">
              What started as a small operation has grown into a trusted
              construction company serving residential and commercial clients
              throughout NYC and surrounding areas. We take pride in every
              project, no matter the size.
            </p>
            <p className="leading-relaxed text-text-secondary">
              Our commitment to excellence and customer satisfaction has made us
              the go-to choice for construction projects ranging from simple
              repairs to complete renovations.
            </p>
          </div>

          <div className="relative">
            <div className="flex aspect-square items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 p-8">
              <div className="space-y-4 text-center">
                <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-primary">
                  <span className="text-4xl font-bold text-white">E</span>
                </div>
                <div className="space-y-2">
                  <p className="text-xl font-bold text-text-primary">
                    EXPO 2025
                  </p>
                  <p className="text-text-secondary">Construction Inc</p>
                  <p className="text-sm text-text-secondary">
                    Serving NYC Since 2020
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UiSection>

      {/* Team Section */}
      <UiSection className="bg-bg-secondary">
        <UiSectionHeader
          title="Meet Our Team"
          description="Our experienced professionals are dedicated to delivering exceptional results on every project."
          centered={true}
        />

        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          <UiCard variant="elevated" padding="lg" className="text-center">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary">
              <span className="text-2xl font-bold text-white">N</span>
            </div>
            <h3 className="mb-2 text-2xl font-bold text-text-primary">
              Nouros
            </h3>
            <p className="mb-4 font-semibold text-primary">
              Co-Founder & Project Manager
            </p>
            <p className="mb-6 leading-relaxed text-text-secondary">
              With years of experience in construction and project management,
              Nouros ensures every project is completed to the highest
              standards, on time and within budget.
            </p>
            <a
              href="tel:3474209759"
              className="inline-flex items-center font-semibold text-primary transition-colors hover:text-primary-hover"
            >
              📞 (347) 420-9759
            </a>
          </UiCard>

          <UiCard variant="elevated" padding="lg" className="text-center">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary">
              <span className="text-2xl font-bold text-white">H</span>
            </div>
            <h3 className="mb-2 text-2xl font-bold text-text-primary">
              Hossain
            </h3>
            <p className="mb-4 font-semibold text-primary">
              Co-Founder & Lead Contractor
            </p>
            <p className="mb-6 leading-relaxed text-text-secondary">
              Hossain brings extensive hands-on construction experience and
              technical expertise to every project, ensuring quality workmanship
              and attention to detail.
            </p>
            <a
              href="tel:7188256465"
              className="inline-flex items-center font-semibold text-primary transition-colors hover:text-primary-hover"
            >
              📞 (718) 825-6465
            </a>
          </UiCard>
        </div>
      </UiSection>

      {/* Values Section */}
      <UiSection>
        <UiSectionHeader
          title="Our Values"
          description="The principles that guide everything we do"
          centered={true}
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <UiCard variant="outline" padding="lg" className="text-center">
            <div className="mb-4 text-4xl">🏗️</div>
            <h3 className="mb-3 text-xl font-semibold text-text-primary">
              Quality First
            </h3>
            <p className="text-sm text-text-secondary">
              We never compromise on quality. Every project receives our full
              attention and expertise.
            </p>
          </UiCard>

          <UiCard variant="outline" padding="lg" className="text-center">
            <div className="mb-4 text-4xl">🤝</div>
            <h3 className="mb-3 text-xl font-semibold text-text-primary">
              Honest Communication
            </h3>
            <p className="text-sm text-text-secondary">
              Clear, honest communication throughout every phase of your
              project.
            </p>
          </UiCard>

          <UiCard variant="outline" padding="lg" className="text-center">
            <div className="mb-4 text-4xl">⏰</div>
            <h3 className="mb-3 text-xl font-semibold text-text-primary">
              Timely Delivery
            </h3>
            <p className="text-sm text-text-secondary">
              We respect your time and deliver projects on schedule without
              sacrificing quality.
            </p>
          </UiCard>

          <UiCard variant="outline" padding="lg" className="text-center">
            <div className="mb-4 text-4xl">💯</div>
            <h3 className="mb-3 text-xl font-semibold text-text-primary">
              Customer Satisfaction
            </h3>
            <p className="text-sm text-text-secondary">
              Your satisfaction is our success. We're not done until you're
              completely happy.
            </p>
          </UiCard>
        </div>
      </UiSection>

      {/* Licensing & Insurance */}
      <UiSection className="bg-bg-secondary">
        <div className="mx-auto max-w-4xl">
          <UiCard variant="elevated" padding="lg">
            <div className="mb-8 text-center">
              <h2 className="mb-4 text-3xl font-bold text-text-primary">
                Licensed & Insured
              </h2>
              <p className="text-lg text-text-secondary">
                Your peace of mind is our priority
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success">
                  <span className="text-2xl text-white">📋</span>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-text-primary">
                  Fully Licensed
                </h3>
                <p className="text-text-secondary">
                  We maintain all necessary licenses and certifications required
                  for construction work in New York City.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success">
                  <span className="text-2xl text-white">🛡️</span>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-text-primary">
                  Comprehensive Insurance
                </h3>
                <p className="text-text-secondary">
                  Our comprehensive insurance coverage protects both our team
                  and your property throughout the project.
                </p>
              </div>
            </div>

            <div className="mt-8 border-t border-border pt-8 text-center">
              <p className="text-text-secondary">
                Certificates of insurance and licensing information available
                upon request.
              </p>
            </div>
          </UiCard>
        </div>
      </UiSection>
    </>
  );
}
