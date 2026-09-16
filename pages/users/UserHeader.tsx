'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';

interface UserHeaderProps {
  onAddUser: () => void;
}

export default function UserHeader({ onAddUser }: UserHeaderProps) {
  return (
    <PageHeader
      title="Users"
      subtitle="Manage your team members and their roles."
      actions={
        <button
          type="button"
          onClick={onAddUser}
          className="btn-primary text-xs sm:text-sm font-semibold shadow-xs hover:shadow transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add User</span>
        </button>
      }
    />
  );
};
