'use client';

import React from 'react';
import { Customer } from './types';
import {
  Building2,
  Mail,
  Phone,
  ShoppingBag,
  DollarSign,
  CheckCircle2,
  XCircle,
  Pencil
} from 'lucide-react';
import Modal from '@/components/shared/Modal';

interface CustomerDetailsModalProps {
  customer: Customer | null;
  onClose: () => void;
  onEdit: (customer: Customer) => void;
  formatCurrency: (val: number) => string;
}

export default function CustomerDetailsModal({
  customer,
  onClose,
  onEdit,
  formatCurrency,
}: CustomerDetailsModalProps) {
  if (!customer) return null;

  return (
    <Modal
      isOpen={!!customer}
      onClose={onClose}
      title={
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full border border-border overflow-hidden bg-slate-100 flex items-center justify-center shrink-0">
            {customer.avatar ? (
              <img
                src={customer.avatar}
                alt={customer.companyName}
                className="w-full h-full object-cover"
              />
            ) : (
              <span
                className={`text-sm font-bold w-full h-full flex items-center justify-center ${
                  customer.initialsBg || 'bg-blue-100 text-blue-700'
                }`}
              >
                {customer.initials}
              </span>
            )}
          </div>
          <div>
            <h3 className="text-lg font-bold text-text-main">
              {customer.companyName}
            </h3>
            <p className="text-xs text-text-secondary">
              Customer ID: {customer.id}
            </p>
          </div>
        </div>
      }
      footer={
        <>
          <button
            type="button"
            onClick={() => {
              const current = customer;
              onClose();
              onEdit(current);
            }}
            className="btn-secondary text-sm font-semibold"
          >
            <Pencil className="w-4 h-4" />
            Edit Details
          </button>
          <button
            type="button"
            onClick={onClose}
            className="btn-primary text-sm font-semibold"
          >
            Close
          </button>
        </>
      }
    >
      <div className="space-y-4 text-sm">
        <div className="grid grid-cols-2 gap-3 p-3 bg-app-bg rounded-xl border border-border">
          <div>
            <span className="text-xs text-text-secondary block font-medium">Status</span>
            <span className="font-semibold text-text-main flex items-center gap-1 mt-0.5">
              {customer.status === 'Active' ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Active
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-gray-400" /> Inactive
                </>
              )}
            </span>
          </div>
          <div>
            <span className="text-xs text-text-secondary block font-medium">Member Since</span>
            <span className="font-semibold text-text-main mt-0.5 block">
              {customer.joinedDate}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider">
            Contact Information
          </h4>
          <div className="space-y-1.5 text-text-main font-medium">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-text-muted" />
              <span>Primary Contact: {customer.contactName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-text-muted" />
              <a href={`mailto:${customer.email}`} className="text-primary hover:underline">
                {customer.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-text-muted" />
              <span>{customer.phone}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2 pt-2 border-t border-border">
          <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider">
            Financial Overview
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100">
              <span className="text-xs font-semibold text-blue-700 flex items-center gap-1">
                <ShoppingBag className="w-3.5 h-3.5" /> Total Orders
              </span>
              <span className="text-xl font-bold text-text-main mt-1 block">
                {customer.orders}
              </span>
            </div>
            <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
              <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5" /> Total Spent
              </span>
              <span className="text-xl font-bold text-text-main mt-1 block">
                {formatCurrency(customer.totalSpent)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
