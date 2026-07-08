import { redirect } from "next/navigation";
import { hasAdmin } from "@/lib/auth/actions";
import { getSession } from "@/lib/auth/session";
import { AuthForm } from "@/components/admin/auth-form";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (await getSession()) redirect("/admin");
  const setup = !(await hasAdmin());

  return (
    <main className="grid min-h-dvh place-items-center px-5 py-16">
      <div className="w-full max-w-sm">
        <p className="eyebrow">Agent AI · Backoffice</p>
        <h1 className="heading mt-4">
          {setup ? "Créer l'administrateur" : "Connexion"}
        </h1>
        <p className="mt-3 text-body-sm text-muted">
          {setup
            ? "Aucun compte n'existe encore. Créez le compte administrateur."
            : "Accès réservé à l'équipe Agent AI."}
        </p>

        <div className="mt-10">
          <AuthForm setup={setup} />
        </div>
      </div>
    </main>
  );
}
