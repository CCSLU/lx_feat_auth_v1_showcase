import { ForgotPasswordForm } from "@/modules/0-auth/components/forgot-password-form";
import { AuthLayout } from "@/modules/0-auth/components/shared/auth-layout";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Recuperar contraseña"
      subtitle="Te enviaremos las instrucciones por email"
      backLink={{
        href: "/auth/login",
        label: "Volver al login",
      }}
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
