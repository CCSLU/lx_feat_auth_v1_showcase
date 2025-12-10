"use server";

import { createClient } from "@/lib/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  RegisterSchemaType,
  registerSchema,
} from "@/modules/0-auth/schemas/auth-zod-schemas";

import { ActionState } from "@/types/action-state-types";

export async function RegisterAction(
  _prevState: ActionState,
  data: RegisterSchemaType,
): Promise<ActionState> {
  const validationResult = registerSchema.safeParse(data);
  if (!validationResult.success) {
    return {
      status: "error",
      message: "Datos inválidos. Por favor revisa el formulario.",
    };
  }
  const supabase = await createClient();

  const origin = (await headers()).get("origin");
  const { error, data: signUpData } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        display_name: data.name,
        name: data.name,
        firstName: data.name,
        lastName: data.lastname,
      },
      emailRedirectTo: `${origin}/auth/login`,
    },
  });

  console.log("el objeto de signUpData:", signUpData);
  console.log("el objeto de Identities:", signUpData?.user?.identities);

  if (error) {
    console.error(error.code + " " + error.message);
    return {
      status: "error",
      message: error.message,
    };
  } else if (
    signUpData?.user &&
    signUpData?.user.identities &&
    signUpData?.user.identities.length === 0
  ) {
    console.log("El usuario ya existe");
    return {
      status: "error",
      message: "El correo electrónico ya está registrado. ",
    };
  } else {
    redirect("/auth/register/confirmation");
  }
  return {
    status: "success",
    message: "Cuenta creada exitosamente",
  };
}
