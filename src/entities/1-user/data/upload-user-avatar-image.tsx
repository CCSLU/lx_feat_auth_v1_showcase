import { createClient } from "@/lib/supabase/client";

const uploadAvatar = async (file: File) => {
  const supabase = createClient();
  
  // Generar un nombre único para evitar colisiones
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
  
  // Subir la imagen al almacenamiento
  const { data, error } = await supabase.storage
    .from('avatars')
    .upload(`public/${fileName}`, file);

  if (error) {
    console.error('Error uploading image:', error);
    return null;
  }

  // Obtener la URL pública de la imagen
  const { data: { publicUrl } } = supabase.storage
    .from('avatars')
    .getPublicUrl(`public/${fileName}`);

  // Actualizar el avatar_url en los metadatos del usuario
  const { error: updateError } = await supabase.auth.updateUser({
    data: { avatar_url: publicUrl }
  });

  if (updateError) {
    console.error('Error updating user metadata:', updateError);
    return null;
  }

  return publicUrl;
};