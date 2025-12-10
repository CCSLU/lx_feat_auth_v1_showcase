"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordSchema,
  ForgotPasswordSchemaType,
} from "@/modules/0-auth/schemas/auth-zod-schemas";
import { useActionState } from "react";
import { useTransition } from "react";
import { forgotPasswordAction } from "@/modules/0-auth/actions/forgot-password-action";

// Componentes UI
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Loader2, ArrowLeft } from "lucide-react";

export function ForgotPasswordForm() {
  // Configuramos React Hook Form con validación Zod
  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  // Configuramos useActionState para manejar el estado de la acción del servidor
  const [state, formActionTrigger] = useActionState(forgotPasswordAction, {
    status: "idle",
    message: "",
  });

  // Configuramos useTransition para manejar el estado de el boton de envio
  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: ForgotPasswordSchemaType) => {
    startTransition(() => {
      formActionTrigger(data);
    });
  };

  return (
    <>
      {/* Componente Form de Shadcn que integra con React Hook Form */}
      <Form {...form}>
        <form
          className="min-h-[370px] space-y-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* Campo de email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Email"
                    className="h-11 bg-background/70 backdrop-blur-sm focus-visible:ring-1 focus-visible:ring-primary/30 focus-visible:ring-offset-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs font-normal" />
              </FormItem>
            )}
          />

          {/* Mostrar errores del servidor */}
          {state.status === "error" && (
            <div className="rounded-md border border-destructive/20 bg-destructive/5 p-3 text-xs text-destructive">
              {state.message}
            </div>
          )}
          {/* Mostrar éxito del servidor */}
          {state.status === "success" && (
            <div className="rounded-md border border-success/20 bg-success/5 p-3 text-sm font-medium text-success">
              {state.message}
            </div>
          )}

          {/* Botón de envío del formulario */}
          <Button
            type="submit"
            variant="default"
            className="mt-2 h-11 w-full cursor-pointer font-medium transition-all  focus-visible:ring-1 focus-visible:ring-primary/30 focus-visible:ring-offset-0"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              "Recuperar contraseña"
            )}
          </Button>
        </form>
      </Form>

      {/* Enlace para volver al login */}
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <Button variant="ghost" asChild className="px-2">
          <Link
            href="/auth/login"
            className="text-primary"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Volver al inicio de sesión
          </Link>
        </Button>
      </div>
    </>
  );
}
