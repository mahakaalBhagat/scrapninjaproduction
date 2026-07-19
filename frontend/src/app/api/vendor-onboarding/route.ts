import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Get form data
    const formDataString = formData.get('formData') as string;
    const formDataParsed = JSON.parse(formDataString);

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), 'public', 'uploads', 'vendors');
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    // Generate vendor ID
    const vendorId = `vendor_${Date.now()}`;
    const vendorDir = join(uploadsDir, vendorId);
    await mkdir(vendorDir, { recursive: true });

    // Save all files
    const fileFields = [
      'tradeLicenseFile',
      'passportFile',
      'emiratesIdFile',
      'incorporationFile',
      'moaFile',
      'structureFile',
      'declarationFile',
      'chequeFile',
      'bankLetterFile',
      'permitFile',
      'wastePermitFile',
      'municipalityFile',
      'vatFile',
    ];

    for (const field of fileFields) {
      const file = formData.get(field) as File;
      if (file) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filename = `${field}_${file.name}`;
        await writeFile(join(vendorDir, filename), buffer);
      }
    }

    // Handle facility photos
    let photoIndex = 0;
    let photo = formData.get(`facilityPhoto_${photoIndex}`);
    while (photo) {
      const file = photo as File;
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `facility_photo_${photoIndex}_${file.name}`;
      await writeFile(join(vendorDir, filename), buffer);
      photoIndex++;
      photo = formData.get(`facilityPhoto_${photoIndex}`);
    }

    // TODO: Save to database
    // This is where you would typically save the vendor data to your database
    // along with file paths and document references

    // Log vendor data (in production, save to database)
    console.log('Vendor Application Submitted:', {
      vendorId,
      timestamp: new Date().toISOString(),
      companyName: formDataParsed.businessVerification?.companyName,
      data: formDataParsed,
    });

    // Return success response
    return NextResponse.json(
      {
        status: 'success',
        vendorId,
        message: 'Application submitted successfully. Our team will review your application within 3-5 business days.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing vendor onboarding:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Failed to submit application. Please try again.',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
