'use client';

import React, { useState } from 'react';
import { formatCurrency } from '@/lib/utils';
import ProductHeader from './ProductHeader';
import ProductFilters from './ProductFilters';
import ProductTable from './ProductTable';
import Pagination from '@/components/shared/Pagination';
import { useProducts } from './hooks/useProducts';
import { useDeleteProduct } from './hooks/useDeleteProduct';

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [lowStock, setLowStock] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Sorting
  const [sortField, setSortField] = useState<'name' | 'category' | 'price' | 'stock'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  const {
    data,
    isLoading,
    isError,
  } = useProducts({
    page: currentPage,
    limit: pageSize,
    search: searchTerm,
    categoryId: categoryId || undefined,
    lowStock: lowStock || undefined,
    sortField,
    sortOrder,
  });

  const products = data?.data ?? [];
  const totalCount = data?.meta?.total ?? 0;
  const totalPages = data?.meta?.totalPages ?? 1;

  // Selection Handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(products.map((p) => p.id));
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
    products.length > 0 &&
    products.every((p) => selectedIds.includes(p.id));

  const { mutate: deleteProduct } = useDeleteProduct();

  const handleDeleteProduct = (id: string) => {
    deleteProduct(id, {
      onSuccess: () => {
        setSelectedIds((prev) => prev.filter((item) => item !== id));
        setActiveDropdown(null);
      },
    });
  };

  const handleDeleteSelected = () => {
    selectedIds.forEach((id) => {
      deleteProduct(id, {
        onSuccess: () => {
          setSelectedIds((prev) => prev.filter((item) => item !== id));
          setActiveDropdown(null);
        },
      });
    });
  };

  const handleSort = (field: 'name' | 'category' | 'price' | 'stock') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return (
    <main className="space-y-6 max-w-7xl mx-auto pb-10">
      <ProductHeader />

      <ProductFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        lowStock={lowStock}
        setLowStock={setLowStock}
        showMoreFilters={showMoreFilters}
        setShowMoreFilters={setShowMoreFilters}
        onResetFilters={() => {
          setSearchTerm('');
          setCategoryId('');
          setLowStock(false);
        }}
        onPageReset={() => setCurrentPage(1)}
      />

      <div className="bg-white border border-border rounded-2xl shadow-2xs overflow-hidden">
        {isLoading && (
          <div className="py-16 flex flex-col items-center gap-3 text-text-secondary">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-medium">Loading products…</span>
          </div>
        )}
        {isError && (
          <div className="py-16 text-center text-sm text-red-500 font-medium">
            Failed to load products. Please try again.
          </div>
        )}
        {!isLoading && !isError && (
          <>
            <ProductTable
              products={products}
              selectedIds={selectedIds}
              isAllSelected={isAllSelected}
              activeDropdown={activeDropdown}
              setActiveDropdown={setActiveDropdown}
              onSelectAll={handleSelectAll}
              onSelectOne={handleSelectOne}
              onSort={handleSort}
              onViewProduct={() => {}}
              onEditProduct={() => {}}
              onDeleteProduct={handleDeleteProduct}
              onDeleteSelected={handleDeleteSelected}
              formatCurrency={formatCurrency}
            />

            <Pagination
              currentPage={data?.meta?.page ?? currentPage}
              totalPages={totalPages}
              totalFilteredCount={totalCount}
              pageSize={data?.meta?.limit ?? pageSize}
              onPageChange={setCurrentPage}
              entityLabel="products"
            />
          </>
        )}
      </div>
    </main>
  );
}
