# ASSETS — ce que tu dois fournir

Statut au 2026-07-08. Les placeholders actuels sont fonctionnels ; ces assets les remplacent pour atteindre la qualité finale.

## 1. Logo officiel (⛔ prioritaire)
Voir specs détaillées déjà données. Rappel minimal :
- `icon.svg` (carré), `logo-horizontal-light.svg`, `logo-horizontal-dark.svg`
- **Hex exacts** teal + cyan
- → branche le composant `<Logo>` + favicon.

## 2. Avatars des 10 agents (⛔ prioritaire pour /agents)
Actuellement : bulles obsidiennes + monogramme (placeholder cohérent).
- **Format** : PNG **transparent** ou WebP, **carré**, **1024×1024** (min 512×512).
- **Cadrage** : buste/portrait centré, marge ~10 %, fond transparent (ou fond sombre uniforme si transparent impossible).
- **Style** : cohérent entre les 10 (même éclairage/rendu). 3D façon robot, illustration, ou photo stylisée — au choix mais **homogène**.
- **Nommage** : `abdoulaye.png`, `samba.png`, `modou.png`, `cheikh.png`, `ahmad.png`, `khady.png`, `astou.png`, `fatou.png`, `aicha.png`, `ibou.png`.
- → remplacent le monogramme dans `AgentAvatar`, sans changer le layout.

## 3. Robot 3D du hero (Spline) — optionnel mais recommandé
Le hero utilise une **scène Spline publique de démonstration** (robot qui suit le curseur) :
`https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode` (voir `src/components/visual/hero-robot.tsx`).
- Si tu veux **notre propre robot** (aux couleurs de la marque, ou un avatar 3D custom) :
  - Crée/exporte une scène sur **spline.design** → **Export → “Code / React”** → tu obtiens une URL `.splinecode`.
  - Donne-moi cette URL, je remplace `ROBOT_SCENE`.
- Alternative si pas de Spline : une **vidéo boucle** (mp4/webm, ~1080p, fond transparent/sombre, 5–10 s) ou un **Lottie/Rive**. Dis-moi ce que tu préfères.

## 4. Illustrations / visuels de sections (optionnel)
Pour enrichir les sections (positionnement, agents), tu peux fournir :
- Photos/rendus (WebP, ≥ 2000px de large, orientation paysage) — fond sombre de préférence.
- Ou des **boucles vidéo** courtes muettes pour des arrière-plans premium.
Sinon on reste sur des visuels génératifs (orb, bulles, glows) — déjà cohérents.

## 5. Contenu factuel (pour le copywriter)
- Coordonnées réelles (email, téléphone/WhatsApp, adresse Dakar), liens réseaux sociaux.
- Éventuels logos clients / chiffres réels (nb de clients, projets) pour la preuve sociale.

---
**Priorité pour un rendu final rapide** : (1) logo + hex, (2) avatars des 10 agents, (3) coordonnées réelles. Le reste est du bonus.
