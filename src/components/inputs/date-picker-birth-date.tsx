"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePickerBirthDate() {
  // Estado para controlar si el popover está abierto o cerrado
  const [open, setOpen] = React.useState(false);

  // Estado para almacenar la fecha seleccionada
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  return (
    <div className="flex flex-col gap-3">
      {/* Componente Popover que muestra el calendario */}
      <Popover open={open} onOpenChange={setOpen}>
        {/* Botón que activa el popover */}
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-full justify-between font-normal"
          >
            {/* Muestra la fecha seleccionada o un texto predeterminado */}
            {date ? date.toLocaleDateString() : "Fecha de nacimiento"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>

        {/* Contenido del popover con el calendario */}
        <PopoverContent className="w-full overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date); // Actualiza la fecha seleccionada
              setOpen(false); // Cierra el popover al seleccionar
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
