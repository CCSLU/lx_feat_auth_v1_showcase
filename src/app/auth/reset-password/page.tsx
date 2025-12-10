import LogoutButton from "@/modules/0-auth/components/shared/logout-button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import ThemeToggle from "@/components/theme/theme-toggle-1";
import validateUser from "@/lib/supabase/validate-user";
import { ResetPasswordForm } from "@/modules/0-auth/components/reset-password-form";

export default async function ResetPasswordPage() {
  const user = await validateUser();

  return (
    <div className="bg-background relative flex min-h-screen w-full items-center justify-center p-4">
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md">
        <Card className="border-border bg-card shadow-lg backdrop-blur-sm">
          <CardHeader className="space-y-3 text-center">
            <CardTitle className="text-foreground text-2xl font-bold">
              Cambiar Contraseña
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Crea una nueva contraseña segura para tu cuenta:
            </CardDescription>
            <div className="dark:bg-background/50 bg-secondary  mx-auto mt-2 max-w-[90%] rounded-md px-3 py-2 font-mono text-sm font-medium tracking-wide ">
              <span className="text-muted-foreground font-semibold">{user?.email}</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <ResetPasswordForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
