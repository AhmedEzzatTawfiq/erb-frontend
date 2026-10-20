
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  LayoutDashboard,
  RefreshCw,
} from 'lucide-react';

interface DashboardErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function DashboardError({
  error,
  reset,
}: DashboardErrorProps) {
  useEffect(() => {
    console.error('Dashboard error:', error);
  }, [error]);

  return (
    <main
      className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-6 py-12"
      dir="ltr"
    >
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
          <AlertTriangle size={32} />
        </div>

        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-amber-600">
          Something went wrong
        </p>

        <h1 className="mb-3 text-2xl font-bold text-slate-900">
          We couldn&apos;t load this page
        </h1>

        <p className="mb-8 text-sm leading-6 text-slate-500">
          An unexpected error occurred. You can try again or return to
          your dashboard.
        </p>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <RefreshCw size={17} />
            Try Again
          </button>

          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <LayoutDashboard size={17} />
            Dashboard
          </Link>
        </div>

        {error.digest && (
          <p className="mt-6 text-xs text-slate-400">
            Reference ID: {error.digest}
          </p>
        )}
      </div>
    </main>
  );
}
