import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
/**
 * Verifica el token de confirmación de email y redirige al usuario al
 * dashboard si el token es válido.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";

  // Si se proporciona un token y un tipo, verificamos el token
  if (token_hash && type) {
    const supabase = await createClient();

    // Verificamos el token de confirmación
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    // Si el token es válido, redirigimos al usuario al dashboard
    if (!error) {
      console.log("Token es válido");
      redirect(next);
    }
    console.log("Token no es válido");
  }

  // Si el token no es válido, redirigimos al usuario a una página de error
  // con instrucciones
  redirect("/");
}
