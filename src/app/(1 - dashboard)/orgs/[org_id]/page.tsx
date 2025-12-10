import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

export default function OrgPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Componentes con Temas de Color</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Botones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button variant="default">Default</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Badges</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inputs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Input por defecto" />
            <Input placeholder="Input desactivado" disabled />
            <div className="flex gap-2">
              <Input placeholder="Con botón" />
              <Button>Enviar</Button>
            </div>
            <Input placeholder="Con error" className="border-destructive" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Colores de Texto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-primary">Texto Primary</p>
            <p className="text-secondary">Texto Secondary</p>
            <p className="text-accent">Texto Accent</p>
            <p className="text-muted-foreground">Texto Muted</p>
            <p className="text-destructive">Texto Destructive</p>
            <p className="text-success">Texto Success</p>
            <p className="text-warning">Texto Warning</p>
            <p className="text-info">Texto Info</p>
          </CardContent>
        </Card>
      </div>
      
      <Separator />
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Colores del Sistema</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-primary text-primary-foreground rounded-md">Primary</div>
          <div className="p-4 bg-secondary text-secondary-foreground rounded-md">Secondary</div>
          <div className="p-4 bg-accent text-accent-foreground rounded-md">Accent</div>
          <div className="p-4 bg-muted text-muted-foreground rounded-md">Muted</div>
          <div className="p-4 bg-destructive text-destructive-foreground rounded-md">Destructive</div>
          <div className="p-4 bg-success text-success-foreground rounded-md">Success</div>
          <div className="p-4 bg-warning text-warning-foreground rounded-md">Warning</div>
          <div className="p-4 bg-info text-info-foreground rounded-md">Info</div>
        </div>
      </div>
    </div>
  );
}
