'use client';

import React from 'react';
import { Plus, Download } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';

interface EmployeeHeaderProps {
  onAddEmployee: () => void;
}

export default function EmployeeHeader({ onAddEmployee }: EmployeeHeaderProps) {
  return (
    <PageHeader
      title="Employees"
      subtitle="Manage your organizational workforce and access records."
      actions={
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="btn-secondary text-xs sm:text-sm font-semibold shadow-xs hover:shadow transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button
            type="button"
            onClick={onAddEmployee}
            className="btn-primary text-xs sm:text-sm font-semibold shadow-xs hover:shadow transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Employee</span>
          </button>
        </div>
      }
    />
  );
};
