"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DemoUnlockButton({ journalId }: { journalId: string }) {
  const router = useRouter();
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function unlock() {
    setLoading(true);
    setMsg("");
    try {
      const res = await fetch("/api/subscriptions/demo-unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ journalId }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMsg(data.error || "Failed – sign in first");
        setLoading(false);
        return;
      }
      setMsg(data.message || "Unlocked");
      router.refresh();
    } catch {
      setMsg("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={unlock}
        disabled={loading}
        className="text-xs font-medium text-amber-800 underline hover:text-amber-950 disabled:opacity-50"
      >
        {loading ? "Unlocking…" : "Demo: unlock full text (dev)"}
      </button>
      {msg && <p className="mt-1 text-xs text-slate-600">{msg}</p>}
    </div>
  );
}
