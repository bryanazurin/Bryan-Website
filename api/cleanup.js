import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  try {
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    const { data, error } = await supabase
      .from('verifications')
      .select('*')
      .lt('created_at', yesterday);

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.status(200).json({ deleted: 0 });
    }

    const filesToDelete = data.flatMap(item => [item.face_url, item.hand_url]);

    const { error: storageError } = await supabase.storage
      .from('demo-photos')
      .remove(filesToDelete);

    if (storageError) throw storageError;

    const { error: deleteError } = await supabase
      .from('verifications')
      .delete()
      .lt('created_at', yesterday);

    if (deleteError) throw deleteError;

    return res.status(200).json({ deleted: data.length });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
