import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export const useCurrentUserId = () => {
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const { data, error } = await createClient().auth.getSession();
      if (error) {
        console.error(error);
      }

      setId(data.session?.user.id ?? null);
    };
    fetchUserId();
  }, []);

  return id;
};
