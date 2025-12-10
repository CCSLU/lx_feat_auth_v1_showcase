"use server";

import { createClient } from "@/lib/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  LoginSchemaType,
  loginSchema,
} from "@/modules/0-auth/schemas/auth-zod-schemas";

// Definimos el tipo de estado que devolverá nuestra acción
import { ActionState } from "@/types/action-state-types";

// Acción del servidor para iniciar sesión
export async function LoginAction(
  prevState: ActionState, // Estado anterior (añadido por useActionState)
  data: LoginSchemaType, // Datos del formulario validados por Zod
): Promise<ActionState> {
  // 1. Validamos los datos en el servidor
  const validationResult = loginSchema.safeParse(data);
  if (!validationResult.success) {
    return {
      status: "error",
      message: "Datos inválidos. Por favor revisa el formulario.",
    };
  }

  // 2. Creamos el cliente de Supabase
  const supabase = await createClient();

  // 3. Intentamos iniciar sesión al usuario
  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  // 4. Si hay error, lo devolvemos
  if (error) {
    console.error(error.code + " " + error.message);

    // Si el error es email_not_confirmed, enviamos un nuevo link de confirmación
    if (
      error.code === "email_not_confirmed" ||
      error.message === "email_not_confirmed"
    ) {
      const origin = (await headers()).get("origin");
      const { error: resendError } = await supabase.auth.resend({
        type: "signup",
        email: data.email,
        options: {
          emailRedirectTo: `${origin}/auth/callback?redirect_to=/dashboard`,
        },
      });

      if (!resendError) {
        return {
          status: "warning",
          message:
            "Tu cuenta aún no ha sido activada. En breve te llegará un nuevo enlace de confirmación a tu correo electrónico. Por favor revisa tu bandeja de entrada y la carpeta de spam.",
        };
      }
    }

    // Mapeamos los códigos de error a mensajes en español
    const errorMessages: Record<string, string> = {
      invalid_credentials:
        "Credenciales inválidas. Por favor verifica tu email y contraseña.",
      invalid_login_credentials:
        "Credenciales inválidas. Por favor verifica tu email y contraseña.",
      user_not_found: "No existe una cuenta con este email.",
      email_not_confirmed:
        "Tu cuenta aún no ha sido activada. Revisa tu correo electrónico y haz clic en el enlace de confirmación que te enviamos. Si no lo encuentras, revisa también tu carpeta de spam.",
      invalid_email: "El formato del email es incorrecto.",
      too_many_requests:
        "Demasiados intentos fallidos. Por favor intenta más tarde.",
      service_unavailable:
        "Servicio no disponible. Por favor intenta más tarde.",
    };

    // Usamos el mensaje específico en español si existe, o un mensaje genérico
    const errorMessage =
      errorMessages[error.code as keyof typeof errorMessages] ||
      errorMessages[error.message] ||
      "Ha ocurrido un error al iniciar sesión. Por favor intenta nuevamente.";

    return {
      status: "error",
      message: errorMessage,
    };
  } else {
    // 5. Si todo va bien, redirigimos directamente desde el servidor
    redirect("/dashboard");

    // Este código nunca se ejecuta después del redirect
    return {
      status: "success",
      message: "Sesión iniciada exitosamente",
    };
  }
}
