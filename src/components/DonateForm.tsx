import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { site, stripe, support } from "../content";

type Frequency = "one-time" | "monthly";
type Returned = "success" | "cancelled" | null;

const monthlyAvailable = Object.values(stripe.monthlyLinks).some((u) => u.trim());

/** Where the Donate button goes for this choice, or "" if Stripe isn't set up for it. */
function checkoutUrl(frequency: Frequency, amount: number | "other"): string {
  if (frequency === "monthly") return (stripe.monthlyLinks[String(amount)] || "").trim();
  const base = stripe.donateLink.trim();
  if (!base) return "";
  if (amount === "other") return base; // donor types the amount on Stripe's page
  const url = new URL(base);
  url.searchParams.set("prefilled_amount", String(amount * 100)); // cents; donor can still change it
  url.searchParams.set("utm_source", "mindbridge.ngo");
  return url.toString();
}

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

/** Reads ?donation=success|cancelled once (set by Stripe's redirect), then tidies the address bar. */
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
  const [returned, dismissReturned] = useReturnedFromStripe();

  const link = checkoutUrl(frequency, amount);
  const label =
    amount === "other"
      ? "Donate"
      : `Donate $${amount.toLocaleString("en-US")}${frequency === "monthly" ? " monthly" : ""}`;

  function chooseFrequency(f: Frequency) {
    setFrequency(f);
    if (f === "monthly" && amount === "other") setAmount(defaultAmount); // monthly gifts use set amounts
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    if (link) {
      window.location.assign(link); // Stripe-hosted checkout; card details never touch this site.
      return;
    }
    // Fallback when Stripe isn't configured for this choice.
    const value = amount === "other" ? "" : `$${amount} `;
    const subject = `Donation: ${value}${frequency === "monthly" ? "monthly" : "one time"}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;
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
          No payment was made. You can try again whenever you're ready.
        </p>
      )}

      {monthlyAvailable && (
        <fieldset className="mb-8">
          <legend className="mb-3 text-sm text-[#6F6F6F]">Frequency</legend>
          <div className="flex flex-wrap gap-2">
            <Choice name="frequency" value="one-time" checked={frequency === "one-time"} onSelect={() => chooseFrequency("one-time")}>One time</Choice>
            <Choice name="frequency" value="monthly" checked={frequency === "monthly"} onSelect={() => chooseFrequency("monthly")}>Monthly</Choice>
          </div>
        </fieldset>
      )}

      <fieldset>
        <legend className="mb-3 text-sm text-[#6F6F6F]">Amount</legend>
        <div className="flex flex-wrap gap-2">
          {amounts.map((a) => (
            <Choice key={a} name="amount" value={String(a)} checked={amount === a} onSelect={() => setAmount(a)}>${a}</Choice>
          ))}
          {frequency === "one-time" && (
            <Choice name="amount" value="other" checked={amount === "other"} onSelect={() => setAmount("other")}>Other amount</Choice>
          )}
        </div>
        <p className="mt-3 text-sm text-[#6F6F6F]">
          {amount === "other"
            ? "You'll enter your amount on the next page."
            : "You can still change the amount on the next page."}
        </p>
      </fieldset>

      <button
        type="submit"
        className="mt-10 rounded-full bg-[#000000] px-10 py-4 text-base text-white transition-transform hover:scale-[1.03]"
      >
        {label}
      </button>

      <p className="mt-4 max-w-sm text-xs leading-relaxed text-[#6F6F6F]">
        {link
          ? "Secure payment by Stripe. You'll get an email receipt."
          : `Online giving isn't set up for this option yet. The button opens an email to ${site.email}.`}
        {!monthlyAvailable && (
          <>
            {" "}Want to give monthly?{" "}
            <a href={`mailto:${site.email}?subject=${encodeURIComponent("Monthly gift")}`} className="text-[#000000] underline underline-offset-2">Email us</a>.
          </>
        )}
      </p>
    </form>
  );
}
