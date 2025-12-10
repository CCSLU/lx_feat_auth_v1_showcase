import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import CreateOrgForm from "@/modules/4-organizations/components/create-org-form";

export default function OnboardingOrgPage() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <Card className="border-border dark:bg-card w-full max-w-md shadow-sm">
        <CardHeader className="space-y-2">
          <CardTitle className="text-foreground text-center text-2xl font-bold">
            Bienvenido
          </CardTitle>
          <CardDescription className="text-muted-foreground text-center">
            Para comenzar, vamos a crear tu organización.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Create org form */}
          <CreateOrgForm />
        </CardContent>
      </Card>
    </div>
  );
}
