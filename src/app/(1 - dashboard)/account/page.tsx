"use client";

// Importaciones de React y hooks
import { useRouter } from "next/navigation";

// Importaciones de componentes UI
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/theme/theme-toggle-1";
import { Separator } from "@/components/ui/separator";

// Importaciones de iconos
import { ArrowLeftIcon } from "lucide-react";

// Importaciones de componentes
import UserProfileOrgList from "@/modules/1-account/components/2-orgs-section/user-profile-org-list";
import UserProfile from "@/modules/1-account/components/1-personal-section/user-profile";
import UserProfileChangePassword from "@/modules/1-account/components/3-password-section/user-profile-change-password";
import UserProfileDeleteAccount from "@/modules/1-account/components/4-delete-account-section/user-profile-delete-account";

/**
 * Página de perfil de usuario que permite gestionar información personal,
 * organizaciones, seguridad y opciones de cuenta.
 * 
 * Esta página muestra diferentes secciones:
 * - Información personal y avatar
 * - Lista de organizaciones asociadas
 * - Cambio de contraseña
 * - Opciones para eliminar la cuenta
 */
export default function AccountPage() {
  // Hook para navegación entre páginas
  const router = useRouter();

  return (
    <div className="container mx-auto max-w-4xl space-y-8 px-4 py-6">
      {/* Cabecera con botón de regreso y selector de tema */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-9 w-9 p-0"
            onClick={() => router.back()}
            aria-label="Volver a la página anterior"
          >
            <ArrowLeftIcon size={18} />
            <span className="sr-only">Volver</span>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Mi Perfil</h1>
        </div>
        <ThemeToggle />
      </div>

      {/* Sección 1: Perfil principal con datos personales */}
      <UserProfile />

      <Separator className="my-4" />

      {/* Sección 2: Listado de organizaciones del usuario */}
      <UserProfileOrgList />

      <Separator className="my-4" />

      {/* Sección 3: Opciones de seguridad y cambio de contraseña */}
      <UserProfileChangePassword />

      <Separator className="my-4" />

      {/* Sección 4: Opciones para eliminar cuenta (zona de peligro) */}
      <UserProfileDeleteAccount />
    </div>
  );
}
