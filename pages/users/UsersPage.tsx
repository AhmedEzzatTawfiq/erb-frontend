'use client';

import React, { useState, useMemo } from 'react';
import { User } from './types';
import { INITIAL_USERS } from './mockData';
import UserHeader from './UserHeader';
import UserFilters from './UserFilters';
import UserTable from './UserTable';
import UserPagination from './UserPagination';
import UserFormModal from './UserFormModal';
import UserDetailsModal from './UserDetailsModal';

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

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewUser, setViewUser] = useState<User | null>(null);
  const [editUser, setEditUser] = useState<User | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Viewer' as User['role'],
    status: 'Active' as User['status'],
  });

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

  // Add / Edit
  const handleOpenAddModal = () => {
    setFormData({ name: '', email: '', role: 'Viewer', status: 'Active' });
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (user: User) => {
    setEditUser(user);
    setFormData({ name: user.name, email: user.email, role: user.role, status: user.status });
    setActiveDropdown(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    if (editUser) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === editUser.id
            ? { ...u, name: formData.name, email: formData.email, role: formData.role, status: formData.status }
            : u
        )
      );
      setEditUser(null);
    } else {
      const initials = formData.name.split(' ').map((w) => w[0]).join('').substring(0, 2).toUpperCase();
      const newUser: User = {
        id: `usr-${Date.now()}`,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        status: formData.status,
        created: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        initials,
        initialsBg: 'bg-indigo-100 text-indigo-700',
      };
      setUsers((prev) => [newUser, ...prev]);
      setIsAddModalOpen(false);
    }
  };

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
      <UserHeader onAddUser={handleOpenAddModal} />

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
          onViewUser={setViewUser}
          onEditUser={handleOpenEditModal}
          onDeleteUser={handleDelete}
          onDeleteSelected={handleDeleteSelected}
        />

        <UserPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalFilteredCount={filteredUsers.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      </div>

      <UserFormModal
        isOpen={isAddModalOpen}
        editUser={editUser}
        formData={formData}
        setFormData={setFormData}
        onClose={() => { setIsAddModalOpen(false); setEditUser(null); }}
        onSubmit={handleSave}
      />

      <UserDetailsModal
        user={viewUser}
        onClose={() => setViewUser(null)}
        onEdit={handleOpenEditModal}
      />
    </main>
  );
};
