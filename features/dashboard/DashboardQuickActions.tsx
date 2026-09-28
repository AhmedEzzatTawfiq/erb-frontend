'use client';

import React from 'react';
import Link from 'next/link';
import { UserPlus, FilePlus, ShoppingBag } from 'lucide-react';

interface DashboardQuickActionsProps {
  onAddUser?: () => void;
  onCreateInvoice?: () => void;
  onCreateOrder?: () => void;
}

export default function DashboardQuickActions({
  onAddUser,
  onCreateInvoice,
  onCreateOrder,
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
          href="/invoices/create"
          onClick={() => { if (onCreateInvoice) onCreateInvoice(); }}
          className="w-full py-2.5 px-4 border border-border rounded-lg text-sm font-semibold text-text-main hover:bg-[#F8FAFC] flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <FilePlus className="w-4 h-4 text-text-secondary" />
          <span>Create Invoice</span>
        </Link>

        <Link
          href="/orders/create"
          onClick={() => { if (onCreateOrder) onCreateOrder(); }}
          className="w-full py-2.5 px-4 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors shadow-2xs cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Create Order</span>
        </Link>
      </div>

      <div className="pt-4 border-t border-border-subtle mt-4 flex items-center justify-between text-xs text-text-muted font-medium">
        <span>SYSTEM STATUS</span>
        <span className="flex items-center gap-1.5 text-success-text font-semibold">
          <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
          Operational
        </span>
      </div>
    </div>
  );
}
