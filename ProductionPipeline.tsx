"use client";

import { useEffect, useState } from "react";

interface Stage {
  id: string;
  label: string;
  done: boolean;
  current: boolean;
}

export function ProductionPipeline({ manuscriptId }: { manuscriptId: string }) {
  const [stages, setStages] = useState<Stage[]>([]);
  const [current, setCurrent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/production/${manuscriptId}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setError(d.error);
        else {
          setStages(d.stages || []);
          setCurrent(d.currentStage || "");
        }
      })
      .catch(() => setError("Could not load pipeline"));
  }, [manuscriptId]);

  if (error) {
    return <p className="text-xs text-slate-500">{error}</p>;
  }
  if (!stages.length) {
    return <p className="text-xs text-slate-400">Loading production status…</p>;
  }

  return (
    <div className="mt-2">
      <p className="text-xs font-medium text-slate-600 mb-2">
        Production: <span className="capitalize">{current.replace(/_/g, " ")}</span>
      </p>
      <ol className="flex flex-wrap gap-1">
        {stages.map((s) => (
          <li
            key={s.id}
            className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
              s.done
                ? "bg-emerald-100 text-emerald-800"
                : s.current
                  ? "bg-indigo-100 text-indigo-800 ring-1 ring-indigo-300"
                  : "bg-slate-100 text-slate-500"
            }`}
          >
            {s.label}
          </li>
        ))}
      </ol>
    </div>
  );
}
