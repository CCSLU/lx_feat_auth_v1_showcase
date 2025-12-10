// Auth Zod Schemas

import { z } from "zod";

//Login Schema
export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "El email es requerido" })
    .email({ message: "Por favor, ingresa un email válido" }),

  password: z
    .string()
    .trim()
    .min(1, { message: "La contraseña es requerida" })
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),

  remember: z.boolean().optional().default(false),
});

//Register Schema
export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, { message: "El nombre es requerido" })
      .min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
    lastname: z
      .string()
      .trim()
      .min(1, { message: "El apellido es requerido" })
      .min(3, { message: "El apellido debe tener al menos 3 caracteres" }),
      
    email: z
      .string()
      .trim()
      .min(1, { message: "El email es requerido" })
      .email({ message: "Por favor, ingresa un email válido" }),
    phone: z.string().optional(),
    password: z
      .string()
      .trim()
      .min(1, { message: "La contraseña es requerida" })
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
    confirmPassword: z
      .string()
      .trim()
      .min(1, { message: "La confirmación de contraseña es requerida" })
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
    terms: z
      .boolean()
      .default(false)
      .refine((val) => val === true, {
        message: "Debes aceptar los términos y condiciones",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

//Forgot Password Schema
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "El email es requerido" })
    .email({ message: "Por favor, ingresa un email válido" }),
});

//Reset Password Schema
export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .trim()
      .min(1, { message: "La contraseña es requerida" })
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
    confirmPassword: z
      .string()
      .trim()
      .min(1, { message: "La confirmación de contraseña es requerida" })
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type LoginSchemaType = z.infer<typeof loginSchema>;
export type RegisterSchemaType = z.infer<typeof registerSchema>;
export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;
export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;
