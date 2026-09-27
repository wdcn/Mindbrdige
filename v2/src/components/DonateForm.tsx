import { useState, type FormEvent } from "react";
import { site, support } from "../content";

type Frequency = "one-time" | "monthly";

function Choice({ checked, onSelect, children, name, value }: { checked: boolean; onSelect: () => void; children: React.ReactNode; name: string; value: string }) {
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

export default function DonateForm() {
  const { amounts, defaultAmount } = support.donate;
  const [frequency, setFrequency] = useState<Frequency>("one-time");
  const [amount, setAmount] = useState<number | "other">(defaultAmount);
  const [other, setOther] = useState("");

  const value = amount === "other" ? Math.round(Number(other)) || 0 : amount;
  const label = value > 0 ? `Donate $${value}${frequency === "monthly" ? " monthly" : ""}` : "Donate";

  function submit(e: FormEvent) {
    e.preventDefault();
    if (value <= 0) return;
    if (site.donationUrl) {
      const u = new URL(site.donationUrl);
      u.searchParams.set("amount", String(value));
      u.searchParams.set("frequency", frequency);
      window.location.href = u.toString();
      return;
    }
    const subject = `Donation: $${value} ${frequency === "monthly" ? "monthly" : "one time"}`;
    const body = `Hi MindBridge,\n\nI'd like to give $${value}${frequency === "monthly" ? " each month" : ""}. Please let me know how to complete my gift.\n\nThank you.`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form onSubmit={submit} noValidate className="rounded-[2rem] border border-white/70 bg-[#f4f4f4]/80 p-8 backdrop-blur-xl md:p-10">
      <fieldset>
        <legend className="mb-3 text-sm text-[#6F6F6F]">Frequency</legend>
        <div className="flex flex-wrap gap-2">
          <Choice name="frequency" value="one-time" checked={frequency === "one-time"} onSelect={() => setFrequency("one-time")}>One time</Choice>
          <Choice name="frequency" value="monthly" checked={frequency === "monthly"} onSelect={() => setFrequency("monthly")}>Monthly</Choice>
        </div>
      </fieldset>

      <fieldset className="mt-8">
        <legend className="mb-3 text-sm text-[#6F6F6F]">Amount</legend>
        <div className="flex flex-wrap gap-2">
          {amounts.map((a) => (
            <Choice key={a} name="amount" value={String(a)} checked={amount === a} onSelect={() => setAmount(a)}>${a}</Choice>
          ))}
          <Choice name="amount" value="other" checked={amount === "other"} onSelect={() => setAmount("other")}>Other</Choice>
        </div>
        {amount === "other" && (
          <label className="mt-5 flex items-center gap-2 font-display text-3xl">
            <span aria-hidden="true">$</span>
            <span className="sr-only">Other amount in US dollars</span>
            <input
              type="number"
              min={1}
              step={1}
              inputMode="numeric"
              autoFocus
              value={other}
              onChange={(e) => setOther(e.target.value)}
              placeholder="Amount"
              className="w-40 border-b border-[#6F6F6F] bg-transparent py-1 outline-none focus:border-[#000000]"
            />
          </label>
        )}
      </fieldset>

      <button
        type="submit"
        disabled={value <= 0}
        className="mt-10 rounded-full bg-[#000000] px-10 py-4 text-base text-white transition-transform hover:scale-[1.03] disabled:opacity-40 disabled:hover:scale-100"
      >
        {label}
      </button>
      {!site.donationUrl && (
        <p className="mt-4 max-w-sm text-xs leading-relaxed text-[#6F6F6F]">
          Online giving is being set up. The button opens an email to {site.email} so we can help you complete your gift.
        </p>
      )}
    </form>
  );
}
