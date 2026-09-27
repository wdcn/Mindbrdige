import { hero } from "../content";

export default function Hero() {
  return (
    <section
      className="relative z-10 flex flex-col items-center justify-center px-6 pb-40 text-center"
      style={{ paddingTop: "calc(8rem - 75px)" }}
    >
      <h1
        className="animate-fade-rise max-w-7xl font-display text-5xl font-normal text-[#000000] sm:text-7xl md:text-8xl"
        style={{ lineHeight: 0.95, letterSpacing: "-2.46px" }}
      >
        {hero.headline.map((part, i) =>
          part.em ? (
            <em key={i} className="text-[#6F6F6F]">
              {part.text}
            </em>
          ) : (
            <span key={i}>{part.text}</span>
          ),
        )}
      </h1>

      <p className="animate-fade-rise-delay mt-8 max-w-2xl text-base leading-relaxed text-[#6F6F6F] sm:text-lg">
        {hero.description}
      </p>

      <a
        href={hero.cta.href}
        className="animate-fade-rise-delay-2 mt-12 rounded-full bg-[#000000] px-14 py-5 text-base text-[#FFFFFF] transition-transform hover:scale-[1.03]"
      >
        {hero.cta.label}
      </a>
    </section>
  );
}
