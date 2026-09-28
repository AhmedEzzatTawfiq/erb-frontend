'use client';

import React, { useState, useMemo } from 'react';
import { Product } from './types';
import { formatCurrency } from '@/lib/utils';
import { INITIAL_PRODUCTS } from './mockData';
import ProductHeader from './ProductHeader';
import ProductFilters from './ProductFilters';
import ProductTable from './ProductTable';
import Pagination from '@/components/shared/Pagination';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [stockFilter, setStockFilter] = useState('Stock Status');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Sorting
  const [sortField, setSortField] = useState<'name' | 'category' | 'price' | 'stock'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  // Filter & Sort
  const filteredProducts = useMemo(() => {
    return products
      .filter((prod) => {
        const matchesSearch =
          searchTerm === '' ||
          prod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          prod.sku.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory =
          categoryFilter === 'All Categories' || prod.category === categoryFilter;

        const matchesStock =
          stockFilter === 'Stock Status' || prod.stockStatus === stockFilter;

        return matchesSearch && matchesCategory && matchesStock;
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
  }, [products, searchTerm, categoryFilter, stockFilter, sortField, sortOrder]);

  // Paginated List
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, currentPage, pageSize]);

  // Selection Handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(paginatedProducts.map((p) => p.id));
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
    paginatedProducts.length > 0 &&
    paginatedProducts.every((p) => selectedIds.includes(p.id));

  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setSelectedIds((prev) => prev.filter((item) => item !== id));
    setActiveDropdown(null);
  };

  const handleDeleteSelected = () => {
    setProducts((prev) => prev.filter((p) => !selectedIds.includes(p.id)));
    setSelectedIds([]);
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
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        stockFilter={stockFilter}
        setStockFilter={setStockFilter}
        showMoreFilters={showMoreFilters}
        setShowMoreFilters={setShowMoreFilters}
        onResetFilters={() => {
          setSearchTerm('');
          setCategoryFilter('All Categories');
          setStockFilter('Stock Status');
        }}
        onPageReset={() => setCurrentPage(1)}
      />

      <div className="bg-white border border-border rounded-2xl shadow-2xs overflow-hidden">
        <ProductTable
          products={paginatedProducts}
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
          currentPage={currentPage}
          totalPages={totalPages}
          totalFilteredCount={filteredProducts.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          entityLabel="products"
        />
      </div>
    </main>
  );
};
