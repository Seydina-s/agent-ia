"use client";

import { useActionState, useEffect, useRef } from "react";
import {
  addComment,
  type CommentState,
} from "@/app/(site)/blog/engagement-actions";
import { GlassButton } from "@/components/ui/glass-button";

const initial: CommentState = {};
const field =
  "w-full bg-transparent border-0 border-b border-hairline py-2.5 text-foreground-strong placeholder:text-muted focus:border-accent focus:outline-none transition-colors";

export function CommentForm({
  articleId,
  slug,
}: {
  articleId: string;
  slug: string;
}) {
  const [state, action, pending] = useActionState(addComment, initial);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} action={action} className="flex flex-col gap-4" noValidate>
      <input type="hidden" name="articleId" value={articleId} />
      <input type="hidden" name="slug" value={slug} />
      {/* honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <input
        name="author_name"
        required
        placeholder="Votre nom"
        aria-label="Votre nom"
        className={field}
      />
      <textarea
        name="body"
        required
        rows={3}
        placeholder="Votre commentaire…"
        aria-label="Votre commentaire"
        className={`${field} resize-none`}
      />

      {state.error && (
        <p className="text-body-sm text-danger" role="alert">
          {state.error}
        </p>
      )}
      {state.success && (
        <p className="text-body-sm text-accent-ink" role="status">
          Merci ! Votre commentaire est publié.
        </p>
      )}

      <div>
        <GlassButton type="submit" disabled={pending}>
          {pending ? "Envoi…" : "Publier"}
        </GlassButton>
      </div>
    </form>
  );
}
