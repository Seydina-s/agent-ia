// Service lines — how the agents package into concrete offers for companies.
export type Service = {
  id: string;
  title: string;
  promise: string;
  outcomes: string[];
  agentIds: string[];
};

export const services: Service[] = [
  {
    id: "relation-client",
    title: "Relation client 24/7",
    promise:
      "Chaque appel, message et demande reçoit une réponse — à toute heure, sur tous vos canaux.",
    outcomes: [
      "Appels, WhatsApp et site web pris en charge en continu",
      "Qualification et orientation automatiques des demandes",
      "Zéro client laissé sans réponse",
    ],
    agentIds: ["abdoulaye", "aicha"],
  },
  {
    id: "marketing-contenu",
    title: "Marketing & contenu",
    promise:
      "Votre marque publie chaque jour et remonte sur Google, sans y passer vos soirées.",
    outcomes: [
      "Posts LinkedIn, Instagram, Facebook planifiés et rédigés",
      "Articles SEO optimisés et publiés sur votre site",
      "Veille concurrentielle continue",
    ],
    agentIds: ["samba", "modou"],
  },
  {
    id: "vente-prospection",
    title: "Vente & prospection",
    promise: "Un pipeline qui se remplit pendant que vous concluez.",
    outcomes: [
      "Campagnes de démarchage à froid automatisées",
      "Prospection LinkedIn ciblée",
      "Leads qualifiés et priorisés",
    ],
    agentIds: ["cheikh"],
  },
  {
    id: "operations",
    title: "Opérations & assistance",
    promise: "Un bras droit qui orchestre vos journées et n'oublie rien.",
    outcomes: [
      "Agenda, emails et to-do gérés",
      "Connexion à vos outils (Notion, Slack…)",
      "Tâches répétitives automatisées",
    ],
    agentIds: ["ahmad"],
  },
  {
    id: "back-office",
    title: "Back-office",
    promise:
      "Finance, juridique et recrutement tenus au carré, sans la paperasse.",
    outcomes: [
      "Prévisionnels, budget et trésorerie suivis",
      "Documents juridiques et démarches administratives",
      "Fiches de poste, tri des candidatures, entretiens",
    ],
    agentIds: ["khady", "astou", "fatou"],
  },
  {
    id: "data-pilotage",
    title: "Data & pilotage",
    promise: "Vos données deviennent des décisions — et vous savez où agir.",
    outcomes: [
      "Tableaux de bord clairs et à jour",
      "Mesure de la performance de chaque agent",
      "Recommandations concrètes",
    ],
    agentIds: ["ibou"],
  },
];
