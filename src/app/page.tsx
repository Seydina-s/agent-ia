import { Hero } from "@/components/sections/hero";
import { AgentsPreview } from "@/components/sections/agents-preview";
import { Positioning } from "@/components/sections/positioning";
import { ClosingCta } from "@/components/sections/closing-cta";

export default function Home() {
  return (
    <main>
      <Hero />
      <AgentsPreview />
      <Positioning />
      <ClosingCta />
    </main>
  );
}
