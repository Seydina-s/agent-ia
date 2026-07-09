import Link from "next/link";
import { ForgotForm } from "@/components/admin/forgot-form";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export const dynamic = "force-dynamic";

export default function ForgotPage() {
  return (
    <main className="relative grid min-h-dvh place-items-center px-5 py-16">
      <div className="absolute right-5 top-5">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-sm">
        <p className="eyebrow">Agent AI · Backoffice</p>
        <h1 className="heading mt-4">Mot de passe oublié</h1>
        <p className="mt-3 text-body-sm text-muted">
          Entrez votre email : on vous envoie un lien pour choisir un nouveau mot
          de passe.
        </p>
        <div className="mt-10">
          <ForgotForm />
        </div>
        <p className="mt-8 text-body-sm text-muted">
          <Link href="/admin/login" className="hover:text-foreground-strong">
            ← Connexion
          </Link>
        </p>
      </div>
    </main>
  );
}
