'use client';

import React from 'react';
import { User } from './types';
import Modal from '@/components/shared/Modal';

const ROLES = ['Admin', 'Manager', 'Editor', 'Viewer'] as const;
const STATUSES = ['Active', 'Inactive', 'Suspended'] as const;

interface UserFormModalProps {
  isOpen: boolean;
  editUser: User | null;
  formData: {
    name: string;
    email: string;
    role: User['role'];
    status: User['status'];
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      email: string;
      role: User['role'];
      status: User['status'];
    }>
  >;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function UserFormModal({
  isOpen,
  editUser,
  formData,
  setFormData,
  onClose,
  onSubmit,
}: UserFormModalProps) {
  return (
    <Modal
      isOpen={isOpen || !!editUser}
      onClose={onClose}
      title={
        <h3 className="text-lg font-bold text-text-main">
          {editUser ? 'Edit User' : 'Add New User'}
        </h3>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-text-secondary block mb-1">
            Full Name *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Jane Cooper"
            className="w-full px-3.5 py-2 text-sm bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-text-secondary block mb-1">
            Email Address *
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="jane.cooper@example.com"
            className="w-full px-3.5 py-2 text-sm bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-text-secondary block mb-1">
              Role
            </label>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value as User['role'] })
              }
              className="w-full px-3.5 py-2 text-sm bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-text-secondary block mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value as User['status'] })
              }
              className="w-full px-3.5 py-2 text-sm bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
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
            {editUser ? 'Save Changes' : 'Add User'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
