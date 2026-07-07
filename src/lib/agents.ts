// The 10 autonomous agents. Limova's role catalogue, adapted to our names
// and voice, plus Ibou — the missing analytics layer that measures every
// other agent and turns company data into decisions.

export type Agent = {
  id: string;
  name: string;
  /** Short role title, e.g. "Relation client & téléphonie". */
  role: string;
  /** One-line domain tag for filtering / chips. */
  domain: string;
  /** Capability summary — first scroll reveals the avatar, second this. */
  summary: string;
  gender: "f" | "m";
};

export const agents: Agent[] = [
  {
    id: "abdoulaye",
    name: "Abdoulaye",
    role: "Relation client & téléphonie",
    domain: "Relation client",
    summary:
      "Il décroche à chaque appel, répond sur WhatsApp et sur votre site, 24h/24. Aucun client ne reste sans réponse.",
    gender: "m",
  },
  {
    id: "samba",
    name: "Samba",
    role: "Marketing & réseaux sociaux",
    domain: "Marketing",
    summary:
      "Il planifie, rédige et publie vos posts LinkedIn, Instagram et Facebook. Votre marque prend la parole chaque jour, même quand vous dormez.",
    gender: "m",
  },
  {
    id: "modou",
    name: "Modou",
    role: "SEO & contenu",
    domain: "Référencement",
    summary:
      "Il écrit des articles optimisés, les publie sur votre site et surveille vos concurrents. Google vous trouve — vos clients aussi.",
    gender: "m",
  },
  {
    id: "cheikh",
    name: "Cheikh",
    role: "Commercial & prospection",
    domain: "Vente",
    summary:
      "Il mène vos campagnes de démarchage, prospecte sur LinkedIn et qualifie vos leads. Votre pipeline se remplit pendant que vous vendez.",
    gender: "m",
  },
  {
    id: "ahmad",
    name: "Ahmad",
    role: "Assistant personnel & orchestration",
    domain: "Productivité",
    summary:
      "Il gère votre agenda, trie vos emails, tient vos to-do et parle à Notion et Slack. Le bras droit qui n'oublie rien.",
    gender: "m",
  },
  {
    id: "khady",
    name: "Khady",
    role: "Comptabilité & finance",
    domain: "Finance",
    summary:
      "Elle bâtit vos prévisionnels, suit votre budget et optimise votre trésorerie. Vos chiffres, toujours à jour, toujours clairs.",
    gender: "f",
  },
  {
    id: "astou",
    name: "Astou",
    role: "Juridique & administratif",
    domain: "Juridique",
    summary:
      "Elle vous accompagne sur vos démarches et rédige vos documents juridiques. La rigueur du droit, sans la paperasse.",
    gender: "f",
  },
  {
    id: "fatou",
    name: "Fatou",
    role: "Recrutement",
    domain: "RH",
    summary:
      "Elle rédige vos fiches de poste, trie les candidatures et orchestre vos entretiens. Les bons profils, plus vite.",
    gender: "f",
  },
  {
    id: "aicha",
    name: "Aïcha",
    role: "Service client multicanal",
    domain: "Support",
    summary:
      "Elle prend le relais sur tous vos canaux et garde chaque conversation vivante. Une expérience client sans couture, à toute heure.",
    gender: "f",
  },
  {
    id: "ibou",
    name: "Ibou",
    role: "Data & Business Intelligence",
    domain: "Data",
    summary:
      "Il transforme vos données en tableaux de bord et en décisions. Il mesure la performance de chaque agent et vous dit où agir.",
    gender: "m",
  },
];

export const agentCount = agents.length;
