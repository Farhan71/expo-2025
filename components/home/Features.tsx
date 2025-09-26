import { UiCard } from '@/components/ui/UiCard';
import { UiSection, UiSectionHeader } from '@/components/ui/UiSection';

const features = [
  {
    title: 'Licensed & Insured',
    description:
      'Fully licensed contractors with comprehensive insurance coverage for your peace of mind.',
    icon: '🛡️',
  },
  {
    title: 'Quality Workmanship',
    description:
      'Expert craftsmanship using premium materials and proven construction techniques.',
    icon: '⚡',
  },
  {
    title: 'Timely Completion',
    description:
      'Projects completed on schedule with transparent communication throughout the process.',
    icon: '⏰',
  },
  {
    title: 'Warranty Backed',
    description:
      'All work comes with comprehensive warranties on both materials and workmanship.',
    icon: '✅',
  },
];

export function Features() {
  return (
    <UiSection>
      <UiSectionHeader
        subtitle="Why Choose Us"
        title="Professional Construction Services"
        description="We deliver exceptional results through quality workmanship, reliable service, and customer satisfaction."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <UiCard
            key={index}
            variant="elevated"
            className="text-center transition-shadow duration-300 hover:shadow-xl"
          >
            <div className="mb-4 text-4xl">{feature.icon}</div>
            <h3 className="mb-3 text-xl font-semibold text-text-primary">
              {feature.title}
            </h3>
            <p className="text-text-secondary">{feature.description}</p>
          </UiCard>
        ))}
      </div>
    </UiSection>
  );
}
