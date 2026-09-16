'use client';

import React from 'react';
import { Employee } from './types';
import Modal from '@/components/shared/Modal';

const DEPARTMENTS = [
  'Engineering',
  'Sales',
  'Finance',
  'Human Resources',
  'Marketing',
  'Operations',
  'Design',
  'Legal',
] as const;

const STATUSES = ['Active', 'On Leave', 'Terminated'] as const;

interface EmployeeFormModalProps {
  isOpen: boolean;
  editEmployee: Employee | null;
  formData: {
    name: string;
    department: Employee['department'];
    position: string;
    email: string;
    phone: string;
    status: Employee['status'];
    joinedDate: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      department: Employee['department'];
      position: string;
      email: string;
      phone: string;
      status: Employee['status'];
      joinedDate: string;
    }>
  >;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function EmployeeFormModal({
  isOpen,
  editEmployee,
  formData,
  setFormData,
  onClose,
  onSubmit,
}: EmployeeFormModalProps) {
  return (
    <Modal
      isOpen={isOpen || !!editEmployee}
      onClose={onClose}
      title={
        <h3 className="text-lg font-bold text-text-main">
          {editEmployee ? 'Edit Employee' : 'Add New Employee'}
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
            placeholder="e.g. Sarah Jenkins"
            className="w-full px-3.5 py-2 text-sm bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-text-secondary block mb-1">
              Department *
            </label>
            <select
              required
              value={formData.department}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  department: e.target.value as Employee['department'],
                })
              }
              className="w-full px-3.5 py-2 text-sm bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-text-secondary block mb-1">
              Position *
            </label>
            <input
              type="text"
              required
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              placeholder="e.g. Senior Developer"
              className="w-full px-3.5 py-2 text-sm bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
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
              placeholder="s.jenkins@company.io"
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
              placeholder="+1 (555) 000-0000"
              className="w-full px-3.5 py-2 text-sm bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-text-secondary block mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value as Employee['status'] })
              }
              className="w-full px-3.5 py-2 text-sm bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-text-secondary block mb-1">
              Date Joined
            </label>
            <input
              type="date"
              value={formData.joinedDate}
              onChange={(e) => setFormData({ ...formData, joinedDate: e.target.value })}
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
            {editEmployee ? 'Save Changes' : 'Add Employee'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
