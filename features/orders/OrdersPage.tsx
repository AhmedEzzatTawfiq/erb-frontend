'use client';

import React, { useState, useMemo } from 'react';
import { Order } from './types';
import { formatCurrency } from '@/lib/utils';
import { INITIAL_ORDERS } from './mockData';
import OrderHeader from './OrderHeader';
import OrderFilters from './OrderFilters';
import OrderTable from './OrderTable';
import Pagination from '@/components/shared/Pagination';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [paymentFilter, setPaymentFilter] = useState('Payment Status');
  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Sorting
  const [sortField, setSortField] = useState<'orderNumber' | 'date' | 'total' | 'items'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  // Filter & Sort
  const filteredOrders = useMemo(() => {
    return orders
      .filter((ord) => {
        const matchesSearch =
          searchTerm === '' ||
          ord.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ord.customer.name.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
          statusFilter === 'All Statuses' || ord.status === statusFilter;

        const matchesPayment =
          paymentFilter === 'Payment Status' || ord.paymentStatus === paymentFilter;

        return matchesSearch && matchesStatus && matchesPayment;
      })
      .sort((a, b) => {
        const valA = a[sortField];
        const valB = b[sortField];

        if (typeof valA === 'string' && typeof valB === 'string') {
          return sortOrder === 'asc'
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
        }
        return sortOrder === 'asc'
          ? (valA as number) - (valB as number)
          : (valB as number) - (valA as number);
      });
  }, [orders, searchTerm, statusFilter, paymentFilter, sortField, sortOrder]);

  // Paginated List
  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / pageSize));
  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredOrders.slice(start, start + pageSize);
  }, [filteredOrders, currentPage, pageSize]);

  // Selection Handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(paginatedOrders.map((o) => o.id));
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
    paginatedOrders.length > 0 &&
    paginatedOrders.every((o) => selectedIds.includes(o.id));

  const handleDeleteOrder = (id: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
    setSelectedIds((prev) => prev.filter((item) => item !== id));
    setActiveDropdown(null);
  };

  const handleDeleteSelected = () => {
    setOrders((prev) => prev.filter((o) => !selectedIds.includes(o.id)));
    setSelectedIds([]);
  };

  const handleSort = (field: 'orderNumber' | 'date' | 'total' | 'items') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

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
          orders={paginatedOrders}
          selectedIds={selectedIds}
          isAllSelected={isAllSelected}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          onSelectAll={handleSelectAll}
          onSelectOne={handleSelectOne}
          onSort={handleSort}
          onViewOrder={() => {}}
          onEditOrder={() => {}}
          onDeleteOrder={handleDeleteOrder}
          onDeleteSelected={handleDeleteSelected}
          formatCurrency={formatCurrency}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalFilteredCount={filteredOrders.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          entityLabel="orders"
        />
      </div>
    </main>
  );
}
