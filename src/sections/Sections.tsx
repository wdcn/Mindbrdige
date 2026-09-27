import { aiService, contact, experiences, help, impact, mission, site, story, support } from "../content";
import { Body, Heading, PillLink, Section, TextLink } from "../components/ui";
import DonateForm from "../components/DonateForm";
import Constellation from "../components/Constellation";

const rule = "border-t border-[#e7e7e7]";

export function Story() {
  return (
    <Section className={rule}>
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <Constellation className="aspect-[1/0.9] w-full touch-pan-y" />
        <div>
          <Heading>{story.title}</Heading>
          <div className="mt-8 space-y-6">
            {story.paragraphs.map((p) => (
              <Body key={p.slice(0, 20)}>{p}</Body>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

export function AiService() {
  return (
    <Section className="!py-8">
      <div className="rounded-[2.5rem] bg-[#f4f4f4] px-8 py-16 text-center md:px-16 md:py-24">
        <Heading className="mx-auto max-w-4xl">{aiService.title}</Heading>
        <Body className="mx-auto mt-8 max-w-2xl">{aiService.body}</Body>
        <p className="mt-4 text-xs text-[#6F6F6F]">
          Not a crisis service. If you are in crisis, call or text{" "}
          <a href="tel:988" className="text-[#000000] underline underline-offset-2">988</a>.
        </p>
        <div className="mt-10">
          <PillLink href={aiService.cta.href}>{aiService.cta.label}</PillLink>
        </div>
      </div>
    </Section>
  );
}

/** Our mission: text left, bridge right (mirrors Our story's brain-left layout). */
export function MissionAndSupport() {
  return (
    <Section id="mission" className={rule}>
      <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <Heading>{mission.title}</Heading>
          <p className="mt-4 font-display text-3xl italic text-[#6F6F6F] md:text-4xl">{mission.subtitle}</p>
          <div className="mt-10 space-y-6">
            {mission.paragraphs.map((p) => (
              <Body key={p.slice(0, 20)}>{p}</Body>
            ))}
          </div>
          {/* TODO (confirm before publishing): justice-involved youth programming (King County / Clark Children and Family Justice Center). */}
        </div>
        <Constellation shape="bridge" scale={0.64} className="aspect-[4/3] w-full touch-pan-y" />
      </div>
    </Section>
  );
}

export function Impact() {
  return (
    <Section className={rule}>
      <Heading>{impact.title}</Heading>
      <dl className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
        {impact.items.map((item) => (
          <div key={item.label} className="flex flex-col">
            <dt className="order-2 mt-3 text-base text-[#000000]">{item.label}</dt>
            <dd className="order-1 font-display text-7xl text-[#000000] md:text-8xl" style={{ lineHeight: 0.9, letterSpacing: "-2px" }}>
              {item.value}
            </dd>
            <dd className="order-3 mt-2 text-sm leading-relaxed text-[#6F6F6F]">{item.body}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

export function Support() {
  return (
    <Section id="support" className={rule}>
      <div className="grid gap-10 md:grid-cols-2 md:gap-20">
        <Heading>{support.title}</Heading>
        <Body className="md:pt-3">{support.intro}</Body>
      </div>

      <div className="mt-20 grid gap-14 md:grid-cols-2 md:gap-20">
        {support.asks.map((ask) => (
          <article key={ask.title}>
            <Heading as="h3">{ask.title}</Heading>
            <Body className="mt-4">{ask.body}</Body>
            <div className="mt-6">
              <TextLink href={`mailto:${site.email}?subject=${encodeURIComponent(ask.subject)}`}>Email {site.email}</TextLink>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-24">
        <Heading as="h3">{support.waysTitle}</Heading>
        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {support.ways.map((w) => (
            <div key={w.title}>
              <p className="text-base text-[#000000]">{w.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#6F6F6F]">{w.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div id="donate" className="mt-24 grid scroll-mt-6 gap-10 md:grid-cols-2 md:gap-20">
        <div>
          <Heading as="h3">{support.donate.title}</Heading>
          <Body className="mt-4">{support.donate.body}</Body>
          <address className="mt-8 text-sm not-italic leading-relaxed text-[#6F6F6F]">
            Prefer a check? Mail it to
            <br />
            {site.mailingAddress.map((line) => (
              <span key={line} className="block text-[#000000]">{line}</span>
            ))}
          </address>
        </div>
        <DonateForm />
      </div>
    </Section>
  );
}

export function Experiences() {
  return (
    <Section id="experiences" className={`${rule} text-center`}>
      <Heading>{experiences.title}</Heading>
      <Body className="mx-auto mt-6 max-w-xl">{experiences.body}</Body>
      <Body className="mx-auto mt-2 max-w-xl">{experiences.follow}</Body>
      <div className="mt-8">
        <TextLink href={`mailto:${site.email}?subject=${encodeURIComponent("Tell me about upcoming experiences")}`}>Email {site.email}</TextLink>
      </div>
    </Section>
  );
}

export function Contact() {
  const rows = [
    { label: "Phone", value: site.phone.display, href: `tel:${site.phone.tel}` },
    { label: "Email", value: site.email, href: `mailto:${site.email}` },
    { label: "Founder", value: site.founderEmail, href: `mailto:${site.founderEmail}` },
  ];
  return (
    <Section id="contact" className={rule}>
      <div className="grid gap-10 md:grid-cols-2 md:gap-20">
        <div>
          <Heading>{contact.title}</Heading>
          <Body className="mt-8">{contact.body}</Body>
        </div>
        <dl className="divide-y divide-[#e7e7e7] border-y border-[#e7e7e7]">
          {rows.map((r) => (
            <div key={r.label} className="flex flex-wrap items-baseline justify-between gap-2 py-5">
              <dt className="text-sm text-[#6F6F6F]">{r.label}</dt>
              <dd><a href={r.href} className="font-display text-2xl text-[#000000] md:text-3xl">{r.value}</a></dd>
            </div>
          ))}
          <div className="flex flex-wrap items-baseline justify-between gap-2 py-5">
            <dt className="text-sm text-[#6F6F6F]">Mailing address</dt>
            <dd className="text-right text-base text-[#000000]">
              {site.mailingAddress.slice(1).map((l) => (
                <span key={l} className="block">{l}</span>
              ))}
            </dd>
          </div>
          <div className="py-5 text-sm text-[#6F6F6F]">
            {site.basedIn} This inbox is not monitored around the clock. If you need help right away, see{" "}
            <a href="#help" className="text-[#000000] underline underline-offset-2">crisis resources</a>.
          </div>
        </dl>
      </div>
    </Section>
  );
}

export function Help() {
  return (
    <Section id="help" className={rule}>
      <div className="grid gap-10 md:grid-cols-2 md:gap-20">
        <div>
          <Heading>{help.title}</Heading>
          <Body className="mt-8">{help.body}</Body>
        </div>
        <ul className="divide-y divide-[#e7e7e7]">
          {help.lines.map((line) => (
            <li key={line.name} className="py-5 first:pt-0">
              <p className="text-base text-[#000000]">{line.name}</p>
              <p className="mt-1 text-sm text-[#6F6F6F]">{line.body}</p>
              <div className="mt-3 flex flex-wrap gap-5">
                {line.actions.map((a) => (
                  <TextLink key={a.href} href={a.href}>{a.label}</TextLink>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

export function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-8 pb-12 pt-24">
      <p className="font-display text-6xl text-[#000000] md:text-8xl" style={{ lineHeight: 0.95, letterSpacing: "-2.46px" }}>
        No translation <em className="text-[#6F6F6F]">needed.</em>
      </p>
      <div className="mt-16 flex flex-col justify-between gap-4 border-t border-[#e7e7e7] pt-6 text-xs text-[#6F6F6F] md:flex-row">
        <p>&copy; {new Date().getFullYear()} MindBridge NGO. {site.basedIn}</p>
        <p>MindBridge is not a crisis service. If you are in danger, call 911.</p>
      </div>
    </footer>
  );
}
