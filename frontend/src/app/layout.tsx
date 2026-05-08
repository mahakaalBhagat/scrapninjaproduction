import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Providers } from './providers';
import { Chatbot } from '@/components/Chatbot';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import '@/styles/globals.css';
import 'ol/ol.css';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-VFJP8XHRVE';

export const metadata: Metadata = {
  title: 'ScrapNinja | Scrap Collection in Dubai, UAE',
  description:
    "Dubai's smartest scrap collection platform connecting households and businesses with verified scrap collectors. Get instant price estimates, real-time tracking, and guaranteed payment.",
  keywords: [
    'scrap collection',
    'waste management',
    'Dubai',
    'recycling',
    'environmental',
    'sustainability',
  ],
  authors: [{ name: 'ScrapNinja Team' }],
  robots: 'index, follow',
  icons: {
    icon: '/ScrapNinja Logo Without Text.png',
    apple: '/ScrapNinja Logo Without Background.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    url: 'https://goscrapninja.com',
    siteName: 'ScrapNinja',
    title: 'ScrapNinja - Smart Scrap Collection Platform',
    description:
      "Dubai's smartest scrap collection platform connecting households and businesses with verified scrap collectors.",
    images: [
      {
        url: 'https://goscrapninja.com/ScrapNinja%20Logo%20Without%20Background.png',
        width: 1200,
        height: 630,
        alt: 'ScrapNinja Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ScrapNinja - Smart Scrap Collection Platform',
    description:
      "Dubai's smartest scrap collection platform connecting households and businesses with verified scrap collectors.",
    creator: '@scrapninja',
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="google-site-verification" content="4GBG47vz6QRDj0IFUKU3hL5kyagsqjUIDhQwrgFU2yY" />
        <meta name="theme-color" content="#0B7A3E" />
        <link rel="icon" href="/ScrapNinja%20Logo%20Without%20Text.png" type="image/png" />
        <link rel="apple-touch-icon" href="/ScrapNinja%20Logo%20Without%20Background.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'ScrapNinja',
              url: 'https://goscrapninja.com',
            }),
          }}
        />
      </head>
      <body>
        <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />
        <Providers>
          <div id="root">{children}</div>
          <Chatbot />
        </Providers>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js')
                    .then(reg => console.log('Service Worker registered'))
                    .catch(err => console.log('Service Worker registration failed'));
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
