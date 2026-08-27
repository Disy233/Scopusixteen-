import Link from "next/link";

export function Header() {
  return (
    <>
      {/* Top utility bar */}
      <div className="bg-slate-900 text-slate-300 text-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <a href="mailto:support@scopusixteen.com" className="hover:text-white">
              📧 support@scopusixteen.com
            </a>
            <a href="tel:+2348091234567" className="hover:text-white hidden sm:inline">
              📞 +234 809 123 4567
            </a>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <Link href="/login" className="hover:text-white">
              Author Login
            </Link>
            <Link href="/login" className="hover:text-white hidden sm:inline">
              Reviewer Login
            </Link>
            <Link href="/login" className="hover:text-white hidden md:inline">
              Editor Login
            </Link>
            <Link href="/login" className="hover:text-white hidden lg:inline">
              Admin Login
            </Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-700 text-white font-bold text-sm leading-none">
              Si6
            </div>
            <div className="hidden sm:block">
              <div className="text-lg font-bold tracking-tight text-slate-900 leading-tight">
                SCOPUSIXTEEN
              </div>
              <div className="text-[10px] font-semibold tracking-widest text-indigo-600 uppercase">
                Publishing
              </div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-700">
            <Link href="/journals" className="hover:text-indigo-600">
              Journals ▾
            </Link>
            <Link href="/articles" className="hover:text-indigo-600">
              Articles
            </Link>
            <Link href="#" className="hover:text-indigo-600">
              Books
            </Link>
            <Link href="/subscribe" className="hover:text-indigo-600">
              Subscribe
            </Link>
            <Link href="/about" className="hover:text-indigo-600">
              About ▾
            </Link>
            <Link href="/submit" className="hover:text-indigo-600">
              For Authors ▾
            </Link>
            <Link href="/dashboard/reviewer" className="hover:text-indigo-600">
              For Reviewers ▾
            </Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/search"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50"
            >
              🔍 Search
            </Link>
            <Link
              href="/submit"
              className="inline-flex items-center rounded-md bg-indigo-700 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-600"
            >
              Submit Manuscript
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Login
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
