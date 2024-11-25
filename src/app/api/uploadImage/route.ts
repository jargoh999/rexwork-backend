
import { NextRequest, NextResponse } from 'next/server';
import { uploadImage } from '../../services/uploadFile';
import fs from 'fs';
import path from 'path';
import os from 'os';
export const config = {
  api: {
    bodyParser: false,
  },
};

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const imageBuffer = Buffer.from(body.image, 'base64');
    const tempDir = os.tmpdir(); // Get temporary directory path
    const tempFilePath = path.join(tempDir, 'upload_image.jpg');
    // Ensure the temporary directory exists
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    // Save the image buffer to a temporary file
    fs.writeFileSync(tempFilePath, imageBuffer);
    // Pass the file path to the uploadImage function
    const uploadResult = await uploadImage(tempFilePath);
    // Optionally delete the temporary file after upload
    fs.unlinkSync(tempFilePath);
    return NextResponse.json(uploadResult);
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ success: false, message: error });
  }
};
