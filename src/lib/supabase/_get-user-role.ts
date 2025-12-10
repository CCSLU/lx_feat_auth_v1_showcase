import "server-only";

import { JWTPayload, jwtVerify } from "jose";

import { createClient } from "@/lib/supabase/server";

// Extend the JWTPayload type to include Supabase-specific metadata
type SupabaseJwtPayload = JWTPayload & {
  app_metadata: {
    role: string;
  };
};

export async function getUserRole() {
  // Create a Supabase client for server-side operations
  const supabase = createClient();

  // Retrieve the current session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  let role;

  if (session) {
    // Extract the access token from the session
    const token = session.access_token;

    try {
      // Encode the JWT secret for verification
      const secret = new TextEncoder().encode(process.env.SUPABASE_JWT_SECRET);

      // Verify the JWT token and extract the payload
      const { payload } = await jwtVerify<SupabaseJwtPayload>(token, secret);

      // Extract the role from the app_metadata in the payload
      role = payload.app_metadata.role;
    } catch (error) {
      console.error("Failed to verify token:", error);
    }
  }

  return role;
}

// Esta función hace lo siguiente:

// Crea un cliente de Supabase.
// Recupera la sesión actual usando supabase.auth.getSession().
// Si existe una sesión, extrae el token de acceso (JWT).
// Luego se prepara para verificar la ficha de JWT. El secreto de JWT está codificado usando TextEncoder().encode(process.env.SUPABASE_JWT_SECRET). Este paso es necesario porque el jwtVerifyfunción de la josela biblioteca espera que el secreto esté en un formato específico - a Uint8Array.
// Verifica la ficha de JWT usando lo codificado SUPABASE_JWT_SECRET.
// Después de la verificación, extrae el rolede la app_metadataen la carga simbólica.
// Finalmente, devuelve el papel del usuario.
