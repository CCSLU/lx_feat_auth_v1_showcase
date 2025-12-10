import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export const useCurrentUserMail = () => {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserEmail = async () => {
      const { data, error } = await createClient().auth.getSession();
      
      if (error) {
        console.error(error);
        return;
      }

      setEmail(data.session?.user.email || null);
    };

    fetchUserEmail();
  }, []);

  return email;
};
