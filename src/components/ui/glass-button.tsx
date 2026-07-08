import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const glassButtonVariants = cva(
  "glass-button relative isolate inline-flex cursor-pointer items-center justify-center rounded-pill uppercase tracking-wide font-medium transition-all",
  {
    variants: {
      size: {
        default: "text-body-sm",
        sm: "text-caption",
        lg: "text-body-sm sm:text-[0.95rem]",
      },
    },
    defaultVariants: { size: "default" },
  }
);

const glassTextVariants = cva(
  "glass-button-text relative block select-none",
  {
    variants: {
      size: {
        default: "px-6 py-3",
        sm: "px-4 py-2",
        lg: "px-8 py-3.5",
      },
    },
    defaultVariants: { size: "default" },
  }
);

type Size = NonNullable<VariantProps<typeof glassButtonVariants>["size"]>;

type BaseProps = {
  size?: Size;
  className?: string;
  contentClassName?: string;
  children: React.ReactNode;
};

function Shell({
  size,
  className,
  contentClassName,
  children,
  inner,
}: BaseProps & { inner: (content: React.ReactNode) => React.ReactNode }) {
  const content = (
    <span className={cn(glassTextVariants({ size }), contentClassName)}>
      {children}
    </span>
  );
  return (
    <div className={cn("glass-button-wrap", className)}>
      {inner(content)}
      <div className="glass-button-shadow rounded-pill" />
    </div>
  );
}

export type GlassButtonProps = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

export type GlassLinkProps = BaseProps & { href: string; onClick?: () => void };

export function GlassButton(props: GlassButtonProps | GlassLinkProps) {
  const { size, className, contentClassName, children, ...rest } = props;

  if ("href" in props && props.href) {
    return (
      <Shell
        size={size}
        className={className}
        contentClassName={contentClassName}
        inner={(content) => (
          <Link
            href={props.href}
            onClick={props.onClick}
            className={cn(glassButtonVariants({ size }))}
          >
            {content}
          </Link>
        )}
      >
        {children}
      </Shell>
    );
  }

  return (
    <Shell
      size={size}
      className={className}
      contentClassName={contentClassName}
      inner={(content) => (
        <button
          className={cn(glassButtonVariants({ size }))}
          {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {content}
        </button>
      )}
    >
      {children}
    </Shell>
  );
}
