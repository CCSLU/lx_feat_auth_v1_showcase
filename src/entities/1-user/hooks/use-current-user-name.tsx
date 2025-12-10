import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export const useCurrentUserName = () => {
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    const fetchProfileName = async () => {
      const { data, error } = await createClient().auth.getSession();
      
      if (error) {
        console.error(error);
        return;
      }

      const metadata = data.session?.user.user_metadata || {};
      const firstName = metadata.firstName || '';
      const lastName = metadata.lastName || '';
      
      // Prepare full name and capitalize each word
      const name = [firstName, lastName]
        .filter(Boolean)
        .join(' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
      
      setFullName(name || 'User');
    };

    fetchProfileName();
  }, []);

  return fullName;
};