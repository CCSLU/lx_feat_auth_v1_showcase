"use client";

// Iconos
import {
  BoltIcon,
  BookOpenIcon,
  ChevronDownIcon,
  Layers2Icon,
  LogOutIcon,
  UserPenIcon,
} from "lucide-react";

// Componentes UI
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

// Hooks y componentes de usuario
import { useCurrentUserName } from "@/entities/1-user/hooks/use-current-user-name";
import { useCurrentUserMail } from "@/entities/1-user/hooks/use-current-user-mail";
import { CurrentUserAvatar } from "@/entities/1-user/components/current-user-avatar";

// Acciones
import { logoutAction } from "@/modules/0-auth/actions/logout-action";


export default function TopBarUser() {
  const name = useCurrentUserName();
  const email = useCurrentUserMail();

  return (
    <DropdownMenu>
      {/* Trigger del dropdown - Botón con avatar de usuario */}
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-full p-0 shadow-none hover:bg-transparent"
        >
          <CurrentUserAvatar />
          <ChevronDownIcon
            size={16}
            className="text-muted-foreground"
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>

      {/* Contenido del menú desplegable */}
      <DropdownMenuContent className="dark:shadow-black-lg max-w-64 shadow-md">
        {/* Información del usuario - Nombre y correo */}
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground truncate text-sm font-medium">
            {name}
          </span>
          <span className="text-muted-foreground truncate text-xs font-normal">
            {email || "Email not found"}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Primer grupo de opciones */}
        {/* <DropdownMenuGroup>
          <DropdownMenuItem>
            <BoltIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>Option 1</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Layers2Icon size={16} className="opacity-60" aria-hidden="true" />
            <span>Option 2</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BookOpenIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>Sistema</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator /> */}

        {/* Segundo grupo de opciones */}
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/account">
              <UserPenIcon
                size={16}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>Mi Cuenta</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        {/* Opción de cierre de sesión */}
        <DropdownMenuItem onClick={logoutAction} variant="destructive">
          <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
          <span>Cerrar Sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
