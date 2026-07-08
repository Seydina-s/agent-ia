import { agents } from "./agents";

// Facts about the company — single source of truth for the chatbot and copy.
export const company = {
  name: "Agent AI",
  city: "Dakar, Sénégal",
  positioning:
    "la première agence au Sénégal à concevoir des agents IA autonomes à 100% pour les entreprises.",
  mission:
    "Nous concevons des agents IA autonomes sur mesure pour automatiser les besoins des entreprises — chaque agent maîtrise un métier et travaille seul, 24h/24.",
  email: "bonjour@agent-ai.sn",
  agentCount: agents.length,
};

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

type Faq = { keys: string[]; answer: string };

const faqs: Faq[] = [
  {
    keys: ["bonjour", "salut", "hello", "coucou", "bonsoir", "cava", "ca va"],
    answer: `Bonjour 👋 Je suis l'assistant d'${company.name}. Posez-moi une question sur nos agents, nos services ou l'entreprise.`,
  },
  {
    keys: ["qui", "entreprise", "agence", "vous etes", "presentation", "a propos"],
    answer: `${company.name} est ${company.positioning} ${company.mission}`,
  },
  {
    keys: ["autonome", "100", "automatis", "comment ca marche", "fonctionne"],
    answer:
      "Nos agents sont autonomes à 100% : ils exécutent leur métier seuls (répondre, vendre, publier, gérer…) sans supervision permanente. Vous fixez le cap, ils font le travail — jour et nuit.",
  },
  {
    keys: ["agent", "equipe", "combien", "liste", "metier"],
    answer: `Nous avons ${company.agentCount} agents, un par métier : ${agents
      .map((a) => a.name)
      .join(", ")}. Dites-moi un domaine (vente, marketing, SEO, support, finance…) et je vous oriente.`,
  },
  {
    keys: ["service", "offre", "proposez", "faites", "faire", "prestation"],
    answer:
      "Nous concevons et déployons des agents IA autonomes pour vos métiers : relation client, marketing, SEO, vente, support, finance, juridique, RH, data… Décrivez votre besoin et je vous dis quel agent s'en charge.",
  },
  {
    keys: ["prix", "tarif", "cout", "coute", "devis", "budget"],
    answer: `Les tarifs dépendent de vos besoins et des agents mobilisés. Le plus simple : écrivez-nous à ${company.email} ou via la page Contact, on revient vers vous sous 24h avec une proposition.`,
  },
  {
    keys: ["contact", "joindre", "email", "mail", "telephone", "rendez-vous", "parler a"],
    answer: `Écrivez-nous à ${company.email} ou passez par la page Contact — réponse sous 24h.`,
  },
  {
    keys: ["senegal", "dakar", "adresse", "localis", "bureau", "situe"],
    answer: `Nous sommes basés à ${company.city}, et nous accompagnons les entreprises à distance.`,
  },
];

// Rule-based answer. Swap this for a Claude API call later for generative replies.
export function answerQuestion(raw: string): string {
  const q = normalize(raw).trim();
  if (!q) return "Posez-moi une question sur nos agents ou l'entreprise 🙂";

  // Direct agent match by name.
  const agent = agents.find((a) => q.includes(normalize(a.name)));
  if (agent) {
    return `${agent.name} — ${agent.role}. ${agent.summary}`;
  }

  // Domain / role keyword match.
  const byDomain = agents.find(
    (a) => q.includes(normalize(a.domain)) || q.includes(normalize(a.role))
  );
  if (byDomain) {
    return `Pour « ${byDomain.domain} », c'est ${byDomain.name} : ${byDomain.summary}`;
  }

  // FAQ match (first with any keyword hit).
  for (const f of faqs) {
    if (f.keys.some((k) => q.includes(normalize(k)))) return f.answer;
  }

  return `Bonne question — je n'ai pas la réponse exacte ici. Écrivez-nous à ${company.email} ou via la page Contact, un humain vous répondra sous 24h. En attendant, je peux vous parler de nos ${company.agentCount} agents.`;
}
