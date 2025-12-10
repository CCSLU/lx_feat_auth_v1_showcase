"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function validateUser({
  redirectUrl = "/auth/login",
}: {
  redirectUrl?: string;
} = {}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect(redirectUrl);
  }

  return user;
}
