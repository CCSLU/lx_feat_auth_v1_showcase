"use client";

// Importaciones de React y hooks
import { useState } from "react";

// Importaciones de componentes UI
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PhoneInput } from "@/components/inputs/phone-input";
import { DatePickerBirthDate } from "@/components/inputs/date-picker-birth-date";

// Importaciones de entidades y hooks
import { useCurrentUserName } from "@/entities/1-user/hooks/use-current-user-name";
import { useCurrentUserMail } from "@/entities/1-user/hooks/use-current-user-mail";

// Importaciones de componentes
import UserProfileAvatar from "@/modules/1-account/components/1-personal-section/user-profile-avatar";

import { CheckIcon, PencilIcon, XIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export default function UserProfile() {
  const name = useCurrentUserName();
  const email = useCurrentUserMail();
  const [editing, setEditing] = useState(false);
  const toggleEdit = () => setEditing((prev) => !prev);

  return (
    <div
      className={cn(
        "flex flex-col gap-6 rounded-xl p-6",
        editing ? "bg-accent/50" : "hover:bg-accent/50",
      )}
    >
      {/* Sección superior con avatar, nombre y badges */}
      <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
        {/* Avatar con popover explícito para edición de imagen */}
        <UserProfileAvatar editing={editing} />

        {/* Información del usuario */}
        <div className="text-center md:text-left">
          <h2 className="text-foreground text-xl font-bold">{name}</h2>
          <p className="text-muted-foreground">{email}</p>
          <div className="mt-2 flex flex-wrap justify-center gap-2 md:justify-start">
            <Badge variant="secondary">Plan Gratuito</Badge>
            <Badge variant="outline">Miembro desde 2023</Badge>
          </div>
        </div>

        {/* Botón de edición (visible en todas las resoluciones) */}
        {!editing && (
          <div className="mt-4 ml-auto w-full md:mt-0 md:w-auto">
            <Button
              onClick={toggleEdit}
              variant="outline"
              className="md:size-icon w-full md:h-8 md:w-auto"
              aria-label="Editar perfil"
            >
              <PencilIcon size={16} className="mr-2 md:mr-0" />
              <span className="md:hidden">Editar perfil</span>
            </Button>
          </div>
        )}
      </div>

      {/* Formulario de edición o vista de información */}
      {editing ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Campo de nombre */}

          <Input
            type="text"
            defaultValue={name.split(" ")[0]}
            placeholder="Nombre"
          />

          {/* Campo de apellido */}

          <Input
            type="text"
            defaultValue={name.split(" ")[1] || ""}
            placeholder="Apellido"
          />

          {/* Selector de fecha de nacimiento en lugar del campo de email */}

          <DatePickerBirthDate />

          {/* Campo de teléfono con componente personalizado */}

          <PhoneInput />

          <div className="mt-4 flex flex-1 justify-end gap-2 md:col-span-2">
            <Button onClick={toggleEdit} size="sm" variant="outline">
              <XIcon size={14} className="mr-1" /> Cancelar
            </Button>

            <Button size="sm">
              <CheckIcon size={14} className="mr-1" /> Guardar
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
