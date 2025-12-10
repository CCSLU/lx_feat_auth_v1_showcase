import { LoginForm } from "@/modules/0-auth/components/login-form";
import { AuthLayout } from "@/modules/0-auth/components/shared/auth-layout";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Iniciar sesión"
      subtitle="Bienvenido de nuevo"
      backLink={{
        href: "https://elox.com",
        label: "Ir al sitio web",
      }}
    >
      <LoginForm />
    </AuthLayout>
  );
}
