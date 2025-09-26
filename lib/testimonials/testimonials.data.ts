import type { Testimonial } from './testimonials.schema';

// Example testimonials data
export const testimonialsData: Testimonial[] = [
  {
    id: '1',
    clientName: 'Sarah Johnson',
    text: 'EXPO 2025 Construction did an amazing job on our roof replacement. The team was professional, punctual, and the quality of work exceeded our expectations. Highly recommend!',
    rating: 5,
    projectSlug: 'roofing-services',
    avatar: '/images/testimonials/sarah-j.jpg',
    createdAt: new Date('2024-01-10'),
  },
  {
    id: '2',
    clientName: 'Mike Rodriguez',
    text: 'Our basement waterproofing project was completed on time and within budget. No more water issues and the basement stays completely dry even during heavy rains. Excellent work!',
    rating: 5,
    projectSlug: 'waterproofing',
    avatar: '/images/testimonials/mike-r.jpg',
    createdAt: new Date('2024-01-18'),
  },
  {
    id: '3',
    clientName: 'Lisa Chen',
    text: 'The kitchen renovation transformed our entire home. The attention to detail and quality craftsmanship is outstanding. The project was managed professionally from start to finish.',
    rating: 5,
    projectSlug: 'bathroom-kitchen-renovation',
    avatar: '/images/testimonials/lisa-c.jpg',
    createdAt: new Date('2024-02-05'),
  },
  {
    id: '4',
    clientName: 'Maria Rodriguez',
    text: 'EXPO 2025 Construction transformed our bathroom beyond our expectations. The attention to detail and professional service was outstanding. Nouros and his team completed the project on time and within budget.',
    rating: 5,
    projectSlug: 'bathroom-kitchen-renovation',
    avatar: '/images/testimonials/maria-r.jpg',
    createdAt: new Date('2024-10-15'),
  },
  {
    id: '5',
    clientName: 'James Chen',
    text: 'Excellent roofing work! They replaced our entire roof and the quality is exceptional. The team was professional, cleaned up after themselves, and the price was very competitive.',
    rating: 5,
    projectSlug: 'roofing-services',
    avatar: '/images/testimonials/james-c.jpg',
    createdAt: new Date('2024-09-22'),
  },
  {
    id: '6',
    clientName: 'David Wilson',
    text: 'We had a serious water damage issue and EXPO 2025 responded quickly. Their waterproofing solution has kept our basement completely dry even through heavy rains. Highly recommend!',
    rating: 5,
    projectSlug: 'waterproofing',
    avatar: '/images/testimonials/david-w.jpg',
    createdAt: new Date('2024-08-30'),
  },
  {
    id: '7',
    clientName: 'Michael Thompson',
    text: 'Professional kitchen renovation service. They helped us design a modern kitchen that perfectly fits our lifestyle. The craftsmanship is top-notch and the project was completed on schedule.',
    rating: 5,
    projectSlug: 'bathroom-kitchen-renovation',
    avatar: '/images/testimonials/michael-t.jpg',
    createdAt: new Date('2024-07-18'),
  },
  {
    id: '8',
    clientName: 'Emily Davis',
    text: 'Outstanding construction work! They helped us with multiple home improvements and each project was handled with care and precision. Excellent communication throughout.',
    rating: 5,
    projectSlug: undefined,
    avatar: '/images/testimonials/emily-d.jpg',
    createdAt: new Date('2024-06-25'),
  },
  {
    id: '9',
    clientName: 'Robert Wilson',
    text: 'Great experience working with EXPO 2025. They fixed our roof leak quickly and professionally. The pricing was fair and the work quality exceeded our expectations.',
    rating: 4,
    projectSlug: 'roofing-services',
    avatar: '/images/testimonials/robert-w.jpg',
    createdAt: new Date('2024-05-12'),
  },
  {
    id: '10',
    clientName: 'Jennifer Garcia',
    text: 'Professional and reliable construction company. They handled our kitchen remodel with expertise and great attention to detail. Would definitely use them again.',
    rating: 4,
    projectSlug: 'bathroom-kitchen-renovation',
    avatar: '/images/testimonials/jennifer-g.jpg',
    createdAt: new Date('2024-02-14'),
  },
];

// Helper functions
export function getTestimonialsByService(projectSlug: string): Testimonial[] {
  return testimonialsData.filter(
    (testimonial) => testimonial.projectSlug === projectSlug
  );
}

export function getFeaturedTestimonials(limit: number = 3): Testimonial[] {
  return testimonialsData
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit);
}

export function getAllTestimonials(): Testimonial[] {
  return testimonialsData.sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );
}
