'use client';

import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  maxWidth?: string;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  footer,
  children,
  maxWidth = 'max-w-lg',
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className={`bg-white rounded-2xl ${maxWidth} w-full p-6 shadow-2xl border border-border relative`}>
        {/* Header */}
        {(title !== undefined) && (
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div className="flex-1 min-w-0">
              {title}
            </div>
            <button
              onClick={onClose}
              className="ml-3 p-1 rounded-lg text-text-muted hover:text-text-main hover:bg-slate-100 shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Body */}
        <div className={title !== undefined ? 'py-4' : ''}>
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="pt-4 border-t border-border flex items-center justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
