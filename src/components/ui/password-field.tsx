"use client";

import { useState, type InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

const base =
  "w-full bg-transparent border-0 border-b border-hairline py-3 pr-10 text-foreground-strong placeholder:text-muted focus:border-accent focus:outline-none transition-colors";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  inputClassName?: string;
};

// Password input with a show/hide (eye) toggle so users can verify what they
// typed before submitting or creating an account.
export function PasswordField({ inputClassName, ...props }: Props) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        {...props}
        type={show ? "text" : "password"}
        className={cn(base, inputClassName)}
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        aria-label={show ? "Masquer le mot de passe" : "Afficher le mot de passe"}
        aria-pressed={show}
        className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-muted transition-colors hover:text-foreground-strong"
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}
