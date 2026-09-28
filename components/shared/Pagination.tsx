import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalFilteredCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  entityLabel?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalFilteredCount,
  pageSize,
  onPageChange,
  entityLabel = 'entries',
}: PaginationProps) {
  const startEntry = totalFilteredCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endEntry = Math.min(currentPage * pageSize, totalFilteredCount);

  return (
    <div className="p-4 sm:p-5 border-t border-border bg-[#F8FAFC]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <p className="text-xs sm:text-sm text-text-secondary font-medium">
        Showing <span className="font-bold text-text-main">{startEntry}</span> to{' '}
        <span className="font-bold text-text-main">{endEntry}</span> of{' '}
        <span className="font-bold text-text-main">{totalFilteredCount}</span> {entityLabel}
      </p>

      <div className="flex items-center gap-1.5 self-end sm:self-auto">
        {/* Previous */}
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="w-8 h-8 flex items-center justify-center text-sm bg-white border border-border
           rounded-lg text-text-secondary hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Page Buttons */}
        {Array.from(
          { length: totalPages },
          (_, i) => i + 1
        ).map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`w-8 h-8 flex items-center justify-center text-sm font-semibold rounded-lg transition-all shadow-2xs ${currentPage === pageNum
              ? 'bg-primary text-white shadow-xs'
              : 'bg-white border border-border text-text-secondary hover:bg-slate-50'
              }`}
          >
            {pageNum}
          </button>
        ))}

        {/* Next */}
        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="w-8 h-8 flex items-center justify-center text-sm bg-white border border-border rounded-lg
           text-text-secondary hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
