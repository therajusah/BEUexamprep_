import Link from "next/link";

export default function Header() {
  return (
    <header className="">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <Link className="block text-teal-600 dark:text-teal-600" href="/">
              <span className="sr-only">Home</span>
              <span className="text-2xl font-bold text-gray-100 transition-colors">
                BEUexamprep
              </span>
            </Link>
          </div>

          <div className="hidden md:block">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-sm font-semibold">
                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href="/notes"
                  >
                    Notes
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href="/pyqs"
                  >
                    PYQs
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href="/blogs"
                  >
                    Blogs
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href="/coding-practice"
                  >
                    Coding Practice
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/"
                    href="https://you-prep.vercel.app/"
                  >
                    AI Interview <sup className="italic">new</sup>
                  </Link>
                </li>

              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="block md:hidden">
              <button className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
