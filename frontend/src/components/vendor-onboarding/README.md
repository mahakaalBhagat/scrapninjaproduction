# Vendor Onboarding Module Documentation

## Overview
Complete multi-step vendor onboarding system for ScrapNinja with 10 comprehensive sections covering business verification, compliance, banking, and operational requirements.

## Components

### 1. **BusinessVerification.tsx**
Handles company registration and business details:
- Company Legal Name
- Business Registration Number
- Trade License Number & Expiry Date
- Registered Business Address
- Business Type (Mainland/Free Zone)
- Trade License Upload

### 2. **ScrapTradingAuthorization.tsx**
Checkboxes for trading types:
- Scrap Trading
- Metal Scrap Trading
- Waste Trading
- Recycling Activities
- Other

### 3. **KYCSection.tsx**
Company Know Your Customer/Business documents:
- Owner/Director Passport Upload
- Emirates ID Upload (Optional)
- Certificate of Incorporation
- MOA Upload
- Authorized Signatory Name & Designation

### 4. **UBOSection.tsx**
Ultimate Beneficial Owner Declaration:
- Dynamic beneficial owners list (add/remove)
- Ownership percentages
- Ownership Structure Chart Upload
- Signed UBO Declaration Upload

### 5. **TaxCompliance.tsx**
Tax registration details:
- VAT Registration Status (Yes/No)
- Conditional VAT/TRN Number field
- VAT Certificate Upload

### 6. **BankingVerification.tsx**
Company bank account details:
- Bank Name
- Account Holder Name (must match Company Legal Name)
- IBAN (with format validation)
- Account Number
- Cancelled Cheque Upload
- Bank Letter Upload

### 7. **ScrapSourceDeclaration.tsx**
Scrap sourcing information:
- Scrap Source (Import/Export/Domestic)
- Types of Scrap (Text description)
- Scrap Origin (Industrial/Demolition/Manufacturing/Other)

### 8. **EnvironmentalCompliance.tsx**
Environmental permits and approvals:
- Environmental Permit Upload
- Waste Management Permit Upload
- Municipality Approval Upload

### 9. **OperationalVerification.tsx**
Warehouse and operational details:
- Warehouse Address
- Google Maps Location URL
- Facility Photos Upload (Multiple)
- Primary Contact Name & Number
- Company Email
- Company Website (Optional)

### 10. **VendorAgreement.tsx**
Legal agreements and policies:
- Anti-Fraud Policy
- Local Laws Compliance
- No Stolen/Illegal Scrap Confirmation
- Dispute Resolution Terms
- Commercial Terms Acceptance

### 11. **ProgressIndicator.tsx**
Visual progress tracking:
- Step indicator with completion status
- Progress bar
- Step numbering with completion checkmarks

## Features

✅ **Complete Form Validation**
- React Hook Form integration
- Zod schema validation
- Field-level and cross-field validation
- Real-time error messages

✅ **File Upload Handling**
- Multiple file upload support
- File type validation (PDF, JPG, PNG)
- Visual feedback for uploaded files
- FormData preparation for API submission

✅ **Smart Navigation**
- Step-by-step progression
- Validation before advancing
- Smooth scroll to top
- Previous/Next buttons

✅ **Draft Management**
- Save draft to localStorage
- Auto-load draft on page reload
- Draft persistence across sessions

✅ **User Experience**
- Mobile responsive design
- Smooth animations with Framer Motion
- Clear error messages
- Success notifications
- Loading states for submissions
- Help/Support information

✅ **Data Requirements**
All mandatory documents verified:
- ✓ Trade License
- ✓ Passport/Director ID
- ✓ Certificate of Incorporation
- ✓ UBO Declaration
- ✓ VAT Certificate (if applicable)
- ✓ Bank Documents (Cheque + Letter)
- ✓ Environmental Permits (3)
- ✓ Facility Photos
- ✓ Signed Agreement

## Usage

### Page Route
```
/vendor-onboarding
```

### Accessing the Form
Users can navigate to the vendor onboarding page via:
1. "Become a Vendor" button on homepage/hero section
2. Direct URL navigation

### Form Submission
The form submits to: `/api/vendor-onboarding`

Expected POST body:
- All form fields as JSON
- All files as multipart form data

## Validation Rules

### Business Verification
- Company name: required
- Registration number: required
- Trade license: required and valid
- Expiry date must be in future

### Banking
- Account holder name MUST match Company Legal Name
- IBAN format: AE070331234567890123456
- Valid international format validation

### Contact Information
- Email: standard email validation
- Phone: international phone format support
- Website: optional but validated if provided

### UBO Section
- Ownership percentages: 0-100
- At least one beneficial owner
- Total ownership should ideally = 100%

## Technical Stack

- **Framework**: Next.js 14 (React 18)
- **Forms**: React Hook Form + Zod
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **File Handling**: Native FileList API

## Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Responsive design

## API Integration

### Endpoint
```
POST /api/vendor-onboarding
```

### Expected Response
```json
{
  "status": "success",
  "vendorId": "vendor_123",
  "message": "Application submitted successfully"
}
```

### Error Handling
- Validation errors displayed inline
- API errors shown in error banner
- Retry capability for failed submissions

## Future Enhancements

- Document preview/viewer
- Camera upload for facility photos
- Address autocomplete integration
- Email verification step
- SMS notifications
- Vendor dashboard
- Application status tracking
- Document expiry reminders

## Support

For issues or questions about the vendor onboarding module:
- Email: vendor-support@scrapninja.com
- Contact form: [Support Page]

---

**Version**: 1.0.0  
**Last Updated**: 2026-06-16
