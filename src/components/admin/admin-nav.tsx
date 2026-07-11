"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Inbox,
  Users,
  BarChart3,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard, exact: true },
  { href: "/admin/articles", label: "Articles", icon: FileText },
  { href: "/admin/comments", label: "Commentaires", icon: MessageSquare },
  { href: "/admin/messages", label: "Messages", icon: Inbox },
  { href: "/admin/subscribers", label: "Abonnés", icon: Mail },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/users", label: "Utilisateurs", icon: Users, superadmin: true },
];

export function AdminNav({ role }: { role: "superadmin" | "admin" }) {
  const pathname = usePathname();
  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <nav className="flex gap-1 overflow-x-auto p-2 lg:flex-col lg:overflow-visible lg:p-3">
      {items
        .filter((i) => !i.superadmin || role === "superadmin")
        .map((i) => {
          const Icon = i.icon;
          const active = isActive(i.href, i.exact);
          return (
            <Link
              key={i.href}
              href={i.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-body-sm transition-colors",
                active
                  ? "bg-surface text-foreground-strong"
                  : "text-foreground hover:bg-surface hover:text-foreground-strong"
              )}
            >
              <Icon size={18} className={active ? "text-accent-ink" : ""} />
              <span className="whitespace-nowrap">{i.label}</span>
            </Link>
          );
        })}
    </nav>
  );
}
