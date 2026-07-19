import { Metadata } from 'next';
import { VendorLogin } from '@/components/vendor-login/VendorLogin';

export const metadata: Metadata = {
  title: 'Vendor Login | ScrapNinja',
  description: 'Sign in to your ScrapNinja vendor account to manage waste collection and maximize profits.',
  openGraph: {
    title: 'Vendor Login | ScrapNinja',
    description: 'Sign in to your ScrapNinja vendor account to manage waste collection.',
    type: 'website',
  },
};

export default function VendorLoginPage() {
  return <VendorLogin />;
}
