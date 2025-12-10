"use client";

import { useId, useState } from "react";
import { CheckIcon, ChevronDownIcon, PlusIcon } from "lucide-react";
import TooltipWrapper from "@/components/tooltip-warper";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Datos de ejemplo de organizaciones
const organizations = [
  {
    value: "marriott",
    label: "Marriott International",
  },
  {
    value: "hilton",
    label: "Hilton Hotels & Resorts",
  },
];

export default function TopBarSelectOrg() {
  // Genera un ID único para el campo de selección
  const id = useId();
  // Estado para controlar si el popover está abierto o cerrado
  const [open, setOpen] = useState<boolean>(false);
  // Estado para almacenar el valor seleccionado
  const [value, setValue] = useState<string>("marriott");

  return (
    <div className="*:not-first:mt-2">
      {/* Componente Popover que muestra las opciones */}
      <Popover open={open} onOpenChange={setOpen}>
        {/* Botón que activa el popover */}
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            className="hover:bg-background border-input flex h-full w-full cursor-pointer items-center justify-between gap-2 p-2 align-middle font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
          >
            {/* Muestra el nombre de la organización seleccionada o un texto por defecto */}
            <span className="text-muted-foreground hover:text-foreground flex h-full w-full overflow-hidden text-center align-middle text-sm leading-none font-semibold">
              {value
                ? organizations.find(
                    (organization) => organization.value === value,
                  )?.label
                : "Seleccionar organización"}
            </span>
            {/* Icono de flecha hacia abajo */}
            <ChevronDownIcon
              size={20}
              className="text-muted-foreground shrink-0"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        {/* Contenido del popover con las opciones */}
        <PopoverContent
          className="border-input dark:shadow-black-lg w-full min-w-[var(--radix-popper-anchor-width)] p-0 shadow-lg"
          align="start"
        >
          {/* Componente Command para selección */}
          <Command>
            <CommandList>
              {/* Mensaje cuando no se encuentran resultados */}
              <CommandEmpty>No se encontró ninguna organización.</CommandEmpty>
              {/* Grupo de comandos para las organizaciones */}
              <CommandGroup>
                {/* Mapea cada organización a un item seleccionable */}
                {organizations.map((organization) => (
                  <CommandItem
                    key={organization.value}
                    value={organization.value}
                    onSelect={(currentValue) => {
                      // Actualiza el valor seleccionado (o lo limpia si ya estaba seleccionado)
                      setValue(currentValue === value ? "" : currentValue);
                      // Cierra el popover después de seleccionar
                      setOpen(false);
                    }}
                    className="text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    {organization.label}
                    {/* Muestra un check si esta organización está seleccionada */}
                    {value === organization.value && (
                      <CheckIcon size={16} className="ml-auto" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
              {/* Separador visual */}
              <CommandSeparator />
              {/* Grupo con opción para crear nueva organización */}
              <CommandGroup>
                <Button
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground w-full cursor-pointer justify-start font-normal shadow-none"
                >
                  <PlusIcon
                    size={16}
                    className="-ms-2 opacity-60"
                    aria-hidden="true"
                  />
                  Nueva organización
                </Button>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
