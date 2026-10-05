'use client';

import React, { useState } from 'react';
import UserHeader from './UserHeader';
import UserFilters from './UserFilters';
import UserTable from './UserTable';
import Pagination from '@/components/shared/Pagination';
import { useUsers } from './hooks/useUsers';
import { useDeleteUser } from './hooks/useDeleteUser';

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Sorting
  const [sortField, setSortField] = useState<'name' | 'role' | 'status' | 'created'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const {
    data,
    isPending,
    isError,
    error
  } = useUsers({
    page: currentPage,
    limit: pageSize,
    search: searchTerm,
    sortField: sortField,
    sortOrder: sortOrder,
  })

  const users = data?.data ?? [];
  const totalCount = data?.meta?.totalCount ?? data?.meta?.total ?? 0;
  const totalPages = data?.meta?.totalPages ?? 1;



  // Selection Handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(users.map((user) => user.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );

  const isAllSelected =
    users.length > 0 &&
    users.every((user) => selectedIds.includes(user.id));

  const { mutate: deleteUser } = useDeleteUser();

  const handleDeleteUser = (id: string) => {
    deleteUser(id, {
      onSuccess: () => {
        setSelectedIds((prev) => prev.filter((item) => item !== id));
        setActiveDropdown(null);
      },
    });
  };

  const handleDeleteSelected = () => {
    selectedIds.forEach((id) => {
      deleteUser(id, {
        onSuccess: () => {
          setSelectedIds((prev) => prev.filter((item) => item !== id));
          setActiveDropdown(null);
        },
      });
    });
  };

  const handleSort = (field: 'name' | 'role' | 'status' | 'created') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return (
    <main className="space-y-6 max-w-7xl mx-auto pb-10">
      <UserHeader />

      <div className="bg-white border border-border rounded-xl shadow-xs overflow-hidden">
        <UserFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          onPageReset={() => setCurrentPage(1)}
          onResetFilters={() => {
            setSearchTerm('');
            setRoleFilter('All Roles');
            setStatusFilter('All Statuses');
            setCurrentPage(1);
          }}
        />

        <UserTable
          users={users}
          selectedIds={selectedIds}
          isAllSelected={isAllSelected}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          onSelectAll={handleSelectAll}
          onSelectOne={handleSelectOne}
          onSort={handleSort}
          onViewUser={() => { }}
          onEditUser={() => { }}
          onDeleteUser={handleDeleteUser}
          onDeleteSelected={handleDeleteSelected}
        />

        <Pagination
          currentPage={data?.meta?.page ?? currentPage}
          totalPages={totalPages}
          totalFilteredCount={totalCount}
          pageSize={data?.meta?.limit ?? pageSize}
          onPageChange={setCurrentPage}
          entityLabel="users"
        />
      </div>
    </main>
  );
}
