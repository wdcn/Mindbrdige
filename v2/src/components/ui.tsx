import type { ReactNode } from "react";

/** Section shell: consistent width, rhythm, and anchor id. */
export function Section({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`mx-auto max-w-7xl px-8 py-24 md:py-32 ${className}`}>
      {children}
    </section>
  );
}

/** Display heading in Instrument Serif. */
export function Heading({ children, as: Tag = "h2", className = "" }: { children: ReactNode; as?: "h2" | "h3"; className?: string }) {
  return (
    <Tag
      className={`font-display font-normal text-[#000000] ${Tag === "h2" ? "text-5xl md:text-7xl" : "text-3xl md:text-4xl"} ${className}`}
      style={{ lineHeight: 0.95, letterSpacing: Tag === "h2" ? "-1.8px" : "-0.6px" }}
    >
      {children}
    </Tag>
  );
}

export function Body({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-base leading-relaxed text-[#6F6F6F] sm:text-lg ${className}`}>{children}</p>;
}

export function PillLink({ href, children, variant = "solid" }: { href: string; children: ReactNode; variant?: "solid" | "outline" }) {
  const base = "inline-block rounded-full px-8 py-3.5 text-sm transition-transform hover:scale-[1.03]";
  const look = variant === "solid" ? "bg-[#000000] text-white" : "border border-[#000000] text-[#000000]";
  return (
    <a href={href} className={`${base} ${look}`}>
      {children}
    </a>
  );
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="text-sm text-[#000000] underline decoration-[#6F6F6F]/50 underline-offset-4 transition-colors hover:decoration-[#000000]">
      {children}
    </a>
  );
}
