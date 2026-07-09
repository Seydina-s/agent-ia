"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { saveArticle, type SaveState } from "@/app/admin/articles/actions";
import type { Article } from "@/lib/articles-db";
import { GlassButton } from "@/components/ui/glass-button";

const initial: SaveState = {};
const field =
  "w-full bg-transparent border-0 border-b border-hairline py-2.5 text-foreground-strong placeholder:text-muted focus:border-accent focus:outline-none transition-colors";

export function ArticleEditor({ article }: { article?: Article }) {
  const [state, action, pending] = useActionState(saveArticle, initial);
  const [title, setTitle] = useState(article?.title ?? "");
  const [cover, setCover] = useState(article?.cover_image_url ?? "");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError("");
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Échec de l'envoi.");
      setCover(data.url);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Échec de l'envoi.");
    } finally {
      setUploading(false);
    }
  }

  const autoSlug = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return (
    <form action={action} className="flex flex-col gap-8" noValidate>
      {article && <input type="hidden" name="id" value={article.id} />}

      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="text-body-sm text-muted">
          Titre
        </label>
        <input
          id="title"
          name="title"
          required
          defaultValue={article?.title}
          onChange={(e) => setTitle(e.target.value)}
          className={`${field} text-heading-sm`}
        />
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="slug" className="text-body-sm text-muted">
            Slug (URL)
          </label>
          <input
            id="slug"
            name="slug"
            defaultValue={article?.slug}
            placeholder={autoSlug || "genere-depuis-le-titre"}
            className={field}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="tag" className="text-body-sm text-muted">
            Catégorie
          </label>
          <input
            id="tag"
            name="tag"
            defaultValue={article?.tag ?? "Article"}
            className={field}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="author" className="text-body-sm text-muted">
            Auteur
          </label>
          <input
            id="author"
            name="author"
            defaultValue={article?.author ?? "Agent AI"}
            className={field}
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-body-sm text-muted">Image de couverture</span>
          <div className="flex flex-wrap items-center gap-3">
            <label className="cursor-pointer rounded-pill border border-hairline px-4 py-2 text-body-sm text-foreground transition-colors hover:border-accent hover:text-foreground-strong">
              {uploading ? "Envoi…" : "Choisir une photo"}
              <input
                type="file"
                accept="image/*"
                onChange={onFile}
                disabled={uploading}
                className="hidden"
              />
            </label>
            {cover && (
              <button
                type="button"
                onClick={() => setCover("")}
                className="text-body-sm text-danger hover:underline"
              >
                Retirer
              </button>
            )}
          </div>
          {/* the value actually submitted */}
          <input type="hidden" name="cover_image_url" value={cover} />
          <input
            type="url"
            value={cover}
            onChange={(e) => setCover(e.target.value)}
            placeholder="…ou collez une URL d'image"
            className={`${field} mt-1`}
          />
          {uploadError && (
            <p className="text-caption text-danger">{uploadError}</p>
          )}
        </div>
      </div>

      {cover && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={cover}
          alt="Aperçu de la couverture"
          className="max-h-56 w-full rounded-lg border border-hairline object-cover"
        />
      )}

      <div className="flex flex-col gap-2">
        <label htmlFor="excerpt" className="text-body-sm text-muted">
          Accroche (résumé)
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          rows={2}
          defaultValue={article?.excerpt}
          className={`${field} resize-none`}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="body" className="text-body-sm text-muted">
          Contenu — séparez les paragraphes par une ligne vide
        </label>
        <textarea
          id="body"
          name="body"
          rows={16}
          required
          defaultValue={article?.body}
          className={`${field} resize-y leading-relaxed`}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="status" className="text-body-sm text-muted">
          Statut
        </label>
        <select
          id="status"
          name="status"
          defaultValue={article?.status ?? "draft"}
          className={`${field} appearance-none`}
        >
          <option value="draft" className="bg-background">
            Brouillon
          </option>
          <option value="published" className="bg-background">
            Publié
          </option>
        </select>
      </div>

      {state.error && (
        <p className="text-body-sm text-danger" role="alert">
          {state.error}
        </p>
      )}

      <div className="flex items-center gap-4 pt-2">
        <GlassButton size="lg" type="submit" disabled={pending}>
          {pending ? "Enregistrement…" : "Enregistrer"}
        </GlassButton>
        <Link
          href="/admin/articles"
          className="text-body-sm text-muted transition-colors hover:text-foreground-strong"
        >
          Annuler
        </Link>
      </div>
    </form>
  );
}
