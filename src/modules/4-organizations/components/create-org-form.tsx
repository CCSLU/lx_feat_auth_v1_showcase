"use client";

// Importaciones para manejo de formularios y validación
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Importación del esquema de validación para organizaciones
import {
  basicOrgSchema,
  BasicOrgSchemaType,
} from "@/entities/2-orgs/schemas/org-zod-schemas";

// Componentes UI para formularios
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

// Hooks para manejar el estado de la acción del servidor
import { useActionState } from "react";
import { useTransition } from "react";
// Acción del servidor para crear organizaciones
import { createOrgAction } from "@/modules/4-organizations/actions/create/create-org-action";
// Componentes para radio buttons
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
// Iconos
import { Building2, User } from "lucide-react";

export default function CreateOrgForm() {
  // Inicialización del formulario con React Hook Form y validación Zod
  const form = useForm<BasicOrgSchemaType>({
    resolver: zodResolver(basicOrgSchema),
    defaultValues: {
      name: "",
      type: "empresa",
    },
  });

  // Hook para manejar el estado de la acción del servidor
  const [state, formActionTrigger] = useActionState(createOrgAction, {
    status: "idle",
    message: "",
  });

  // Hook para manejar transiciones de estado durante operaciones asíncronas
  const [isPending, startTransition] = useTransition();

  // Función que se ejecuta al enviar el formulario
  const onSubmit = async (data: BasicOrgSchemaType) => {
    startTransition(() => {
      formActionTrigger(data);
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Campo para el nombre de la organización */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Nombre de tu organización"
                    className="bg-background dark:bg-input/30 border-input focus-visible:ring-ring h-12 rounded-xl pr-4 pl-4 transition-all duration-300"
                    {...field}
                    disabled={isPending}
                  />
                </div>
              </FormControl>
              {/* Mensaje de error para este campo */}
              <FormMessage className="text-destructive text-sm" />
            </FormItem>
          )}
        />

        {/* Campo para el tipo de organización */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-foreground ml-1 inline-block font-medium">
                Tipo de organización
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid gap-4"
                  disabled={isPending}
                >
                  {/* Opción: Empresa */}
                  <FormItem className="flex items-center space-y-0 space-x-0">
                    <FormControl>
                      <RadioGroupItem
                        value="empresa"
                        id="empresa"
                        className="sr-only"
                      />
                    </FormControl>
                    <Label
                      htmlFor="empresa"
                      className={`flex w-full cursor-pointer items-center gap-4 rounded-xl border p-4 transition-all duration-300 ${
                        field.value === "empresa"
                          ? "border-primary/30 bg-primary/10 dark:bg-primary/20 shadow-sm"
                          : "border-input bg-background/80 hover:bg-accent/50 dark:bg-background/30"
                      }`}
                    >
                      <div
                        className={`rounded-full p-2 ${
                          field.value === "empresa"
                            ? "bg-primary/20 text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <Building2 size={20} />
                      </div>
                      <div>
                        <p className="text-foreground font-medium">Empresa</p>
                        <p className="text-muted-foreground text-sm">
                          Para negocios y equipos
                        </p>
                      </div>
                    </Label>
                  </FormItem>

                  {/* Opción: Personal */}
                  <FormItem className="flex items-center space-y-0 space-x-0">
                    <FormControl>
                      <RadioGroupItem
                        value="personal"
                        id="personal"
                        className="sr-only"
                      />
                    </FormControl>
                    <Label
                      htmlFor="personal"
                      className={`flex w-full cursor-pointer items-center gap-4 rounded-xl border p-4 transition-all duration-300 ${
                        field.value === "personal"
                          ? "border-primary/30 bg-primary/10 dark:bg-primary/20 shadow-sm"
                          : "border-input bg-background/80 hover:bg-accent/50 dark:bg-background/30"
                      }`}
                    >
                      <div
                        className={`rounded-full p-2 ${
                          field.value === "personal"
                            ? "bg-primary/20 text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <User size={20} />
                      </div>
                      <div>
                        <p className="text-foreground font-medium">Personal</p>
                        <p className="text-muted-foreground text-sm">
                          Para uso individual
                        </p>
                      </div>
                    </Label>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              {/* Mensaje de error para este campo */}
              <FormMessage className="text-destructive text-sm" />
            </FormItem>
          )}
        />

        {/* Botón de envío del formulario */}
        <Button
          type="submit"
          className="bg-primary text-primary-foreground hover:bg-primary/90 w-full"
          disabled={isPending}
        >
          {/* Mostrar indicador de carga cuando está pendiente */}
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creando...
            </>
          ) : (
            "Crear organización"
          )}
        </Button>

        {/* Mostrar errores del servidor */}
        {state.status === "error" && (
          <div className="border-destructive/20 bg-destructive/5 text-destructive rounded-md border p-3 text-xs">
            {state.message}
          </div>
        )}
        {/* Mostrar éxito del servidor */}
        {state.status === "success" && (
          <div className="border-success/20 bg-success/5 text-success rounded-md border p-3 text-xs">
            {state.message}
          </div>
        )}
      </form>
    </Form>
  );
}
