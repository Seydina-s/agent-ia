import type { Metadata } from "next";
import { getSession } from "@/lib/auth/session";
import { AdminShell } from "@/components/admin/admin-shell";

export const metadata: Metadata = {
  title: "Backoffice",
  robots: { index: false, follow: false },
};

// Authenticated admin pages get the full shell (sidebar + topbar). The login
// page (no session) renders bare.
export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getSession();
  if (!session) return <div className="min-h-dvh bg-background">{children}</div>;
  return <AdminShell session={session}>{children}</AdminShell>;
}
