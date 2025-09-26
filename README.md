# EXPO 2025 Construction Inc - Website

A modern, responsive marketing and portfolio website for EXPO 2025 Construction Inc, built with Next.js 14, TypeScript, Ant Design, and Tailwind CSS. Features comprehensive theming, service management, and a contact system.

## 🚀 Features

- **Modern Stack**: Next.js 14 App Router, TypeScript, Ant Design v5, Tailwind CSS
- **Complete Theming**: Light/Dark mode with seamless transitions and system preference detection
- **Service Management**: Full CRUD operations with admin panel (password-protected)
- **Contact System**: Form validation, email sending (stub), and auto-responses
- **SEO Optimized**: Dynamic metadata, JSON-LD schema, Open Graph tags
- **Responsive Design**: Mobile-first approach with accessible UI components
- **Type Safe**: Full TypeScript implementation with Zod validation

## 🎨 Theme System

### Light/Dark Mode Implementation

The theme system provides seamless switching between light and dark modes with:

- **System Preference Detection**: Automatically detects user's system preference
- **Persistent Storage**: Remembers user's theme choice in localStorage
- **No Flash**: Inline script prevents FOUC (Flash of Unstyled Content)
- **Smooth Transitions**: CSS transitions for all theme-related properties
- **Token-Driven**: Centralized theme tokens for consistency

### Theme Tokens

| Property             | Light Mode | Dark Mode |
| -------------------- | ---------- | --------- |
| Background           | `#ffffff`  | `#0f172a` |
| Background Secondary | `#f8fafc`  | `#1e293b` |
| Text Primary         | `#0f172a`  | `#f8fafc` |
| Text Secondary       | `#475569`  | `#cbd5e1` |
| Primary Color        | `#2563eb`  | `#3b82f6` |
| Border               | `#e2e8f0`  | `#475569` |

### Adding New Theme Tokens

1. Update `lib/theme/tokens.ts` with new CSS variables
2. Add corresponding values in `lib/theme/antdTheme.ts`
3. Update `styles/globals.css` with default and dark values
4. Use in Tailwind with `colors: { 'new-color': 'rgb(var(--color-new-rgb))' }`

## 📁 Project Structure

```
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with theme provider
│   ├── page.tsx                 # Home page
│   ├── about/page.tsx           # About page
│   ├── contact/page.tsx         # Contact page
│   ├── clients/page.tsx         # Clients/testimonials page
│   ├── services/                # Services section
│   │   ├── page.tsx             # Services listing
│   │   └── [slug]/page.tsx      # Individual service pages
│   └── admin/                   # Admin section (password protected)
│       ├── page.tsx             # Admin login
│       └── services/            # Service management
├── components/                  # React components
│   ├── providers/               # Context providers
│   ├── layout/                  # Layout components (Navbar, Footer)
│   ├── ui/                      # Reusable UI components
│   ├── home/                    # Home page sections
│   ├── services/                # Service-related components
│   └── forms/                   # Form components
├── lib/                         # Utilities and business logic
│   ├── services/                # Service data and operations
│   ├── testimonials/            # Testimonial data
│   ├── email/                   # Email sending utilities
│   ├── theme/                   # Theme configuration
│   ├── validation/              # Form validation
│   └── utils/                   # General utilities
├── styles/                      # CSS files
│   └── globals.css              # Global styles and theme variables
└── public/                      # Static assets
    └── images/                  # Image assets
```

## 🛠 Installation & Setup

### Prerequisites

- Node.js 18+ (see `.nvmrc` for exact version)
- npm or yarn package manager

### Installation

1. **Clone or extract the project**

   ```bash
   cd expo-services
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your configuration:

   ```bash
   ADMIN_PASSWORD=your_secure_password
   NEXT_PUBLIC_SITE_URL=http://localhost:3000

   # Optional: Email configuration
   EMAIL_FROM=noreply@expo2025construction.com
   EMAIL_TO=info@expo2025construction.com
   # RESEND_API_KEY=your_resend_api_key  # For production
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

## 🎯 Usage Guide

### Theme Management

The theme system is automatically initialized. Users can:

- Toggle between light/dark mode using the theme toggle in the navbar
- System preference is detected automatically on first visit
- Preference is saved in localStorage for future visits

### Service Management

#### Adding Services via Admin Panel

1. Navigate to `/admin`
2. Enter admin password (from `.env.local`)
3. Go to "Services" section
4. Click "Create New Service"
5. Fill out the service form:
   - **Slug**: URL-friendly identifier (e.g., "roofing")
   - **Name**: Display name (e.g., "Roofing Services")
   - **Short Description**: Brief summary (used in previews)
   - **Description**: Full description (supports line breaks)
   - **Features**: List of included services/features
   - **Highlights**: Key selling points
   - **FAQs**: Frequently asked questions
   - **Order**: Display order (lower numbers appear first)
   - **Active**: Whether service is visible on site

#### Adding Services Manually

Edit `lib/services/services.data.ts`:

```typescript
const newService: Service = {
  slug: 'new-service',
  name: 'New Service Name',
  shortDescription: 'Brief description...',
  description: 'Full description...',
  features: ['Feature 1', 'Feature 2'],
  highlights: ['Benefit 1', 'Benefit 2'],
  faqs: [
    {
      question: 'Sample question?',
      answer: 'Sample answer...',
    },
  ],
  order: 4,
  seo: {
    title: 'Custom SEO Title',
    description: 'SEO description...',
    keywords: ['keyword1', 'keyword2'],
  },
  active: true,
  lastUpdated: new Date(),
};
```

### Contact Form

The contact form includes:

- **Validation**: Client-side and server-side validation with Zod
- **Anti-spam**: Honeypot field and timestamp checking
- **Email Sending**: Stub implementation (see Email Integration below)
- **Rate Limiting**: Basic protection against form abuse

### Email Integration

Currently uses stub implementation. To integrate with a real email service:

#### Option 1: Resend (Recommended)

1. Install Resend:

   ```bash
   npm install resend
   ```

2. Update `lib/email/sendEmail.ts`:

   ```typescript
   import { Resend } from 'resend';

   const resend = new Resend(process.env.RESEND_API_KEY);

   export async function sendEmail(emailData: EmailData) {
     try {
       const result = await resend.emails.send({
         from: emailData.from,
         to: emailData.to,
         subject: emailData.subject,
         html: emailData.html,
       });
       return { success: true };
     } catch (error) {
       return { success: false, error: error.message };
     }
   }
   ```

3. Add environment variable:
   ```bash
   RESEND_API_KEY=re_your_api_key_here
   ```

#### Option 2: Postmark

Similar process with Postmark SDK and configuration.

## 🔐 Security Features

- **Password Protection**: Admin routes protected with middleware
- **Input Validation**: All forms validated with Zod schemas
- **Sanitization**: Basic input sanitization for XSS prevention
- **Rate Limiting**: In-memory rate limiting for forms
- **CSRF Protection**: Built-in Next.js CSRF protection
- **Secure Cookies**: HttpOnly, Secure, SameSite cookie settings

## 🎨 Customization

### Adding New UI Components

1. Create component in `components/ui/`
2. Follow existing pattern with variant props
3. Use the `cn()` utility for class merging
4. Support theme tokens via CSS variables

Example:

```typescript
interface UiAlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  className?: string;
  children: React.ReactNode;
}

export function UiAlert({ variant = 'info', className, children }: UiAlertProps) {
  return (
    <div className={cn(
      'p-4 rounded-lg border',
      {
        'bg-blue-50 border-blue-200 text-blue-800': variant === 'info',
        'bg-success/10 border-success/20 text-success': variant === 'success',
      },
      className
    )}>
      {children}
    </div>
  );
}
```

### Extending the Theme

1. Add new tokens to `lib/theme/tokens.ts`
2. Update CSS variables in `styles/globals.css`
3. Configure Ant Design tokens in `lib/theme/antdTheme.ts`
4. Use in Tailwind configuration

## 📊 SEO Configuration

### Metadata

Each page includes:

- Dynamic titles and descriptions
- Open Graph tags for social sharing
- Twitter Card configuration
- Canonical URLs
- Keywords and author information

### JSON-LD Schema

Service pages include structured data:

- Service schema for individual services
- LocalBusiness schema for company information
- FAQ schema when FAQs are present

### Sitemap

To add sitemap generation:

1. Create `app/sitemap.ts`:

   ```typescript
   import { MetadataRoute } from 'next';
   import { getAllActiveServices } from '@/lib/services/services.data';

   export default function sitemap(): MetadataRoute.Sitemap {
     const services = getAllActiveServices();
     const serviceUrls = services.map((service) => ({
       url: `${process.env.NEXT_PUBLIC_SITE_URL}/services/${service.slug}`,
       lastModified: service.lastUpdated,
       changeFrequency: 'weekly' as const,
       priority: 0.8,
     }));

     return [
       {
         url: process.env.NEXT_PUBLIC_SITE_URL!,
         lastModified: new Date(),
         changeFrequency: 'daily',
         priority: 1,
       },
       ...serviceUrls,
     ];
   }
   ```

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub/GitLab
2. Connect repository to Vercel
3. Configure environment variables
4. Deploy automatically

### Other Providers

The app works with any provider supporting Next.js:

- Netlify
- Railway
- AWS Amplify
- DigitalOcean App Platform

### Environment Variables for Production

```bash
ADMIN_PASSWORD=secure_production_password
NEXT_PUBLIC_SITE_URL=https://your-domain.com
EMAIL_FROM=noreply@your-domain.com
EMAIL_TO=info@your-domain.com
RESEND_API_KEY=your_resend_api_key
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] Theme toggle works in both directions
- [ ] Theme persists after browser refresh
- [ ] All forms validate correctly
- [ ] Contact form sends emails (check logs)
- [ ] Admin login works
- [ ] Service CRUD operations work
- [ ] Mobile responsive design
- [ ] SEO metadata appears correctly
- [ ] Accessibility (keyboard navigation, screen readers)

### Automated Testing Setup

To add automated tests:

1. **Install testing dependencies**:

   ```bash
   npm install -D @testing-library/react @testing-library/jest-dom jest jest-environment-jsdom
   ```

2. **Create `jest.config.js`**:

   ```javascript
   module.exports = {
     testEnvironment: 'jsdom',
     setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
     moduleNameMapping: {
       '^@/(.*)$': '<rootDir>/$1',
     },
   };
   ```

3. **Add test scripts to `package.json`**:
   ```json
   {
     "scripts": {
       "test": "jest",
       "test:watch": "jest --watch"
     }
   }
   ```

### E2E Testing with Playwright

```bash
npm install -D @playwright/test
npx playwright install
```

## 🔄 Data Persistence Strategy

Currently uses in-memory data storage. For production:

### Option 1: Database Integration

**Recommended: Prisma + PostgreSQL**

1. Install Prisma:

   ```bash
   npm install prisma @prisma/client
   npx prisma init
   ```

2. Define schema in `prisma/schema.prisma`
3. Replace `lib/services/services.repo.ts` with database operations
4. Update server actions to use Prisma client

### Option 2: File-based Storage

For simple deployments, use JSON file storage with proper file locking.

### Option 3: Headless CMS

Integrate with:

- Strapi
- Contentful
- Sanity
- Payload CMS

## 🛠 Development Workflow

### Code Quality

```bash
# Linting
npm run lint
npm run lint:fix

# Formatting
npm run format

# Type checking
npm run type-check
```

### Git Hooks

Add pre-commit hooks with Husky:

```bash
npm install -D husky lint-staged
```

## 📞 Support & Contact

For questions about this implementation:

- **Nouros**: (347) 420-9759
- **Hossain**: (718) 825-6465

## 📝 License

This project is created for EXPO 2025 Construction Inc. All rights reserved.

---

## 🎯 Future Enhancements

- [ ] Database integration
- [ ] Real-time admin notifications
- [ ] Image upload and management
- [ ] Customer portal
- [ ] Project gallery
- [ ] Testimonial management interface
- [ ] Analytics dashboard
- [ ] Multi-language support
- [ ] PWA capabilities
- [ ] Performance monitoring
