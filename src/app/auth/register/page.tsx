import { RegisterForm } from "@/modules/0-auth/components/register-form";
import { AuthLayout } from "@/modules/0-auth/components/shared/auth-layout";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Crear cuenta"
      subtitle="Comienza a gestionar tus accesos"
      backLink={{
        href: "https://elox.com",
        label: "Ir al sitio web",
      }}
    >
      <RegisterForm />
    </AuthLayout>
  );
}
