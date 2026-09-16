'use client';

import React from 'react';
import { User, UserStatus } from './types';
import { ArrowUpDown, Users, Eye, Pencil, Trash2, MoreVertical } from 'lucide-react';

interface UserTableProps {
  users: User[];
  selectedIds: string[];
  isAllSelected: boolean;
  activeDropdown: string | null;
  setActiveDropdown: (id: string | null) => void;
  onSelectAll: (checked: boolean) => void;
  onSelectOne: (id: string) => void;
  onSort: (field: 'name' | 'role' | 'status' | 'created') => void;
  onViewUser: (user: User) => void;
  onEditUser: (user: User) => void;
  onDeleteUser: (id: string) => void;
  onDeleteSelected: () => void;
}

const STATUS_STYLES: Record<UserStatus, string> = {
  Active:    'badge-success',
  Inactive:  'bg-border-subtle text-[#64748B]',
  Suspended: 'badge-danger',
};

const ROLE_STYLES: Record<string, string> = {
  Admin:   'bg-purple-50 text-purple-700 border border-purple-200',
  Manager: 'bg-blue-50 text-blue-700 border border-blue-200',
  Editor:  'bg-amber-50 text-amber-700 border border-amber-200',
  Viewer:  'bg-slate-100 text-slate-600 border border-slate-200',
};

export default function UserTable({
  users,
  selectedIds,
  isAllSelected,
  activeDropdown,
  setActiveDropdown,
  onSelectAll,
  onSelectOne,
  onSort,
  onViewUser,
  onEditUser,
  onDeleteUser,
  onDeleteSelected,
}: UserTableProps) {
  return (
    <div>
      {/* Selected Action Bar */}
      {selectedIds.length > 0 && (
        <div className="bg-blue-50/80 px-6 py-3 border-b border-blue-100 flex items-center justify-between">
          <span className="text-xs font-semibold text-primary">
            {selectedIds.length} user{selectedIds.length > 1 ? 's' : ''} selected
          </span>
          <button
            onClick={onDeleteSelected}
            className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg border border-red-200 shadow-2xs"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete Selected
          </button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-175">
          <thead>
            <tr className="bg-app-bg border-b border-border">
              <th className="py-3 px-6 w-12 text-center">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary cursor-pointer"
                />
              </th>
              <th
                onClick={() => onSort('name')}
                className="py-3 px-6 text-xs font-semibold text-[#64748B] uppercase tracking-wider cursor-pointer select-none hover:text-text-main transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>USER</span>
                  <ArrowUpDown className="w-3 h-3 text-text-muted" />
                </div>
              </th>
              <th
                onClick={() => onSort('role')}
                className="py-3 px-6 text-xs font-semibold text-[#64748B] uppercase tracking-wider cursor-pointer select-none hover:text-text-main transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>ROLE</span>
                  <ArrowUpDown className="w-3 h-3 text-text-muted" />
                </div>
              </th>
              <th
                onClick={() => onSort('status')}
                className="py-3 px-6 text-xs font-semibold text-[#64748B] uppercase tracking-wider cursor-pointer select-none hover:text-text-main transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>STATUS</span>
                  <ArrowUpDown className="w-3 h-3 text-text-muted" />
                </div>
              </th>
              <th
                onClick={() => onSort('created')}
                className="py-3 px-6 text-xs font-semibold text-[#64748B] uppercase tracking-wider cursor-pointer select-none hover:text-text-main transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>CREATED</span>
                  <ArrowUpDown className="w-3 h-3 text-text-muted" />
                </div>
              </th>
              <th className="py-3 px-6 text-xs font-semibold text-[#64748B] uppercase tracking-wider text-right">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-text-secondary">
                  <Users className="w-10 h-10 mx-auto text-[#CBD5E1] mb-2" />
                  <p className="font-semibold text-base">No users found</p>
                  <p className="text-xs text-text-muted mt-0.5">
                    Try adjusting your search or filter keywords.
                  </p>
                </td>
              </tr>
            ) : (
              users.map((user) => {
                const isSelected = selectedIds.includes(user.id);
                return (
                  <tr
                    key={user.id}
                    className={`hover:bg-slate-50/50 transition-colors ${
                      isSelected ? 'bg-blue-50/30' : ''
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="py-4 px-6 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onSelectOne(user.id)}
                        className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary cursor-pointer"
                      />
                    </td>

                    {/* User */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full border border-border overflow-hidden bg-border-subtle flex items-center justify-center shrink-0">
                          {user.avatar ? (
                            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className={`text-xs font-bold w-full h-full flex items-center justify-center ${user.initialsBg || 'bg-slate-100 text-slate-600'}`}>
                              {user.initials}
                            </span>
                          )}
                        </div>
                        <div>
                          <div
                            className="text-sm font-semibold text-text-main hover:text-primary transition-colors cursor-pointer"
                            onClick={() => onViewUser(user)}
                          >
                            {user.name}
                          </div>
                          <div className="text-xs text-text-secondary mt-0.5">{user.email}</div>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${ROLE_STYLES[user.role] || ''}`}>
                        {user.role}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-semibold w-max flex items-center ${STATUS_STYLES[user.status]}`}>
                        {user.status}
                      </span>
                    </td>

                    {/* Created */}
                    <td className="py-4 px-6 text-sm text-text-secondary font-medium">
                      {user.created}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right relative">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveDropdown(activeDropdown === user.id ? null : user.id)
                        }
                        className="p-1.5 rounded-lg text-text-muted hover:text-text-main hover:bg-slate-100 transition-colors"
                        aria-label="Actions"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {activeDropdown === user.id && (
                        <div className="absolute right-5 top-12 z-20 w-40 bg-white border border-border rounded-xl shadow-lg py-1 animate-in fade-in zoom-in-95 duration-150">
                          <button
                            onClick={() => { onViewUser(user); setActiveDropdown(null); }}
                            className="w-full px-4 py-2 text-xs font-semibold text-text-main hover:bg-slate-50 flex items-center gap-2"
                          >
                            <Eye className="w-3.5 h-3.5 text-text-secondary" />
                            View Details
                          </button>
                          <button
                            onClick={() => onEditUser(user)}
                            className="w-full px-4 py-2 text-xs font-semibold text-text-main hover:bg-slate-50 flex items-center gap-2"
                          >
                            <Pencil className="w-3.5 h-3.5 text-text-secondary" />
                            Edit User
                          </button>
                          <div className="border-t border-border my-1" />
                          <button
                            onClick={() => onDeleteUser(user.id)}
                            className="w-full px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-red-600" />
                            Delete User
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
