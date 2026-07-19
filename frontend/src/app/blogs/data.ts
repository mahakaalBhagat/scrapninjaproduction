export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  pdfPath: string;
  content: string[];
}

export const BLOGS: BlogPost[] = [
  {
    slug: 'how-scrap-collection-works-in-dubai',
    title: 'Scrap Ninja – Mandatory Scrap Vendor Onboarding Requirements',
    excerpt:
      'This checklist outlines the mandatory information and documents required before a scrap vendor is approved on the Scrap Ninja platform.',
    category: 'Product',
    readTime: '4 min read',
    pdfPath: '/blogs/blog-1-how-scrap-collection-works-in-dubai.pdf',
    content: [
      'This checklist outlines the mandatory information and documents required before a scrap vendor is approved on the Scrap Ninja platform.',
      '1. Business Verification • Valid Trade License • Company legal name • Business registration number • License expiry date • Registered business address • Mainland / Free Zone status',
      '2. Scrap Trading Authorization • Trade license must permit scrap trading, metal scrap trading, waste trading, recycling, or related activities.',
      '3. Company KYC / KYB • Passport of owner/director • Emirates ID (if applicable) • Certificate of Incorporation • Memorandum of Association (MOA) • Authorized signatory details',
      '4. UBO (Ultimate Beneficial Owner) Declaration • Names of beneficial owners • Ownership percentages • Ownership structure chart • Signed declaration',
      '5. Tax Compliance • VAT/TRN number (if registered) • VAT registration certificate',
      '6. Banking Verification • Company bank account details • Cancelled cheque or bank letter • Account holder name matching legal entity',
      '7. Scrap Source Declaration • Source of scrap • Types of scrap traded • Import/export status • Industrial, demolition, manufacturing, or other origin',
      '8. Environmental & Regulatory Compliance • Environmental permits (where applicable) • Waste management permits • Municipality approvals',
      '9. Operational Verification • Warehouse/yard address • Photographs of facility • Google Maps location • Primary contact details • Company email and website',
      '10. Vendor Agreement • Acceptance of Anti-Fraud Policy • Compliance with local laws • Prohibition of stolen or illegal scrap • Dispute resolution terms • Scrap Ninja commercial terms',
      'Minimum Approval Checklist • Trade License • License Verification • Passport of Director • UBO Declaration • VAT/TRN Certificate (if applicable) • Company Bank Account Proof • Warehouse Address & Photos • Signed Vendor Agreement • Scrap Source Declaration',
    ],
  },
  {
    slug: 'what-items-can-you-sell-as-scrap-in-uae',
    title: 'Blog 2_ What Items Can You Sell as Scrap in UAE',
    excerpt:
      'Separate metals, plastics, and paper the right way to improve pricing and reduce waste processing time.',
    category: 'Guide',
    readTime: '5 min read',
    pdfPath: '/blogs/blog-2-what-items-can-you-sell-as-scrap-in-uae.pdf',
    content: [
      'Proper segregation helps recyclers process materials faster and pay better prices for clean batches.',
      'Keeping metal, plastic, and paper separate reduces contamination and increases the amount of material that can be reused.',
      'ScrapNinja offers simple sorting tips to help customers prepare materials before pickup, making every collection more valuable.',
    ],
  },
  {
    slug: 'why-businesses-need-professional-scrap-collection-services',
    title: 'Blog 3_ Why Businesses Need Professional Scrap Collection Services',
    excerpt:
      'Understand the major market factors that influence scrap pricing across different categories and seasons.',
    category: 'Insights',
    readTime: '6 min read',
    pdfPath: '/blogs/blog-3-why-businesses-need-professional-scrap-collection-services.pdf',
    content: [
      'Scrap prices fluctuate based on global demand, local commodity flows, and seasonal collection patterns.',
      'Quality, material type, and batch size also influence how much collectors are willing to pay.',
      'Staying informed about market trends helps customers choose the right time to sell and maximize value.',
    ],
  },
  {
    slug: 'e-waste-recycling-in-dubai-everything-you-need-to-know',
    title: 'Blog 4_ E-Waste Recycling in Dubai_ Everything You Need to Know',
    excerpt:
      'Learn the timing, material prep, and negotiation tips that help you get fair value on every collection.',
    category: 'Tips',
    readTime: '5 min read',
    pdfPath: '/blogs/blog-4-e-waste-recycling-in-dubai-everything-you-need-to-know.pdf',
    content: [
      'Prepare materials carefully and separate categories before pickup to increase your scrap value.',
      'Choose a service that offers transparent pricing and avoids hidden fees.',
      'Use ScrapNinja to compare options and book a collector who pays fairly for clean, well-sorted scrap.',
    ],
  },
];
