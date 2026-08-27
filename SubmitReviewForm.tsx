"use client";

import { useState } from "react";

interface Props {
  manuscriptId: string;
  title: string;
}

export function SubmitReviewForm({ manuscriptId, title }: Props) {
  const [open, setOpen] = useState(false);
  const [recommendation, setRecommendation] = useState("MINOR_REVISION");
  const [commentsToAuthor, setCommentsToAuthor] = useState("");
  const [commentsToEditor, setCommentsToEditor] = useState("");
  const [score, setScore] = useState(3);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      const res = await fetch("/api/reviews/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          manuscriptId,
          recommendation,
          commentsToAuthor,
          commentsToEditor: commentsToEditor || undefined,
          score,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMsg(typeof data.error === "string" ? data.error : "Submit failed");
      } else {
        setMsg(data.message || "Submitted");
        setOpen(false);
      }
    } catch {
      setMsg("Network error");
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
          className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-500"
        >
          Submit review
        </button>
        {msg && <p className="mt-1 text-xs text-slate-600">{msg}</p>}
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-lg border border-indigo-200 bg-white p-4 space-y-3 text-left max-w-md"
    >
      <p className="text-xs text-slate-500 line-clamp-2">{title}</p>
      <label className="block text-xs font-medium">
        Recommendation
        <select
          value={recommendation}
          onChange={(e) => setRecommendation(e.target.value)}
          className="mt-1 w-full rounded border border-slate-300 px-2 py-1 text-xs"
        >
          <option value="ACCEPT">Accept</option>
          <option value="MINOR_REVISION">Minor revision</option>
          <option value="MAJOR_REVISION">Major revision</option>
          <option value="REJECT">Reject</option>
        </select>
      </label>
      <label className="block text-xs font-medium">
        Comments to author
        <textarea
          required
          minLength={10}
          rows={4}
          value={commentsToAuthor}
          onChange={(e) => setCommentsToAuthor(e.target.value)}
          className="mt-1 w-full rounded border border-slate-300 px-2 py-1 text-xs"
        />
      </label>
      <label className="block text-xs font-medium">
        Confidential comments to editor
        <textarea
          rows={2}
          value={commentsToEditor}
          onChange={(e) => setCommentsToEditor(e.target.value)}
          className="mt-1 w-full rounded border border-slate-300 px-2 py-1 text-xs"
        />
      </label>
      <label className="block text-xs font-medium">
        Score (1–5)
        <input
          type="number"
          min={1}
          max={5}
          value={score}
          onChange={(e) => setScore(Number(e.target.value))}
          className="mt-1 w-20 rounded border border-slate-300 px-2 py-1 text-xs"
        />
      </label>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-indigo-700 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-50"
        >
          {loading ? "Submitting…" : "Submit review"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded border px-3 py-1.5 text-xs"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
