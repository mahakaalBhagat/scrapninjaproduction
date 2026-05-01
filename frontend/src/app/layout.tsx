import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Providers } from './providers';
import { Chatbot } from '@/components/Chatbot';
import '@/styles/globals.css';
import 'ol/ol.css';

export const metadata: Metadata = {
  title: 'ScrapNinja - Smart Scrap Collection Platform',
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
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    url: 'https://scrapninja.ae',
    siteName: 'ScrapNinja',
    title: 'ScrapNinja - Smart Scrap Collection Platform',
    description:
      "Dubai's smartest scrap collection platform connecting households and businesses with verified scrap collectors.",
    images: [
      {
        url: 'https://scrapninja.ae/og-image.png',
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
        <meta name="theme-color" content="#0B7A3E" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
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
