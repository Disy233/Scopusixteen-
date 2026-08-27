"use client";

import Link from "next/link";
import { SubscribeButton } from "@/components/subscription/SubscribeButton";
import { DemoUnlockButton } from "@/components/article/DemoUnlockButton";

interface Props {
  journalId: string;
  journalTitle: string;
  subscriptionPrice?: number;
  currency?: string;
  teaser: string;
}

export function Paywall({
  journalId,
  journalTitle,
  subscriptionPrice,
  currency = "USD",
  teaser,
}: Props) {
  return (
    <div className="relative mt-8">
      {/* Blurred teaser continuation */}
      <div className="pointer-events-none select-none max-h-40 overflow-hidden opacity-60 blur-[2px]">
        <p className="text-slate-600 leading-relaxed whitespace-pre-line">
          {teaser}
          {"\n\n"}
          Lorem continuation of the article is hidden behind the subscription
          paywall. Full methods, results, tables and references are available to
          subscribers and authorised institutional users.
        </p>
      </div>

      <div className="absolute inset-x-0 bottom-0 top-8 bg-gradient-to-b from-transparent via-white/90 to-white" />

      <div className="relative z-10 mx-auto max-w-lg -mt-4 rounded-2xl border-2 border-slate-800 bg-white p-6 shadow-lg text-center">
        <div className="inline-flex rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
          Subscription required
        </div>
        <h3 className="mt-3 text-lg font-semibold text-slate-900">
          Full text is available to subscribers
        </h3>
        <p className="mt-2 text-sm text-slate-600">
          This article was published on the <strong>subscription route</strong>{" "}
          (no APC). Open-access articles on this platform remain free to read.
        </p>

        <div className="mt-5 flex flex-col items-center gap-3">
          {subscriptionPrice != null ? (
            <SubscribeButton
              journalId={journalId}
              journalTitle={journalTitle}
              annualPrice={subscriptionPrice}
              currency={currency}
            />
          ) : (
            <Link
              href="/subscribe"
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              View subscription options
            </Link>
          )}
          <Link
            href="/subscribe"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Institutional / library access →
          </Link>
          <Link
            href="/login"
            className="text-xs text-slate-500 hover:text-slate-700"
          >
            Already subscribed? Sign in
          </Link>
          <DemoUnlockButton journalId={journalId} />
        </div>
      </div>
    </div>
  );
}
