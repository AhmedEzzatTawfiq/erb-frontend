'use client';

import React from 'react';
import Link from 'next/link';
import { UserPlus, ShoppingBag, Handshake, Truck, Package } from 'lucide-react';

interface DashboardQuickActionsProps {
  onAddUser?: () => void;
  onCreateOrder?: () => void;
  onCreateProduct?: () => void;
  onCreateCustomer?: () => void;
  onCreateSupplier?: () => void;
}

export default function DashboardQuickActions({
  onAddUser,
  onCreateOrder,
  onCreateProduct,
  onCreateCustomer,
  onCreateSupplier,
}: DashboardQuickActionsProps) {
  return (
    <div className="bg-white border border-border rounded-xl p-5 shadow-xs flex flex-col h-fit self-start">
      <h3 className="text-base font-bold text-text-main mb-4">Quick Actions</h3>

      <div className="space-y-3">
        <Link
          href="/users/create"
          onClick={() => { if (onAddUser) onAddUser(); }}
          className="w-full py-2.5 px-4 border border-border rounded-lg text-sm font-semibold text-text-main hover:bg-border-subtle flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <UserPlus className="w-4 h-4 text-text-secondary" />
          <span>Add User</span>
        </Link>

        <Link
          href="/customers/create"
          onClick={() => { if (onCreateCustomer) onCreateCustomer(); }}
          className="w-full py-2.5 px-4 border border-border rounded-lg text-sm font-semibold text-text-main hover:bg-border-subtle flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <Handshake className="w-4 h-4" />
          <span>Add Customer</span>
        </Link>

        <Link
          href="/suppliers/create"
          onClick={() => { if (onCreateSupplier) onCreateSupplier(); }}
          className="w-full py-2.5 px-4 border border-border rounded-lg text-sm font-semibold text-text-main hover:bg-border-subtle flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <Truck className="w-4 h-4" />
          <span>Add Supplier</span>
        </Link>

        <Link
          href="/products/create"
          onClick={() => { if (onCreateProduct) onCreateProduct(); }}
          className="w-full py-2.5 px-4 border border-border rounded-lg text-sm font-semibold text-text-main hover:bg-border-subtle flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <Package className="w-4 h-4" />
          <span>Add Product</span>
        </Link>

         <Link
          href="/orders/create"
          onClick={() => { if (onCreateOrder) onCreateOrder(); }}
          className="w-full py-2.5 px-4 border border-border rounded-lg text-sm font-semibold text-text-main hover:bg-border-subtle flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Create Order</span>
        </Link>

      </div>

    </div>
  );
}

