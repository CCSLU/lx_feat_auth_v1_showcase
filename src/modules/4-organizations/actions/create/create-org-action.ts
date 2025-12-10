"use server";
import "server-only";

import validateUser from "@/lib/supabase/validate-user";
import { redirect } from "next/navigation";
import {
  basicOrgSchema,
  BasicOrgSchemaType,
} from "@/entities/2-orgs/schemas/org-zod-schemas";
import { createOrgDal } from "@/entities/2-orgs/data/create/create-org-dal";

type ActionState = {
  status: "idle" | "success" | "error" | "pending" | "warning";
  message?: string;
};

export async function createOrgAction(
  _prevState: ActionState,
  data: BasicOrgSchemaType,
): Promise<ActionState> {
  // Verificar que el usuario esté autenticado
  const user = await validateUser();

  // Validar datos con Zod
  const validationResult = basicOrgSchema.safeParse(data);
  if (!validationResult.success) {
    return {
      status: "error",
      message: "Datos inválidos. Por favor revisa el formulario.",
    };
  }

  // Insertar organización en la base de datos
  const { error, data: orgData } = await createOrgDal({
    name: data.name,
    type: data.type,
    user_id: user.id,
  });

  if (error) {
    console.error(error.code + " " + error.message);

    if (error.code === "23505") {
      return {
        status: "error",
        message:
          "Ya tienes una organización con ese nombre. Por favor, elige otro nombre.",
      };
    }

    return {
      status: "error",
      message: "Error al crear la organización: " + error.message,
    };
  }

  // Redirigir a la página de la organización
  redirect(`/orgs/${orgData.id}/dashboard`);

  // Este código nunca se ejecuta después del redirect
  return {
    status: "success",
    message: "Organización creada exitosamente",
  };
}
