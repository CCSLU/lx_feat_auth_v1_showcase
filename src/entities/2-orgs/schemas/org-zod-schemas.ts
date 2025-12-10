import { z } from "zod";

// Complete Organization Schema
export const completeOrgSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "El nombre es requerido" })
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
  type: z.enum(["empresa", "personal"], {
    errorMap: () => ({ message: "Selecciona el tipo: empresa o personal" }),
  }),
  VATId: z.string().trim().min(1, { message: "El CIF/NIF es requerido" }),
  email: z
    .string()
    .trim()
    .min(1, { message: "El email es requerido" })
    .email({ message: "Por favor, ingresa un email válido" }),
  phone: z.string().trim().optional(),
  address: z.string().trim().min(1, { message: "La dirección es requerida" }),
  city: z.string().trim().min(1, { message: "La ciudad es requerida" }),
  state: z.string().trim().min(1, { message: "El estado es requerido" }),
  country: z.string().trim().min(1, { message: "El país es requerido" }),
  postalCode: z
    .string()
    .trim()
    .min(1, { message: "El código postal es requerido" }),
  website: z
    .string()
    .trim()
    .url({ message: "Por favor, ingresa una URL válida" })
    .optional(),
});

// Basic Organization Schema (for onboarding)
export const basicOrgSchema = completeOrgSchema.pick({
  name: true,
  type: true,
});

// Billing Organization Schema
export const billingOrgSchema = completeOrgSchema.pick({
  VATId: true,
  email: true,
  phone: true,
  address: true,
  city: true,
  state: true,
  country: true,
  postalCode: true,
});

export type CompleteOrgSchemaType = z.infer<typeof completeOrgSchema>;
export type BasicOrgSchemaType = z.infer<typeof basicOrgSchema>;
export type BillingOrgSchemaType = z.infer<typeof billingOrgSchema>;
