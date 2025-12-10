// Importaciones de React y hooks
"use client";
import { useState } from "react";

// Importaciones de componentes UI
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Importaciones de iconos
import { CheckIcon, ChevronDownIcon, ChevronUpIcon, PencilIcon, ShieldIcon } from "lucide-react";

/**
 * Componente para gestionar el cambio de contraseña del usuario
 * Muestra una sección de seguridad con un colapsable
 */
export default function UserProfileChangePassword() {
  // Estado para controlar el modo de edición de la sección de seguridad
  const [editing, setEditing] = useState(false);
  
  // Estado para controlar la apertura del colapsable
  const [isOpen, setIsOpen] = useState(false);

  // Función para alternar el estado de edición
  const toggleEdit = () => setEditing(!editing);

  return (
    <div className="space-y-4">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full rounded-lg border border-border bg-card"
      >
        <CollapsibleTrigger className="flex w-full items-center gap-2 p-4 hover:bg-accent/50 rounded-t-lg transition-colors">
          <ShieldIcon size={18} className="text-primary shrink-0" />
          <h2 className="text-foreground font-medium">Seguridad</h2>
          <div className="ml-auto">
            {isOpen ? <ChevronUpIcon size={16} /> : <ChevronDownIcon size={16} />}
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent className="px-4 pb-4 pt-2">
          {editing ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Contraseña actual</Label>
                <Input
                  id="current-password"
                  type="password"
                  placeholder="••••••••"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="new-password">Nueva contraseña</Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="••••••••"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmar contraseña</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  onClick={toggleEdit}
                  size="sm"
                  variant="outline"
                >
                  Cancelar
                </Button>
                <Button size="sm">
                  <CheckIcon size={14} className="mr-2" /> Actualizar
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-2">
              <div>
                <h3 className="text-foreground font-medium">Cambiar contraseña</h3>
                <p className="text-muted-foreground text-sm">
                  Actualiza tu contraseña para mantener tu cuenta segura
                </p>
              </div>
              <Button
                onClick={toggleEdit}
                variant="outline"
                size="sm"
                className="shrink-0"
              >
                <PencilIcon size={16} className="mr-2" />
                <span>Cambiar</span>
              </Button>
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
