import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white text-xs font-bold">
                Si6
              </div>
              <div>
                <div className="text-base font-bold text-white leading-tight">
                  SCOPUSIXTEEN
                </div>
                <div className="text-[10px] font-semibold tracking-widest text-indigo-400 uppercase">
                  Publishing
                </div>
              </div>
            </div>
            <p className="mt-4 max-w-xs text-sm text-slate-400">
              Advancing Research. Connecting Knowledge. Building a better future.
            </p>
            <div className="mt-4 flex gap-3 text-slate-400">
              <a href="#" className="hover:text-white" aria-label="Facebook">f</a>
              <a href="#" className="hover:text-white" aria-label="Twitter">𝕏</a>
              <a href="#" className="hover:text-white" aria-label="LinkedIn">in</a>
              <a href="#" className="hover:text-white" aria-label="YouTube">▶</a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Explore</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/journals" className="hover:text-white">Journals</Link></li>
              <li><Link href="/journals" className="hover:text-white">Articles</Link></li>
              <li><Link href="#" className="hover:text-white">Books</Link></li>
              <li><Link href="/journals" className="hover:text-white">Latest Issues</Link></li>
              <li><Link href="/pricing" className="hover:text-white">Open Access</Link></li>
              <li><Link href="/subscribe" className="hover:text-white">Subscribe</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">For Authors</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white">Author Guidelines</Link></li>
              <li><Link href="/submit" className="hover:text-white">Submit Manuscript</Link></li>
              <li><Link href="/dashboard/author" className="hover:text-white">Track Submission</Link></li>
              <li><Link href="/pricing" className="hover:text-white">APC & Payments</Link></li>
              <li><Link href="/about" className="hover:text-white">Publishing Ethics</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">For Reviewers</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white">Reviewer Guidelines</Link></li>
              <li><Link href="/about" className="hover:text-white">Review Process</Link></li>
              <li><Link href="/login" className="hover:text-white">Reviewer Login</Link></li>
              <li><Link href="/about" className="hover:text-white">Recognition</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">About</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              <li><Link href="/about" className="hover:text-white">Editorial Board</Link></li>
              <li><Link href="/about" className="hover:text-white">Careers</Link></li>
              <li><Link href="/about" className="hover:text-white">News & Events</Link></li>
            </ul>
            <h3 className="mt-6 text-sm font-semibold text-white">Support</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white">Contact Us</Link></li>
              <li><Link href="/about" className="hover:text-white">FAQ</Link></li>
              <li><Link href="/about" className="hover:text-white">Help Center</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-700 pt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Scopusixteen Publishing. All Rights Reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="#" className="hover:text-slate-300">Privacy Policy</Link>
            <Link href="#" className="hover:text-slate-300">Terms of Use</Link>
            <Link href="/about" className="hover:text-slate-300">Publication Ethics</Link>
            <Link href="#" className="hover:text-slate-300">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
