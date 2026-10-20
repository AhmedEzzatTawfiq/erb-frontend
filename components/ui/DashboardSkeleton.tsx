
export default function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="h-7 w-48 rounded-md bg-gray-200" />
        <div className="h-4 w-72 max-w-full rounded-md bg-gray-200" />
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-200 p-5"
          >
            <div className="h-4 w-24 rounded bg-gray-200" />
            <div className="mt-4 h-8 w-32 rounded bg-gray-200" />
            <div className="mt-3 h-3 w-20 rounded bg-gray-200" />
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-200 p-5"
          >
            <div className="h-5 w-40 rounded bg-gray-200" />
            <div className="mt-6 h-56 rounded-lg bg-gray-100" />
          </div>
        ))}
      </div>
    </div>
  );
}
