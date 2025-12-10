"use server";
import "server-only";

import { createClient } from "@/lib/supabase/server";

export default async function getAllUserOrgs() {
  const supabase = await createClient();
  const { data, error } = await supabase.from();
}

// export default async function getAllUserOrgs() {
//    const supabase = await createClient();

//    const { data, error } = await supabase
//      .from("organizations")
//      .select("*")
//      .eq("user_id", );

//    if (error) {
//      console.error("Error fetching organizations:", error);
//      return [];
//    }

//    return data;
//  }
