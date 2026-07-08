# BACKLOG — Agence IA (Scrum)

> Priorité stratégique : **urgence sur le rendu UI final**. On fait le minimum de préalables indispensables, puis on enchaîne l'UI des pages, puis polish + déploiement. Priorisation MoSCoW : **M** = Must, **S** = Should, **C** = Could.

**Légende statut** : ☐ à faire · ◐ en cours · ☑ fait · ⛔ bloqué (dépendance externe)

---

## Sprint 0 — Fondations minimales (préalables urgents)
Objectif : socle technique + design tokens juste suffisants pour coder l'UI sans dette.

| ID | Tâche | Prio | Agent | Statut |
|----|-------|------|-------|--------|
| S0-1 | Lire `node_modules/next/dist/docs/` (App Router, conventions v16) et noter les deprecations dans LESSONS | M | orchestrator | ☑ |
| S0-2 | Config TypeScript strict + alias `@/*` vérifiés | M | orchestrator | ☑ |
| S0-3 | Tailwind v4 `@theme` : injecter tokens couleurs/typo/spacing/radius depuis DESIGN.md (palette **provisoire** en attendant le logo) | M | designer | ☑ |
| S0-4 | Police : intégrer Space Grotesk (substitut `sui`) via `next/font`, poids 300/400/500/700 | M | designer | ☑ |
| S0-5 | Theme provider dark/light (défaut dark, respect `prefers-color-scheme`, persistance, no-flash) | M | ux-engineer | ☑ |
| S0-6 | Layout racine : shell, `<html lang="fr">`, metadata de base, fond void, container 1400px | M | designer | ☑ |
| S0-7 | Wrapper motion : `LazyMotion`/reduced-motion global + presets d'easing/durées partagés | M | ux-engineer | ☑ |
| S0-8 | Structure de dossiers `src/components`, `src/lib`, `src/app/(routes)` | S | orchestrator | ☑ |

**Definition of Done Sprint 0** : ✅ `npm run build` + `lint` clean, dev server HTTP 200, thème dark/light + toggle fonctionnels, tokens/police/motion en place. Bonus : fix `turbopack.root` (lockfile parasite).

---

## Sprint 1 — Page d'accueil (le showstopper) 🔥
Objectif : première impression premium, prête à présenter.

| ID | Tâche | Prio | Agent | Statut |
|----|-------|------|-------|--------|
| S1-1 | Header nav : logo/wordmark, liens (Accueil/Agents/Contact), CTA pill, hamburger, transparent 72px | M | designer + ux-engineer | ☑ |
| S1-2 | Menu plein écran (overlay) avec animation d'ouverture premium + Escape/scroll-lock | S | ux-engineer | ☑ |
| S1-3 | Hero : display headline surdimensionné + sous-titre, copy positionnement « 1re agence IA autonome du Sénégal » | M | designer + copywriter | ☑ |
| S1-4 | Élément signature animé (orb obsidienne CSS/motion, lazy ; WebGL → S4) | M | designer + ux-engineer | ☑ |
| S1-5 | Section « aperçu agents » : liste des 10 agents renvoyant vers /agents | M | designer | ☑ |
| S1-6 | Section positionnement / pourquoi nous + chiffres (copy) | S | copywriter + designer | ☑ |
| S1-7 | CTA final + Footer (copyright/contact discret #graphite) | M | designer + copywriter | ☑ |
| S1-8 | Responsive complet (320→2560, 0px overflow vérifié puppeteer) | M | ux-engineer | ☑ |
| S1-9 | Passe anti-AI-slop sur l'accueil (copy FR spécifique, restraint visuel) | M | anti-ai-slop | ☑ |
| S1-+ | Bonus : routes /agents & /contact (stubs on-brand), 10e agent Ibou (Data/BI) | — | orchestrator | ☑ |

**DoD Sprint 1** : ✅ accueil complet + animé + responsive 320→2560 + dark/light + build/lint clean. Focus visuel manquant : mode light audité en S4 ; WebGL orb en S4.

---

## Sprint 2 — Page Agents (style limova + bulle scroll)
Objectif : présenter les 9 agents avec l'animation signature.

| ID | Tâche | Prio | Agent | Statut |
|----|-------|------|-------|--------|
| S2-1 | Données agents : structure `src/lib/agents.ts` (nom, rôle, capacité, avatar) — 10 agents | M | orchestrator + copywriter | ☑ |
| S2-2 | Copy par agent : rôle + résumé de capacité (10 agents), humanisé | M | copywriter | ☑ |
| S2-3 | Actes agents (sections transparentes, layout alterné, edge-to-edge) | M | designer | ☑ |
| S2-4 | **Bulle scroll** : l'avatar (bulle) se révèle d'abord, puis le résumé (stagger fluide) + barre de progression | M | ux-engineer + designer | ☑ |
| S2-5 | Avatars : placeholders élégants (bulle obsidienne + monogramme, écho de l'orb) — ⛔ vraies images à venir | M | designer | ◐ |
| S2-6 | Responsive (320→2560, 0px overflow vérifié) + reduced-motion (MotionConfig) | M | ux-engineer | ☑ |
| S2-7 | Passe anti-AI-slop | M | anti-ai-slop | ☑ |

**DoD Sprint 2** : ✅ les 10 agents en scroll « avatar puis description », responsive, build/lint clean. Reste : vraies images d'avatars (S2-5 ◐), audit mode light (S4).

---

## Sprint 3 — Page Contact
Objectif : convertir. Formulaire premium + copy orientée action.

| ID | Tâche | Prio | Agent | Statut |
|----|-------|------|-------|--------|
| S3-1 | Copy contact : accroche + réassurance + micro-copy champs/CTA | M | copywriter | ☑ |
| S3-2 | Formulaire hairline inputs (nom, email, entreprise, intérêt, message), focus/erreur | M | designer + ux-engineer | ☑ |
| S3-3 | Validation (server action) + accessibilité (labels, aria-invalid/describedby, clavier) + honeypot | M | ux-engineer | ☑ |
| S3-4 | Soumission : **server action** (validation OK) — ⛔ livraison réelle email/CRM à brancher (endpoint requis) | S | orchestrator | ◐ |
| S3-5 | États envoi/succès/erreur animés (useActionState) | S | ux-engineer | ☑ |
| S3-6 | Responsive (0px overflow) + anti-AI-slop | M | anti-ai-slop | ☑ |

**DoD Sprint 3** : ✅ contact premium, validé de bout en bout (erreur + succès testés), responsive. Reste : brancher l'envoi réel (email/CRM) quand endpoint fourni.

---

## Sprint 4 — Polish, cohérence & déploiement
Objectif : niveau studio primé, prêt à présenter/déployer.

| ID | Tâche | Prio | Agent | Statut |
|----|-------|------|-------|--------|
| S4-1 | Intégration **logo + palette définitive** (remplacer provisoire) | M | designer | ⛔ |
| S4-2 | Intégration **vrais avatars** | M | designer | ⛔ |
| S4-3 | Chorégraphie motion cohérente inter-pages (transitions de page) | S | ux-engineer | ☐ |
| S4-3b | Upgrade orb signature en WebGL (obsidienne liquide) — remplace la version CSS | C | designer + ux-engineer | ☐ |
| S4-4 | Parité light mode auditée sur toutes les pages | M | designer | ☐ |
| S4-4b | État scrollé du header (léger scrim/backdrop-blur pour lisibilité au scroll) | S | ux-engineer | ☐ |
| S4-5 | Accessibilité : audit AA, clavier, focus-visible, reduced-motion | M | ux-engineer | ☐ |
| S4-6 | Perf : Lighthouse, lazy visuels lourds, pas de CLS, images optimisées | M | ux-engineer | ☐ |
| S4-7 | SEO/metadata : OpenGraph, favicon, titres, `lang`, sitemap | S | orchestrator | ☐ |
| S4-8 | Passe anti-AI-slop globale finale | M | anti-ai-slop | ☐ |
| S4-9 | Déploiement Vercel + vérif prod | M | orchestrator | ☐ |

**DoD Sprint 4** : site en prod, slop-free, AA, performant, identité définitive.

---

## Backlog transverse (continu)
- Verrou anti-régression : maintenir `LESSONS.md` à chaque correction. (orchestrator)
- Cohérence design tokens : aucun magic number hors tokens. (designer)
- Contenu FR premium partout, zéro texte générique. (copywriter)

## Dépendances externes bloquantes
- ⛔ **Logo** → S0-3 (palette provisoire OK), S4-1
- ⛔ **Avatars** → S2-5, S4-2

## Ordre d'exécution recommandé
`Sprint 0 → Sprint 1 → Sprint 2 → Sprint 3 → Sprint 4`
Les tâches ⛔ (logo/avatars) sont contournées par des placeholders pour ne pas bloquer l'urgence UI.
