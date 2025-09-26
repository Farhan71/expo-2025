import { UiCard } from '@/components/ui/UiCard';
import { UiSection, UiSectionHeader } from '@/components/ui/UiSection';
import { getFeaturedTestimonials } from '@/lib/testimonials/testimonials.data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Clients | Testimonials & Reviews',
  description:
    'See what our satisfied clients say about EXPO 2025 Construction Inc. Read testimonials from real customers who experienced our quality construction services.',
  keywords: [
    'client testimonials',
    'reviews',
    'customer feedback',
    'construction testimonials',
    'NYC contractors reviews',
  ],
};

export default function ClientsPage() {
  const testimonials = getFeaturedTestimonials(10); // Get more testimonials for this page

  return (
    <>
      {/* Hero Section */}
      <UiSection className="gradient-bg">
        <UiSectionHeader
          title="What Our Clients Say"
          description="Don't just take our word for it. Here's what our satisfied clients have to say about their experience with EXPO 2025 Construction Inc."
          centered={true}
        />
      </UiSection>

      {/* Testimonials Section */}
      <UiSection>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <UiCard
              key={testimonial.id}
              variant="elevated"
              padding="lg"
              className="flex h-full flex-col"
            >
              <div className="flex-1">
                {/* Rating */}
                <div className="mb-4 flex items-center">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span
                      key={i}
                      className={`text-2xl ${
                        i < testimonial.rating ? 'text-warning' : 'text-border'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                  <span className="ml-2 text-sm text-text-secondary">
                    ({testimonial.rating}/5)
                  </span>
                </div>

                {/* Testimonial Text */}
                <blockquote className="mb-6 italic leading-relaxed text-text-secondary">
                  "{testimonial.text}"
                </blockquote>
              </div>

              {/* Client Info */}
              <div className="border-t border-border pt-4">
                <div className="flex items-center">
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                    <span className="font-bold text-white">
                      {testimonial.clientName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary">
                      {testimonial.clientName}
                    </p>
                    {testimonial.projectSlug && (
                      <p className="text-sm capitalize text-text-secondary">
                        {testimonial.projectSlug.replace('-', ' ')} Project
                      </p>
                    )}
                    <p className="text-xs text-text-secondary">
                      {testimonial.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </UiCard>
          ))}
        </div>
      </UiSection>

      {/* Stats Section */}
      <UiSection className="bg-bg-secondary">
        <UiSectionHeader
          title="Our Track Record"
          description="Numbers that speak for themselves"
          centered={true}
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <UiCard variant="elevated" padding="lg" className="text-center">
            <div className="mb-2 text-4xl font-bold text-primary">500+</div>
            <h3 className="mb-2 text-lg font-semibold text-text-primary">
              Projects Completed
            </h3>
            <p className="text-sm text-text-secondary">
              Successfully delivered projects across NYC
            </p>
          </UiCard>

          <UiCard variant="elevated" padding="lg" className="text-center">
            <div className="mb-2 text-4xl font-bold text-primary">5</div>
            <h3 className="mb-2 text-lg font-semibold text-text-primary">
              Years Experience
            </h3>
            <p className="text-sm text-text-secondary">
              Serving the NYC construction market since 2020
            </p>
          </UiCard>

          <UiCard variant="elevated" padding="lg" className="text-center">
            <div className="mb-2 text-4xl font-bold text-primary">100%</div>
            <h3 className="mb-2 text-lg font-semibold text-text-primary">
              Client Satisfaction
            </h3>
            <p className="text-sm text-text-secondary">
              Every client satisfied with our service quality
            </p>
          </UiCard>

          <UiCard variant="elevated" padding="lg" className="text-center">
            <div className="mb-2 text-4xl font-bold text-primary">24/7</div>
            <h3 className="mb-2 text-lg font-semibold text-text-primary">
              Emergency Service
            </h3>
            <p className="text-sm text-text-secondary">
              Available for urgent construction needs
            </p>
          </UiCard>
        </div>
      </UiSection>

      {/* Call to Action */}
      <UiSection>
        <UiCard
          variant="elevated"
          padding="lg"
          className="mx-auto max-w-4xl text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-text-primary">
            Ready to Join Our Satisfied Clients?
          </h2>
          <p className="mb-8 text-lg text-text-secondary">
            Experience the same quality service and professional results that
            our clients love. Contact us today for your free consultation and
            quote.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-primary-hover"
            >
              Get Free Quote
            </a>
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <a
                href="tel:3474209759"
                className="font-semibold text-primary transition-colors hover:text-primary-hover"
              >
                Call Nouros: (347) 420-9759
              </a>
              <a
                href="tel:7188256465"
                className="font-semibold text-primary transition-colors hover:text-primary-hover"
              >
                Call Hossain: (718) 825-6465
              </a>
            </div>
          </div>
        </UiCard>
      </UiSection>
    </>
  );
}
