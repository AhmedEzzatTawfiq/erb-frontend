'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronRight, ChevronDown, Sparkles, Check } from 'lucide-react';

export default function CreateUserPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'Standard User',
    status: 'Active',
  });

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate creation delay & success redirect
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage(true);
      setTimeout(() => {
        router.push('/users');
      }, 1000);
    }, 400);
  };

  return (
    <main className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 font-medium">
        <Link
          href="/users"
          className="hover:text-slate-800 transition-colors"
        >
          Users
        </Link>
        <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
        <span className="text-slate-700 font-semibold">Create User</span>
      </nav>

      <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
        Create New User
      </h1>

      {/* Card Form */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-2xs p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
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

              {/* Upload Action */}
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/png, image/jpeg, image/gif"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={handleUploadClick}
                  className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm
                   font-medium px-4 py-2 rounded-lg shadow-2xs transition-colors cursor-pointer"
                >
                  Upload Photo
                </button>
                <p className="text-xs text-slate-400 mt-2 font-normal">
                  JPG, GIF or PNG. Max size of 800K
                </p>
              </div>
            </div>
          </div>

          <hr className="border-t border-slate-200/80" />

          {/* Personal Information */}
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-5">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  FIRST NAME
                </label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  placeholder="Enter first name"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm
                   text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  LAST NAME
                </label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  placeholder="Enter last name"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm
                   text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="user@company.com"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm
                   text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  PASSWORD
                </label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm
                   text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              {/* Role */}
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  ROLE
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
                    <option value="Standard User">Standard User</option>
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Editor">Editor</option>
                    <option value="Viewer">Viewer</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  STATUS
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
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => router.push('/users')}
              className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900
               hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-medium
               rounded-lg shadow-xs hover:shadow transition-all cursor-pointer flex items-center gap-2 disabled:opacity-75"
            >
              {successMessage ? (
                <>
                  <Check className="w-4 h-4 text-white" /> 
                  <span>Created! Redirecting...</span>
                </>
              ) : isSubmitting ? (
                <span>Creating...</span>
              ) : (
                <span>Create User</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
