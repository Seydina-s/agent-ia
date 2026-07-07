# Project Brief — Agence IA (site vitrine)

## Vision
Site vitrine **haut de gamme** pour la **première agence au Sénégal** proposant des **agents IA autonomes**. Objectif : un rendu au niveau des meilleures UI actuelles (Aceternity UI, Refero, Instrument, Active Theory) — esthétique, premium, et surtout **ultra fluide**.

## Positionnement (message central)
> Première agence au Sénégal à mettre à disposition des agents IA autonomes.
Fierté locale + ambition internationale. Les agents sont incarnés, nommés, humanisés.

## Stack technique
| Élément | Choix | Note |
|---|---|---|
| Framework | **Next.js 16.2.10** (App Router) | ⚠️ Version « breaking changes » — lire `node_modules/next/dist/docs/` avant de coder |
| Langage | TypeScript | strict |
| Styling | Tailwind CSS **v4** (`@theme`) | tokens dérivés de DESIGN.md + logo |
| Animations | **motion** 12.42.2 (ex-framer-motion) | premium, 60fps, `prefers-reduced-motion` |
| Runtime | Node 20, React 19.2.4 | |
| Déploiement | Vercel (cible) | |

## Thème
- **Dark par défaut**, **light mode** en parité complète (toggle + respect `prefers-color-scheme`).

## Identité visuelle
- Base de style : `DESIGN.md` (« Obsidian monument ») **à adapter** — l'accent crimson est **remplacé par l'or/bronze du logo**.
- Typo : substitut de `sui` → **Space Grotesk** (géométrique), Inter en repli.
- Inspiration rendu : https://styles.refero.design/style/82d52a5f-b1bb-4a69-91a3-15a7eb8bbe99 — reproduire **en mieux**.

### Palette (dérivée de l'icône logo — teal profond + point cyan)
> Le mockup or était trompeur (foil). La **vraie** icône est vert sapin/teal + point turquoise. Valeurs **estimées** de l'icône, à confirmer avec le logo vectoriel officiel (hex exacts).

| Rôle | Token | Hex |
|---|---|---|
| Canvas | `--color-void` | `#000000` |
| Surface | `--color-obsidian` | `#0A0A0A` |
| Body | `--color-ash` | `#CCCCCC` |
| Display | `--color-frost` | `#FFFFFF` |
| Muted | `--color-graphite` | `#4C4C4C` |
| **Accent (signal)** | `--color-cyan-500` | `#24B7CC` |
| Accent highlight | `--color-cyan-400` | `#46CADD` |
| Accent deep | `--color-cyan-600` | `#1A8DA0` |
| Marque profonde | `--color-teal-700` | `#173C34` |
| Marque profonde+ | `--color-teal-800` | `#10322B` |

- **Signal unique = cyan** `#24B7CC` (remplace l'ancien or). Teal profond `#173C34` = tonalité de marque/profondeur.
- Dégradé `linear-gradient(135deg,#46CADD,#24B7CC,#173C34)` réservé **au logo/wordmark + CTA primaire uniquement** (classes `.accent-fill` / `.accent-text`). Accent plat ailleurs.
- Nom de marque : **Agent AI**.
- **Logo par mode** : prévoir une variante adaptée dark vs light (le teal profond disparaît sur fond noir → variante claire/cyan requise sur dark). À fournir.

## Pages
1. **Accueil** — hero signature, positionnement, aperçu agents, CTA contact.
2. **Agents** — style limova : les 9 agents avec bulle scroll (avatar → résumé de capacité).
3. **Contact** — formulaire premium (hairline inputs), copy orientée action.

## Les 10 agents (rôles Limova adaptés + Ibou)
Source de vérité : `src/lib/agents.ts`.

| Nom | Rôle | (Limova d'origine) |
|---|---|---|
| Abdoulaye | Relation client & téléphonie | Tom |
| Samba | Marketing & réseaux sociaux | John |
| Modou | SEO & contenu | Lou |
| Cheikh | Commercial & prospection | Elio |
| Ahmad | Assistant personnel & orchestration | Charly |
| Khady | Comptabilité & finance | Manue |
| Astou | Juridique & administratif | Julia |
| Fatou | Recrutement | Rony |
| Aïcha | Service client multicanal | Louison / Charly+ |
| **Ibou** | **Data & Business Intelligence** | *(nouveau — comble le manque)* |

> **Ibou** = le 10e agent, choisi pour combler le vrai trou de la base (et de Limova) : la **couche data/mesure**. Aucun autre agent ne transforme la donnée en décisions ni ne mesure la performance des agents. Il relie et pilote l'ensemble.
> Avatars (images) fournis ultérieurement — placeholders en attendant.

## Méthode de travail — BMAD + Scrum
- Agents BMAD : `orchestrator` (lead + routing + verrou erreurs), `designer`, `ux-engineer`, `copywriter`, `anti-ai-slop`. L'orchestrateur crée de nouveaux agents au besoin.
- Scrum : backlog priorisé → sprints (voir `BACKLOG.md`), du plus urgent au déploiement.
- **Priorité urgence : rendu UI final d'abord.** Minimum de préalables, pragmatisme, orienté résultat.
- **Verrou anti-régression** : toute erreur corrigée est consignée dans `LESSONS.md` et ne doit plus jamais se reproduire.

## Dépendances externes en attente (non bloquantes pour la structure)
- [ ] Logo (→ palette de couleurs définitive)
- [ ] 9 images d'avatars
