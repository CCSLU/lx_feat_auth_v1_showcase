"use server";

import { createClient } from "@/lib/supabase/server";
import { headers } from "next/headers";

import {
  ForgotPasswordSchemaType,
  forgotPasswordSchema,
} from "@/modules/0-auth/schemas/auth-zod-schemas";

import { ActionState } from "@/types/action-state-types";

export async function forgotPasswordAction(
  _prevState: ActionState,
  data: ForgotPasswordSchemaType,
): Promise<ActionState> {
  // 1. Validamos los datos en el servidor usando Zod
  const validationResult = forgotPasswordSchema.safeParse(data);
  if (!validationResult.success) {
    return {
      status: "error",
      message: "Datos inválidos. Por favor revisa el formulario.",
    };
  }

  // 2. Creamos el cliente de Supabase para interactuar con la autenticación
  const supabase = await createClient();

  // 3. Obtenemos el origen de la solicitud para construir la URL de redirección
  const origin = (await headers()).get("origin");

  // 4. Solicitamos a Supabase enviar el email de restablecimiento de contraseña
  const { error, data: serverData } = await supabase.auth.resetPasswordForEmail(
    data.email,
    {
      redirectTo: `${origin}/auth/callback?redirect_to=/auth/reset-password`,
    },
  );

  console.log(serverData);

  // 5. Manejamos errores en caso de que no se pueda enviar el email
  if (error) {
    console.error(error.message);
    return {
      status: "error",
      message: "Could not reset password",
    };
  }

  // // 6. Si existe una URL de callback, redirigimos al usuario
  // if (callbackUrl) {
  //   return redirect(callbackUrl);
  // }

  // 7. Retornamos un mensaje de éxito para mostrar al usuario
  return {
    status: "success",
    message:
      "Si tu correo electrónico está registrado, te llegará un enlace para recuperar tu cuenta. Revisa tu bandeja de entrada y, si no lo encuentras, consulta la carpeta de spam.",
  };
}
