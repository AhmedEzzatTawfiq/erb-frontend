'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';

interface SupplierHeaderProps {
  onAddSupplier: () => void;
}

export default function SupplierHeader({ onAddSupplier }: SupplierHeaderProps) {
  return (
    <PageHeader
      title="Suppliers"
      subtitle="Manage your vendor relationships and procurement."
      actions={
        <button
          type="button"
          onClick={onAddSupplier}
          className="btn-primary text-xs sm:text-sm font-semibold shadow-xs hover:shadow transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Supplier</span>
        </button>
      }
    />
  );
};
