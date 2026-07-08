# LESSONS — Journal d'erreurs & verrous (anti-régression)

> Tenu par l'orchestrateur. Toute erreur corrigée est consignée ici avec une **règle de prévention**. Une erreur verrouillée ne doit plus jamais se reproduire. Le projet devient plus intelligent à chaque itération.

Format d'une entrée :
- **L-XXX — Titre** · date
  - **Symptôme** : ce qu'on a observé.
  - **Cause** : la vraie cause racine.
  - **Correctif** : ce qui a été fait.
  - **Règle de prévention (verrou)** : la règle à appliquer désormais.

---

## L-001 — Version Next.js réelle ≠ attendue · 2026-07-07
- **Symptôme** : brief initial demandait Next.js 15 ; le scaffold est en Next **16.2.10**.
- **Cause** : projet créé avec la dernière version de `create-next-app`.
- **Correctif** : on reste sur Next 16 (plus récent). Brief mis à jour.
- **Règle de prévention (verrou)** : **toujours** vérifier `node_modules/next/package.json` et **lire `node_modules/next/dist/docs/`** avant d'écrire du code Next. Cette version a des breaking changes vs. les connaissances par défaut — ne jamais coder « de mémoire ».

---

## L-002 — Next 16 App Router : conventions à respecter · 2026-07-07
- **Symptôme** : risque d'écrire du code « de mémoire » incompatible avec Next 16.
- **Cause** : breaking changes vs. training data.
- **Correctif** : docs `node_modules/next/dist/docs/01-app` lues (css, fonts, layouts, anti-flash).
- **Règle de prévention (verrou)** :
  - `params` **et** `searchParams` sont des **`Promise`** dans les Server Components → **toujours `await`**. Types via helpers globaux `PageProps<'/route'>` / `LayoutProps<'/route'>` (pas d'import).
  - CSS : Tailwind **v4** via `@import "tailwindcss"` + `@tailwindcss/postcss` (déjà en place). Pas de `tailwind.config.js` requis — tokens dans `@theme`.
  - Anti-flash thème : **script inline synchrone** dans `<head>` qui pose `data-theme` sur `<html>` **avant le premier paint**, + `suppressHydrationWarning` sur `<html>`. Ne jamais résoudre le thème via `useEffect` seul (flash garanti).
  - Fonts via `next/font/google` (self-host auto, zéro CLS). Police du projet : **Space Grotesk** (variable, poids 300–700).
  - Root layout **obligatoire** avec `<html>`/`<body>`.

---

## L-003 — motion `LazyMotion strict` impose `m.*` · 2026-07-07
- **Symptôme** : `<LazyMotion strict>` lève une erreur runtime si on utilise `motion.div`.
- **Cause** : en mode strict, seuls les composants légers `m.*` sont autorisés (c'est le but : bundle réduit).
- **Correctif** : provider global `MotionProvider` (LazyMotion + domAnimation + MotionConfig reducedMotion="user").
- **Règle de prévention (verrou)** : dans tout composant animé, importer **`m`** depuis `motion/react` et écrire `<m.div>` — **jamais** `motion.div`. `AnimatePresence`, `useReducedMotion`, `useScroll`, etc. restent importés depuis `motion/react`.

---

## L-004 — Vérifier le responsive avec puppeteer, pas les captures Chrome-CLI · 2026-07-07
- **Symptôme** : les captures via `chrome --headless --screenshot --window-size` montraient un faux débordement horizontal à 320px (texte coupé) alors qu'il n'y en avait pas.
- **Cause** : le rendu Chrome-CLI (timing de compilation / gestion du window-size) n'est pas fiable pour juger le layout.
- **Correctif** : audit via `puppeteer-core` (réutilise le Chrome installé) mesurant `documentElement.scrollWidth - viewport` → 0px confirmé de 320 à 2560. Script : `npm run audit:responsive`.
- **Règle de prévention (verrou)** : pour toute vérif responsive, utiliser `npm run audit:responsive` (mesure l'overflow réel + captures dans `.audit/`). Ne pas conclure à un bug de layout depuis une capture Chrome-CLI seule. Exigence projet : **0px d'overflow de 320px à 2560px**.

---

## L-005 — Effets premium (glass/glow/Spline) : dérogation assumée à DESIGN.md · 2026-07-08
- **Symptôme** : DESIGN.md interdit glassmorphisme, glows et ombres ; l'agent anti-ai-slop traque le « glass gratuit ».
- **Cause** : le client demande explicitement des boutons glacials (glassmorphisme), une lamp-nav lumineuse et un robot 3D interactif.
- **Correctif** : composants `GlassButton` (`.glass-button*`), `LampNav` (layoutId "lamp"), `HeroRobot` (Spline). Palette teal/cyan respectée.
- **Règle de prévention (verrou)** :
  - **La préférence explicite du client prime sur DESIGN.md.** Ces effets sont voulus — ne pas les « corriger » comme du slop.
  - `layoutId` (lamp) nécessite **`domMax`** dans `LazyMotion` (pas `domAnimation`). Toujours `m.*` (strict).
  - Le glass doit rester lisible et adapté **dark + light** (voir `[data-theme="light"] .glass-button`).
  - Robot hero = scène Spline **externe** (`hero-robot.tsx`), chargée client-side lazy ; scène swappable, voir `docs/ASSETS.md`. Desktop uniquement (curseur) ; orb en fallback mobile.

---

<!-- Ajouter les nouvelles leçons au-dessus de cette ligne, plus récente en haut. -->
