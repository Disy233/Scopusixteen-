"use client";

import { useState } from "react";

interface Props {
  manuscriptId: string;
  title: string;
}

export function InviteReviewers({ manuscriptId, title }: Props) {
  const [open, setOpen] = useState(false);
  const [emails, setEmails] = useState(
    "reviewer@scopusixteen.com, colleague@university.edu"
  );
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    const reviewers = emails
      .split(/[,;\n]/)
      .map((s) => s.trim())
      .filter(Boolean)
      .map((email) => ({ email }));
    try {
      const res = await fetch("/api/reviews/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ manuscriptId, title, reviewers, dueDays: 21 }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMsg(typeof data.error === "string" ? data.error : "Invite failed");
      } else {
        setMsg(data.message || "Invited");
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
          Invite reviewers
        </button>
        {msg && <p className="mt-1 text-xs text-slate-600 max-w-[180px]">{msg}</p>}
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-lg border border-indigo-200 bg-white p-3 space-y-2 min-w-[240px]"
    >
      <label className="block text-xs font-medium text-slate-700">
        Reviewer emails (comma-separated)
        <textarea
          value={emails}
          onChange={(e) => setEmails(e.target.value)}
          rows={3}
          className="mt-1 w-full rounded border border-slate-300 px-2 py-1 text-xs"
          required
        />
      </label>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-indigo-700 px-2 py-1 text-xs font-semibold text-white disabled:opacity-50"
        >
          {loading ? "Sending…" : "Send invites"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded border px-2 py-1 text-xs"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
