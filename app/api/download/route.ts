import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'public', 'Mahmoud_CV.pdf');
  
  try {
    if (!fs.existsSync(filePath)) {
      return new NextResponse('CV file not found. Please make sure the file is named exactly Mahmoud_CV.pdf in the public folder.', { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Mahmoud_Elsalmy_CV.pdf"',
      },
    });
  } catch (error) {
    return new NextResponse('Error downloading CV', { status: 500 });
  }
}
