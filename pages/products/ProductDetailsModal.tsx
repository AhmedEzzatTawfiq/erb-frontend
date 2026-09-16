'use client';

import React from 'react';
import { Product } from './types';
import { Package, Pencil } from 'lucide-react';
import Modal from '@/components/shared/Modal';

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
  onEdit: (product: Product) => void;
  formatCurrency: (val: number) => string;
}

export default function ProductDetailsModal({
  product,
  onClose,
  onEdit,
  formatCurrency,
}: ProductDetailsModalProps) {
  if (!product) return null;

  return (
    <Modal
      isOpen={!!product}
      onClose={onClose}
      title={
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-xl border border-border overflow-hidden bg-slate-100 flex items-center justify-center shrink-0">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <Package className="w-7 h-7 text-text-muted" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-bold text-text-main">
              {product.name}
            </h3>
            <p className="text-xs text-text-secondary">
              SKU: {product.sku}
            </p>
          </div>
        </div>
      }
      footer={
        <>
          <button
            type="button"
            onClick={() => {
              const current = product;
              onClose();
              onEdit(current);
            }}
            className="btn-secondary text-sm font-semibold"
          >
            <Pencil className="w-4 h-4" />
            Edit Product
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
        <div className="grid grid-cols-3 gap-3 p-3 bg-app-bg rounded-xl border border-border">
          <div>
            <span className="text-xs text-text-secondary block font-medium">Category</span>
            <span className="font-semibold text-text-main mt-0.5 block">
              {product.category}
            </span>
          </div>
          <div>
            <span className="text-xs text-text-secondary block font-medium">Price</span>
            <span className="font-bold text-primary mt-0.5 block">
              {formatCurrency(product.price)}
            </span>
          </div>
          <div>
            <span className="text-xs text-text-secondary block font-medium">Stock Status</span>
            <span className="font-semibold text-text-main mt-0.5 block">
              {product.stockStatus} ({product.stock})
            </span>
          </div>
        </div>

        {product.description && (
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider">
              Description
            </h4>
            <p className="text-sm text-text-main leading-relaxed bg-slate-50/60 p-3 rounded-xl border border-border">
              {product.description}
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
};
