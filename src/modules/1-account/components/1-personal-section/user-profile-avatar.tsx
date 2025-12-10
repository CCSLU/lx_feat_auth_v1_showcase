import { useState } from "react";
// Componentes de UI
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Componentes de entidades
import { CurrentUserAvatar } from "@/entities/1-user/components/current-user-avatar";

// Iconos
import { Upload } from "lucide-react";

// Componentes
import UserProfileAvatarUploadDialog from "@/modules/1-account/components/1-personal-section/user-profile-avatar-upload-dialog";

export default function UserProfileAvatar({ editing }: { editing: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      {/* Avatar con anillo decorativo */}
      <div className="ring-secondary h-20 w-20 overflow-hidden rounded-full ring-4">
        <CurrentUserAvatar className="h-full w-full" fallbackFontSize="2rem" />
      </div>

      {/* Botón y diálogo de carga (solo en modo edición) */}
      {editing && (
        <Dialog open={open} onOpenChange={setOpen}>
          {/* Botón de carga flotante */}
          <DialogTrigger className="h-8 w-8" asChild>
            <Button
              className="dark:bg-primary/80 dark:text-primary-foreground dark:hover:bg-primary absolute right-0 bottom-0 rounded-full shadow-sm"
              size="icon"
              variant="default"
            >
              <Upload size={16} />
            </Button>
          </DialogTrigger>

          {/* Diálogo de gestión de imagen */}
          <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-xl p-0 overflow-hidden">
            <DialogHeader className="p-6 border-b">
              <DialogTitle className="text-xl font-bold">
                Imagen de perfil
              </DialogTitle>
              <DialogDescription className="text-muted-foreground mt-2 flex items-center justify-between flex-wrap gap-2">
                <span>Sube una nueva imagen para personalizar tu perfil</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:bg-destructive/10 text-xs font-medium"
                >
                  Eliminar imagen actual
                </Button>
              </DialogDescription>
            </DialogHeader>

            <div className="p-6">
              {/* Componente de carga */}
              <UserProfileAvatarUploadDialog onClose={() => setOpen(false)} />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
