# Vendor Onboarding Module - Quick Start Guide

## Installation & Setup

### What's Been Created

✅ **10 Reusable Components** in `/src/components/vendor-onboarding/`:
1. BusinessVerification.tsx
2. ScrapTradingAuthorization.tsx
3. KYCSection.tsx
4. UBOSection.tsx
5. TaxCompliance.tsx
6. BankingVerification.tsx
7. ScrapSourceDeclaration.tsx
8. EnvironmentalCompliance.tsx
9. OperationalVerification.tsx
10. VendorAgreement.tsx
11. ProgressIndicator.tsx

✅ **Main Page**: `/src/app/vendor-onboarding/page.tsx`
- Complete multi-step form with validation
- Draft saving to localStorage
- Progress tracking
- Responsive design

✅ **API Route**: `/src/app/api/vendor-onboarding/route.ts`
- File upload handling
- FormData processing
- Vendor ID generation
- File storage in `/public/uploads/vendors/`

✅ **Supporting Files**:
- `index.ts` - Component exports
- `README.md` - Full documentation

## Running Locally

### 1. Start the Development Server
```bash
cd frontend
npm run dev
```

Server will be available at `http://localhost:3000`

### 2. Access the Vendor Onboarding
Navigate to:
```
http://localhost:3000/vendor-onboarding
```

### 3. Or Click the "Become a Vendor" Button
- On homepage (Hero Section)
- On Solutions Section
- Both buttons link to the onboarding page

## Features Overview

### 📋 Form Validation
- Real-time field validation using React Hook Form + Zod
- Cross-field validation (e.g., Account Holder Name must match Company Name)
- Conditional fields (e.g., VAT fields only show if VAT is registered)
- Smart error messages

### 💾 Draft Management
- Auto-saves form state to browser localStorage
- Resume applications in progress
- Visible "Save Draft" button
- Draft auto-loads on page reload

### 📊 Progress Tracking
- Visual progress indicator with step numbers
- Completion percentage
- Step validation before advancing
- Smooth animations between steps

### 📁 File Uploads
- Multiple file type support (PDF, JPG, PNG)
- Visual feedback for selected files
- Facility photos allow multiple uploads
- All files collected for API submission

### ✅ Smart Navigation
- Previous/Next buttons
- Validation before advancing steps
- Can't skip to later steps without validation
- Back button disabled on first step

### 🎨 Responsive Design
- Mobile-first approach
- Smooth animations with Framer Motion
- Touch-friendly buttons and inputs
- Readable on all screen sizes

## Form Structure (10 Steps)

```
Step 1: Business Verification
├─ Company name, registration, license, etc.
└─ Business type selector

Step 2: Scrap Trading Authorization
├─ Trading type checkboxes
└─ Select all applicable options

Step 3: Company KYC/KYB
├─ Document uploads
├─ Authorized signatory info
└─ Administrative details

Step 4: UBO Declaration
├─ Add/remove beneficial owners
├─ Ownership percentages
└─ Supporting documents

Step 5: Tax Compliance
├─ VAT registration status
├─ Conditional VAT details
└─ Tax certificate upload

Step 6: Banking Verification
├─ Bank account details
├─ IBAN validation
├─ Account holder verification
└─ Bank documents

Step 7: Scrap Source Declaration
├─ Import/Export/Domestic selection
├─ Scrap types description
└─ Origin classification

Step 8: Environmental Compliance
├─ Environmental permit
├─ Waste management permit
└─ Municipality approval

Step 9: Operational Verification
├─ Warehouse address
├─ Google Maps location
├─ Facility photos (multiple)
├─ Contact information
└─ Website

Step 10: Vendor Agreement
├─ Anti-fraud policy acceptance
├─ Local laws compliance
├─ No stolen scrap confirmation
├─ Dispute resolution terms
└─ Commercial terms acceptance
```

## Testing Checklist

- [ ] Navigate to `/vendor-onboarding`
- [ ] Fill out Step 1 - Business Verification
- [ ] Click "Next" to advance
- [ ] Verify validation works (try leaving fields empty)
- [ ] Test "Save Draft" button
- [ ] Reload page and verify draft is restored
- [ ] Navigate through all 10 steps
- [ ] Try uploading a file to each file field
- [ ] Fill complete form with valid data
- [ ] Test conditional fields (VAT in Step 5)
- [ ] Verify "Submit Application" button on final step
- [ ] Test form submission to API
- [ ] Check file uploads in `/public/uploads/vendors/`

## API Integration Notes

### Current Setup
- Files are saved to local filesystem
- Location: `/public/uploads/vendors/{vendorId}/`
- Each vendor gets unique ID: `vendor_timestamp`

### For Production
You should:
1. **Add Database Storage**
   - Save vendor application data to database
   - Store file references/URLs
   - Track application status

2. **Configure File Storage**
   - Use S3/Cloud Storage instead of local filesystem
   - Implement file size limits
   - Add virus scanning for security

3. **Add Email Notifications**
   - Send confirmation email to vendor
   - Notify admin team
   - Send status updates

4. **Implement Admin Review**
   - Create admin dashboard
   - Manual verification workflow
   - Approval/rejection logic
   - Document verification

## Environment Setup

### Required Dependencies (Already Installed)
- `react-hook-form` - Form management
- `zod` - Schema validation
- `@hookform/resolvers` - Zod integration
- `framer-motion` - Animations
- `lucide-react` - Icons
- `tailwindcss` - Styling

No additional npm install needed!

## Customization

### Styling
- Colors: Update Tailwind classes in components
- Spacing: Modify px/py values
- Fonts: Change font-sizes and weights

### Validation Rules
- Edit Zod schema in `/src/app/vendor-onboarding/page.tsx`
- Add/remove required fields
- Modify validation patterns

### Steps
- Add new components
- Update `stepNames` array
- Update form rendering in `renderStep()`
- Add new fields to schema

### File Types
- Update `accept` attributes in file inputs
- Modify backend file handling
- Add file size limits

## Troubleshooting

### Files not uploading?
- Check `/public/uploads/` directory exists
- Verify permissions on public folder
- Check browser console for errors

### Draft not saving?
- Check localStorage is enabled
- Verify localStorage quota
- Check browser console for errors

### Validation not working?
- Verify React Hook Form setup
- Check Zod schema syntax
- Ensure field names match schema

### Page not loading?
- Clear Next.js cache: `rm -rf .next`
- Restart dev server: `npm run dev`
- Check for TypeScript errors

## Next Steps

1. **Test locally** - Run through all steps
2. **Configure backend** - Set up database storage
3. **Add email notifications** - Send confirmations
4. **Create admin panel** - Review applications
5. **Deploy** - Push to production
6. **Monitor** - Track submissions and issues

## Support

For questions or issues:
- Check [README.md](./README.md) for component details
- Review component source code for field names
- Check browser console for JavaScript errors
- Verify form data structure in API route

---

**Ready to test?** Start the dev server and navigate to:
```
http://localhost:3000/vendor-onboarding
```

Happy vendor onboarding! 🚛
