'use client';

import React from 'react';
import { Employee, EmployeeStatus } from './types';
import {
  User,
  Mail,
  Phone,
  Building2,
  Briefcase,
  Calendar,
  Hash,
  CheckCircle2,
  Clock,
  XCircle,
  Pencil,
} from 'lucide-react';
import Modal from '@/components/shared/Modal';

interface EmployeeDetailsModalProps {
  employee: Employee | null;
  onClose: () => void;
  onEdit: (employee: Employee) => void;
}

const STATUS_STYLES: Record<EmployeeStatus, string> = {
  Active:     'bg-blue-50 text-blue-700 border border-blue-200',
  'On Leave': 'bg-slate-100 text-slate-600 border border-slate-200',
  Terminated: 'bg-red-50 text-red-600 border border-red-200',
};

const StatusIcon: React.FC<{ status: EmployeeStatus }> = ({ status }) => {
  if (status === 'Active') return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
  if (status === 'On Leave') return <Clock className="w-4 h-4 text-amber-500" />;
  return <XCircle className="w-4 h-4 text-red-500" />;
};

export default function EmployeeDetailsModal({
  employee,
  onClose,
  onEdit,
}: EmployeeDetailsModalProps) {
  if (!employee) return null;

  return (
    <Modal
      isOpen={!!employee}
      onClose={onClose}
      title={
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full border border-border overflow-hidden bg-slate-100 flex items-center justify-center shrink-0">
            {employee.avatar ? (
              <img
                src={employee.avatar}
                alt={employee.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span
                className={`text-sm font-bold w-full h-full flex items-center justify-center ${
                  employee.initialsBg || 'bg-blue-100 text-blue-700'
                }`}
              >
                {employee.initials}
              </span>
            )}
          </div>
          <div>
            <h3 className="text-lg font-bold text-text-main">{employee.name}</h3>
            <p className="text-xs text-text-secondary">{employee.position}</p>
          </div>
        </div>
      }
      footer={
        <>
          <button
            type="button"
            onClick={() => {
              const current = employee;
              onClose();
              onEdit(current);
            }}
            className="btn-secondary text-sm font-semibold"
          >
            <Pencil className="w-4 h-4" />
            Edit Profile
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
        {/* Status & ID */}
        <div className="grid grid-cols-2 gap-3 p-3 bg-app-bg rounded-xl border border-border">
          <div>
            <span className="text-xs text-text-secondary block font-medium mb-1">Status</span>
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${STATUS_STYLES[employee.status]}`}>
              <StatusIcon status={employee.status} />
              {employee.status}
            </span>
          </div>
          <div>
            <span className="text-xs text-text-secondary block font-medium mb-1">Employee ID</span>
            <span className="text-sm font-bold text-primary">{employee.employeeId}</span>
          </div>
        </div>

        {/* Work Info */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider">
            Work Information
          </h4>
          <div className="space-y-2 text-text-main font-medium">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-text-muted shrink-0" />
              <span>Department: {employee.department}</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-text-muted shrink-0" />
              <span>Position: {employee.position}</span>
            </div>
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-text-muted shrink-0" />
              <span>ID: {employee.employeeId}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-text-muted shrink-0" />
              <span>Joined: {employee.joinedDate}</span>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-2 pt-2 border-t border-border">
          <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider">
            Contact Information
          </h4>
          {employee.status === 'Terminated' ? (
            <div className="p-3 bg-red-50 rounded-xl border border-red-100 text-xs text-red-600 font-semibold flex items-center gap-2">
              <XCircle className="w-4 h-4" />
              Access Revoked — Contact information is no longer available.
            </div>
          ) : (
            <div className="space-y-2 text-text-main font-medium">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-text-muted shrink-0" />
                <span>{employee.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-text-muted shrink-0" />
                <a href={`mailto:${employee.email}`} className="text-primary hover:underline">
                  {employee.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-text-muted shrink-0" />
                <span>{employee.phone}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
