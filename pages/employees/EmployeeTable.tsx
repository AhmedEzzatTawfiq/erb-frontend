'use client';

import React from 'react';
import { Employee, EmployeeStatus } from './types';
import { ArrowUpDown, Users, MoreVertical, Eye, Pencil, Trash2 } from 'lucide-react';

interface EmployeeTableProps {
  employees: Employee[];
  selectedIds: string[];
  isAllSelected: boolean;
  activeDropdown: string | null;
  setActiveDropdown: (id: string | null) => void;
  onSelectAll: (checked: boolean) => void;
  onSelectOne: (id: string) => void;
  onSort: (field: 'name' | 'employeeId' | 'department' | 'position') => void;
  onViewEmployee: (employee: Employee) => void;
  onEditEmployee: (employee: Employee) => void;
  onDeleteEmployee: (id: string) => void;
  onDeleteSelected: () => void;
}

const STATUS_STYLES: Record<EmployeeStatus, string> = {
  Active:     'bg-blue-50 text-blue-700 border border-blue-200',
  'On Leave': 'bg-slate-100 text-slate-600 border border-slate-200',
  Terminated: 'bg-red-50 text-red-600 border border-red-200',
};

const EmployeeStatusBadge: React.FC<{ status: EmployeeStatus }> = ({ status }) => (
  <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${STATUS_STYLES[status]}`}>
    {status}
  </span>
);

export default function EmployeeTable({
  employees,
  selectedIds,
  isAllSelected,
  activeDropdown,
  setActiveDropdown,
  onSelectAll,
  onSelectOne,
  onSort,
  onViewEmployee,
  onEditEmployee,
  onDeleteEmployee,
  onDeleteSelected,
}: EmployeeTableProps) {
  return (
    <div className="bg-white border border-border rounded-2xl shadow-2xs overflow-hidden">
      {/* Selected Action Bar */}
      {selectedIds.length > 0 && (
        <div className="bg-blue-50/80 px-6 py-3 border-b border-blue-100 flex items-center justify-between">
          <span className="text-xs font-semibold text-primary">
            {selectedIds.length} employee{selectedIds.length > 1 ? 's' : ''} selected
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

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-225">
          <thead>
            <tr className="bg-app-bg border-b border-border">
              <th className="py-3.5 px-5 w-12 text-center">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary cursor-pointer"
                />
              </th>
              <th
                onClick={() => onSort('name')}
                className="py-3.5 px-5 text-xs font-semibold text-text-secondary uppercase tracking-wider cursor-pointer select-none hover:text-text-main transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>EMPLOYEE</span>
                  <ArrowUpDown className="w-3 h-3 text-text-muted" />
                </div>
              </th>
              <th
                onClick={() => onSort('employeeId')}
                className="py-3.5 px-5 text-xs font-semibold text-text-secondary uppercase tracking-wider cursor-pointer select-none hover:text-text-main transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>ID</span>
                  <ArrowUpDown className="w-3 h-3 text-text-muted" />
                </div>
              </th>
              <th
                onClick={() => onSort('department')}
                className="py-3.5 px-5 text-xs font-semibold text-text-secondary uppercase tracking-wider cursor-pointer select-none hover:text-text-main transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>DEPARTMENT</span>
                  <ArrowUpDown className="w-3 h-3 text-text-muted" />
                </div>
              </th>
              <th
                onClick={() => onSort('position')}
                className="py-3.5 px-5 text-xs font-semibold text-text-secondary uppercase tracking-wider cursor-pointer select-none hover:text-text-main transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>POSITION</span>
                  <ArrowUpDown className="w-3 h-3 text-text-muted" />
                </div>
              </th>
              <th className="py-3.5 px-5 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                CONTACT
              </th>
              <th className="py-3.5 px-5 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                STATUS
              </th>
              <th className="py-3.5 px-5 text-xs font-semibold text-text-secondary uppercase tracking-wider text-right">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {employees.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-text-secondary">
                  <Users className="w-10 h-10 mx-auto text-[#CBD5E1] mb-2" />
                  <p className="font-semibold text-base">No employees found</p>
                  <p className="text-xs text-text-muted mt-0.5">
                    Try adjusting your search or filter keywords.
                  </p>
                </td>
              </tr>
            ) : (
              employees.map((employee) => {
                const isSelected = selectedIds.includes(employee.id);
                const isTerminated = employee.status === 'Terminated';

                return (
                  <tr
                    key={employee.id}
                    className={`hover:bg-slate-50/70 transition-colors ${
                      isSelected ? 'bg-blue-50/30' : ''
                    } ${isTerminated ? 'opacity-70' : ''}`}
                  >
                    {/* Checkbox */}
                    <td className="py-4 px-5 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onSelectOne(employee.id)}
                        className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary cursor-pointer"
                      />
                    </td>

                    {/* Employee */}
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full border border-border overflow-hidden bg-slate-100 flex items-center justify-center shrink-0 shadow-2xs">
                          {employee.avatar ? (
                            <img
                              src={employee.avatar}
                              alt={employee.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span
                              className={`text-xs font-bold w-full h-full flex items-center justify-center ${
                                employee.initialsBg || 'bg-blue-100 text-blue-700'
                              }`}
                            >
                              {employee.initials}
                            </span>
                          )}
                        </div>
                        <span
                          onClick={() => onViewEmployee(employee)}
                          className={`text-sm font-bold hover:text-primary transition-colors cursor-pointer ${
                            isTerminated ? 'line-through text-text-secondary' : 'text-text-main'
                          }`}
                        >
                          {employee.name}
                        </span>
                      </div>
                    </td>

                    {/* Employee ID */}
                    <td className="py-4 px-5">
                      <span className="text-xs font-semibold text-primary bg-blue-50 px-2 py-1 rounded-md">
                        {employee.employeeId}
                      </span>
                    </td>

                    {/* Department */}
                    <td className={`py-4 px-5 text-sm font-medium ${isTerminated ? 'text-text-secondary italic' : 'text-text-main'}`}>
                      {employee.department}
                    </td>

                    {/* Position */}
                    <td className={`py-4 px-5 text-sm font-medium ${isTerminated ? 'text-text-secondary italic' : 'text-text-main'}`}>
                      {employee.position}
                    </td>

                    {/* Contact */}
                    <td className="py-4 px-5">
                      {isTerminated ? (
                        <span className="text-xs italic text-text-muted font-medium">
                          Access Revoked
                        </span>
                      ) : (
                        <span className="text-sm text-text-main font-medium">
                          {employee.email}
                        </span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-5">
                      <EmployeeStatusBadge status={employee.status} />
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-5 text-right relative">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveDropdown(
                            activeDropdown === employee.id ? null : employee.id
                          )
                        }
                        className="p-1.5 rounded-lg text-text-muted hover:text-text-main hover:bg-slate-100 transition-colors"
                        aria-label="Actions"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {activeDropdown === employee.id && (
                        <div className="absolute right-5 top-12 z-20 w-44 bg-white border border-border rounded-xl shadow-lg py-1 animate-in fade-in zoom-in-95 duration-150">
                          <button
                            onClick={() => {
                              onViewEmployee(employee);
                              setActiveDropdown(null);
                            }}
                            className="w-full px-4 py-2 text-xs font-semibold text-text-main hover:bg-slate-50 flex items-center gap-2"
                          >
                            <Eye className="w-3.5 h-3.5 text-text-secondary" />
                            View Profile
                          </button>
                          <button
                            onClick={() => onEditEmployee(employee)}
                            className="w-full px-4 py-2 text-xs font-semibold text-text-main hover:bg-slate-50 flex items-center gap-2"
                          >
                            <Pencil className="w-3.5 h-3.5 text-text-secondary" />
                            Edit Employee
                          </button>
                          <div className="border-t border-border my-1" />
                          <button
                            onClick={() => onDeleteEmployee(employee.id)}
                            className="w-full px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-red-600" />
                            Delete Employee
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
