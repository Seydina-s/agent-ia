"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { MessageCircle, X, ArrowUp } from "lucide-react";
import { ease } from "@/lib/motion";

type Msg = { role: "user" | "bot"; text: string };

const GREETING: Msg = {
  role: "bot",
  text: "Bonjour 👋 Je suis l'assistant d'Agent AI. Une question sur nos agents, nos services ou l'entreprise ?",
};

const SUGGESTIONS = [
  "Que faites-vous ?",
  "Combien d'agents ?",
  "Vos tarifs ?",
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function send(text: string) {
    const q = text.trim();
    if (!q || loading) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text: q }]);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: q }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        { role: "bot", text: data.reply ?? "Désolé, une erreur est survenue." },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "bot", text: "Connexion impossible. Réessayez dans un instant." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Fermer le chat" : "Ouvrir le chat"}
        aria-expanded={open}
        className="glass-button fixed bottom-5 right-5 z-[60] flex size-14 items-center justify-center rounded-pill text-foreground-strong sm:bottom-6 sm:right-6"
      >
        <AnimatePresence mode="wait" initial={false}>
          <m.span
            key={open ? "x" : "chat"}
            initial={{ opacity: 0, rotate: -30, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 30, scale: 0.6 }}
            transition={{ duration: 0.18, ease: ease.soft }}
            className="relative z-10"
          >
            {open ? <X size={22} /> : <MessageCircle size={22} />}
          </m.span>
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            role="dialog"
            aria-label="Assistant Agent AI"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.24, ease: ease.soft }}
            className="fixed inset-x-3 bottom-24 z-[60] flex max-h-[70vh] flex-col overflow-hidden rounded-2xl border border-hairline bg-background/85 backdrop-blur-xl sm:inset-x-auto sm:right-6 sm:bottom-24 sm:w-[380px]"
          >
            <header className="flex items-center justify-between border-b border-hairline px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-pill bg-accent" />
                <span className="text-body-sm font-medium text-foreground-strong">
                  Assistant Agent AI
                </span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fermer"
                className="text-muted transition-colors hover:text-foreground-strong"
              >
                <X size={18} />
              </button>
            </header>

            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
              aria-live="polite"
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-body-sm leading-snug ${
                    msg.role === "user"
                      ? "ml-auto bg-accent/15 text-foreground-strong"
                      : "mr-auto border border-hairline text-foreground"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              {loading && (
                <div className="mr-auto flex gap-1 rounded-2xl border border-hairline px-3.5 py-3">
                  <Dot /> <Dot delay={0.15} /> <Dot delay={0.3} />
                </div>
              )}

              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="rounded-pill border border-hairline px-3 py-1.5 text-caption text-muted transition-colors hover:border-accent hover:text-foreground-strong"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-hairline p-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Écrivez votre question…"
                aria-label="Votre message"
                className="w-full bg-transparent px-2 py-2 text-body-sm text-foreground-strong placeholder:text-muted focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Envoyer"
                className="accent-fill grid size-9 shrink-0 place-items-center rounded-pill text-black transition-opacity disabled:opacity-40"
              >
                <ArrowUp size={18} />
              </button>
            </form>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Dot({ delay = 0 }: { delay?: number }) {
  return (
    <m.span
      className="size-1.5 rounded-pill bg-muted"
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 1, repeat: Infinity, delay }}
    />
  );
}
