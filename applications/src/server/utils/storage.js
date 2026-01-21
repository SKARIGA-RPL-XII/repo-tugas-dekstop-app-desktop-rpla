export async function uploadAvatar(supabase, file, userId) {
  const fileExt = file.originalname.split(".").pop();
  const fileName = `${userId}-${Date.now()}.${fileExt}`;
  const filePath = `users/${fileName}`;

  const { error } = await supabase.storage
    .from("avatars")
    .upload(filePath, file.buffer, {
      contentType: file.mimetype,
      upsert: true
    });

  if (error) throw error;

  return filePath;
}

export async function deleteAvatar(supabase, filePath) {
  if (!filePath) return;

  const { error } = await supabase.storage
    .from("avatars")
    .remove([filePath]);

  if (error) throw error;
}
