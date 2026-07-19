'use client';

import { PageLayout } from '@/components/layout';

interface VendorLayoutProps {
  children: React.ReactNode;
}

export default function VendorLayout({ children }: VendorLayoutProps) {
  return (
    <PageLayout
      showHeader={true}
      showSidebar={true}
      headerProps={{
        title: 'Vendor Portal',
        showNotifications: true,
        showProfile: true,
        profileName: 'Vendor',
        profileInitial: 'V',
      }}
    >
      {children}
    </PageLayout>
  );
}
