// Importaciones de React y hooks
"use client";
import { useState } from "react";

// Importaciones de componentes UI
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

// Importaciones de iconos
import { AlertTriangleIcon, ChevronDownIcon, ChevronUpIcon, TrashIcon } from "lucide-react";

/**
 * Componente para gestionar la eliminación de cuenta de usuario
 * Muestra una sección de "zona de peligro" con un colapsable
 */
export default function UserProfileDeleteAccount() {
  // Estados para controlar la UI
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  // Manejador para el botón de eliminar
  const handleDeleteAccount = () => {
    if (confirmText !== "eliminar") return;
    
    setIsDeleting(true);
    // Aquí se implementaría la lógica de eliminación de cuenta
    setTimeout(() => {
      setIsDeleting(false);
      setShowConfirmDialog(false);
      setConfirmText("");
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full rounded-lg border border-border bg-card"
      >
        <CollapsibleTrigger className="flex w-full items-center gap-2 p-4 hover:bg-accent/50 rounded-t-lg transition-colors">
          <AlertTriangleIcon size={18} className="text-destructive shrink-0" />
          <h2 className="text-foreground font-medium">Zona de peligro</h2>
          <div className="ml-auto">
            {isOpen ? <ChevronUpIcon size={16} /> : <ChevronDownIcon size={16} />}
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent className="p-4">
          <div className="bg-destructive/10 rounded-md p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-1">
                <h3 className="font-medium text-foreground">Eliminar cuenta</h3>
                <p className="text-muted-foreground text-sm">
                  Esta acción es irreversible y eliminará todos tus datos
                </p>
              </div>
              
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setShowConfirmDialog(true)}
                className="self-start sm:self-center flex items-center gap-2"
              >
                <TrashIcon size={16} />
                <span>Eliminar cuenta</span>
              </Button>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangleIcon size={18} className="text-destructive" />
              Confirmar eliminación
            </DialogTitle>
            <DialogDescription>
              Esta acción no se puede deshacer. Se eliminarán permanentemente todos tus datos y configuraciones.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              Para continuar, escribe "eliminar" en el campo de texto a continuación.
            </p>
            <Input
              className="mt-2"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="Escribe 'eliminar'"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Cancelar
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteAccount}
              disabled={isDeleting || confirmText !== "eliminar"}
            >
              {isDeleting ? "Procesando..." : "Eliminar permanentemente"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
