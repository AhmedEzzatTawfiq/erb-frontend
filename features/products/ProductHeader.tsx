'use client';

import React from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';

interface ProductHeaderProps {
  onAddProduct?: () => void;
}

export default function ProductHeader({ onAddProduct }: ProductHeaderProps) {
  return (
    <PageHeader
      title="Products"
      subtitle="Manage your product catalog and stock levels."
      actions={
        <Link
          href="/products/create"
          onClick={() => {
            if (onAddProduct) onAddProduct();
          }}
          className="btn-primary text-xs sm:text-sm font-semibold shadow-xs hover:shadow transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </Link>
      }
    />
  );
};
