'use client';

import React, { useState, useMemo } from 'react';
import { User } from './types';
import { INITIAL_USERS } from './mockData';
import UserHeader from './UserHeader';
import UserFilters from './UserFilters';
import UserTable from './UserTable';
import Pagination from '@/components/shared/Pagination';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
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

  // Filter & Sort
  const filteredUsers = useMemo(() => {
    return users
      .filter((usr) => {
        const matchesSearch =
          searchTerm === '' ||
          usr.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          usr.email.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesRole = roleFilter === 'All Roles' || usr.role === roleFilter;
        const matchesStatus = statusFilter === 'All Statuses' || usr.status === statusFilter;

        return matchesSearch && matchesRole && matchesStatus;
      })
      .sort((a, b) => {
        const valA = a[sortField] as string;
        const valB = b[sortField] as string;
        return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      });
  }, [users, searchTerm, roleFilter, statusFilter, sortField, sortOrder]);

  // Paginated List
  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredUsers.slice(start, start + pageSize);
  }, [filteredUsers, currentPage, pageSize]);

  // Selection
  const handleSelectAll = (checked: boolean) =>
    setSelectedIds(checked ? paginatedUsers.map((u) => u.id) : []);

  const handleSelectOne = (id: string) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );

  const isAllSelected =
    paginatedUsers.length > 0 && paginatedUsers.every((u) => selectedIds.includes(u.id));

  const handleDelete = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    setSelectedIds((prev) => prev.filter((item) => item !== id));
    setActiveDropdown(null);
  };

  const handleDeleteSelected = () => {
    setUsers((prev) => prev.filter((u) => !selectedIds.includes(u.id)));
    setSelectedIds([]);
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
          users={paginatedUsers}
          selectedIds={selectedIds}
          isAllSelected={isAllSelected}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          onSelectAll={handleSelectAll}
          onSelectOne={handleSelectOne}
          onSort={handleSort}
          onViewUser={() => { }}
          onEditUser={() => { }}
          onDeleteUser={handleDelete}
          onDeleteSelected={handleDeleteSelected}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalFilteredCount={filteredUsers.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          entityLabel="users"
        />
      </div>
    </main>
  );
}
