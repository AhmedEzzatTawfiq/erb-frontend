'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';

interface CustomerHeaderProps {
  onAddCustomer: () => void;
}

export default function CustomerHeader({ onAddCustomer }: CustomerHeaderProps) {
  return (
    <PageHeader
      title="Customers"
      subtitle="Manage your customer relationships and order history."
      actions={
        <button
          type="button"
          onClick={onAddCustomer}
          className="btn-primary text-xs sm:text-sm font-semibold shadow-xs hover:shadow transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Customer</span>
        </button>
      }
    />
  );
};
