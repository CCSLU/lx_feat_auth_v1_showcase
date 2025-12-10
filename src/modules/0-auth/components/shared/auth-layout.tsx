import CardSlider from "./card-slider";
import ThemeToggle from "@/components/theme/theme-toggle-1";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  backLink?: {
    href: string;
    label: string;
  };
}

export function AuthLayout({
  children,
  title,
  subtitle,
  backLink,
}: AuthLayoutProps) {
  return (
    <main className="bg-background flex max-h-screen flex-grow flex-col px-0 lg:h-screen lg:items-center lg:justify-center lg:px-6">
      <div className="border-border flex h-screen max-h-screen w-full flex-col lg:mx-auto lg:h-fit lg:max-w-screen-xl lg:flex-row lg:overflow-hidden lg:rounded-lg lg:border lg:shadow-sm">
        {/* Panel izquierdo - Imagen y branding */}
        <CardSlider backLink={backLink} />

        {/* Panel derecho - Formulario */}
        <div className="bg-card flex h-full w-full flex-col justify-center p-4 lg:w-1/2 lg:p-8">
          <div className="mx-auto w-full max-w-md space-y-6">
            <div className="flex items-start justify-between">
              <header className="space-y-2">
                <h1 className="text-foreground text-2xl font-bold tracking-tight md:text-3xl">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-muted-foreground text-sm">{subtitle}</p>
                )}
              </header>
              <div className="shrink-0">
                <ThemeToggle />
              </div>
            </div>

            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
