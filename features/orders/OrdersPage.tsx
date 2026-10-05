'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { formatCurrency } from '@/lib/utils';
import OrderHeader from './OrderHeader';
import OrderFilters from './OrderFilters';
import OrderTable from './OrderTable';
import Pagination from '@/components/shared/Pagination';
import { useOrders } from './hooks/useOrders';
import { useDeleteOrder } from './hooks/useDeleteOrder';
import { OrderStatus } from './types';

export default function OrdersPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [paymentFilter, setPaymentFilter] = useState('Payment Status');
  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const { data, isLoading, isError } = useOrders({
    status: statusFilter !== 'All Statuses' ? (statusFilter.toLowerCase() as OrderStatus) : undefined,
    search: searchTerm,
    page: currentPage,
    limit: pageSize,
  });

  const orders = data?.data ?? [];
  const totalCount = data?.meta?.totalCount ?? data?.meta?.total ?? 0;
  const totalPages = data?.meta?.totalPages ?? 1;

  // Filter orders if search term provided
  const filteredOrders = orders.filter((ord) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      ord.id.toLowerCase().includes(term) ||
      (ord.customer?.companyName ?? '').toLowerCase().includes(term) ||
      (ord.customer?.contactName ?? '').toLowerCase().includes(term)
    );
  });

  // Selection Handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredOrders.map((o) => o.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isAllSelected =
    filteredOrders.length > 0 &&
    filteredOrders.every((o) => selectedIds.includes(o.id));

  const { mutate: deleteOrder } = useDeleteOrder();

  const handleDeleteOrder = (id: string) => {
    deleteOrder(id, {
      onSuccess: () => {
        setSelectedIds((prev) => prev.filter((item) => item !== id));
        setActiveDropdown(null);
      },
    });
  };

  const handleDeleteSelected = () => {
    selectedIds.forEach((id) => {
      deleteOrder(id, {
        onSuccess: () => {
          setSelectedIds((prev) => prev.filter((item) => item !== id));
        },
      });
    });
  };

  const handleSort = () => {
    
  };

  if (isLoading) {
    return (
      <main className="space-y-6 max-w-7xl mx-auto pb-10">
        <OrderHeader />
        <div className="flex items-center justify-center py-24 text-slate-400 text-sm">
          Loading orders…
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="space-y-6 max-w-7xl mx-auto pb-10">
        <OrderHeader />
        <div className="flex items-center justify-center py-24 text-red-500 text-sm">
          Failed to load orders. Please try again.
        </div>
      </main>
    );
  }

  return (
    <main className="space-y-6 max-w-7xl mx-auto pb-10">
      <OrderHeader />

      <OrderFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        paymentFilter={paymentFilter}
        setPaymentFilter={setPaymentFilter}
        dateRange={dateRange}
        setDateRange={setDateRange}
        showMoreFilters={showMoreFilters}
        setShowMoreFilters={setShowMoreFilters}
        onResetFilters={() => {
          setSearchTerm('');
          setStatusFilter('All Statuses');
          setPaymentFilter('Payment Status');
          setDateRange('Last 30 Days');
        }}
        onPageReset={() => setCurrentPage(1)}
      />

      <div className="bg-white border border-border rounded-2xl shadow-2xs overflow-hidden">
        <OrderTable
          orders={filteredOrders}
          selectedIds={selectedIds}
          isAllSelected={isAllSelected}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          onSelectAll={handleSelectAll}
          onSelectOne={handleSelectOne}
          onSort={handleSort}
          onViewOrder={(order) => router.push(`/orders/${order.id}`)}
          onEditOrder={(order) => router.push(`/orders/${order.id}/edit`)}
          onDeleteOrder={handleDeleteOrder}
          onDeleteSelected={handleDeleteSelected}
          formatCurrency={formatCurrency}
        />

        <Pagination
          currentPage={data?.meta?.page ?? currentPage}
          totalPages={totalPages}
          totalFilteredCount={totalCount}
          pageSize={data?.meta?.limit ?? pageSize}
          onPageChange={setCurrentPage}
          entityLabel="orders"
        />
      </div>
    </main>
  );
}
