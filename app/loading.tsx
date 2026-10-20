
import { LoaderCircle } from 'lucide-react';

export default function DashboardLoading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
      <LoaderCircle className="h-8 w-8 animate-spin text-blue-600" />

      <p className="text-sm text-gray-500">
        Loading, please wait...
      </p>
    </div>
  );
}
