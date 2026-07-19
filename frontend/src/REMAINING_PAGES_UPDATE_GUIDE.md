/**
 * QUICK UPDATE INSTRUCTIONS FOR REMAINING 7 PAGES
 * 
 * These pages follow standard patterns. Use the templates below.
 * All color replacements: gray → slate, green → primary
 */

// ============================================
// 1. PAYMENTS PAGE (vendor/payments/page.tsx)
// ============================================
// Replace at top of file:
// import { Button, SearchBar, Card } from '@/components/common';
// import { StatsCard } from '@/components/charts';

// Then replace all:
// - bg-white p-6 rounded-lg shadow-md → <Card>
// - bg-green-600 text-white px-6 py-3 → <Button variant="primary">
// - Search input with icon → <SearchBar>
// - Custom badges → <Badge variant="status">
// - text-gray-* → text-slate-*
// - text-green-* → text-primary-*
// - border-gray-* → border-slate-*

// ============================================
// 2. ANALYTICS PAGE (vendor/analytics/page.tsx)
// ============================================
// import { StatsCard, ChartCard } from '@/components/charts';
// import { Card } from '@/components/common';

// Structure:
// - Top: 3-4 StatsCard components with trends
// - Middle: ChartCard components with children (chart libraries)
// - Bottom: Additional Card components for data

// ============================================
// 3. REPORTS PAGE (vendor/reports/page.tsx)
// ============================================
// Similar to payments:
// import { Button, SearchBar, Card, Badge } from '@/components/common';

// Use Card for report cards, Badge for status

// ============================================
// 4. NOTIFICATIONS PAGE (vendor/notifications/page.tsx)
// ============================================
// import { Card, Badge, Button } from '@/components/common';

// Map over notifications array:
// <Card>
//   <div className="flex items-start justify-between">
//     <div>
//       <h3 className="font-semibold">{notif.title}</h3>
//       <Badge variant={getVariant(notif.type)}>{notif.type}</Badge>
//     </div>
//     <div className="flex gap-2">
//       <Button variant="ghost" icon={<Icon />}>Action</Button>
//     </div>
//   </div>
// </Card>

// ============================================
// 5. PROFILE PAGE (vendor/profile/page.tsx)
// ============================================
// import { Button, Input, Card } from '@/components/common';

// Structure:
// <Card>
//   <form onSubmit={handleSubmit} className="space-y-6">
//     <Input label="Field" type="text" ... />
//     <Input label="Field 2" type="email" ... />
//     <div className="flex gap-4 pt-6 border-t border-slate-200">
//       <Button variant="primary" type="submit">Save</Button>
//       <Button variant="secondary">Cancel</Button>
//     </div>
//   </form>
// </Card>

// ============================================
// 6. SETTINGS PAGE (vendor/settings/page.tsx)
// ============================================
// Similar to profile:
// import { Button, Input, Card } from '@/components/common';

// Structure:
// Multiple <Card> sections for each settings group
// <Card>
//   <h3 className="text-lg font-semibold mb-4">Section Title</h3>
//   <form className="space-y-4">
//     <Input ... />
//     <Button>Save</Button>
//   </form>
// </Card>

// ============================================
// QUICK COLOR REPLACEMENT REGEX
// ============================================
// Find & Replace patterns (use in your editor):
//
// 1. text-gray-900 → text-slate-900
// 2. text-gray-600 → text-slate-600
// 3. text-gray-700 → text-slate-700
// 4. text-gray-500 → text-slate-500
// 5. bg-gray-50 → bg-slate-50
// 6. bg-gray-100 → bg-slate-100
// 7. bg-gray-200 → bg-slate-200
// 8. border-gray-200 → border-slate-200
// 9. border-gray-300 → border-slate-300
// 10. text-green-600 → text-primary-600
// 11. text-green-700 → text-primary-700
// 12. bg-green-600 → bg-primary-600
// 13. border-green-500 → border-primary-500
// 14. hover:bg-green-700 → hover:bg-primary-700
// 15. hover:border-green-500 → hover:border-primary-500

// ============================================
// COMPONENT IMPORTS NEEDED
// ============================================

// Common imports for all pages:
import { Button, Input, Card, Badge, SearchBar, Modal, Loader } from '@/components/common';
import { StatsCard, ChartCard } from '@/components/charts';
import { motion } from 'framer-motion';

// Icons from lucide-react
import { Plus, Edit, Trash2, Eye, Filter, Download, Search } from 'lucide-react';

// ============================================
// BATCH UPDATE PRIORITY
// ============================================
// Priority 1 (Most Important):
// 1. payments/page.tsx - Critical for vendor revenue tracking
// 2. analytics/page.tsx - Shows business insights
// 3. profile/page.tsx - User account settings

// Priority 2 (Important):
// 4. reports/page.tsx - Business reporting
// 5. notifications/page.tsx - User notifications
// 6. settings/page.tsx - App settings

// Priority 3 (Already fine as is):
// 7. Collectors - Page doesn't exist yet

// ============================================
// TESTING AFTER UPDATES
// ============================================
// 1. Check page loads without errors
// 2. Verify all buttons are clickable
// 3. Check form inputs work
// 4. Verify responsive on mobile/tablet/desktop
// 5. No console errors
// 6. Colors are consistent (primary-* for green, slate-* for gray)
// 7. Cards have proper shadows and radius
// 8. Animations are smooth
