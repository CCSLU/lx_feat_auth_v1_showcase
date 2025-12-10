"use client";
// import "server-only";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  LoginSchemaType,
} from "@/modules/0-auth/schemas/auth-zod-schemas";
import { LoginAction } from "@/modules/0-auth/actions/login-action";
import { useActionState } from "react";

// Componentes UI
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Separator } from "@/components/ui/separator";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import SocialAuthButtons from "@/modules/0-auth/components/shared/social-auth-buttons";
import { cn } from "@/lib/utils";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  // Configuramos React Hook Form con validación Zod
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  // Configuramos useActionState para manejar el estado de la acción del servidor
  const [state, formActionTrigger] = useActionState(LoginAction, {
    status: "idle",
    message: "",
  });

  // Configuramos useTransition para manejar el estado de el boton de envio
  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: LoginSchemaType) => {
    startTransition(() => {
      formActionTrigger(data);
    });
  };

  return (
    // Contenedor principal del formulario

    <div>
      {/* Componente Form de Shadcn que integra con React Hook Form */}
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
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
                    className="h-11"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs font-normal" />
              </FormItem>
            )}
          />

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
                      placeholder="Contraseña"
                      className="h-11 pr-10"
                      {...field}
                    />
                    {/* Botón para mostrar/ocultar contraseña */}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground/60 hover:text-muted-foreground hover:bg-input-border dark:hover:bg-input-border absolute inset-y-0 right-0 h-full cursor-pointer rounded-l-none border-l border-input-border px-4 shadow-none"
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

          {/* Checkbox de recordar sesión */}
          <div className="flex items-center justify-between">
            <FormField
              control={form.control}
              name="remember"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="mt-0.5"
                    />
                  </FormControl>
                  <div className="text-muted-foreground text-sm">
                    Recordarme
                  </div>
                </FormItem>
              )}
            />
            <Button variant="link" asChild className="p-0">
              <Link
                href="/auth/forgot-password"
                className="text-primary text-sm font-medium shadow-none"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </Button>
          </div>

          {/* Mensajes de estado del servidor */}
          {state.status && state.message && (
            <div
              className={cn(
                "rounded-md border p-3 text-sm",
                state.status === "error" &&
                  "border-destructive/20 bg-destructive/5 text-destructive",
                state.status === "success" &&
                  "border-success/20 bg-success/5 text-success",
                state.status === "warning" &&
                  "border-warning/20 bg-warning/5 text-warning",
              )}
            >
              {state.message}
            </div>
          )}

          {/* Botón de envío del formulario */}
          <Button
            type="submit"
            variant="default"
            className="mt-2 h-11 w-full"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Iniciando sesión...
              </>
            ) : (
              "Iniciar sesión"
            )}
          </Button>
        </form>
      </Form>

      {/* Separador con texto en el medio */}
      <div className="relative my-8">
        <Separator className="my-4" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="bg-card text-muted-foreground dark:bg-card px-3 text-xs uppercase">
            O iniciar sesión con
          </span>
        </div>
      </div>

      {/* Botones de inicio de sesión con redes sociales */}
      <SocialAuthButtons />

      {/* Enlace para ir al registro si no tiene cuenta */}
      <div className="text-muted-foreground mt-8 text-center text-sm">
        <Separator className="mb-6" />
        ¿No tienes una cuenta?{" "}
        <Button variant="link" asChild className="px-2">
          <Link href="/auth/register" className="font-medium shadow-none">
            Registrarse
          </Link>
        </Button>
      </div>
    </div>
  );
}
