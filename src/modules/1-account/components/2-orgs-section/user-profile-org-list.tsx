// Importaciones de librerías externas
import { useRouter } from "next/navigation";
import Link from "next/link";

// Importaciones de iconos
import { ArrowRight, Plus, PyramidIcon } from "lucide-react";

// Importaciones de componentes UI
import { Button } from "@/components/ui/button";

// Importaciones de constantes
import { orgMockData } from "@/modules/1-account/consts/org-mock-data";

export default function UserProfileOrgList() {
  const router = useRouter();
  const hasOrgs = orgMockData.length > 0;
  const visibleOrgs = orgMockData.slice(0, 6);
  const hasMoreOrgs = orgMockData.length > 6;

  const handleCreateOrg = () => router.push("/onboarding/create-org");
  const handleViewAllOrgs = () => router.push("/orgs");

  return (
    <div className="space-y-6">
      {/* Cabecera con título y acciones */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <PyramidIcon size={18} className="text-primary" />
          <h2 className="text-lg font-medium">Mis Organizaciones</h2>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="flex items-center gap-1.5"
          onClick={handleCreateOrg}
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Nueva</span>
        </Button>
      </div>

      {/* Contenido */}
      {hasOrgs ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {visibleOrgs.map((org) => (
              <Link
                key={org.id}
                href={`/orgs/${org.id}/dashboard`}
                className="bg-card group relative flex items-center justify-between overflow-hidden rounded-lg border p-4 transition-all duration-200"
              >
                <div className="relative z-10 flex items-center gap-3">
                  <div className="bg-primary/10 text-primary group-hover:bg-primary flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200 group-hover:text-white">
                    <PyramidIcon size={18} />
                  </div>
                  <h3 className="group-hover:text-primary font-medium transition-colors duration-200">
                    {org.name}
                  </h3>
                </div>
                <ArrowRight className="text-primary relative z-10 h-4 w-4 translate-x-2 transform opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                <div className="bg-primary/5 absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"></div>
                <div className="bg-primary absolute right-0 bottom-0 left-0 h-0.5 origin-left scale-x-0 transform transition-transform duration-200 group-hover:scale-x-100"></div>
              </Link>
            ))}
          </div>

          {hasMoreOrgs && (
            <div className="flex justify-center">
              <Button
                size="sm"
                variant="ghost"
                className="hover:text-primary flex items-center gap-1.5 transition-colors duration-200"
                onClick={handleViewAllOrgs}
              >
                <span>Ver todas</span>
                <ArrowRight className="h-3.5 w-3.5 transform transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-card flex flex-col items-center justify-center rounded-lg border p-6 text-center">
          <PyramidIcon size={24} className="text-primary mb-3" />
          <h3 className="font-medium">Sin organizaciones</h3>
          <p className="text-muted-foreground mb-4 text-sm">
            No gestionas ninguna organización todavía
          </p>
          <Button size="sm" onClick={handleCreateOrg}>
            Crear organización
          </Button>
        </div>
      )}
    </div>
  );
}
