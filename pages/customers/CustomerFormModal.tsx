'use client';

import React from 'react';
import { Customer } from './types';
import Modal from '@/components/shared/Modal';

interface CustomerFormModalProps {
  isOpen: boolean;
  editCustomer: Customer | null;
  formData: {
    companyName: string;
    contactName: string;
    email: string;
    phone: string;
    status: 'Active' | 'Inactive';
    orders: number;
    totalSpent: number;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      companyName: string;
      contactName: string;
      email: string;
      phone: string;
      status: 'Active' | 'Inactive';
      orders: number;
      totalSpent: number;
    }>
  >;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function CustomerFormModal({
  isOpen,
  editCustomer,
  formData,
  setFormData,
  onClose,
  onSubmit,
}: CustomerFormModalProps) {
  return (
    <Modal
      isOpen={isOpen || !!editCustomer}
      onClose={onClose}
      title={
        <h3 className="text-lg font-bold text-text-main">
          {editCustomer ? 'Edit Customer' : 'Add New Customer'}
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
            onChange={(e) =>
              setFormData({ ...formData, companyName: e.target.value })
            }
            placeholder="e.g. Acme Corporation"
            className="w-full px-3.5 py-2 text-sm bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-text-secondary block mb-1">
            Primary Contact Name *
          </label>
          <input
            type="text"
            required
            value={formData.contactName}
            onChange={(e) =>
              setFormData({ ...formData, contactName: e.target.value })
            }
            placeholder="e.g. Robert Chen"
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
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="robert.c@acme.inc"
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
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="+1 (555) 019-2834"
              className="w-full px-3.5 py-2 text-sm bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-text-secondary block mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as 'Active' | 'Inactive',
                })
              }
              className="w-full px-3.5 py-2 text-sm bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-text-secondary block mb-1">
              Total Orders
            </label>
            <input
              type="number"
              value={formData.orders}
              onChange={(e) =>
                setFormData({ ...formData, orders: Number(e.target.value) })
              }
              className="w-full px-3.5 py-2 text-sm bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-text-secondary block mb-1">
              Total Spent ($)
            </label>
            <input
              type="number"
              value={formData.totalSpent}
              onChange={(e) =>
                setFormData({ ...formData, totalSpent: Number(e.target.value) })
              }
              className="w-full px-3.5 py-2 text-sm bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
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
            {editCustomer ? 'Save Changes' : 'Create Customer'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
