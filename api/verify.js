import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { name, facePhoto, handPhoto } = body;

    if (!name || !facePhoto || !handPhoto) {
      return res.status(400).json({ error: 'Name, face photo, and hand photo are required.' });
    }

    const id = Date.now();
    const facePath = `face-${id}.png`;
    const handPath = `hand-${id}.png`;

    const faceBuffer = Buffer.from(facePhoto.split(',')[1], 'base64');
    const handBuffer = Buffer.from(handPhoto.split(',')[1], 'base64');

    const { error: faceError } = await supabase.storage
      .from('demo-photos')
      .upload(facePath, faceBuffer, { contentType: 'image/png' });

    if (faceError) throw faceError;

    const { error: handError } = await supabase.storage
      .from('demo-photos')
      .upload(handPath, handBuffer, { contentType: 'image/png' });

    if (handError) throw handError;

    const { error: dbError } = await supabase.from('verifications').insert([
      {
        id,
        name,
        face_url: facePath,
        hand_url: handPath,
        created_at: new Date().toISOString()
      }
    ]);

    if (dbError) throw dbError;

    const result = Math.random() > 0.1 ? 'NO RECORD FOUND' : 'WITH DEROGATORY RECORD';
    return res.status(200).json({ result, id });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
