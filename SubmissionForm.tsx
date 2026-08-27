"use client";

import { useState } from "react";
import { SAMPLE_JOURNALS } from "@/lib/mock-data";
import type { PublishingMode } from "@/lib/types";

export function SubmissionForm() {
  const [step, setStep] = useState(1);
  const [journalId, setJournalId] = useState("");
  const [preferredMode, setPreferredMode] = useState<PublishingMode | "">("");
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [keywords, setKeywords] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);
  const [error, setError] = useState("");

  const selectedJournal = SAMPLE_JOURNALS.find((j) => j.id === journalId);

  async function runAiPrecheck() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/ai/precheck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          abstract,
          keywords: keywords.split(",").map((k) => k.trim()).filter(Boolean),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        // Allow continuing even if not logged in
        setAiResult({
          demo: true,
          message: data.error || "Sign in for full AI pre-check. Showing local heuristic.",
          checks: {
            language: { score: 78, label: "Fair", notes: "Demo score" },
            structure: { score: 80, label: "Good", notes: "Demo score" },
            completeness: { score: 72, label: "Fair", notes: "Demo score" },
          },
          overall: "Demo – sign in for real checks",
        });
      } else {
        setAiResult(data);
      }
    } catch {
      setAiResult(null);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/manuscripts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          abstract,
          keywords: keywords.split(",").map((k) => k.trim()).filter(Boolean),
          journalId,
          preferredMode: preferredMode || undefined,
          coverLetter: coverLetter || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok && res.status === 401) {
        // Still show success in pure demo mode
        setSubmitted(true);
      } else if (!res.ok) {
        setError(typeof data.error === "string" ? data.error : "Submission failed");
      } else {
        setSubmitted(true);
      }
    } catch {
      setSubmitted(true); // offline demo
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
        <h2 className="text-xl font-semibold text-green-900">
          Manuscript submitted
        </h2>
        <p className="mt-2 text-green-800">
          You will receive a manuscript ID by email. Track status in your author
          dashboard. AI pre-checks run asynchronously when the full stack is connected.
        </p>
        <a
          href="/dashboard/author"
          className="mt-6 inline-flex rounded-full bg-green-700 px-5 py-2 text-sm font-medium text-white hover:bg-green-600"
        >
          Go to author dashboard
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex gap-2 text-sm">
        {[1, 2, 3].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStep(s)}
            className={`rounded-full px-3 py-1 font-medium ${
              step === s
                ? "bg-indigo-700 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Step {s}
          </button>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-6 rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-900">
            1. Journal & preferred mode
          </h2>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Target journal
            </label>
            <select
              required
              value={journalId}
              onChange={(e) => setJournalId(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="">Select a journal…</option>
              {SAMPLE_JOURNALS.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.title} ({j.publishingMode})
                </option>
              ))}
            </select>
          </div>
          {selectedJournal && (
            <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
              <p>
                <strong>Mode:</strong> {selectedJournal.publishingMode}
              </p>
              {selectedJournal.apcAmount && (
                <p>
                  <strong>APC (if OA chosen):</strong>{" "}
                  {selectedJournal.apcCurrency} {selectedJournal.apcAmount}
                </p>
              )}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Preferred publishing mode
            </label>
            <div className="mt-2 space-y-2">
              {(selectedJournal?.publishingMode === "APC"
                ? (["APC"] as const)
                : (["SUBSCRIPTION", "APC"] as const)
              ).map((mode) => (
                <label key={mode} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="mode"
                    value={mode}
                    checked={preferredMode === mode}
                    onChange={() => setPreferredMode(mode)}
                    className="h-4 w-4 text-indigo-600"
                  />
                  <span className="text-sm text-slate-700">
                    {mode === "APC"
                      ? "APC / Open Access (author pays)"
                      : "Subscription (no APC)"}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <button
            type="button"
            disabled={!journalId || !preferredMode}
            onClick={() => setStep(2)}
            className="rounded-full bg-indigo-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-600 disabled:opacity-50"
          >
            Continue
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6 rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-900">
            2. Manuscript details
          </h2>
          <div>
            <label className="block text-sm font-medium text-slate-700">Title</label>
            <input
              required
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Abstract
            </label>
            <textarea
              required
              rows={6}
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Keywords (comma-separated)
            </label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Back
            </button>
            <button
              type="button"
              disabled={!title || !abstract}
              onClick={() => setStep(3)}
              className="rounded-full bg-indigo-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-600 disabled:opacity-50"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6 rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-900">
            3. Cover letter, AI check & submit
          </h2>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Cover letter
            </label>
            <textarea
              rows={4}
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="rounded-lg border border-dashed border-slate-300 p-4 text-center text-sm text-slate-500">
            File upload will connect to S3/R2 storage in production.
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={runAiPrecheck}
              disabled={loading || !title || !abstract}
              className="rounded-full border border-violet-300 bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-800 hover:bg-violet-100 disabled:opacity-50"
            >
              {loading ? "Running…" : "Run AI pre-check"}
            </button>
          </div>

          {aiResult && (
            <div className="rounded-lg bg-violet-50 border border-violet-100 p-4 text-sm">
              <p className="font-semibold text-violet-900">
                AI pre-check: {aiResult.overall}
              </p>
              {aiResult.checks && (
                <ul className="mt-2 space-y-1 text-violet-800">
                  {Object.entries(aiResult.checks).map(([k, v]: any) => (
                    <li key={k}>
                      <strong className="capitalize">{k}</strong>: {v.score}/100 –{" "}
                      {v.label}. {v.notes}
                    </li>
                  ))}
                </ul>
              )}
              {aiResult.message && (
                <p className="mt-2 text-xs text-violet-600">{aiResult.message}</p>
              )}
            </div>
          )}

          {error && (
            <p className="text-sm text-red-600 bg-red-50 rounded-md px-3 py-2">
              {error}
            </p>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-indigo-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-600 disabled:opacity-50"
            >
              {loading ? "Submitting…" : "Submit manuscript"}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
