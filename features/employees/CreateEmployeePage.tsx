'use client';

import { useState } from 'react';
import { isAxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronRight, ChevronDown, Sparkles, Trash2, AlertCircle } from 'lucide-react';
import { useCreateEmployee } from './hooks/useCreateEmployee';
import { useDepartments } from '../departments/hooks/useDepartments';
import { useUploadEmployeeAvatar } from './hooks/useUploadEmployeeImage';
import { CreateEmployeeInput, EmployeeStatus } from './types';
import { useImageUpload } from '@/hooks/useImageUpload';

export default function CreateEmployeePage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    departmentId: '',
    position: '',
    salary: '',
    status: 'active',
  });


  const [createdEmployeeId, setCreatedEmployeeId] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    mutateAsync: createEmployeeAsync,
    isPending,
    isError,
    error,
  } = useCreateEmployee();

  const {
    data: departments,
  } = useDepartments();

  const {
    mutateAsync: uploadAvatar,
    isPending: isAvatarUploading,
  } = useUploadEmployeeAvatar();

  //custom hook for image upload
  const {
    inputRef: fileInputRef,
    file: avatarFile,
    preview: avatarPreview,
    error: avatarError,
    setError: setAvatarError,
    handleImageChange,
    removeImage: handleRemovePhoto,
  } = useImageUpload({
    maxSizeMB: 5,
  });


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);
    setAvatarError(null);

    let employeeId = createdEmployeeId;

    try {
      if (!employeeId) {
        const payload: CreateEmployeeInput = {
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          departmentId: formData.departmentId,
          jobTitle: formData.position,
          hireDate: new Date().toISOString(),
          salary: Number(formData.salary),
          status: formData.status as EmployeeStatus,
        };

        const createdEmployee = await createEmployeeAsync(payload);

        employeeId = createdEmployee.id;
        setCreatedEmployeeId(employeeId);
      }

      if (avatarFile) {
        await uploadAvatar({ employeeId, file: avatarFile });
      }

      router.push('/employees');

    } catch (err) {
      console.error('Employee submission failed:', err);

      if (employeeId) {
        setAvatarError('Employee was created, but the photo upload failed. You can retry without creating another employee.');
      } else {
        const backendMessage =
          isAxiosError(err) && err.response?.data?.message
            ? Array.isArray(err.response.data.message)
              ? err.response.data.message.join(', ')
              : String(err.response.data.message)
            : err instanceof Error
            ? err.message
            : 'Failed to create employee. Please try again.';
        setSubmitError(backendMessage);
      }

      setIsSubmitting(false);
    }
  };


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
        <span className="text-slate-700 font-semibold">Create Employee</span>
      </nav>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Create New Employee
        </h1>
        <p className="text-sm text-slate-500 font-normal mt-1">
          Add a new employee profile to your company workforce database.
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
                  onChange={handleImageChange}
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
                      onClick={handleRemovePhoto}
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
                  placeholder="First name"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm
                   text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
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
                  placeholder="Last name"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm
                   text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
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
                  placeholder="employee@company.io"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm
                   text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
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
                  placeholder="123 Main St"
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
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm
                   text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
            </div>
          </div>

          <hr className="border-t border-slate-200/80" />

          {/* Section 3*/}
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
                    required
                    value={formData.departmentId}
                    onChange={(e) =>
                      setFormData({ ...formData, departmentId: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none pr-10 cursor-pointer"
                  >

                    <option value="" disabled hidden>
                      Select Department
                    </option>
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
                  placeholder="Senior Software Engineer"
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
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900
                     focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none pr-10 cursor-pointer"
                  >
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
              onClick={() => router.push('/employees')}
              className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-medium rounded-lg shadow-xs hover:shadow transition-all cursor-pointer flex items-center gap-2 disabled:opacity-75"
            >
              {isSubmitting ? (
                <span>Creating...</span>
              ) : (
                <span>Create Employee</span>
              )}

            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
