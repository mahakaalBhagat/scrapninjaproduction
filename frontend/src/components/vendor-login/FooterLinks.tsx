'use client';

import React from 'react';

interface FooterLinksProps {
  links?: Array<{ label: string; href: string }>;
}

export const FooterLinks: React.FC<FooterLinksProps> = ({
  links = [
    { label: 'Terms of Service', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Support', href: '#' },
  ],
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 pt-6 border-t border-neutral-200 mt-6">
      {links.map((link, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className="text-neutral-300">•</span>}
          <a
            href={link.href}
            className="text-xs font-medium text-neutral-600 hover:text-neutral-900 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-300 rounded px-1 py-0.5"
          >
            {link.label}
          </a>
        </React.Fragment>
      ))}
    </div>
  );
};
