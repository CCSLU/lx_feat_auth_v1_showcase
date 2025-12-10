"use server";
import "server-only";
import { createClient } from "@/lib/supabase/server";
export async function createOrgDal({
  name,
  type,
  user_id,
}: {
  name: string;
  type: string;
  user_id: string;
}) {
  const supabase = await createClient();
  return supabase
    .from("organizations")
    .insert({ name, type, user_id })
    .select()
    .single();
}
