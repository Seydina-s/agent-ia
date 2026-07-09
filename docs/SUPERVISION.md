# SUPERVISION — Contrôle qualité continu (orchestrateur)

> Une entrée par tâche/lot livré. L'orchestrateur vérifie la DoD, lance les contrôles (build, lint, console 0 err, responsive), fait la revue qualité, et consigne verdict + défauts + suivis. Objectif : amélioration continue, rien ne passe sans supervision.

Verdict : ✅ conforme · ⚠️ conforme avec réserves/suivis · ❌ à refaire

Format :
- **[date] — Tâche** · verdict
  - Contrôles : build / lint / console / responsive
  - Défauts relevés → suivi (ticket backlog / LESSONS)
  - Améliorations proposées

---

## [2026-07-08] — Lot « refonte responsive + newsletter + chatbot + statement » · ⚠️
- **Contexte** : retour client — titres trop grands, lacunes responsive sur certains mobiles ; ajouts newsletter (footer global), chatbot flottant, statement autonomie ; nouvelles pages (Services/Blog/Doc) planifiées.
- **Contrôles** : build ✅ · lint ✅ · console ✅ (0 err) · responsive ✅ (audit multi-appareils 280→2560).
- **Suivis ouverts** :
  - Pages **Services / Blog / Documentation** → planifiées **Sprint 5** (à construire).
  - **Chatbot v1** = base de connaissances locale (règles/FAQ) → brancher **Claude API** pour des réponses génératives (nécessite clé) — suivi Sprint 5.
  - **Newsletter & Contact** : livraison réelle (email/CRM) à brancher quand endpoint fourni.
  - **Mode light** : audit complet encore à faire (S4-4).
- **Amélioration** : mémoriser d'auditer aussi les **largeurs de vrais téléphones** (360/375/390/412/430), pas seulement 320/768 (voir LESSONS).

---

## [2026-07-08] — Sprint 5 : pages Services / Documentation / Blog · ✅
- **Contrôles** : build ✅ (3 articles SSG) · lint ✅ · console ✅ (0 err) · responsive ✅ (280→1440, 0px overflow sur /services, /documentation, /blog, /blog/[slug]).
- **Livré** : Services (6 lignes de service), Documentation (glossaire 12 termes), Blog (index + 3 articles seed + page article). Nav recâblée (lamp desktop 4 items, overlay mobile 6, footer). Breakpoint header md→lg.
- **Suivis** : contenu blog = seed (à remplacer par le CMS du backoffice) ; nav/footer à compléter quand backoffice prêt.

## [2026-07-08] — Sprint 6 (démarrage) : backoffice — DB + auth + sécurité · ✅
- **Provisionné** : Neon Postgres (projet `autumn-lake-66404521`, org Seydina) + schéma (admin_users, login_attempts, password_resets, articles, contact_messages, newsletter_subscribers, page_views).
- **Livré** : route group `(site)` (chrome public isolé de l'admin) ; client DB `sql` (requêtes **paramétrées** = anti-injection) ; en-têtes de sécurité (next.config) ; auth (jose session httpOnly, bcrypt, **rate-limit 3 essais → 60s**, first-run setup) ; middleware protégeant `/admin` ; `/admin/login` (setup/login) ; dashboard `/admin` avec métriques réelles ; formulaires contact + newsletter **branchés en base**.
- **Contrôles** : build ✅ · lint ✅ · middleware redirect ✅ · flux auth complet (setup→dashboard→logout→lockout→login) **testé sur branche éphémère** ✅ · DB round-trip formulaires ✅ (vérifié via SQL).
- **Suivis (Sprint 6 suite)** : mot de passe oublié/reset (⛔ nécessite email), CMS articles + upload images, analytics (logging page_views + dashboard), chatbot→Gemini (clé à régénérer). 2 lignes de test en base (1 message, 1 abonné) — à purger sur demande.

## [2026-07-08] — Lisibilité WCAG, doc accordéon, toggle admin, SEO, process supervision · ✅
- **Livré** : couleurs `muted` AA (dark #969696 ≈ 6.5:1, light #5c5c5c ≈ 6.7:1) + `accent-ink` adaptatif pour le texte d'accent (bright cyan sur noir, teal foncé AA sur blanc) ; documentation en **accordéon FAQ** (aria-expanded/controls, contenu dans le DOM → SEO) ; **toggle dark/light dans le backoffice** (login + dashboard) ; SEO (`sitemap.xml`, `robots.txt` bloquant /admin & /api, OpenGraph/Twitter, JSON-LD Organization) ; **process** : supervision régulière de **tous** les agents → Inbox du backlog, priorisée par l'orchestrateur.
- **Contrôles** : build ✅ · lint ✅ · console ✅ (JSON-LD sans erreur) · responsive ✅ (0px 280→1440) · accordéon ✅ · contraste muted ≈ 6.5:1 (AA).
- **Suivis** (Inbox backlog) : audit WCAG complet toutes pages, focus-visible custom, image OG (⛔ logo), reduced-motion re-check, audit light complet.

## [2026-07-08] — Sprint 6 : CMS articles + chatbot Gemini · ✅
- **CMS** : articles en base, éditables depuis `/admin/articles` (créer/éditer/publier/dépublier/supprimer), blog public sur DB, 3 articles seed migrés. Cycle complet testé (login→créer→publier→/blog) sur branche éphémère ; blog principal = 3 articles ; 0 erreur console ; build/lint clean.
- **Chatbot → Gemini** : `/api/chat` tente Gemini (gemini-2.0-flash) puis **repli automatique** sur le moteur de règles. Clé valide (auth OK) mais **quota gratuit actuellement dépassé (429)** → repli actif ; réponses de secours vérifiées et pertinentes.
- **Suivis** : quota Gemini à surveiller (per-minute vs daily) ; éditeur riche Tiptap + upload Cloudinary (améliorations) ; analytics (S6-8) ; reset password + emails (⛔ domaine/Resend).

## [2026-07-08] — Sprint 6 : Analytics maison · ✅
- **Livré** : tracking des vues 100% maison (`/api/track` + `PageViewTracker` dans le layout public), **sans cookies ni PII**, filtre bots, exclut `/admin` ; dashboard `/admin/analytics` (totaux, graphe 14j, top pages, appareils, sources) ; carte reliée au dashboard. Portable Hostinger VPS (aucune dépendance externe).
- **Contrôles** : build ✅ · lint ✅ · **tracking vérifié** (8 vues, 6 pages, device détecté en base) · page analytics **200** avec données réelles.
- **Suivis** : tracking des clics CTA (extension), reset password + emails (⛔ domaine/Resend), déploiement Hostinger.

## [2026-07-09] — Vrai back-office : shell, rôles, users, upload photo · ✅
- **Retour client** : back-office jugé trop limité (« juste une page »), pas d'endroit clair pour poster un article avec photo, besoin d'un super admin qui gère les comptes.
- **Livré** : shell admin (sidebar persistante + topbar rôle/thème/logout, responsive) ; **rôles** superadmin/admin + statut active/pending ; **gestion utilisateurs** `/admin/users` (superadmin) : créer / valider / suspendre / supprimer (garde-fous : pas d'auto-suppression, dernier superadmin protégé) ; **upload photo** local (`/api/admin/upload`) intégré à l'éditeur (choisir une photo → aperçu → publié → visible sur le blog) ; pages **Messages** + **Abonnés** (avec export CSV) ; dashboard repensé. Compte existant `piccolofall@gmail.com` promu **superadmin**. Migration `middleware`→`proxy` (Next 16).
- **Contrôles** : build ✅ · lint ✅ · shell + rôle superadmin ✅ · création admin ✅ · **upload photo E2E** ✅ (fichier servi + image sur l'article) · testé sur branche éphémère.
- **Suivis** : upload sur VPS Hostinger (FS accessible en écriture — OK ; sur Vercel il faudrait Cloudinary) ; éditeur riche Tiptap ; reset password + emails (⛔ domaine/Resend) ; se déconnecter/reconnecter pour rafraîchir le rôle en session.

## [2026-07-09] — Notifications email (Resend) + éditeur riche Tiptap · ✅
- **Email** : `src/lib/mail.ts` (Resend REST, no-op tant que non configuré) ; notifications **nouveau contact** + **nouvel abonné** câblées aux server actions (best-effort). S'active dès `RESEND_API_KEY`/`MAIL_FROM`/`MAIL_TO` renseignés (guide ASSETS). Build/lint/boot OK (chemin no-op).
- **Éditeur riche** : Tiptap (StarterKit + Link + Image + Placeholder), toolbar (gras, italique, H2/H3, listes, citation, lien, **image uploadée**). Contenu stocké en **HTML** ; rendu public via `.article-content` (avec **fallback paragraphes** pour les anciens articles en texte) + `sanitizeHtml`. `.npmrc` legacy-peer-deps (React 19). **E2E testé** : H2 + gras produits, publiés, rendus côté public.
- **Suivis** : reset password (⛔ email — code mail prêt), déploiement Hostinger (dépendances externes restantes).

<!-- Nouvelles entrées au-dessus de cette ligne. -->
