import Link from 'next/link';

const footerSections = [
  {
    title: 'Services',
    links: [
      { name: 'Roofing', href: '/services/roofing' },
      { name: 'Waterproofing', href: '/services/waterproofing' },
      {
        name: 'Kitchen & Bathroom',
        href: '/services/bathroom-kitchen-renovation',
      },
      { name: 'All Services', href: '/services' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Clients', href: '/clients' },
      { name: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Contact Info',
    links: [
      { name: 'Nouros: (347) 420-9759', href: 'tel:3474209759' },
      { name: 'Hossain: (718) 825-6465', href: 'tel:7188256465' },
      { name: 'New York City Area', href: '#' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-secondary">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-4 flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-white">E</span>
              </div>
              <span className="text-lg font-bold text-text-primary">
                EXPO 2025
              </span>
            </div>
            <p className="mb-4 text-text-secondary">
              Professional construction services in New York City. Quality
              workmanship, reliable service, and customer satisfaction
              guaranteed.
            </p>
            <div className="text-sm text-text-secondary">
              <p>Licensed & Insured</p>
              <p>Serving NYC & Surrounding Areas</p>
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 font-semibold text-text-primary">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-text-secondary transition-colors duration-200 hover:text-text-primary"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-border pt-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="text-sm text-text-secondary">
              © 2024 EXPO 2025 Construction Inc. All rights reserved.
            </p>
            <div className="mt-4 flex space-x-6 md:mt-0">
              <Link
                href="/privacy"
                className="text-sm text-text-secondary transition-colors duration-200 hover:text-text-primary"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-text-secondary transition-colors duration-200 hover:text-text-primary"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
