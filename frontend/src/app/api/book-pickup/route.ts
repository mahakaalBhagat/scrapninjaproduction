import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // Generate unique pickup ID
    const pickupId = `PICKUP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Create uploads directory
    const uploadsDir = path.join(process.cwd(), 'public/uploads/pickups', pickupId);
    await mkdir(uploadsDir, { recursive: true });

    // Process scrap images
    const images: any[] = [];
    for (let i = 0; i < (formData.getAll('scrapImages')?.length || 0); i++) {
      const file = formData.get(`scrapImages[${i}]`) as File;
      if (file) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filename = `scrap-${i}-${file.name}`;
        const filepath = path.join(uploadsDir, filename);
        await writeFile(filepath, buffer);
        images.push(filename);
      }
    }

    // Extract form data
    const pickupData = {
      pickupId,
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      address: formData.get('address'),
      scrapType: formData.get('scrapType'),
      quantity: formData.get('quantity'),
      description: formData.get('description'),
      preferredDate: formData.get('preferredDate'),
      preferredTime: formData.get('preferredTime'),
      images,
      status: 'pending',
      submittedAt: new Date().toISOString(),
      uploadPath: `/uploads/pickups/${pickupId}`
    };

    // TODO: Save to database and send confirmation email
    console.log('Pickup request data:', pickupData);

    return Response.json({
      success: true,
      pickupId,
      message: 'Pickup request submitted successfully'
    });
  } catch (error) {
    console.error('Error processing pickup request:', error);
    return Response.json(
      { error: 'Failed to process pickup request' },
      { status: 500 }
    );
  }
}
