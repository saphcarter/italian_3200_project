import { put } from '@vercel/blob';

export default async function (req, res) {

  if (req.method === 'POST') {
    const filename = req.query.filename;

    if (!filename) {
      console.error('Filename not provided or invalid');
      return res.status(400).json({ error: 'Filename is required in the query parameters.' });
    }

    try {
      const blob = await put(filename, req, {
        access: 'public',
      });

      return res.status(200).json(blob);

    } catch (error) {
      console.error(`Error during blob upload of file`, error.message);
      return res.status(500).json({ error: `Failed to upload to blob storage.` });
  }  
  } else {
    console.warn('Unsupported request method received:', req.method);
    return res.status(405).json({ error: 'Method not allowed.' });
  }
}