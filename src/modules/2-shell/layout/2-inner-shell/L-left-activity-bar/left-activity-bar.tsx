import {
  LucideHome,
  LucideMessageSquare,
  KeyRound,
  MapPinHouse,
  LucideUsers,
  LucideNetwork,
  LucideStore,
  BookOpenIcon,
  LucideSettings,
  LucideWifi,
} from "lucide-react";
import Link from "next/link";

import LeftActBarMenuButton from "./left-act-bar-menu-button";

export default function LeftActivityBar() {
  return (
    <div className="flex h-full w-11 flex-col items-stretch justify-between pr-2">
      {/* Leading content - altura ajustada al contenido pero con espacio disponible */}
      <div className="flex flex-auto shrink-0 flex-col items-center gap-2">
        <div className="bg-border h-[1px] w-[24px] rounded-lg" />

        {/* Dashboard */}

        <LeftActBarMenuButton activePath="/" tooltip="Panel de Control">
          <Link href="#">
            <LucideHome size={16} />
          </Link>
        </LeftActBarMenuButton>

        {/* Access Points */}

        <LeftActBarMenuButton activePath="#" tooltip="Puntos de Acceso">
          <Link href="#">
            <KeyRound size={16} />
          </Link>
        </LeftActBarMenuButton>

        {/* Properties */}

        <LeftActBarMenuButton activePath="#" tooltip="Propiedades">
          <Link href="#">
            <MapPinHouse size={16} />
          </Link>
        </LeftActBarMenuButton>

        {/* Messages */}

        <LeftActBarMenuButton activePath="#" tooltip="Mensajes">
          <Link href="#">
            <LucideMessageSquare size={16} />
          </Link>
        </LeftActBarMenuButton>

        {/* Gateways */}

        <LeftActBarMenuButton activePath="#" tooltip="Puertas de Enlace">
          <Link href="#">
            <LucideWifi size={16} />
          </Link>
        </LeftActBarMenuButton>

        {/* User Roles */}

        <LeftActBarMenuButton activePath="#" tooltip="Roles de Usuario">
          <Link href="#">
            <LucideUsers size={16} />
          </Link>
        </LeftActBarMenuButton>

        {/* Integrations */}

        <LeftActBarMenuButton activePath="#" tooltip="Integraciones">
          <Link href="#">
            <LucideNetwork size={16} />
          </Link>
        </LeftActBarMenuButton>
      </div>

      {/* Main content - flexible para ocupar el espacio disponible */}
      <div className="flex flex-auto flex-col items-center gap-2">
        {/* Los elementos aquí ocuparán espacio según su contenido */}
      </div>

      {/* Trailing content - altura ajustada al contenido pero con espacio disponible */}
      <div className="flex flex-auto shrink-0 flex-col items-center justify-end gap-2">
        {/* E-commerce Store */}

        <LeftActBarMenuButton activePath="#" tooltip="Catálogo de Productos">
          <Link href="#">
            <LucideStore size={16} />
          </Link>
        </LeftActBarMenuButton>

        {/* Docs */}

        <LeftActBarMenuButton activePath="#" tooltip="Documentación">
          <Link href="#">
            <BookOpenIcon size={16} />
          </Link>
        </LeftActBarMenuButton>

        {/* Settings */}

        <LeftActBarMenuButton activePath="#" tooltip="Configuración">
          <Link href="/settings">
            <LucideSettings size={16} />
          </Link>
        </LeftActBarMenuButton>
      </div>
    </div>
  );
}
