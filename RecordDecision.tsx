"use client";

import { useState } from "react";

interface Props {
  manuscriptId: string;
  title: string;
}

export function RecordDecision({ manuscriptId, title }: Props) {
  const [open, setOpen] = useState(false);
  const [decisionType, setDecisionType] = useState("minor");
  const [letter, setLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult("");
    try {
      const res = await fetch("/api/decisions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          manuscriptId,
          decisionType,
          letter: letter || undefined,
          title,
          authorEmail: "author@scopusixteen.com",
          authorName: "Demo Author",
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setResult(typeof data.error === "string" ? data.error : "Failed");
      } else {
        setResult(data.message || "Decision recorded");
        setOpen(false);
      }
    } catch {
      setResult("Network error");
    } finally {
      setLoading(false);
    }
  }

  if (!open) {
    return (
      <div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
        >
          Record decision
        </button>
        {result && (
          <p className="mt-1 text-xs text-slate-600 max-w-[200px]">{result}</p>
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-lg border border-indigo-200 bg-indigo-50/50 p-3 text-left space-y-2 min-w-[220px]"
    >
      <label className="block text-xs font-medium text-slate-700">
        Decision
        <select
          value={decisionType}
          onChange={(e) => setDecisionType(e.target.value)}
          className="mt-1 w-full rounded border border-slate-300 px-2 py-1 text-xs"
        >
          <option value="accept">Accept</option>
          <option value="minor">Minor revision</option>
          <option value="major">Major revision</option>
          <option value="reject">Reject</option>
          <option value="transfer">Transfer</option>
        </select>
      </label>
      <label className="block text-xs font-medium text-slate-700">
        Letter to author
        <textarea
          value={letter}
          onChange={(e) => setLetter(e.target.value)}
          rows={3}
          className="mt-1 w-full rounded border border-slate-300 px-2 py-1 text-xs"
          placeholder="Optional decision letter…"
        />
      </label>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-indigo-700 px-2 py-1 text-xs font-semibold text-white disabled:opacity-50"
        >
          {loading ? "…" : "Submit"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded border border-slate-300 px-2 py-1 text-xs"
        >
          Cancel
        </button>
      </div>
      {result && <p className="text-xs text-slate-600">{result}</p>}
    </form>
  );
}
