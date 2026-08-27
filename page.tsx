import Link from "next/link";

const featuredJournals = [
  {
    id: "eng-applied",
    title: "Journal of Engineering and Applied Sciences",
    issn: "2616-7300",
    category: "Engineering",
    mode: "APC",
    modeColor: "bg-emerald-100 text-emerald-800",
    latest: "Vol. 8 No. 2 (2025)",
    color: "from-blue-600 to-blue-800",
  },
  {
    id: "med-health",
    title: "International Journal of Medical and Health Research",
    issn: "2708-9516",
    category: "Medicine & Health",
    mode: "HYBRID",
    modeColor: "bg-violet-100 text-violet-800",
    latest: "Vol. 7 No. 2 (2025)",
    color: "from-cyan-600 to-teal-700",
  },
  {
    id: "business",
    title: "Journal of Business, Management & Economics",
    issn: "2617-4611",
    category: "Business & Management",
    mode: "SUBSCRIPTION",
    modeColor: "bg-amber-100 text-amber-800",
    latest: "Vol. 9 No. 1 (2025)",
    color: "from-indigo-600 to-blue-700",
  },
  {
    id: "env-sci",
    title: "Advances in Environmental Science & Sustainability",
    issn: "2738-1141",
    category: "Environmental Science",
    mode: "APC",
    modeColor: "bg-emerald-100 text-emerald-800",
    latest: "Vol. 6 No. 1 (2025)",
    color: "from-green-600 to-emerald-700",
  },
];

const latestArticles = [
  {
    id: "art-001",
    title: "Machine Learning Approaches for Predicting Protein Structures: A Review",
    authors: "A. Jana, R. K. Singh, P. Verma",
    journal: "Journal of Engineering and Applied Sciences",
    date: "May 20, 2025",
    doi: "10.5678/jeas.2025.0821",
    gradient: "from-blue-500 to-indigo-600",
    oa: true,
  },
  {
    id: "art-002",
    title: "Impact of Climate Change on Vector-Borne Diseases: A Global Perspective",
    authors: "M. Ibrahim, L. K. Mensah, S. A. Adeyemi",
    journal: "International Journal of Medical and Health Research",
    date: "May 18, 2025",
    doi: "10.5678/ijmhr.2025.0719",
    gradient: "from-rose-500 to-pink-600",
    oa: false,
  },
  {
    id: "art-003",
    title: "Financial Inclusion and Economic Growth in Developing Economies",
    authors: "T. Okafor, H. Bello",
    journal: "Journal of Business, Management & Economics",
    date: "May 15, 2025",
    doi: "10.5678/jbme.2025.0915",
    gradient: "from-amber-500 to-orange-600",
    oa: false,
  },
];

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-900 to-slate-950" />
        <div className="absolute right-0 top-0 h-full w-1/2 opacity-30 hidden lg:block">
          <div className="absolute right-10 top-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="absolute right-40 top-20 h-48 w-48 rounded-full bg-cyan-400/10 blur-2xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Discover. Publish.
              <br />
              <span className="text-cyan-300">Advance Knowledge.</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Explore peer-reviewed research and submit your work through a modern
              publishing platform powered by responsible AI-assisted editorial tools.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/journals"
                className="inline-flex items-center gap-2 rounded-md bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-cyan-400 transition-colors"
              >
                📚 Explore Journals
              </Link>
              <Link
                href="/submit"
                className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/20 transition-colors"
              >
                📤 Submit Your Manuscript
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search bar */}
      <section className="relative z-10 -mt-6 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <form
            action="/search"
            method="get"
            className="flex flex-col sm:flex-row overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg"
          >
            <div className="flex flex-1 items-center gap-2 px-4">
              <span className="text-slate-400">🔍</span>
              <input
                type="search"
                name="q"
                placeholder="Search articles, authors, keywords, journals..."
                className="w-full border-0 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-0"
              />
            </div>
            <div className="flex items-center border-t sm:border-t-0 sm:border-l border-slate-200">
              <select
                name="field"
                className="border-0 bg-transparent px-4 py-3.5 text-sm text-slate-600 focus:outline-none"
              >
                <option value="all">All Fields</option>
                <option value="title">Title</option>
                <option value="author">Author</option>
                <option value="doi">DOI</option>
              </select>
              <button
                type="submit"
                className="m-1.5 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Featured Journals */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Featured Journals
              </h2>
              <div className="mt-1 h-1 w-16 rounded-full bg-cyan-500" />
            </div>
            <Link
              href="/journals"
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
            >
              View All Journals →
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredJournals.map((j) => (
              <div
                key={j.id}
                className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
              >
                <div
                  className={`flex h-36 items-end bg-gradient-to-br ${j.color} p-4`}
                >
                  <div className="rounded bg-white/20 px-2 py-1 text-[10px] font-medium text-white backdrop-blur">
                    Cover
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-sm font-semibold leading-snug text-slate-900 group-hover:text-indigo-700">
                    {j.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">ISSN: {j.issn}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                      {j.category}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${j.modeColor}`}
                    >
                      {j.mode}
                    </span>
                  </div>
                  <p className="mt-3 text-xs text-slate-500">
                    Latest Issue: {j.latest}
                  </p>
                  <Link
                    href={`/journals/${j.id}`}
                    className="mt-4 inline-flex text-xs font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    View Journal →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Three feature cards */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/80 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white text-xl">
                ✓
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                Ready to publish your research?
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Submit your manuscript, monitor peer review, respond to revisions and
                track publication from one dashboard.
              </p>
              <Link
                href="/submit"
                className="mt-5 inline-flex rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500"
              >
                Submit Manuscript
              </Link>
            </div>

            <div className="rounded-2xl border border-violet-100 bg-violet-50/80 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-500 text-white text-xl">
                🤖
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                AI-Assisted Publishing
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Our AI tools help authors and editors with manuscript completeness,
                language, metadata, journal scope and reviewer matching while keeping
                editorial decisions in human hands.
              </p>
              <Link
                href="/about#ai"
                className="mt-5 inline-flex rounded-md bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-500"
              >
                Learn More
              </Link>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-blue-50/80 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white text-xl">
                👥
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                For Reviewers & Editors
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Efficient tools for peer review management, editorial workflows and
                decision tracking.
              </p>
              <Link
                href="/dashboard/reviewer"
                className="mt-5 inline-flex rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
              >
                Join as Reviewer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Research */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Latest Research
              </h2>
              <div className="mt-1 h-1 w-16 rounded-full bg-cyan-500" />
            </div>
            <Link
              href="/journals"
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
            >
              View All Articles →
            </Link>
          </div>

          <div className="mt-10 space-y-4">
            {latestArticles.map((a) => (
              <div
                key={a.id}
                className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
              >
                <div
                  className={`h-20 w-full shrink-0 rounded-lg bg-gradient-to-br ${a.gradient} sm:h-24 sm:w-32`}
                />
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-semibold text-slate-900 leading-snug">
                    {a.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">{a.authors}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{a.journal}</p>
                </div>
                <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
                  <span className="text-xs text-slate-500">{a.date}</span>
                  <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-mono text-slate-600">
                    DOI {a.doi}
                  </span>
                  <Link
                    href={`/articles/${a.id}`}
                    className="inline-flex items-center rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Read Article ↗
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/journals"
              className="inline-flex rounded-md border border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              View More Articles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
