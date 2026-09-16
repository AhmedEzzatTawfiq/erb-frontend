'use client';

import React from 'react';
import { User, UserStatus } from './types';
import { Mail, Shield, Calendar, CheckCircle2, XCircle, Clock, Pencil } from 'lucide-react';
import Modal from '@/components/shared/Modal';

interface UserDetailsModalProps {
  user: User | null;
  onClose: () => void;
  onEdit: (user: User) => void;
}

const STATUS_ICON: Record<UserStatus, React.ReactNode> = {
  Active:    <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
  Inactive:  <XCircle className="w-4 h-4 text-slate-400" />,
  Suspended: <Clock className="w-4 h-4 text-red-500" />,
};

const ROLE_STYLES: Record<string, string> = {
  Admin:   'bg-purple-50 text-purple-700 border border-purple-200',
  Manager: 'bg-blue-50 text-blue-700 border border-blue-200',
  Editor:  'bg-amber-50 text-amber-700 border border-amber-200',
  Viewer:  'bg-slate-100 text-slate-600 border border-slate-200',
};

export default function UserDetailsModal({user,onClose, onEdit}: UserDetailsModalProps) {
  if (!user) return null;

  return (
    <Modal
      isOpen={!!user}
      onClose={onClose}
      title={
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full border border-border overflow-hidden bg-slate-100 flex items-center justify-center shrink-0">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <span className={`text-sm font-bold w-full h-full flex items-center justify-center ${user.initialsBg || 'bg-slate-100 text-slate-600'}`}>
                {user.initials}
              </span>
            )}
          </div>
          <div>
            <h3 className="text-lg font-bold text-text-main">{user.name}</h3>
            <p className="text-xs text-text-secondary">{user.email}</p>
          </div>
        </div>
      }
      footer={
        <>
          <button
            type="button"
            onClick={() => { const current = user; onClose(); onEdit(current); }}
            className="btn-secondary text-sm font-semibold"
          >
            <Pencil className="w-4 h-4" />
            Edit User
          </button>
          <button type="button" onClick={onClose} className="btn-primary text-sm font-semibold">
            Close
          </button>
        </>
      }
    >
      <div className="space-y-4 text-sm">
        {/* Status & Role */}
        <div className="grid grid-cols-2 gap-3 p-3 bg-app-bg rounded-xl border border-border">
          <div>
            <span className="text-xs text-text-secondary block font-medium mb-1">Status</span>
            <span className="font-semibold text-text-main flex items-center gap-1.5">
              {STATUS_ICON[user.status]}
              {user.status}
            </span>
          </div>
          <div>
            <span className="text-xs text-text-secondary block font-medium mb-1">Role</span>
            <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${ROLE_STYLES[user.role]}`}>
              {user.role}
            </span>
          </div>
        </div>

        {/* Account Info */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider">
            Account Information
          </h4>
          <div className="space-y-2 text-text-main font-medium">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-text-muted shrink-0" />
              <a href={`mailto:${user.email}`} className="text-primary hover:underline">
                {user.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-text-muted shrink-0" />
              <span>Role: {user.role}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-text-muted shrink-0" />
              <span>Created: {user.created}</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
