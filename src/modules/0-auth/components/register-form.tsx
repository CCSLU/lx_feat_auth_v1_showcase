"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  RegisterSchemaType,
} from "@/modules/0-auth/schemas/auth-zod-schemas";
import { RegisterAction } from "@/modules/0-auth/actions/register-action";
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

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Configuramos React Hook Form con validación Zod
  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  // Configuramos useActionState para manejar el estado de la acción del servidor
  const [state, formActionTrigger] = useActionState(RegisterAction, {
    status: "idle",
    message: "",
  });

  // Configuramos useTransition para manejar el estado de el boton de envio
  const [isPending, startTransition] = useTransition();

  // onSubmit vacio no devuelve nada por es solo para que onSubmit={form.handleSubmit(onSubmit)}> en el formulario pueda usar reack hook form para hacer la validacion de los datos en el cliente.
  const onSubmit = (data: RegisterSchemaType) => {
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
          {/* Campos de nombre y apellido en grid */}
          {/* Nombre */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Nombre"
                      type="text"
                      className="h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs font-normal" />
                </FormItem>
              )}
            />
            {/* Apellido */}
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Apellido"
                      type="text"
                      className="h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs font-normal" />
                </FormItem>
              )}
            />
          </div>

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
                      type={showPassword ? "text" : "password"} // Cambia el tipo según el estado
                      placeholder="Contraseña"
                      className="h-11 pr-10"
                      {...field}
                    />
                    {/* Botón para mostrar/ocultar contraseña */}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground/60 hover:text-muted-foreground hover:bg-input-border border-input-border absolute inset-y-0 right-0 h-full cursor-pointer rounded-l-none border-l px-4 shadow-none"
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
                      placeholder="Confirmar contraseña"
                      className="h-11 pr-10"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground/60 hover:text-muted-foreground hover:bg-input-border border-input-border absolute inset-y-0 right-0 h-full cursor-pointer rounded-l-none border-l px-4 shadow-none"
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

          {/* Checkbox de aceptación de términos y condiciones */}
          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start space-y-1">
                <div className="flex flex-row items-start space-x-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className=""
                    />
                  </FormControl>
                  <div className="text-muted-foreground text-sm">
                    Acepto los{" "}
                    <Link
                      href="#"
                      className="text-primary hover:text-primary/80 font-medium underline transition-colors"
                    >
                      términos y condiciones
                    </Link>
                  </div>
                </div>
                <FormMessage className="text-xs font-normal" />
              </FormItem>
            )}
          />

          {/* Mostrar errores del servidor */}
          {state.status === "error" && (
            <div className="text-destructive bg-destructive/5 border-destructive/20 rounded-md border p-3 text-xs">
              {state.message}
            </div>
          )}
          {/* Mostrar éxito del servidor */}
          {state.status === "success" && (
            <div className="text-success bg-success/5 border-success/20 rounded-md border p-3 text-xs">
              {state.message}
            </div>
          )}

          {/* Botón de envío del formulario */}
          <Button
            type="submit"
            variant="default"
            className="mt-2 h-11 w-full"
            disabled={isPending} // Usamos isPending de useActionState
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creando cuenta...
              </>
            ) : (
              "Crear cuenta"
            )}
          </Button>
        </form>
      </Form>
      {/* Separador con texto en el medio */}
      <div className="relative my-8">
        <Separator className="my-4" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="bg-card text-muted-foreground dark:bg-card px-3 text-xs uppercase">
            O registrarse con
          </span>
        </div>
      </div>
      {/* Botones de inicio de sesión con redes sociales */}
      <SocialAuthButtons />

      {/* Enlace para ir al inicio de sesión si ya tiene cuenta */}
      <div className="text-muted-foreground mt-8 text-center text-sm">
        <Separator className="mb-6" />
        ¿Ya tienes una cuenta?{" "}
        <Button variant="link" asChild className="px-2">
          <Link
            href="/auth/login"
            className="text-primary font-medium underline shadow-none transition-colors"
          >
            Iniciar sesión
          </Link>
        </Button>
      </div>
    </div>
  );
}
