import { getUserAction } from "@/modules/0-auth/actions/get-user-action";
import LogoutButton from "@/modules/0-auth/components/shared/logout-button";

export default async function Home() {
  const user = await getUserAction();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      {/* User information */}
      <div className="bg-card w-full max-w-3/4 rounded-lg border p-6 shadow-sm">
        <h2 className="mb-4 text-center text-xl font-semibold">
          Información del Usuario
        </h2>

        {user ? (
          <div className="rounded-md bg-slate-100 p-4 dark:bg-slate-800">
            <pre className="overflow-auto text-sm">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
        ) : (
          <p className="text-center text-amber-600">No hay usuario conectado</p>
        )}

        <div className="mt-6 flex justify-center">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
