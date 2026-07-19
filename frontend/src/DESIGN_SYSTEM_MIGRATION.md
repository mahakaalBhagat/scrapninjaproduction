# Enterprise Design System - Remaining Pages Migration Guide

## Quick Update Template for Each Page Type

---

## 1. TABLE-BASED PAGES (History, Payments, Collectors, Reports)

### Pages to Update:
- `/vendor/history/page.tsx`
- `/vendor/payments/page.tsx`
- `/vendor/collectors/page.tsx`
- `/vendor/reports/page.tsx`

### Update Pattern:
```tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Filter, Eye, Edit, Trash2 } from 'lucide-react';
import { Button, SearchBar, Badge, Card } from '@/components/common';

export default function PageName() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const data = [
    // Your data array
  ];

  const getBadgeVariant = (status: string) => {
    // Map your status to badge variant
    const variants: Record<string, any> = {
      'Completed': 'success',
      'Pending': 'warning',
      'Processing': 'info',
      'Cancelled': 'danger',
      'Active': 'primary',
    };
    return variants[status] || 'neutral';
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Header with Action Button */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Page Title</h1>
          <p className="text-slate-600 mt-2">Description</p>
        </div>
        <Button variant="primary" size="lg" icon={<Plus size={20} />}>
          Create New
        </Button>
      </div>

      {/* Search & Filters */}
      <div className="flex gap-4">
        <div className="flex-1">
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
          />
        </div>
        <Button variant="outline" icon={<Filter size={20} />}>
          Filter
        </Button>
      </div>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Column 1</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Column 2</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {data.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-900">{row.field1}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{row.field2}</td>
                  <td className="px-6 py-4 text-sm">
                    <Badge variant={getBadgeVariant(row.status)} size="sm">
                      {row.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm flex gap-2">
                    <Button variant="ghost" size="sm" icon={<Eye size={16} />}>
                      View
                    </Button>
                    <Button variant="ghost" size="sm" icon={<Edit size={16} />}>
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" icon={<Trash2 size={16} />}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
```

---

## 2. FORM-BASED PAGES (Profile, Settings)

### Pages to Update:
- `/vendor/profile/page.tsx`
- `/vendor/settings/page.tsx`

### Update Pattern:
```tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button, Input, Card, Badge } from '@/components/common';

export default function PageName() {
  const [formData, setFormData] = React.useState({
    field1: '',
    field2: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle submission
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Profile</h1>
        <p className="text-slate-600 mt-2">Update your profile information</p>
      </div>

      {/* Form Card */}
      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form Sections */}
          <div className="space-y-6">
            <Input
              label="Field Label"
              type="text"
              value={formData.field1}
              onChange={(e) => setFormData({ ...formData, field1: e.target.value })}
              placeholder="Enter value"
            />
            <Input
              label="Another Field"
              type="email"
              value={formData.field2}
              onChange={(e) => setFormData({ ...formData, field2: e.target.value })}
              placeholder="Enter email"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-6 border-t border-slate-200">
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
            <Button variant="secondary">
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </motion.div>
  );
}
```

---

## 3. CALENDAR PAGE

### Update Pattern:
```tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { Card, Badge } from '@/components/common';

export default function CalendarPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Calendar</h1>
        <p className="text-slate-600 mt-2">View your scheduled jobs and events</p>
      </div>

      <Card>
        {/* Calendar implementation */}
        <div className="bg-slate-50 rounded-[12px] p-8 text-center text-slate-600">
          <Calendar size={48} className="mx-auto mb-4 text-slate-300" />
          <p>Calendar component implementation</p>
        </div>
      </Card>
    </motion.div>
  );
}
```

---

## 4. ANALYTICS PAGE

### Update Pattern:
```tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';
import { StatsCard, ChartCard } from '@/components/charts';
import { Card } from '@/components/common';

export default function AnalyticsPage() {
  const stats = [
    { label: 'Total Revenue', value: 'AED 125,000', color: 'primary' as const, trend: { value: 15, direction: 'up' as const } },
    { label: 'Total Jobs', value: '420', color: 'success' as const, trend: { value: 8, direction: 'up' as const } },
    { label: 'Active Collections', value: '45', color: 'info' as const, trend: { value: 3, direction: 'down' as const } },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Analytics</h1>
        <p className="text-slate-600 mt-2">View your performance metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            label={stat.label}
            value={stat.value}
            color={stat.color}
            trend={stat.trend}
            index={index}
          />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Revenue Trend" description="Monthly revenue">
          {/* Chart implementation */}
        </ChartCard>
        <ChartCard title="Job Distribution" description="By material type">
          {/* Chart implementation */}
        </ChartCard>
      </div>
    </motion.div>
  );
}
```

---

## 5. NOTIFICATIONS PAGE

### Update Pattern:
```tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Check, Trash2 } from 'lucide-react';
import { Card, Badge, Button } from '@/components/common';

export default function NotificationsPage() {
  const notifications = [
    { id: 1, title: 'Title', message: 'Message', type: 'success', date: '2 hours ago' },
    // More notifications
  ];

  const getBadgeVariant = (type: string) => {
    const variants: Record<string, any> = {
      'success': 'success',
      'warning': 'warning',
      'error': 'danger',
      'info': 'info',
    };
    return variants[type] || 'neutral';
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Notifications</h1>
        <p className="text-slate-600 mt-2">View all your notifications</p>
      </div>

      <div className="space-y-4">
        {notifications.map((notif) => (
          <Card key={notif.id}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-slate-900">{notif.title}</h3>
                  <Badge variant={getBadgeVariant(notif.type)} size="sm">
                    {notif.type}
                  </Badge>
                </div>
                <p className="text-slate-600 text-sm mb-2">{notif.message}</p>
                <p className="text-slate-500 text-xs">{notif.date}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" icon={<Check size={16} />}>
                  Mark Read
                </Button>
                <Button variant="ghost" size="sm" icon={<Trash2 size={16} />}>
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
```

---

## Color Replacements

Replace all old colors with new design system:
- `bg-white` → No change (stays white)
- `bg-gray-50` → `bg-slate-50`
- `bg-gray-100` → `bg-slate-100`
- `bg-gray-900` → `bg-slate-900`
- `text-gray-*` → `text-slate-*`
- `bg-green-600` → `bg-primary-600`
- `border-gray-200` → `border-slate-200`
- `border-green-500` → `border-primary-500`

## Key Replacements Summary

| Old | New |
|-----|-----|
| `bg-white p-6 rounded-lg shadow-md` | `<Card>` |
| Inline badge `px-3 py-1 rounded-full` | `<Badge variant="status" size="sm">` |
| Button `bg-green-600 text-white px-6` | `<Button variant="primary">` |
| Input field with border | `<Input label="..." />` |
| Search input `pl-10 pr-4 py-2` | `<SearchBar />` |
| Icon + text action | `<Button icon={<Icon />}>` |
| Flex layouts | No change - continue using Tailwind flex |
| Border/shadow | Use Card component or Tailwind utilities |

---

## Important Notes

1. **All pages already use PageLayout** - Don't modify the layout
2. **Imports needed** at top of each page:
   ```tsx
   import { Button, Card, Badge, SearchBar, Input, Modal } from '@/components/common';
   import { StatsCard, ChartCard } from '@/components/charts';
   ```
3. **Color scheme**: Replace all `gray` with `slate` and `green` with `primary`
4. **Border radius**: All cards automatically use 16px
5. **Shadows**: Cards automatically include shadows
6. **Animations**: Already included in components via Framer Motion

---

## Testing Checklist After Updates

- [ ] All pages load without errors
- [ ] Navigation works on all pages
- [ ] Forms submit correctly
- [ ] Tables display data correctly
- [ ] Buttons are clickable
- [ ] Responsive design works (mobile, tablet, desktop)
- [ ] No console errors
- [ ] Animations are smooth
- [ ] Colors are consistent across all pages
- [ ] Typography is consistent

---

## Files to Update (9 remaining pages)

1. ✅ `src/app/vendor/dashboard/page.tsx` - DONE
2. ✅ `src/app/vendor/jobs/page.tsx` - DONE
3. ⏳ `src/app/vendor/calendar/page.tsx`
4. ⏳ `src/app/vendor/collectors/page.tsx`
5. ⏳ `src/app/vendor/history/page.tsx`
6. ⏳ `src/app/vendor/payments/page.tsx`
7. ⏳ `src/app/vendor/analytics/page.tsx`
8. ⏳ `src/app/vendor/reports/page.tsx`
9. ⏳ `src/app/vendor/notifications/page.tsx`
10. ⏳ `src/app/vendor/profile/page.tsx`
11. ⏳ `src/app/vendor/settings/page.tsx`
