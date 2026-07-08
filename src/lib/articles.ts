// Seed articles. Later these come from the /admin CMS (DB); the shape stays
// the same so pages don't change when we switch the source.
export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  author: string;
  readingMinutes: number;
  tag: string;
  body: string[]; // paragraphs
};

export const articles: Article[] = [
  {
    slug: "senegal-pret-pour-les-agents-ia-autonomes",
    title: "Pourquoi le Sénégal est prêt pour les agents IA autonomes",
    excerpt:
      "Connectivité en hausse, tissu de PME dynamique, jeunesse digitale : les conditions sont réunies pour une adoption rapide de l'IA au travail.",
    date: "2026-06-24",
    author: "L'équipe Agent AI",
    readingMinutes: 4,
    tag: "Vision",
    body: [
      "Longtemps, l'intelligence artificielle est restée une promesse lointaine pour les entreprises africaines. Ce temps est révolu. Au Sénégal, la connectivité progresse vite, une génération entière est née avec le smartphone, et des milliers de PME cherchent à faire plus avec moins.",
      "C'est exactement le terrain où les agents IA autonomes font la différence. Là où recruter coûte cher et prend du temps, un agent se déploie en quelques jours et travaille sans relâche — de la relation client à la comptabilité.",
      "Notre pari est simple : mettre entre les mains des entreprises sénégalaises des outils que seules les grandes structures pouvaient s'offrir hier. Pas une IA de laboratoire, mais des collaborateurs numériques qui exécutent, aujourd'hui.",
      "Le futur du travail ne remplace pas les équipes : il les libère des tâches répétitives pour les concentrer sur ce qui compte vraiment — la relation, la stratégie, la création.",
    ],
  },
  {
    slug: "5-taches-a-automatiser-des-aujourdhui",
    title: "5 tâches que vos agents peuvent automatiser dès aujourd'hui",
    excerpt:
      "Répondre aux clients, publier sur les réseaux, relancer les prospects… Voici où commencer pour un impact immédiat.",
    date: "2026-06-30",
    author: "L'équipe Agent AI",
    readingMinutes: 5,
    tag: "Pratique",
    body: [
      "Automatiser ne veut pas dire tout bouleverser d'un coup. Les meilleurs résultats viennent souvent des tâches simples, fréquentes et chronophages. En voici cinq à confier dès maintenant.",
      "1. Répondre aux demandes clients. Appels, WhatsApp, messages sur le site : un agent prend le relais 24h/24 et ne laisse personne sans réponse.",
      "2. Publier sur les réseaux sociaux. Un agent planifie, rédige et publie vos contenus — votre marque reste vivante même quand vous dormez.",
      "3. Relancer les prospects. Les leads froids se réchauffent avec des relances régulières et personnalisées, sans effort de votre part.",
      "4. Tenir vos chiffres à jour. Prévisionnels, budget, trésorerie : un agent garde vos finances lisibles en continu.",
      "5. Mesurer ce qui marche. Un agent data transforme vos chiffres en tableaux de bord clairs et vous dit où concentrer vos efforts.",
      "Commencez par une seule de ces tâches. Une fois la confiance installée, les autres suivent naturellement.",
    ],
  },
  {
    slug: "autonome-ne-veut-pas-dire-sans-controle",
    title: "« Autonome » ne veut pas dire « sans contrôle »",
    excerpt:
      "L'autonomie des agents rime avec transparence et garde-fous. On vous explique comment vous gardez la main.",
    date: "2026-07-03",
    author: "L'équipe Agent AI",
    readingMinutes: 3,
    tag: "Confiance",
    body: [
      "Confier une tâche à un agent autonome inquiète parfois : et si l'IA décidait à ma place, mal ? La réponse tient en un principe : autonomie encadrée.",
      "Vous définissez les objectifs et les limites. L'agent agit à l'intérieur de ce cadre et vous rend des comptes. Sur les décisions sensibles, un humain valide — c'est le principe du « human-in-the-loop ».",
      "Chaque action est traçable : vous voyez ce que l'agent a fait, quand, et pourquoi. La confiance ne se décrète pas, elle se construit sur la transparence.",
      "Un bon agent, c'est un collaborateur fiable : autonome sur l'exécution, aligné sur vos règles, et toujours redevable.",
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
