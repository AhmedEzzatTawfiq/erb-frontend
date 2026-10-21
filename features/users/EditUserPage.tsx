'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { ChevronRight, ChevronDown, Sparkles, Trash2, AlertCircle } from 'lucide-react';
import { useUser } from './hooks/useUser';
import { useUpdateUser } from './hooks/useUpdateUser';
import { useUploadUserAvatar, useDeleteUserAvatar } from './hooks/useUploadUserImage';
import { useImageUpload } from '@/hooks/useImageUpload';
import { UserRole, UserStatus } from './types';

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params?.id as string;

  const {
    mutateAsync: updateUserAsync,
    isPending: isUpdating,
  } = useUpdateUser();

  const {
    mutateAsync: uploadAvatarAsync,
    isPending: isUploadingAvatar,
  } = useUploadUserAvatar();

  const {
    mutateAsync: deleteAvatarAsync,
    isPending: isDeletingAvatar,
  } = useDeleteUserAvatar();

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

  const handleUserImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleUserRemovePhoto = () => {
    handleRemovePhoto();
    setIsAvatarRemoved(true);
    setAvatarError(null);
    setSubmitError(null);
  };

  const { data: userData, isLoading } = useUser(userId);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '',
    status: 'active',
  });

  useEffect(() => {
    if (!userData) return;

    const parts = (userData.name || '').split(' ');
    const first = parts[0] || '';
    const last = parts.slice(1).join(' ') || '';

    setFormData({
      firstName: first,
      lastName: last,
      email: userData.email || '',
      password: '',
      role: userData.role?.toLowerCase() || '',
      status: userData.status?.toLowerCase() || 'active',
    });

    setAvatarPreview(userData.avatar?.trim() || null);
  }, [userData]);

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
        ...(formData.password && { password: formData.password }),
        role: formData.role as UserRole,
        status: formData.status as UserStatus,
      };

      await updateUserAsync({ id: userId, data: payload });

      if (avatarFile) {
        await uploadAvatarAsync({ userId, file: avatarFile });
      } else if (isAvatarRemoved) {
        await deleteAvatarAsync(userId);
      }

      router.push('/users');
    } catch (err) {
      console.error('Failed to update user:', err);
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'Failed to update user. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 font-medium">
        <Link href="/users" className="hover:text-slate-800 transition-colors">
          Users
        </Link>
        <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
        <span className="text-slate-700 font-semibold">Edit User</span>
      </nav>

      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Edit User: {formData.firstName} {formData.lastName}
        </h1>
        <p className="text-sm text-slate-500 font-normal mt-1">
          Update user role, status, and contact details.
        </p>
      </div>

      {/* Card Form */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-2xs p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Profile Picture */}
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-4">
              Profile Picture
            </h2>
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-xl bg-[#F0F4FF] border border-indigo-100/80 flex items-center
               justify-center shrink-0 overflow-hidden relative group shadow-2xs">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="avatar"
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
                  onChange={handleUserImageChange}
                  accept="image/png, image/jpeg, image/webp"
                  className="hidden"
                />
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm
                     font-medium px-4 py-2 rounded-lg shadow-2xs transition-colors cursor-pointer"
                  >
                    {avatarPreview ? 'Change Photo' : 'Upload Photo'}
                  </button>
                  {avatarPreview && (
                    <button
                      type="button"
                      onClick={handleUserRemovePhoto}
                      className="bg-white border border-red-200 hover:bg-red-50 text-red-600 text-sm
                       font-medium px-3 py-2 rounded-lg shadow-2xs transition-colors cursor-pointer
                       flex items-center gap-1.5"
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

          {/* Section 2: Personal Information */}
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-5">
              Personal Information
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
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900
                   focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
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
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm
                   text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  NEW PASSWORD
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="Leave blank to keep current"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm
                   text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              {/* Role */}
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  ROLE *
                </label>
                <div className="relative">
                  <select
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900
                     focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none pr-10 cursor-pointer"
                  >
                    <option value="" disabled hidden>Select Role</option>
                    <option value="employee">Employee</option>
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Status */}
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
                    <option value="" disabled hidden>Select Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {submitError && (
            <p role="alert" className="text-sm text-red-600 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {submitError}
            </p>
          )}

          <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => router.push(`/users/${userId}`)}
              className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900
               hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isUpdating || isAvatarBusy}
              className="px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-medium rounded-lg
               shadow-xs hover:shadow transition-all cursor-pointer flex items-center gap-2 disabled:opacity-75"
            >
              {isSubmitting || isUpdating || isAvatarBusy ? (
                <span>Saving...</span>
              ) : (
                <span>Save Changes</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
