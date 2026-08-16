import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://aaenterprisetech.com'),
  title: {
    default: 'AA Enterprise Tech - Digital Solutions & AI Automation Agency',
    template: '%s | AA Enterprise Tech',
  },
  description: 'AA Enterprise Tech is a premier digital solutions agency providing website development, AI workflows, n8n automation, custom software, and branding services.',
  keywords: [
    'Digital Solutions Agency',
    'AI Automation Agency',
    'Website Development',
    'n8n Workflow Automation',
    'Custom Software Development',
    'Brand Identity Design',
    'AA Enterprise Tech'
  ],
  authors: [{ name: 'Abdullah Athar', url: 'https://aaenterprisetech.com' }],
  creator: 'AA Enterprise Tech',
  publisher: 'AA Enterprise Tech',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  icons: {
    icon: [
      { url: '/favicon.svg?v=2', type: 'image/svg+xml' },
      { url: '/favicon.png?v=2', type: 'image/png', sizes: '512x512' },
      { url: '/icon.png?v=2', type: 'image/png', sizes: '512x512' },
      { url: '/favicon.ico?v=2', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png?v=2', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.png?v=2',
  },
  manifest: '/site.webmanifest?v=2',
  alternates: {
    canonical: 'https://aaenterprisetech.com',
  },
  openGraph: {
    title: 'AA Enterprise Tech - Digital Solutions & AI Automation Agency',
    description: 'Empowering businesses with modern high-performance websites, AI workflows, and software solutions.',
    url: 'https://aaenterprisetech.com',
    siteName: 'AA Enterprise Tech',
    images: [
      {
        url: 'https://aaenterprisetech.com/og-image.png?v=2',
        width: 1200,
        height: 630,
        alt: 'AA Enterprise Tech - Digital Solutions & AI Automation Agency',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AA Enterprise Tech - Digital Solutions & AI Agency',
    description: 'Modern tech, automated AI workflows, and bespoke web solutions for global businesses.',
    images: ['https://aaenterprisetech.com/og-image.png?v=2'],
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
};

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'AA Enterprise Tech',
    description: 'Premier digital solutions agency specializing in custom web development, AI automations, and enterprise software.',
    image: 'https://aaenterprisetech.com/og-image.png',
    '@id': 'https://aaenterprisetech.com',
    url: 'https://aaenterprisetech.com',
    telephone: '+13148340021',
    email: 'info@aaenterprisetech.com',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Creve Coeur',
      addressRegion: 'MO',
      postalCode: '63141',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 38.6631,
      longitude: -90.4446,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      opens: '00:00',
      closes: '23:59',
    },
    sameAs: [
      'https://twitter.com',
      'https://linkedin.com'
    ],
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 38.6631,
        longitude: -90.4446,
      },
      geoRadius: 'Worldwide',
    },
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} bg-slate-950 text-slate-100 min-h-screen antialiased`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
