"use server";

import { createClient } from "@/lib/supabase/server";
import {
  resetPasswordSchema,
  ResetPasswordSchemaType,
} from "@/modules/0-auth/schemas/auth-zod-schemas";
import { redirect } from "next/navigation";

import { ActionState } from "@/types/action-state-types";

export async function resetPasswordAction(
  _prevState: ActionState,
  data: ResetPasswordSchemaType,
): Promise<ActionState> {
  // Validación del esquema
  const validatedData = resetPasswordSchema.safeParse(data);

  if (!validatedData.success) {
    return {
      status: "error",
      message: validatedData.error?.errors[0].message,
    };
  }

  // DAL (Data Access Layer)

  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    password: validatedData.data.password,
  });

  // Manejo de errores

  if (error) {
    // Manejar diferentes tipos de errores según su código
    if (error.code === "same_password") {
      return {
        status: "error",
        message: "La nueva contraseña debe ser diferente a la anterior",
      };
    } else if (error.code === "weak_password") {
      return {
        status: "error",
        message: "La contraseña es demasiado débil, intenta con una más segura",
      };
    } else if (error.code === "user_not_found") {
      return {
        status: "error",
        message: "Usuario no encontrado o sesión expirada",
      };
    }

    // Mensaje genérico para otros errores
    return {
      status: "error",
      message: error.message || "La actualización de la contraseña ha fallado",
    };
  }

  redirect("/auth/reset-password/confirmation");

  return {
    status: "success",
    message: "La actualización de la contraseña ha sido exitosa",
  };
}
