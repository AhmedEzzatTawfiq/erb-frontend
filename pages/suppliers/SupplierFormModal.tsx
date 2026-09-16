'use client';

import React from 'react';
import { Supplier } from './types';
import Modal from '@/components/shared/Modal';

const PRODUCT_OPTIONS = [
  'Electronics',
  'Hardware',
  'Software',
  'Raw Materials',
  'Packaging',
  'Networking',
  'Storage',
  'Peripherals',
  'Shipping',
  'Chemicals',
  'Metals',
  'Lab Supplies',
  'Labels',
  'Cloud',
];

interface SupplierFormModalProps {
  isOpen: boolean;
  editSupplier: Supplier | null;
  formData: {
    companyName: string;
    contactName: string;
    email: string;
    phone: string;
    status: 'Active' | 'Inactive' | 'Pending';
    productsSupplied: string[];
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      companyName: string;
      contactName: string;
      email: string;
      phone: string;
      status: 'Active' | 'Inactive' | 'Pending';
      productsSupplied: string[];
    }>
  >;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function SupplierFormModal({
  isOpen,
  editSupplier,
  formData,
  setFormData,
  onClose,
  onSubmit,
}: SupplierFormModalProps) {
  const toggleProduct = (product: string) => {
    setFormData((prev) => ({
      ...prev,
      productsSupplied: prev.productsSupplied.includes(product)
        ? prev.productsSupplied.filter((p) => p !== product)
        : [...prev.productsSupplied, product],
    }));
  };

  return (
    <Modal
      isOpen={isOpen || !!editSupplier}
      onClose={onClose}
      title={
        <h3 className="text-lg font-bold text-text-main">
          {editSupplier ? 'Edit Supplier' : 'Add New Supplier'}
        </h3>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-text-secondary block mb-1">
            Company Name *
          </label>
          <input
            type="text"
            required
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            placeholder="e.g. Acme Corp"
            className="w-full px-3.5 py-2 text-sm bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-text-secondary block mb-1">
            Contact Person *
          </label>
          <input
            type="text"
            required
            value={formData.contactName}
            onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
            placeholder="e.g. Jane Doe"
            className="w-full px-3.5 py-2 text-sm bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-text-secondary block mb-1">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="jane.doe@acme.com"
              className="w-full px-3.5 py-2 text-sm bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-text-secondary block mb-1">
              Phone Number
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (555) 123-4567"
              className="w-full px-3.5 py-2 text-sm bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-text-secondary block mb-1">
            Status
          </label>
          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({
                ...formData,
                status: e.target.value as 'Active' | 'Inactive' | 'Pending',
              })
            }
            className="w-full px-3.5 py-2 text-sm bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-text-secondary block mb-2">
            Products Supplied
          </label>
          <div className="flex flex-wrap gap-2">
            {PRODUCT_OPTIONS.map((product) => {
              const selected = formData.productsSupplied.includes(product);
              return (
                <button
                  key={product}
                  type="button"
                  onClick={() => toggleProduct(product)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
                    selected
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-text-secondary border-border hover:border-primary/50 hover:text-text-main'
                  }`}
                >
                  {product}
                </button>
              );
            })}
          </div>
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
            {editSupplier ? 'Save Changes' : 'Create Supplier'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
