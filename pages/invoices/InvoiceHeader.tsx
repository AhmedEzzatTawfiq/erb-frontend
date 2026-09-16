'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';

interface InvoiceHeaderProps {
  onCreateInvoice: () => void;
}

export default function InvoiceHeader({ onCreateInvoice }: InvoiceHeaderProps) {
  return (
    <PageHeader
      title="Invoices"
      subtitle="Manage and track billing records."
      actions={
        <button
          type="button"
          onClick={onCreateInvoice}
          className="btn-primary text-xs sm:text-sm font-semibold shadow-xs hover:shadow transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Create Invoice</span>
        </button>
      }
    />
  );
};
