import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { site, stripeLinks, support } from "../content";

type Frequency = "one-time" | "monthly";
type Returned = "success" | "cancelled" | null;

const MIN = 1;

/** The Stripe Payment Link for this choice, or "" if none is configured yet. */
function linkFor(frequency: Frequency, amount: number | "other"): string {
  const table = frequency === "monthly" ? stripeLinks.monthly : stripeLinks.oneTime;
  return (table[String(amount)] || "").trim();
}
const anyLinkConfigured = [...Object.values(stripeLinks.oneTime), ...Object.values(stripeLinks.monthly)].some((u) => u.trim());

function Choice({ checked, onSelect, children, name, value }: { checked: boolean; onSelect: () => void; children: ReactNode; name: string; value: string }) {
  return (
    <label className="cursor-pointer">
      <input type="radio" name={name} value={value} checked={checked} onChange={onSelect} className="peer sr-only" />
      <span
        className={`inline-block rounded-full border px-5 py-2.5 text-sm transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-black ${
          checked ? "border-[#000000] bg-[#000000] text-white" : "border-[#dcdcdc] bg-white/70 text-[#6F6F6F] hover:text-[#000000]"
        }`}
      >
        {children}
      </span>
    </label>
  );
}

/** Reads ?donation=success|cancelled once (set by Stripe's return URLs), then tidies the address bar. */
function useReturnedFromStripe(): [Returned, () => void] {
  const [returned, setReturned] = useState<Returned>(null);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const value = params.get("donation");
    if (value === "success" || value === "cancelled") {
      setReturned(value);
      params.delete("donation");
      const query = params.toString();
      window.history.replaceState(null, "", `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`);
    }
  }, []);
  return [returned, () => setReturned(null)];
}

export default function DonateForm() {
  const { amounts, defaultAmount } = support.donate;
  const [frequency, setFrequency] = useState<Frequency>("one-time");
  const [amount, setAmount] = useState<number | "other">(defaultAmount);
  const [other, setOther] = useState("");
  const [returned, dismissReturned] = useReturnedFromStripe();

  const value = amount === "other" ? Math.round(Number(other)) || 0 : amount;
  const link = linkFor(frequency, amount);
  // Stripe's "choose what to pay" page asks for the amount itself, so "Other" needs no number here when a link exists.
  const needsTypedAmount = amount === "other" && !link;
  const tooSmall = needsTypedAmount && value > 0 && value < MIN;
  const label =
    amount === "other" && link
      ? "Continue to donate"
      : value > 0
        ? `Donate $${value.toLocaleString("en-US")}${frequency === "monthly" ? " monthly" : ""}`
        : "Donate";

  function chooseFrequency(f: Frequency) {
    setFrequency(f);
    if (f === "monthly" && amount === "other") setAmount(defaultAmount); // monthly gifts use set amounts
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    if (link) {
      window.location.assign(link); // Stripe-hosted payment page; card details never touch this site.
      return;
    }
    if (value <= 0 || tooSmall) return;
    const subject = `Donation: $${value} ${frequency === "monthly" ? "monthly" : "one time"}`;
    const body = `Hi MindBridge,\n\nI'd like to give $${value}${frequency === "monthly" ? " each month" : ""}. Please let me know how to complete my gift.\n\nThank you.`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  if (returned === "success") {
    return (
      <div role="status" className="rounded-[2rem] border border-white/70 bg-[#f4f4f4]/80 p-8 backdrop-blur-xl md:p-10">
        <p className="font-display text-4xl text-[#000000] md:text-5xl" style={{ lineHeight: 0.95, letterSpacing: "-1px" }}>
          Thank you.
        </p>
        <p className="mt-4 text-base leading-relaxed text-[#6F6F6F]">
          Your gift went through. A receipt is on its way to your email. It helps a young person get support in words that make sense to them.
        </p>
        <button type="button" onClick={dismissReturned} className="mt-8 text-sm text-[#000000] underline decoration-[#6F6F6F]/50 underline-offset-4">
          Give again
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="rounded-[2rem] border border-white/70 bg-[#f4f4f4]/80 p-8 backdrop-blur-xl md:p-10">
      {returned === "cancelled" && (
        <p role="status" className="mb-6 text-sm text-[#6F6F6F]">
          No payment was made. You can change the amount and try again whenever you're ready.
        </p>
      )}

      <fieldset>
        <legend className="mb-3 text-sm text-[#6F6F6F]">Frequency</legend>
        <div className="flex flex-wrap gap-2">
          <Choice name="frequency" value="one-time" checked={frequency === "one-time"} onSelect={() => chooseFrequency("one-time")}>One time</Choice>
          <Choice name="frequency" value="monthly" checked={frequency === "monthly"} onSelect={() => chooseFrequency("monthly")}>Monthly</Choice>
        </div>
      </fieldset>

      <fieldset className="mt-8">
        <legend className="mb-3 text-sm text-[#6F6F6F]">Amount</legend>
        <div className="flex flex-wrap gap-2">
          {amounts.map((a) => (
            <Choice key={a} name="amount" value={String(a)} checked={amount === a} onSelect={() => setAmount(a)}>${a}</Choice>
          ))}
          {frequency === "one-time" && (
            <Choice name="amount" value="other" checked={amount === "other"} onSelect={() => setAmount("other")}>Other</Choice>
          )}
        </div>
        {needsTypedAmount && (
          <label className="mt-5 flex items-center gap-2 font-display text-3xl">
            <span aria-hidden="true">$</span>
            <span className="sr-only">Other amount in US dollars</span>
            <input
              type="number"
              min={MIN}
              step={1}
              inputMode="numeric"
              autoFocus
              value={other}
              onChange={(e) => setOther(e.target.value)}
              placeholder="Amount"
              aria-describedby={tooSmall ? "amount-hint" : undefined}
              className="w-40 border-b border-[#6F6F6F] bg-transparent py-1 outline-none focus:border-[#000000]"
            />
          </label>
        )}
        {tooSmall && (
          <p id="amount-hint" className="mt-3 text-sm text-[#6F6F6F]">The minimum gift is ${MIN}.</p>
        )}
        {amount === "other" && link && (
          <p className="mt-3 text-sm text-[#6F6F6F]">You'll enter your amount on the next page.</p>
        )}
      </fieldset>

      <button
        type="submit"
        disabled={!link && (value <= 0 || tooSmall)}
        className="mt-10 rounded-full bg-[#000000] px-10 py-4 text-base text-white transition-transform hover:scale-[1.03] disabled:opacity-40 disabled:hover:scale-100"
      >
        {label}
      </button>

      <p className="mt-4 max-w-sm text-xs leading-relaxed text-[#6F6F6F]">
        {anyLinkConfigured
          ? link
            ? `Secure payment by Stripe. You'll get an email receipt.${frequency === "monthly" ? ` To change or cancel a monthly gift, email ${site.email}.` : ""}`
            : `This option opens an email to ${site.email} so we can help you complete your gift.`
          : `Online giving is being set up. The button opens an email to ${site.email} so we can help you complete your gift.`}
      </p>
    </form>
  );
}
