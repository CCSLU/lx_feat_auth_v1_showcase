import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import CountdownRedirect from "@/modules/0-auth/components/shared/countdown-redirect";
import ThemeToggle from "@/components/theme/theme-toggle-1";
import { Separator } from "@/components/ui/separator";

export default function ConfirmationPage() {
  return (
    <div className="bg-background relative flex min-h-screen items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Theme toggle en la esquina superior derecha */}
      <div className="absolute top-4 right-4 md:top-6 md:right-6">
        <ThemeToggle />
      </div>

      <Card className="border-border bg-card/50 w-full max-w-md shadow-lg backdrop-blur-sm">
        <CardContent className="flex flex-col items-center px-6 pt-10 pb-8">
          {/* Icono de confirmación */}
          <div className="bg-background/50 mb-2 rounded-full p-4 shadow-inner">
            <CheckCircle className="mb-6 h-20 w-20 animate-pulse text-green-500" />
          </div>

          {/* Título y descripción */}
          <h1 className="text-foreground mb-2 text-center text-xl font-bold">
            Registro Exitoso
          </h1>
          <p className="text-muted-foreground bg-background/50 mx-auto mb-6 max-w-xs rounded-lg px-4 py-2 text-center text-base font-medium shadow-sm">
            Hemos enviado un enlace de confirmación a tu{" "}
            <span className="text-primary font-bold">correo electrónico</span>.{" "}
            Por favor verifica tu bandeja de entrada o la carpeta de{" "}
            <span className="font-bold text-yellow-500">Spam</span> para activar
            tu cuenta.
          </p>
          <Separator className="my-4" />

          {/* Botones de acción */}
          <CountdownRedirect
            showCountdown={true}
            redirectTimeoutSeconds={10}
            redirectPath="/auth/login"
            destinationName="Iniciar Sesión"
          />
          <div className="mt-2 flex w-full flex-col gap-3">
            <Button
              asChild
              variant="default"
              className="h-11 w-full rounded-lg transition-all hover:scale-[1.02]"
            >
              <Link href="/auth/login">Iniciar Sesión</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
