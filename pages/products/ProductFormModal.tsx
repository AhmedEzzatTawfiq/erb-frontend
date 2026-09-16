'use client';

import React from 'react';
import { Product } from './types';
import Modal from '@/components/shared/Modal';

interface ProductFormModalProps {
  isOpen: boolean;
  editProduct: Product | null;
  formData: {
    name: string;
    sku: string;
    category: Product['category'];
    price: number;
    stock: number;
    stockStatus: Product['stockStatus'];
    description: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      sku: string;
      category: Product['category'];
      price: number;
      stock: number;
      stockStatus: Product['stockStatus'];
      description: string;
    }>
  >;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function ProductFormModal({
  isOpen,
  editProduct,
  formData,
  setFormData,
  onClose,
  onSubmit,
}: ProductFormModalProps) {
  return (
    <Modal
      isOpen={isOpen || !!editProduct}
      onClose={onClose}
      title={
        <h3 className="text-lg font-bold text-text-main">
          {editProduct ? 'Edit Product' : 'Add New Product'}
        </h3>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-text-secondary block mb-1">
            Product Name *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            placeholder="e.g. Industrial Router Series X"
            className="w-full px-3.5 py-2 text-sm bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-text-secondary block mb-1">
              SKU Code *
            </label>
            <input
              type="text"
              required
              value={formData.sku}
              onChange={(e) =>
                setFormData({ ...formData, sku: e.target.value })
              }
              placeholder="NET-RT-X900"
              className="w-full px-3.5 py-2 text-sm bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-text-secondary block mb-1">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value as Product['category'],
                })
              }
              className="w-full px-3.5 py-2 text-sm bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="Networking">Networking</option>
              <option value="Hardware">Hardware</option>
              <option value="Storage">Storage</option>
              <option value="Peripherals">Peripherals</option>
              <option value="Electronics">Electronics</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-text-secondary block mb-1">
              Price ($) *
            </label>
            <input
              type="number"
              step="0.01"
              required
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: Number(e.target.value) })
              }
              className="w-full px-3.5 py-2 text-sm bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-text-secondary block mb-1">
              Stock Quantity *
            </label>
            <input
              type="number"
              required
              value={formData.stock}
              onChange={(e) =>
                setFormData({ ...formData, stock: Number(e.target.value) })
              }
              className="w-full px-3.5 py-2 text-sm bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-text-secondary block mb-1">
              Stock Status
            </label>
            <select
              value={formData.stockStatus}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  stockStatus: e.target.value as Product['stockStatus'],
                })
              }
              className="w-full px-3.5 py-2 text-sm bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-text-secondary block mb-1">
            Description
          </label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Short description of the product spec..."
            className="w-full px-3.5 py-2 text-sm bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="pt-4 border-t border-border flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-text-secondary hover:bg-slate-100 rounded-xl"
          >
            Cancel
          </button>
          <button type="submit" className="btn-primary text-sm font-semibold">
            {editProduct ? 'Save Changes' : 'Create Product'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
