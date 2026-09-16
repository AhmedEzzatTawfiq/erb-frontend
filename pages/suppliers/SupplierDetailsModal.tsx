'use client';

import React from 'react';
import { Supplier } from './types';
import {
  Building2,
  Mail,
  Phone,
  Package,
  CheckCircle2,
  XCircle,
  Clock,
  Pencil,
} from 'lucide-react';
import Modal from '@/components/shared/Modal';

interface SupplierDetailsModalProps {
  supplier: Supplier | null;
  onClose: () => void;
  onEdit: (supplier: Supplier) => void;
}

export default function SupplierDetailsModal({
  supplier,
  onClose,
  onEdit,
}: SupplierDetailsModalProps) {
  if (!supplier) return null;

  const StatusIcon = () => {
    if (supplier.status === 'Active')
      return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
    if (supplier.status === 'Pending')
      return <Clock className="w-4 h-4 text-amber-500" />;
    return <XCircle className="w-4 h-4 text-gray-400" />;
  };

  return (
    <Modal
      isOpen={!!supplier}
      onClose={onClose}
      title={
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full border border-border overflow-hidden bg-slate-100 flex items-center justify-center shrink-0">
            {supplier.avatar ? (
              <img
                src={supplier.avatar}
                alt={supplier.companyName}
                className="w-full h-full object-cover"
              />
            ) : (
              <span
                className={`text-sm font-bold w-full h-full flex items-center justify-center ${
                  supplier.initialsBg || 'bg-blue-100 text-blue-700'
                }`}
              >
                {supplier.initials}
              </span>
            )}
          </div>
          <div>
            <h3 className="text-lg font-bold text-text-main">{supplier.companyName}</h3>
            <p className="text-xs text-text-secondary">Supplier ID: {supplier.id}</p>
          </div>
        </div>
      }
      footer={
        <>
          <button
            type="button"
            onClick={() => {
              const current = supplier;
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
              <StatusIcon />
              {supplier.status}
            </span>
          </div>
          <div>
            <span className="text-xs text-text-secondary block font-medium">Partner Since</span>
            <span className="font-semibold text-text-main mt-0.5 block">{supplier.joinedDate}</span>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider">
            Contact Information
          </h4>
          <div className="space-y-1.5 text-text-main font-medium">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-text-muted" />
              <span>Contact Person: {supplier.contactName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-text-muted" />
              <a href={`mailto:${supplier.email}`} className="text-primary hover:underline">
                {supplier.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-text-muted" />
              <span>{supplier.phone}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2 pt-2 border-t border-border">
          <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider">
            Products Supplied
          </h4>
          <div className="flex flex-wrap gap-2">
            {supplier.productsSupplied.length === 0 ? (
              <p className="text-xs text-text-muted italic">No products listed.</p>
            ) : (
              supplier.productsSupplied.map((product) => (
                <span
                  key={product}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100"
                >
                  <Package className="w-3 h-3" />
                  {product}
                </span>
              ))
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
