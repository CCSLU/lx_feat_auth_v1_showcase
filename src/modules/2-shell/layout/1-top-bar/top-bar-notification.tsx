"use client";

import { useState } from "react";
import { BellIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Datos iniciales de notificaciones para mostrar
import { initialNotifications } from "@/modules/messages/consts/const-top-bar-notifications";

// Componente para mostrar un punto indicador de notificación no leída
function Dot({ className }: { className?: string }) {
  return (
    <svg
      width="6"
      height="6"
      fill="currentColor"
      viewBox="0 0 6 6"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="3" cy="3" r="3" />
    </svg>
  );
}

export default function Component() {
  // Estado para manejar las notificaciones
  const [notifications, setNotifications] = useState(initialNotifications);
  // Cálculo de cuántas notificaciones no leídas hay
  const unreadCount = notifications.filter((n) => n.unread).length;

  // Función para marcar todas las notificaciones como leídas
  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        unread: false,
      })),
    );
  };

  // Función para marcar una notificación específica como leída al hacer clic
  const handleNotificationClick = (id: number) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, unread: false }
          : notification,
      ),
    );
  };

  return (
    <Popover>
      {/* Botón de campana para abrir el menú de notificaciones */}
      <PopoverTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="hover:bg-accent hover:text-accent-foreground relative size-9 cursor-pointer border-none shadow-none"
          aria-label="Abrir notificaciones"
        >
          <BellIcon
            size={16}
            className="text-muted-foreground shrink-0"
            aria-hidden="true"
          />
          {/* Contador de notificaciones no leídas */}
          {unreadCount > 0 && (
            <Badge
              variant="default"
              className="absolute top-0 left-full flex size-4 -translate-x-1/2 items-center justify-center rounded-full p-0 text-[10px] font-bold"
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      {/* Contenido del popover que muestra las notificaciones */}
      <PopoverContent className="dark:shadow-black-lg w-80 p-1 shadow-md">
        {/* Encabezado con título y botón para marcar todo como leído */}
        <div className="flex items-baseline justify-between gap-4 px-3 py-2">
          <div className="text-sm font-semibold">Notificaciones</div>
          {unreadCount > 0 && (
            <button
              className="text-primary text-xs font-medium hover:underline"
              onClick={handleMarkAllAsRead}
            >
              Marcar todo como leído
            </button>
          )}
        </div>
        {/* Línea separadora */}
        <div
          role="separator"
          aria-orientation="horizontal"
          className="bg-border -mx-1 my-1 h-px"
        ></div>
        {/* Lista de notificaciones con scroll */}
        <div className="max-h-[300px] overflow-y-auto pr-1">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="hover:bg-accent rounded-md px-3 py-2 text-sm transition-colors"
            >
              <div className="relative flex items-start pe-3">
                <div className="flex-1 space-y-1">
                  {/* Botón para marcar la notificación individual como leída */}
                  <button
                    className="text-foreground/80 text-left after:absolute after:inset-0"
                    onClick={() => handleNotificationClick(notification.id)}
                  >
                    <span className="text-foreground font-medium hover:underline">
                      {notification.user}
                    </span>{" "}
                    {notification.action}{" "}
                    <span className="text-foreground font-medium hover:underline">
                      {notification.target}
                    </span>
                    .
                  </button>
                  {/* Tiempo transcurrido desde la notificación */}
                  <div className="text-muted-foreground text-xs">
                    {notification.timestamp}
                  </div>
                </div>
                {/* Indicador visual de notificación no leída */}
                {notification.unread && (
                  <div className="absolute end-0 self-center">
                    <span className="sr-only">No leído</span>
                    <Dot className="text-primary" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
