import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeScript } from "@/components/theme/theme-script";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { MotionProvider } from "@/components/motion/motion-provider";

// Space Grotesk stands in for the custom `sui` face (geometric, 300–700).
const sui = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-sui",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://agent-ai.sn"),
  title: {
    default: "Agent AI — Agents IA autonomes au Sénégal",
    template: "%s · Agent AI",
  },
  description:
    "La première agence au Sénégal à concevoir des agents IA autonomes à 100% pour automatiser les métiers des entreprises.",
  applicationName: "Agent AI",
  keywords: [
    "agents IA autonomes",
    "intelligence artificielle",
    "automatisation entreprise",
    "agence IA Sénégal",
    "Dakar",
    "chatbot",
    "IA sur mesure",
  ],
  authors: [{ name: "Agent AI" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Agent AI",
    title: "Agent AI — Agents IA autonomes au Sénégal",
    description:
      "Des agents IA autonomes à 100% pour automatiser les métiers de votre entreprise.",
    url: "https://agent-ai.sn",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agent AI — Agents IA autonomes au Sénégal",
    description:
      "Des agents IA autonomes à 100% pour automatiser les métiers de votre entreprise.",
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${sui.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <ThemeProvider>
          <MotionProvider>{children}</MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
