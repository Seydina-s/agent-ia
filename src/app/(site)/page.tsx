import { Hero } from "@/components/sections/hero";
import { AgentsPreview } from "@/components/sections/agents-preview";
import { Positioning } from "@/components/sections/positioning";
import { ClosingCta } from "@/components/sections/closing-cta";

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Agent AI",
  url: "https://agent-ai.sn",
  description:
    "La première agence au Sénégal à concevoir des agents IA autonomes à 100% pour automatiser les métiers des entreprises.",
  areaServed: "SN",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dakar",
    addressCountry: "SN",
  },
  email: "bonjour@agent-ai.sn",
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <Hero />
      <AgentsPreview />
      <Positioning />
      <ClosingCta />
    </main>
  );
}
