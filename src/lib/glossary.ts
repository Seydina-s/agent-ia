// Plain-French definitions of the base terms users should know.
export type Term = { term: string; short: string; body: string };

export const glossary: Term[] = [
  {
    term: "Agent IA autonome",
    short: "Un collaborateur logiciel qui fait un métier tout seul.",
    body: "Un agent IA autonome exécute des tâches d'un métier (répondre, publier, vendre, analyser…) sans qu'on lui dicte chaque étape. Vous fixez l'objectif, il décide comment l'atteindre et agit — 24h/24.",
  },
  {
    term: "Automatisation",
    short: "Faire réaliser une tâche répétitive par une machine.",
    body: "L'automatisation confie à un logiciel les tâches manuelles et répétitives (relances, publications, saisies) pour vous libérer du temps et réduire les erreurs.",
  },
  {
    term: "LLM (grand modèle de langage)",
    short: "Le « cerveau » linguistique qui comprend et rédige du texte.",
    body: "Un LLM (Large Language Model) est un modèle entraîné sur d'immenses quantités de texte. Il comprend une demande formulée en langage naturel et produit une réponse rédigée. C'est ce qui permet à un agent de discuter, résumer ou écrire.",
  },
  {
    term: "Prompt",
    short: "L'instruction donnée à l'IA.",
    body: "Le prompt est la consigne (une question, une tâche, un contexte) envoyée à l'agent. Un bon prompt = une réponse précise. Nos agents sont livrés avec des prompts déjà optimisés pour leur métier.",
  },
  {
    term: "Workflow (flux de travail)",
    short: "L'enchaînement d'étapes d'une tâche.",
    body: "Un workflow décrit les étapes qu'un agent suit pour accomplir un objectif — par exemple : recevoir un message, le qualifier, répondre, puis notifier votre équipe.",
  },
  {
    term: "Intégration / API",
    short: "Le pont entre l'agent et vos outils.",
    body: "Une API est une porte d'entrée technique qui permet à deux logiciels de se parler. Grâce aux intégrations, nos agents se connectent à vos outils (WhatsApp, Notion, Slack, votre site) pour agir directement dedans.",
  },
  {
    term: "RAG (recherche augmentée)",
    short: "L'IA qui répond à partir de VOS documents.",
    body: "Le RAG (Retrieval-Augmented Generation) permet à un agent de puiser dans vos propres contenus (fiches produits, procédures, FAQ) avant de répondre — pour des réponses justes et spécifiques à votre entreprise.",
  },
  {
    term: "Multicanal",
    short: "Être présent partout où sont vos clients.",
    body: "Un agent multicanal gère plusieurs points de contact à la fois (téléphone, WhatsApp, site, réseaux) en gardant une conversation cohérente d'un canal à l'autre.",
  },
  {
    term: "Lead (prospect)",
    short: "Un contact potentiellement intéressé par votre offre.",
    body: "Un lead est une personne ou une entreprise susceptible de devenir cliente. Un agent commercial les détecte, les qualifie (chauds/froids) et les priorise pour votre équipe.",
  },
  {
    term: "SEO (référencement)",
    short: "Être trouvé sur Google.",
    body: "Le SEO (Search Engine Optimization) regroupe les techniques qui améliorent la visibilité de votre site sur les moteurs de recherche. Un agent SEO rédige et optimise du contenu pour vous faire remonter.",
  },
  {
    term: "Tableau de bord (dashboard)",
    short: "Vos chiffres clés, en un coup d'œil.",
    body: "Un tableau de bord réunit vos indicateurs importants (ventes, visites, performance des agents) au même endroit pour décider vite et bien.",
  },
  {
    term: "Human-in-the-loop",
    short: "L'humain garde la main quand ça compte.",
    body: "Certaines décisions sensibles passent par une validation humaine. Le « human-in-the-loop » garantit que vous restez aux commandes sur les points stratégiques, l'agent gérant le reste.",
  },
];
