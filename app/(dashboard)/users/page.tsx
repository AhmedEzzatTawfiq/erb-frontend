import { Plus, Search, ChevronDown, Eye, Pencil } from 'lucide-react'
import React from 'react'

const users = [
  {
    id: 1,
    name: 'Jane Cooper',
    email: 'jane.cooper@example.com',
    role: 'Admin',
    status: 'Active',
    created: 'Jan 12, 2024',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120'
  },
  {
    id: 2,
    name: 'Cody Fisher',
    email: 'cody.fisher@example.com',
    role: 'Editor',
    status: 'Active',
    created: 'Jan 15, 2024',
    initials: 'CW'
  },
  {
    id: 3,
    name: 'Esther Howard',
    email: 'esther.howard@example.com',
    role: 'Viewer',
    status: 'Suspended',
    created: 'Feb 02, 2024',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=120'
  },
  {
    id: 4,
    name: 'Jenny Wilson',
    email: 'jenny.wilson@example.com',
    role: 'Editor',
    status: 'Inactive',
    created: 'Mar 10, 2024',
    initials: 'JW'
  }
];

const Users = () => {
  return (
    <main className='space-y-6 max-w-7xl mx-auto'>
      {/* Top */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-text-main tracking-tight">
            Users
          </h1>
          <p className="text-sm text-[#64748B] mt-1 font-medium">
            Manage your team members and their roles.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="btn-primary text-xs sm:text-sm font-semibold shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add User</span>
          </button>
        </div>
      </div>

      <div className="bg-white border border-border rounded-xl shadow-xs overflow-hidden">
        
        {/* Search and Filters */}
        <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border">
          <div className="relative w-full max-w-xs">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Search users..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-2xs text-text-main"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="px-4 py-2 text-sm bg-white border border-border rounded-lg flex items-center gap-2 text-text-secondary hover:bg-slate-50 transition-colors shadow-2xs font-medium"
            >
              All Roles
              <ChevronDown className="w-4 h-4 text-text-muted" />
            </button>
            <button
              type="button"
              className="px-4 py-2 text-sm bg-white border border-border rounded-lg flex items-center gap-2 text-text-secondary hover:bg-slate-50 transition-colors shadow-2xs font-medium"
            >
              All Statuses
              <ChevronDown className="w-4 h-4 text-text-muted" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-200">
            <thead>
              <tr className="bg-app-bg border-b border-border">
                <th className="py-3 px-6 text-xs font-semibold text-[#64748B] uppercase tracking-wider">User</th>
                <th className="py-3 px-6 text-xs font-semibold text-[#64748B] uppercase tracking-wider">Role</th>
                <th className="py-3 px-6 text-xs font-semibold text-[#64748B] uppercase tracking-wider">Status</th>
                <th className="py-3 px-6 text-xs font-semibold text-[#64748B] uppercase tracking-wider">Created</th>
                <th className="py-3 px-6 text-xs font-semibold text-[#64748B] uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-border hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full border border-border overflow-hidden bg-border-subtle flex items-center justify-center shrink-0">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-sm font-semibold text-[#64748B]">{user.initials}</span>
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-text-main">{user.name}</div>
                        <div className="text-sm text-text-secondary mt-0.5">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-text-secondary font-medium">
                    {user.role}
                  </td>
                  <td className="py-4 px-6">
                    {user.status === 'Active' && (
                      <span className="badge-success w-max px-2.5 py-1">Active</span>
                    )}
                    {user.status === 'Suspended' && (
                      <span className="badge-danger w-max px-2.5 py-1">Suspended</span>
                    )}
                    {user.status === 'Inactive' && (
                      <span className="bg-border-subtle text-[#64748B] px-2.5 py-1 rounded-md text-xs font-semibold w-max flex items-center">
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-sm text-text-secondary font-medium">
                    {user.created}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-3">
                      <button className="text-text-muted hover:text-text-main transition-colors p-1" aria-label="View">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-text-muted hover:text-text-main transition-colors p-1" aria-label="Edit">
                        <Pencil className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer (Will implement logic next) */}
        <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-sm text-text-secondary font-medium">
            Showing 1 to 4 of 50 results
          </p>
          
          <div className="flex items-center gap-1.5">
            <button className="px-3 py-1.5 text-sm bg-white border border-border rounded text-text-muted hover:bg-slate-50 transition-colors font-medium">
              Previous
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-sm bg-primary text-white rounded font-semibold shadow-2xs">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-sm bg-white border border-border rounded text-text-secondary hover:bg-slate-50 font-medium">
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-sm bg-white border border-border rounded text-text-secondary hover:bg-slate-50 font-medium">
              3
            </button>
            <span className="px-1 text-text-muted">...</span>
            <button className="px-3 py-1.5 text-sm bg-white border border-border rounded text-text-secondary hover:bg-slate-50 transition-colors font-medium">
              Next
            </button>
          </div>
        </div>

      </div>
    </main>
  )
}

export default Users