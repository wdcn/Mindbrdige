import { site } from "./content";
import BackgroundVideo from "./components/BackgroundVideo";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import { Contact, Footer, Help, Impact, MissionAndSupport, Story, Support } from "./sections/Sections";

export default function App() {
  return (
    <>
      <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-black focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>

      {/* Hero: fullscreen container, video layer (z-0) under nav + headline (z-10) */}
      <div id="top" className="relative min-h-screen w-full overflow-hidden bg-background">
        <BackgroundVideo src={site.heroVideo} />
        <p role="note" className="relative z-10 px-6 pt-3 text-center text-xs text-[#6F6F6F]">
          In crisis? Call or text <a href="tel:988" className="text-[#000000] underline underline-offset-2">988</a> any time. In an emergency, call{" "}
          <a href="tel:911" className="text-[#000000] underline underline-offset-2">911</a>.{" "}
          <a href="#help" className="text-[#000000] underline underline-offset-2">More help</a>
        </p>
        <Nav />
        <main id="content">
          <Hero />
        </main>
      </div>

      <div>
        <Story />
        <MissionAndSupport />
        {/* AI service section removed until the tool exists: re-add <AiService /> here (it lives in sections/Sections.tsx). */}
        <Impact />
        <Support />
        <Help />
        <Contact />
      </div>
      <Footer />
    </>
  );
}
