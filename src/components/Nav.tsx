import { useState } from "react";
import { nav, site } from "../content";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-10">
      <nav aria-label="Main" className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
        <a href="#top" className="shrink-0" aria-label={`${site.name} home`}>
          <img
            src={`${import.meta.env.BASE_URL}brand/mindbridge-logo-horizontal.svg`}
            alt={site.name}
            width={469}
            height={111}
            className="h-8 w-auto md:h-12"
          />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {nav.map((item, i) => (
            <li key={item.href}>
              <a
                href={item.href}
                aria-current={i === 0 ? "page" : undefined}
                className={`text-sm transition-colors hover:text-[#000000] ${i === 0 ? "text-[#000000]" : "text-[#6F6F6F]"}`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#donate"
            className="rounded-full bg-[#000000] px-6 py-2.5 text-sm text-white transition-transform hover:scale-[1.03]"
          >
            Donate today
          </a>
          <button
            type="button"
            className="text-sm text-[#6F6F6F] transition-colors hover:text-[#000000] md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      {open && (
        <ul id="mobile-menu" className="mx-4 flex flex-col gap-4 rounded-3xl border border-white/60 bg-white/70 px-6 py-6 shadow-sm backdrop-blur-xl md:hidden">
          {nav.map((item) => (
            <li key={item.href}>
              <a href={item.href} onClick={() => setOpen(false)} className="text-base text-[#000000]">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
