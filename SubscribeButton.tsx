"use client";

import { useState } from "react";

interface Props {
  journalId: string;
  journalTitle: string;
  annualPrice: number;
  currency?: string;
}

export function SubscribeButton({
  journalId,
  journalTitle,
  annualPrice,
  currency = "USD",
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubscribe() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/stripe/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          journalId,
          priceCents: Math.round(annualPrice * 100),
          currency: currency.toLowerCase(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not start subscription");
        setLoading(false);
        return;
      }
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError("No checkout URL returned");
        setLoading(false);
      }
    } catch {
      setError("Network error – sign in first if needed");
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleSubscribe}
        disabled={loading}
        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
      >
        {loading
          ? "Redirecting…"
          : `Subscribe – ${currency} ${annualPrice}/year`}
      </button>
      <p className="mt-1 text-xs text-slate-500">
        Individual access to {journalTitle}
      </p>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
