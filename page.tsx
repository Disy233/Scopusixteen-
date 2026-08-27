import { SubmissionForm } from "@/components/forms/SubmissionForm";

export const metadata = {
  title: "Submit a Manuscript",
};

export default function SubmitPage() {
  return (
    <div className="bg-slate-50 min-h-[70vh]">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Submit a manuscript
          </h1>
          <p className="mt-2 text-slate-600">
            Multi-step submission with journal selection, preferred mode
            (Subscription or APC), and AI pre-check preparation. This is a
            functional demo form — data is not persisted yet.
          </p>
        </div>
        <SubmissionForm />
      </div>
    </div>
  );
}
