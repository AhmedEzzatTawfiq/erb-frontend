'use client';

import React, { useState, useEffect } from 'react';

import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { ChevronRight, ChevronDown, Sparkles, Trash2, AlertCircle } from 'lucide-react';
import { useEmployee } from './hooks/useEmployee';
import { useUpdateEmployee } from './hooks/useUpdateEmployee';
import { useDepartments } from '../departments/hooks/useDepartments';
import { useUploadEmployeeAvatar, useDeleteEmployeeAvatar } from './hooks/useUploadEmployeeImage';
import { useImageUpload } from '@/hooks/useImageUpload';




export default function EditEmployeePage() {
  const router = useRouter();
  const params = useParams();
  const employeeId = params?.id as string;

  const {
    mutateAsync: updateEmployeeAsync,
    isPending: isUpdating,
  } = useUpdateEmployee();

  const {
    mutateAsync: uploadAvatarAsync,
    isPending: isUploadingAvatar,
  } = useUploadEmployeeAvatar();

  const {
    mutateAsync: deleteAvatarAsync,
    isPending: isDeletingAvatar,
  } = useDeleteEmployeeAvatar();

  const isAvatarBusy = isUploadingAvatar || isDeletingAvatar;

  const {
    inputRef: fileInputRef,
    file: avatarFile,
    preview: avatarPreview,
    error: avatarError,
    setPreview: setAvatarPreview,
    setError: setAvatarError,
    handleImageChange,
    removeImage: handleRemovePhoto,
  } = useImageUpload({ maxSizeMB: 5 });

  const [isAvatarRemoved, setIsAvatarRemoved] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmployeeImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAvatarError(null);
    setSubmitError(null);

    handleImageChange(e);

    const file = e.currentTarget.files?.[0];

    if (
      file &&
      ['image/jpeg', 'image/png', 'image/webp'].includes(file.type) &&
      file.size <= 5 * 1024 * 1024
    ) {
      setIsAvatarRemoved(false);
    }
  };

  const handleEmployeeRemovePhoto = () => {
    handleRemovePhoto();
    setIsAvatarRemoved(true);
    setAvatarError(null);
    setSubmitError(null);
  };

  const { data: employeeData, isLoading } = useEmployee(employeeId);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    departmentId: '',
    address: '',
    position: '',
    salary: '',
    status: '',
  });


  useEffect(() => {
    if (!employeeData) return;

    const parts = (employeeData.name || '').split(' ');
    const first = parts[0] || '';
    const last = parts.slice(1).join(' ') || '';
    const deptName =
      typeof employeeData.department === 'string'
        ? employeeData.department
        : employeeData.department?.name || 'Engineering';

    const pos = employeeData.position || employeeData.jobTitle || '';

    setFormData({
      firstName: first,
      lastName: last,
      email: employeeData.email || '',
      phone: employeeData.phone || '',
      address: employeeData.address || '',
      departmentId: typeof employeeData.department === 'string' ? employeeData.department : employeeData.department?.id || '',
      position: pos,
      salary: employeeData.salary?.toString() ?? '',
      status: employeeData.status || 'Active',
    });

    setAvatarPreview(employeeData.avatar?.trim() || null);

  }, [employeeData]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting || isAvatarBusy) return;

    setIsSubmitting(true);
    setSubmitError(null);
    setAvatarError(null);

    try {
      const payload = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        departmentId: formData.departmentId,
        jobTitle: formData.position,

        // Preserve the original hire date when editing.
        hireDate: employeeData?.hireDate
          ? new Date(employeeData.hireDate).toISOString()
          : undefined,

        salary: Number(formData.salary),
        status: formData.status,
      };

      await updateEmployeeAsync({
        id: employeeId,
        data: payload,
      });

      if (avatarFile) {
        await uploadAvatarAsync({
          employeeId,
          file: avatarFile,
        });
      } else if (isAvatarRemoved) {
        await deleteAvatarAsync(employeeId);
      }

      router.push('/employees');
    } catch (err) {
      console.error('Failed to update employee:', err);

      setSubmitError(
        err instanceof Error
          ? err.message
          : 'Failed to update employee. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };


  const {
    data: departments,
    isLoading: isDepartmentsLoading
  } = useDepartments();

  return (
    <main className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 font-medium">
        <Link
          href="/employees"
          className="hover:text-slate-800 transition-colors"
        >
          Employees
        </Link>
        <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
        <span className="text-slate-700 font-semibold">Edit Employee</span>
      </nav>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Edit Employee: {formData.firstName} {formData.lastName}
        </h1>
        <p className="text-sm text-slate-500 font-normal mt-1">
          Update employee position, department, status, and contact details.
        </p>
      </div>

      {/* Card Form */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-2xs p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-4">
              Profile Photo
            </h2>
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-xl bg-[#F0F4FF] border border-indigo-100/80 flex items-center justify-center shrink-0 overflow-hidden relative group shadow-2xs">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="relative flex items-center justify-center w-full h-full text-indigo-400">
                    <svg
                      className="w-9 h-9 text-slate-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="4" ry="4" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    <Sparkles className="w-3.5 h-3.5 text-indigo-500 absolute top-3.5 right-3.5" />
                  </div>
                )}
              </div>

              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleEmployeeImageChange}
                  accept="image/png, image/jpeg, image/webp"
                  className="hidden"
                />
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-medium px-4 py-2 rounded-lg shadow-2xs transition-colors cursor-pointer"
                  >
                    {avatarPreview ? 'Change Photo' : 'Upload Photo'}
                  </button>
                  {avatarPreview && (
                    <button
                      type="button"
                      onClick={handleEmployeeRemovePhoto}
                      className="bg-white border border-red-200 hover:bg-red-50 text-red-600 text-sm font-medium px-3 py-2 rounded-lg shadow-2xs transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-2 font-normal">
                  JPG, PNG or WEBP. Max size 5MB
                </p>
                {avatarError && (
                  <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{avatarError}</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          <hr className="border-t border-slate-200/80" />

          {/* Personal Information */}
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-5">
              Personal & Contact Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  FIRST NAME *
                </label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  LAST NAME *
                </label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  EMAIL ADDRESS *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  ADDRESS
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm
                   text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  PHONE NUMBER
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
            </div>
          </div>

          <hr className="border-t border-slate-200/80" />

          {/* Section 3 */}
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-5">
              Employment Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">


              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  DEPARTMENT *
                </label>
                <div className="relative">
                  <select
                    value={formData.departmentId}
                    onChange={(e) =>
                      setFormData({ ...formData, departmentId: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none pr-10 cursor-pointer"
                  >
                    {departments?.map((department) => (
                      <option key={department.id} value={department.id}>
                        {department.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  JOB TITLE *
                </label>
                <input
                  type="text"
                  required
                  value={formData.position}
                  onChange={(e) =>
                    setFormData({ ...formData, position: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  SALARY *
                </label>

                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={formData.salary}
                  onChange={(e) =>
                    setFormData({ ...formData, salary: e.target.value })
                  }
                  placeholder="Enter salary"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  STATUS *
                </label>
                <div className="relative">
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none pr-10 cursor-pointer"
                  >
                    <option value="" disabled hidden>
                      Select Status
                    </option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>


            </div>
          </div>



          {submitError && (
            <p
              role="alert"
              className="text-sm text-red-600 flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              {submitError}
            </p>
          )}

          {/* Footer Actions */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">

            <button
              type="button"
              onClick={() => router.push(`/employees/${employeeId}`)}
              className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isUpdating || isAvatarBusy}
              className="px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-medium rounded-lg shadow-xs hover:shadow transition-all cursor-pointer flex items-center gap-2 disabled:opacity-75"
            >
              {isSubmitting || isUpdating || isAvatarBusy ? (
                <span>Saving...</span>
              ) : (
                <span>Update Employee</span>
              )}

            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
