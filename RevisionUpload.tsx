"use client";

import { useState } from "react";

interface Props {
  manuscriptId: string;
  title: string;
}

export function RevisionUpload({ manuscriptId, title }: Props) {
  const [open, setOpen] = useState(false);
  const [responseLetter, setResponseLetter] = useState("");
  const [filename, setFilename] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      // Optional presign step
      let storageKey: string | undefined;
      if (filename) {
        const pre = await fetch("/api/upload/presign", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            filename,
            contentType: "application/pdf",
            manuscriptId,
            fileType: "main",
          }),
        });
        const preData = await pre.json();
        storageKey = preData.storageKey;
      }

      const res = await fetch("/api/revisions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          manuscriptId,
          title,
          responseLetter,
          storageKey,
          filename: filename || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMsg(typeof data.error === "string" ? data.error : "Failed");
      } else {
        setMsg(data.message || "Revision submitted");
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
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-500"
        >
          Upload revision
        </button>
        {msg && <p className="mt-1 text-xs text-slate-600">{msg}</p>}
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-lg border border-amber-200 bg-amber-50/50 p-3 space-y-2 text-left min-w-[240px]"
    >
      <p className="text-xs text-slate-600 line-clamp-2">{title}</p>
      <label className="block text-xs font-medium">
        Response to reviewers
        <textarea
          required
          minLength={10}
          rows={4}
          value={responseLetter}
          onChange={(e) => setResponseLetter(e.target.value)}
          className="mt-1 w-full rounded border border-slate-300 px-2 py-1 text-xs bg-white"
        />
      </label>
      <label className="block text-xs font-medium">
        Revised file name (demo)
        <input
          type="text"
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
          placeholder="manuscript-R1.pdf"
          className="mt-1 w-full rounded border border-slate-300 px-2 py-1 text-xs bg-white"
        />
      </label>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-amber-700 px-2 py-1 text-xs font-semibold text-white disabled:opacity-50"
        >
          {loading ? "…" : "Submit revision"}
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
