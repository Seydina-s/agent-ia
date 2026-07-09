import Link from "next/link";
import { ResetForm } from "@/components/admin/reset-form";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export const dynamic = "force-dynamic";

export default async function ResetPage(
  props: PageProps<"/admin/reset">
) {
  const { token } = await props.searchParams;
  const t = typeof token === "string" ? token : "";

  return (
    <main className="relative grid min-h-dvh place-items-center px-5 py-16">
      <div className="absolute right-5 top-5">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-sm">
        <p className="eyebrow">Agent AI · Backoffice</p>
        <h1 className="heading mt-4">Nouveau mot de passe</h1>

        {t ? (
          <div className="mt-10">
            <ResetForm token={t} />
          </div>
        ) : (
          <div className="mt-6 flex flex-col gap-4">
            <p className="text-body-sm text-danger">
              Lien invalide ou incomplet.
            </p>
            <Link
              href="/admin/forgot"
              className="text-body-sm text-accent-ink underline-offset-4 hover:underline"
            >
              Refaire une demande
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
