import LogoutButton from "@/modules/0-auth/components/shared/logout-button";
import validateUser from "@/lib/supabase/validate-user";

export default async function DashboardPage(
  props: {
    params: Promise<{ org_id: string }>;
  }
) {
  const params = await props.params;
  const user = await validateUser();
  const orgId = params.org_id;

  return (
    <>
      <p>Hello {user.email}</p>
      <p>Org ID: {orgId}</p>
      <LogoutButton />
    </>
  );
}
