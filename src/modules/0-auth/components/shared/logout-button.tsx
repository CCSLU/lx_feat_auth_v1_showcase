"use client";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/modules/0-auth/actions/logout-action";

export default function LogoutButton() {
  return <Button onClick={() => logoutAction()}>Cerrar sesión</Button>;
}
