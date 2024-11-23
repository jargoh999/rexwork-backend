import { NextApiRequest, NextApiResponse } from 'next';
import { uploadFile } from '../../services/cloudinaryService';
import formidable from 'formidable';
import { NextResponse } from 'next/server';

export const config = {
  api: {
    bodyParser: false,
  },
};

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const form = formidable({ multiples: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing the files', err);
      return res.status(500).json({ error: 'Error parsing the files' });
    }

    const file = files.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
      const result = await uploadFile(file.filepath);
      return res.status(200).json(result);
    } catch (error) {
      console.error('Error during file upload:', error);
      return res.status(500).json({ error: 'Failed to upload file' });
    }
  });

  // Ensure a response is returned in all cases
  return res.status(405).json({ error: 'Method Not Allowed' });
};