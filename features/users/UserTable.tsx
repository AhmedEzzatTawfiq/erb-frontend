'use client';

import React from 'react';
import Link from 'next/link';
import { User, UserStatus } from './types';
import { ArrowUpDown, Users, Trash2, MoreVertical, ShieldOff } from 'lucide-react';
import ActionDropDown from '@/components/shared/ActionDropDown';
import Avatar from '@/components/shared/Avatar';

interface UserTableProps {
  users: User[];
  selectedIds: string[];
  isAllSelected: boolean;
  activeDropdown: string | null;
  setActiveDropdown: (id: string | null) => void;
  onSelectAll: (checked: boolean) => void;
  onSelectOne: (id: string) => void;
  onSort: (field: 'name' | 'role' | 'status' | 'created') => void;
  onViewUser?: (user: User) => void;
  onEditUser?: (user: User) => void;
  onDeleteUser: (id: string) => void;
  onDeleteSelected: () => void;
  isUnauthorized?: boolean;
}

const STATUS_STYLES: Record<UserStatus, string> = {
  active: 'badge-success',
  inactive: 'bg-border-subtle text-[#64748B]',
};

const ROLE_STYLES: Record<string, string> = {
  Admin: 'bg-purple-50 text-purple-700 border border-purple-200',
  Manager: 'bg-blue-50 text-blue-700 border border-blue-200',
  Employee: 'bg-amber-50 text-amber-700 border border-amber-200',
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
  onDeleteUser,
  onDeleteSelected,
  isUnauthorized = false,
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
            className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1
             bg-white px-3 py-1.5 rounded-lg border border-red-200 shadow-2xs"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete Selected
          </button>
        </div>
      )}

      <div className="overflow-x-auto min-h-70">
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
                className="py-3 px-6 text-xs font-semibold text-[#64748B] uppercase tracking-wider cursor-pointer
                 select-none hover:text-text-main transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>USER</span>
                  <ArrowUpDown className="w-3 h-3 text-text-muted" />
                </div>
              </th>
              <th
                onClick={() => onSort('role')}
                className="py-3 px-6 text-xs font-semibold text-[#64748B] uppercase tracking-wider cursor-pointer
                 select-none hover:text-text-main transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>ROLE</span>
                  <ArrowUpDown className="w-3 h-3 text-text-muted" />
                </div>
              </th>
              <th
                onClick={() => onSort('status')}
                className="py-3 px-6 text-xs font-semibold text-[#64748B] uppercase tracking-wider cursor-pointer
                 select-none hover:text-text-main transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>STATUS</span>
                  <ArrowUpDown className="w-3 h-3 text-text-muted" />
                </div>
              </th>
              <th
                onClick={() => onSort('created')}
                className="py-3 px-6 text-xs font-semibold text-[#64748B] uppercase tracking-wider cursor-pointer
                 select-none hover:text-text-main transition-colors"
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
            {isUnauthorized ? (
              <tr>
                <td colSpan={6} className="py-16 text-center text-text-secondary border border-red-200">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-50 border border-red-100 mb-3">
                    <ShieldOff className="w-7 h-7 text-red-400" />
                  </div>
                  <p className="font-semibold text-base text-slate-700">Access Denied</p>
                  <p className="text-xs text-text-muted mt-1 max-w-xs mx-auto">
                    You don&apos;t have permission to view this page. Please contact your administrator.
                  </p>
                </td>
              </tr>
            ) : users.length === 0 ? (
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
                    className={`hover:bg-slate-50/50 transition-colors ${isSelected ? 'bg-blue-50/30' : ''} ${activeDropdown === user.id ? 'relative z-30' : ''}`}
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
                        <div className="w-10 h-10 rounded-full border border-border overflow-hidden bg-border-subtle
                         flex items-center justify-center shrink-0">
                          <Link
                            href={`/users/${user.id}`}
                            className="text-sm font-bold text-text-main hover:text-primary transition-colors cursor-pointer block"
                          >
                          <Avatar
                            avatar={user.avatar}
                            name={user.name}
                            initials={user.initials}
                            initialsBg={user.initialsBg}
                            size="lg"
                          />
                        </Link>
                        </div>
                        <div>
                          <Link
                            href={`/users/${user.id}`}
                            className="text-sm font-semibold text-text-main hover:text-primary transition-colors
                            cursor-pointer block"
                          >
                            {user.name}
                          <div className="text-xs text-text-secondary mt-0.5">{user.email}</div>
                          </Link>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs 
                        font-semibold ${ROLE_STYLES[user.role] || ''}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-semibold w-max flex 
                        items-center ${STATUS_STYLES[user.status]}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-text-secondary font-medium">
                      {user.created}
                    </td>

                    <td className={`py-4 px-6 text-right relative ${activeDropdown === user.id ? 'z-30' : ''}`}>
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
                        <>
                          <div
                            className="fixed inset-0 z-10 cursor-default"
                            onClick={() => setActiveDropdown(null)}
                          />
                          <ActionDropDown
                            href={`/users/${user.id}`}
                            id={user.id}
                            editLabel='Edit User'
                            deleteLabel='Delete User'
                            setActiveDropdown={setActiveDropdown}
                            onDeleteUser={onDeleteUser}
                          />
                        </>
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
}
