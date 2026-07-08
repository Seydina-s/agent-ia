import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "ghost" | "outline";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill font-medium uppercase tracking-wide transition-all duration-200 focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

const sizes: Record<Size, string> = {
  md: "h-11 px-6 text-body-sm",
  lg: "h-13 px-8 text-body-sm sm:text-[0.95rem]",
};

const variants: Record<Variant, string> = {
  // The single filled action — accent gradient, dark ink (DESIGN.md rule).
  primary: "accent-fill text-black hover:brightness-110 active:brightness-95",
  ghost:
    "text-foreground hover:text-foreground-strong underline-offset-4 hover:underline px-0",
  outline:
    "border border-hairline text-foreground-strong hover:border-accent hover:text-accent-ink",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof CommonProps> & {
    href?: undefined;
  };
type ButtonAsLink = CommonProps & { href: string; onClick?: () => void };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", size = "md", className, children, ...rest } =
    props;
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className ?? ""}`;

  if ("href" in props && props.href) {
    const { href, onClick } = props;
    return (
      <Link href={href} onClick={onClick} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} {...(rest as ComponentPropsWithoutRef<"button">)}>
      {children}
    </button>
  );
}
