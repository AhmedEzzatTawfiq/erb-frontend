'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';

interface OrderHeaderProps {
  onCreateOrder: () => void;
}

export default function OrderHeader({ onCreateOrder }: OrderHeaderProps) {
  return (
    <PageHeader
      title="Orders"
      subtitle="Track and manage customer orders and fulfillment."
      actions={
        <button
          type="button"
          onClick={onCreateOrder}
          className="btn-primary text-xs sm:text-sm font-semibold shadow-xs hover:shadow transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Create Order</span>
        </button>
      }
    />
  );
};
