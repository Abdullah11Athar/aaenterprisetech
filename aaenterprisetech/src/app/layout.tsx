import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap', preload: true });

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
      { url: '/favicon.svg?v=4', type: 'image/svg+xml' },
      { url: '/favicon.png?v=4', type: 'image/png', sizes: '512x512' },
      { url: '/icon.png?v=4', type: 'image/png', sizes: '512x512' },
      { url: '/favicon.ico?v=4', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png?v=4', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.png?v=4',
  },
  manifest: '/site.webmanifest?v=4',
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
        url: 'https://aaenterprisetech.com/og-image.png?v=4',
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
    images: ['https://aaenterprisetech.com/og-image.png?v=4'],
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
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://aaenterprisetech.com/#organization',
        name: 'AA Enterprise Tech',
        alternateName: ['AA Enterprise', 'AA Enterprise Technology'],
        url: 'https://aaenterprisetech.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://aaenterprisetech.com/icon.png?v=3',
          width: 512,
          height: 512,
          caption: 'AA Enterprise Tech Logo'
        },
        image: 'https://aaenterprisetech.com/og-image.png?v=3',
        description: 'Premier digital solutions agency specializing in custom web development, AI automations, and enterprise software.',
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
        sameAs: [
          'https://twitter.com',
          'https://linkedin.com',
          'https://github.com/Abdullah11Athar/aaenterprisetech'
        ]
      },
      {
        '@type': 'WebSite',
        '@id': 'https://aaenterprisetech.com/#website',
        url: 'https://aaenterprisetech.com',
        name: 'AA Enterprise Tech',
        publisher: {
          '@id': 'https://aaenterprisetech.com/#organization'
        }
      },
      {
        '@type': 'ProfessionalService',
        '@id': 'https://aaenterprisetech.com/#service',
        name: 'AA Enterprise Tech',
        url: 'https://aaenterprisetech.com',
        parentOrganization: {
          '@id': 'https://aaenterprisetech.com/#organization'
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Core Agency Services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Custom Web Development & Landing Pages',
                description: 'High-converting Next.js websites engineered for fast load speeds and maximum conversion.'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'AI Workflow Automation & Chatbots',
                description: 'End-to-end AI workflows built with OpenAI, Claude, and n8n to automate operations 24/7.'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Full Brand Identity & UI/UX Design',
                description: 'Complete brand kits, typography, wireframes, and design systems.'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Custom SaaS Architecture & Cloud Solutions',
                description: 'Scalable bespoke software, Supabase databases, and Stripe payment integration.'
              }
            }
          ]
        }
      }
    ]
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
