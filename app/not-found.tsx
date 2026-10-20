import GoBackButton from '@/components/shared/GoBackButton';
import Link from 'next/link';
import { Home, SearchX } from 'lucide-react';

export default function NotFound() {
  return (
    <main
      className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12"
      dir="ltr"
    >
      <div className="w-full max-w-lg text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
          <SearchX size={38} strokeWidth={1.7} />
        </div>

        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          Error 404
        </p>

        <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Page not found
        </h1>

        <p className="mx-auto mb-8 max-w-md text-sm leading-7 text-slate-500 sm:text-base">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
          It may have been moved, deleted, or the URL may be incorrect.
        </p>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <Home size={18} />
            Back to Dashboard
          </Link>

          <GoBackButton />
        </div>

        <p className="mt-10 text-xs text-slate-400">
          ERP Core · Enterprise Management System
        </p>
      </div>
    </main>
  );
}
