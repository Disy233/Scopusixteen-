"use client";

import { useEffect, useState } from "react";

export function CounterReport() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/counter")
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setError(d.error);
        else setData(d);
      })
      .catch(() => setError("Failed to load"));
  }, []);

  if (error) {
    return (
      <p className="text-sm text-slate-500">
        {error} — sign in to load usage.
      </p>
    );
  }
  if (!data) {
    return <p className="text-sm text-slate-400">Loading usage…</p>;
  }

  const t = data.totals || {};
  return (
    <div className="space-y-2 text-sm">
      <p className="text-xs text-slate-500">Period: {data.period}</p>
      <ul className="space-y-1 text-slate-700">
        <li>
          Total item requests:{" "}
          <strong>{t.totalItemRequests?.toLocaleString?.() ?? t.totalItemRequests}</strong>
        </li>
        <li>
          Unique item requests:{" "}
          <strong>{t.uniqueItemRequests?.toLocaleString?.() ?? t.uniqueItemRequests}</strong>
        </li>
        <li>
          OA requests:{" "}
          <strong>{t.openAccessRequests?.toLocaleString?.() ?? t.openAccessRequests}</strong>
        </li>
        <li>
          Subscription requests:{" "}
          <strong>
            {t.subscriptionRequests?.toLocaleString?.() ?? t.subscriptionRequests}
          </strong>
        </li>
      </ul>
      <p className="text-xs text-slate-400 pt-1">{data.note}</p>
    </div>
  );
}
