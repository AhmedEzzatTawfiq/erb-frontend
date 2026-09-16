'use client';

import React, { useState, useMemo } from 'react';
import { Product } from './types';
import { formatCurrency } from '@/lib/utils';
import { INITIAL_PRODUCTS } from './mockData';
import ProductHeader from './ProductHeader';
import ProductFilters from './ProductFilters';
import ProductTable from './ProductTable';
import ProductPagination from './ProductPagination';
import ProductFormModal from './ProductFormModal';
import ProductDetailsModal from './ProductDetailsModal';

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

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewProduct, setViewProduct] = useState<Product | null>(null);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: 'Networking' as Product['category'],
    price: 0,
    stock: 0,
    stockStatus: 'In Stock' as Product['stockStatus'],
    description: '',
  });

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

  // Add / Edit Handlers
  const handleOpenAddModal = () => {
    setFormData({
      name: '',
      sku: '',
      category: 'Networking',
      price: 0,
      stock: 0,
      stockStatus: 'In Stock',
      description: '',
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setEditProduct(product);
    setFormData({
      name: product.name,
      sku: product.sku,
      category: product.category,
      price: product.price,
      stock: product.stock,
      stockStatus: product.stockStatus,
      description: product.description || '',
    });
    setActiveDropdown(null);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.sku) return;

    let computedStatus: Product['stockStatus'] = formData.stockStatus;
    if (formData.stock <= 0) {
      computedStatus = 'Out of Stock';
    } else if (formData.stock <= 15 && computedStatus !== 'Out of Stock') {
      computedStatus = 'Low Stock';
    }

    if (editProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editProduct.id
            ? {
                ...p,
                name: formData.name,
                sku: formData.sku,
                category: formData.category,
                price: Number(formData.price),
                stock: Number(formData.stock),
                stockStatus: computedStatus,
                description: formData.description,
              }
            : p
        )
      );
      setEditProduct(null);
    } else {
      const newProd: Product = {
        id: `prod-${Date.now()}`,
        name: formData.name,
        sku: formData.sku,
        category: formData.category,
        price: Number(formData.price),
        stock: Number(formData.stock),
        stockStatus: computedStatus,
        description: formData.description,
        image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=120',
      };
      setProducts((prev) => [newProd, ...prev]);
      setIsAddModalOpen(false);
    }
  };

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
      <ProductHeader onAddProduct={handleOpenAddModal} />

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
          onViewProduct={setViewProduct}
          onEditProduct={handleOpenEditModal}
          onDeleteProduct={handleDeleteProduct}
          onDeleteSelected={handleDeleteSelected}
          formatCurrency={formatCurrency}
        />

        <ProductPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalFilteredCount={filteredProducts.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      </div>

      <ProductFormModal
        isOpen={isAddModalOpen}
        editProduct={editProduct}
        formData={formData}
        setFormData={setFormData}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditProduct(null);
        }}
        onSubmit={handleSaveProduct}
      />

      <ProductDetailsModal
        product={viewProduct}
        onClose={() => setViewProduct(null)}
        onEdit={handleOpenEditModal}
        formatCurrency={formatCurrency}
      />
    </main>
  );
};
