import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // Generate unique rider ID
    const riderId = `RIDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Create uploads directory
    const uploadsDir = path.join(process.cwd(), 'public/uploads/riders', riderId);
    await mkdir(uploadsDir, { recursive: true });

    // Process file uploads
    const fileFields = [
      'emiratesIdFile',
      'drivingLicenseFile',
      'vehicleRegistrationFile',
      'insuranceFile',
      'profilePhotoFile'
    ];

    for (const field of fileFields) {
      const file = formData.get(field) as File;
      if (file) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filename = `${field}-${file.name}`;
        const filepath = path.join(uploadsDir, filename);
        await writeFile(filepath, buffer);
      }
    }

    // Extract form data
    const riderData = {
      riderId,
      // Personal Info
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      emiratesId: formData.get('emiratesId'),
      dateOfBirth: formData.get('dateOfBirth'),
      nationality: formData.get('nationality'),
      
      // Vehicle Details
      vehicleType: formData.get('vehicleType'),
      vehicleRegistration: formData.get('vehicleRegistration'),
      vehicleMake: formData.get('vehicleMake'),
      vehicleModel: formData.get('vehicleModel'),
      vehicleYear: formData.get('vehicleYear'),
      licensePlate: formData.get('licensePlate'),
      
      // Bank Account
      bankName: formData.get('bankName'),
      accountHolder: formData.get('accountHolder'),
      iban: formData.get('iban'),
      accountNumber: formData.get('accountNumber'),
      
      // Agreements
      agreeTerms: formData.get('agreeTerms') === 'true',
      agreePrivacy: formData.get('agreePrivacy') === 'true',
      agreeBackground: formData.get('agreeBackground') === 'true',
      
      // Status
      status: 'pending_review',
      submittedAt: new Date().toISOString(),
      uploadPath: `/uploads/riders/${riderId}`
    };

    // TODO: Save to database
    console.log('Rider onboarding data:', riderData);

    return Response.json({
      success: true,
      riderId,
      message: 'Rider application submitted successfully'
    });
  } catch (error) {
    console.error('Error processing rider onboarding:', error);
    return Response.json(
      { error: 'Failed to process application' },
      { status: 500 }
    );
  }
}
