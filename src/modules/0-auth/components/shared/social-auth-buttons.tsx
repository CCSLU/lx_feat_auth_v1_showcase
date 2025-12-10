import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { ImWindows } from "react-icons/im";
import { IconType } from "react-icons";

// Define las propiedades para los botones de autenticación social
type SocialButtonProps = {
  icon: IconType; // Icono del proveedor social
  label: string; // Texto a mostrar
  href: string; // URL de redirección
  iconColor?: string; // Color opcional del icono
  className?: string; // Clases CSS adicionales
};

// Componente para renderizar un botón individual de autenticación social
const SocialButton = ({
  icon: Icon,
  label,
  href,
  iconColor,
  className,
}: SocialButtonProps) => (
  <Button
    variant="outline"
    className={`h-11 -skew-x-6 gap-2 rounded-xl text-xs shadow-xs focus-visible:ring-1 ${className || ""}`}
    asChild
  >
    <Link href={href} className="flex items-center">
      {/* Renderiza el icono con el color opcional */}
      <Icon className={`text-lg md:text-xl ${iconColor || ""}`} />
      {/* Muestra el texto solo en pantallas medianas o más grandes */}
      <span className="ml-2 hidden md:inline">{label}</span>
    </Link>
  </Button>
);

// Componente principal que renderiza todos los botones de autenticación social
export default function SocialAuthButtons() {
  // Configuración de los botones sociales disponibles
  const socialButtons = [
    { icon: FcGoogle, label: "Google", href: "#" },
    { icon: FaApple, label: "Apple", href: "#" },
    {
      icon: ImWindows,
      label: "Microsoft",
      href: "#",
      iconColor: "text-[#00a4ef]", // Color azul específico de Microsoft
    },
  ];

  return (
    // Contenedor con grid de 3 columnas para los botones
    <div className="grid grid-cols-3 gap-3">
      {/* Mapea y renderiza cada botón social */}
      {socialButtons.map((button, index) => (
        <SocialButton key={index} {...button} />
      ))}
    </div>
  );
}
