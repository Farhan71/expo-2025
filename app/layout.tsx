import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default:
      'EXPO 2025 Construction Inc | Professional Construction Services NYC',
    template: '%s | EXPO 2025 Construction Inc',
  },
  description:
    'Professional construction services in New York City. Expert roofing, waterproofing, renovation, and construction solutions. Licensed, insured, and customer satisfaction guaranteed.',
  keywords: [
    'construction',
    'roofing',
    'waterproofing',
    'renovation',
    'NYC construction',
    'contractors',
    'building',
  ],
  authors: [{ name: 'EXPO 2025 Construction Inc' }],
  creator: 'EXPO 2025 Construction Inc',
  publisher: 'EXPO 2025 Construction Inc',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  ),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'EXPO 2025 Construction Inc',
    title:
      'EXPO 2025 Construction Inc | Professional Construction Services NYC',
    description:
      'Professional construction services in New York City. Expert roofing, waterproofing, renovation, and construction solutions.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'EXPO 2025 Construction Inc',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'EXPO 2025 Construction Inc | Professional Construction Services NYC',
    description:
      'Professional construction services in New York City. Expert roofing, waterproofing, renovation, and construction solutions.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // google: '', // Add Google Search Console verification code
    // bing: '', // Add Bing Webmaster Tools verification code
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* No-flash theme script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  var resolvedTheme = theme === 'system' || !theme ? systemTheme : theme;
                  
                  if (resolvedTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                  
                  document.documentElement.setAttribute('data-theme', resolvedTheme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <NextTopLoader
          color="rgb(59, 130, 246)"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px rgb(59, 130, 246, 0.4), 0 0 5px rgb(59, 130, 246, 0.6)"
          template='<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
          zIndex={1600}
          showAtBottom={false}
        />
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
