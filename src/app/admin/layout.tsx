import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Backoffice",
  robots: { index: false, follow: false },
};

// Admin has no public chrome (no site header/footer/chat).
export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="min-h-dvh bg-background">{children}</div>;
}
