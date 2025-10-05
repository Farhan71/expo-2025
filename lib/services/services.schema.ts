import { z } from 'zod';

// Service FAQ schema
export const ServiceFAQSchema = z.object({
  question: z.string().min(1, 'Question is required'),
  answer: z.string().min(1, 'Answer is required'),
});

// Service schema
export const ServiceSchema = z.object({
  id: z.string().optional(), // Firebase document ID (optional for creation)
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(
      /^[a-z0-9-]+$/,
      'Slug must contain only lowercase letters, numbers, and hyphens'
    ),
  name: z.string().min(1, 'Service name is required'),
  shortDescription: z
    .string()
    .min(1, 'Short description is required')
    .max(160, 'Short description must be 160 characters or less'),
  description: z.string().min(1, 'Description is required'),
  features: z.array(z.string()).default([]),
  faqs: z.array(ServiceFAQSchema).default([]),
  images: z.array(z.string().url()).default([]),
  highlights: z.array(z.string()).default([]),
  order: z.number().int().min(0).default(0),
  seo: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      keywords: z.array(z.string()).default([]),
    })
    .default({}),
  active: z.boolean().default(true),
  lastUpdated: z.date().default(() => new Date()),
});

// Service creation/update schema (excludes auto-generated fields)
export const ServiceCreateSchema = ServiceSchema.omit({
  id: true,
  lastUpdated: true,
});

// Service update schema (makes slug optional for editing)
export const ServiceUpdateSchema = ServiceCreateSchema.partial({ slug: true });

// Testimonial schema
export const TestimonialSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  clientName: z.string().min(1, 'Client name is required'),
  text: z.string().min(1, 'Testimonial text is required'),
  rating: z
    .number()
    .int()
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating must be at most 5'),
  projectSlug: z.string().optional(),
  avatar: z.string().url().optional(),
  logo: z.string().url().optional(),
  createdAt: z.date().default(() => new Date()),
});

// Contact form schema
export const ContactFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be 100 characters or less'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  service: z.string().optional(),
  message: z
    .string()
    .min(1, 'Message is required')
    .max(1000, 'Message must be 1000 characters or less'),
  honeypot: z.string().max(0, 'Bot detected'), // Anti-spam honeypot
  timestamp: z.number().min(Date.now() - 60000, 'Form submission too quick'), // Prevent rapid submissions
});

// Admin login schema
export const AdminLoginSchema = z.object({
  password: z.string().min(1, 'Password is required'),
});

// Type exports
export type Service = z.infer<typeof ServiceSchema>;
export type ServiceCreate = z.infer<typeof ServiceCreateSchema>;
export type ServiceUpdate = z.infer<typeof ServiceUpdateSchema>;
export type ServiceFAQ = z.infer<typeof ServiceFAQSchema>;
export type Testimonial = z.infer<typeof TestimonialSchema>;
export type ContactForm = z.infer<typeof ContactFormSchema>;
export type AdminLogin = z.infer<typeof AdminLoginSchema>;
