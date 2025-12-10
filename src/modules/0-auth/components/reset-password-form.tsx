"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  resetPasswordSchema,
  ResetPasswordSchemaType,
} from "@/modules/0-auth/schemas/auth-zod-schemas";

import { useActionState } from "react";

// Componentes UI
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { resetPasswordAction } from "@/modules/0-auth/actions/reset-password-action";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";

export function ResetPasswordForm() {
  // 1. Estados para controlar la visibilidad de las contraseñas
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 2. Configuración de React Hook Form con validación Zod
  const form = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // 3. Estado para manejar la respuesta de la acción del servidor
  const [state, formActionTrigger] = useActionState(resetPasswordAction, {
    status: "idle",
    message: "",
  });

  // 4. Estado para controlar la transición durante el envío del formulario
  const [isPending, startTransition] = useTransition();

  // 5. Función que se ejecuta al enviar el formulario
  const onSubmit = (data: ResetPasswordSchemaType) => {
    startTransition(() => {
      formActionTrigger(data);
    });
  };

  return (
    // Contenedor principal del formulario
    <div className="w-full">
      {/* Componente Form que integra con React Hook Form */}
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          {/* Campo de contraseña con toggle para mostrar/ocultar */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Nueva contraseña"
                      className="h-11 pr-10"
                      {...field}
                    />
                    {/* Botón para mostrar/ocultar contraseña */}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground/60 hover:text-muted-foreground hover:bg-input-border dark:hover:bg-input-border dark:hover:border-input-border dark:border-input-border hover:border-input-border absolute inset-y-0 right-0 h-full cursor-pointer rounded-l-none border-l px-4 shadow-none"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOffIcon size={16} />
                      ) : (
                        <EyeIcon size={16} />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage className="text-xs font-normal" />
              </FormItem>
            )}
          />

          {/* Campo de confirmación de contraseña */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirmar nueva contraseña"
                      className="h-11 pr-10"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground/60 hover:text-muted-foreground hover:bg-input-border dark:hover:bg-input-border dark:hover:border-input-border dark:border-input-border hover:border-input-border absolute inset-y-0 right-0 h-full cursor-pointer rounded-l-none border-l px-4 shadow-none"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOffIcon size={16} />
                      ) : (
                        <EyeIcon size={16} />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage className="text-xs font-normal" />
              </FormItem>
            )}
          />

          {/* Mensajes de respuesta del servidor */}
          {state.status === "error" && (
            <div className="border-destructive/20 bg-destructive/5 text-destructive rounded-md border p-3 text-xs">
              {state.message}
            </div>
          )}
          {state.status === "success" && (
            <div className="border-success/20 bg-success/5 text-success rounded-md border p-3 text-xs">
              {state.message}
            </div>
          )}

          {/* Botón de envío con estado de carga */}
          <Button
            type="submit"
            className="mt-2 h-11 w-full"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Cambiando contraseña...
              </>
            ) : (
              "Cambiar contraseña"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
