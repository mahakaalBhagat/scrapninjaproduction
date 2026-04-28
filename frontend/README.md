# Frontend - ScrapNinja Web Application

This directory contains the Next.js frontend for the ScrapNinja platform.

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Forms**: React Hook Form + Zod Validation
- **State**: React Query + Context API
- **HTTP**: Axios
- **Icons**: Lucide React
- **PWA**: Service Worker + Web Manifest

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/
│   ├── Navbar.tsx
│   ├── HeroSection.tsx
│   ├── StatsSection.tsx
│   ├── ProblemSection.tsx
│   ├── SolutionSection.tsx
│   ├── TeamSection.tsx
│   ├── ContactSection.tsx
│   ├── Footer.tsx
│   ├── Container.tsx
│   └── index.ts
├── hooks/
│   └── index.ts          # Custom React hooks
├── services/
│   └── api.ts            # API client
├── schemas/
│   └── index.ts          # Zod validation schemas
├── styles/
│   └── globals.css       # Global styles
└── utils/
    └── index.ts          # Utility functions

public/
├── manifest.json         # PWA manifest
└── sw.js                 # Service worker
```

## Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_APP_NAME=ScrapNinja
NEXT_PUBLIC_APP_DESCRIPTION=Smart Scrap Collection Platform
```

## Features

- ✅ Responsive design
- ✅ Dark/Light theme support
- ✅ Form validation
- ✅ PWA installable
- ✅ Service worker caching
- ✅ Offline support
- ✅ Real-time updates
- ✅ SEO optimized

## Components

### Navbar
- Responsive navigation
- Smooth scroll
- Mobile menu

### HeroSection
- Eye-catching headline
- CTA buttons
- Trust badges

### StatsSection
- Key metrics display
- Visual hierarchy

### ProblemSection
- Problem cards with icons
- Clear messaging

### SolutionSection
- Feature cards
- Benefits list

### TeamSection
- Mission statement
- Company values

### ContactSection
- Contact form with validation
- Contact information
- Social links

### Footer
- Navigation links
- Social media
- Contact details

## Form Validation

All forms use React Hook Form with Zod schemas for validation:

- Contact form (name, email, message)
- Pickup request (scrap type, weight, address, date, time)
- User registration (email, password, name)
- Login form (email, password)

## API Integration

The app communicates with the backend through the `apiClient`:

```typescript
import { apiClient } from '@/services/api';

await apiClient.submitContactForm(data);
await apiClient.createPickupRequest(data);
```

## PWA Features

- Installable on mobile
- Offline support
- Background sync
- Push notifications
- Add to Home Screen

## Performance

- Code splitting
- Image optimization
- CSS-in-JS
- Lazy loading components
- Service worker caching

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: Latest versions

## License

© 2024 ScrapNinja. All rights reserved.
