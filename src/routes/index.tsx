import { createFileRoute } from "@tanstack/react-router";
import { useLenis } from "@/lib/useLenis";
import { Cursor } from "@/components/site/Cursor";
import { Nav } from "@/components/site/Nav";
import { Loader } from "@/components/site/Loader";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { AI } from "@/components/sections/AI";
import { Achievements } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";

const TITLE = "Susmitha Maddali — Full Stack Developer";
const DESCRIPTION =
  "Cinematic portfolio of Susmitha Sri Vyshnavi Maddali — a full stack developer crafting scalable React, Django and AI-powered products from Chennai.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  useLenis();

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Loader />
      <Cursor />
      <Nav />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <AI />
      <Achievements />
      <Contact />
    </main>
  );
}
