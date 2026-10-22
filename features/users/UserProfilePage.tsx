'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ChevronRight, Pencil, Mail, BadgeCheck, Briefcase, MessageSquare, Calendar, Shield
} from 'lucide-react';
import { useUser } from './hooks/useUser';
import { useDeleteUserAvatar, useUploadUserAvatar } from './hooks/useUploadUserImage';
import { useImageUpload } from '@/hooks/useImageUpload';
import { useState } from 'react';
import Avatar from '@/components/shared/Avatar';

export default function UserProfilePage() {
  const params = useParams();
  const id = params?.id as string;

  const [feedbackMessage, setFeedbackMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const {
    inputRef: fileInputRef,
    file: selectedFile,
    preview: avatarPreview,
    error: avatarError,
    handleImageChange,
    removeImage: handleRemovePhoto,
  } = useImageUpload({ maxSizeMB: 5 });

  const uploadAvatarMutation = useUploadUserAvatar();
  const deleteAvatarMutation = useDeleteUserAvatar();

  const isAvatarBusy =
    uploadAvatarMutation.isPending || deleteAvatarMutation.isPending;

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFeedbackMessage(null);
    handleImageChange(event);
  };

  const { data, isLoading, isError } = useUser(id);
  const user = data ?? null;

  if (isLoading) {
    return (
      <main className="space-y-6 max-w-7xl mx-auto pb-10">
        <div className="py-24 flex flex-col items-center gap-3 text-text-secondary">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-medium">Loading user…</span>
        </div>
      </main>
    );
  }

  if (isError || !user) {
    return (
      <main className="space-y-6 max-w-7xl mx-auto pb-10">
        <div className="py-24 text-center text-sm text-red-500 font-medium">
          User not found or failed to load.
        </div>
      </main>
    );
  }

  const joinedDate = user.created
    ? new Date(user.created).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : '—';

  const roleConfig: Record<string, { bg: string; text: string }> = {
    admin:    { bg: 'bg-purple-100', text: 'text-purple-700' },
    manager:  { bg: 'bg-blue-100',   text: 'text-blue-700'   },
    employee: { bg: 'bg-slate-100',  text: 'text-slate-700'  },
  };
  const roleStyle = roleConfig[user.role] ?? roleConfig.employee;

  const statusConfig =
    user.status === 'active'
      ? { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-600' }
      : { bg: 'bg-slate-100',   text: 'text-slate-600',   dot: 'bg-slate-400'   };

  return (
    <main className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 font-medium">
        <Link href="/users" className="hover:text-slate-800 transition-colors">
          Users
        </Link>
        <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
        <span className="text-slate-700 font-semibold">{user.name}</span>
      </nav>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
          {user.name}
        </h1>
        <Link
          href={`/users/${user.id}/edit`}
          className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-semibold
           px-4 py-2.5 rounded-lg shadow-2xs transition-colors cursor-pointer flex items-center gap-2 self-start sm:self-auto"
        >
          <Pencil className="w-4 h-4 text-slate-500" />
          <span>Edit User</span>
        </Link>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs text-center flex flex-col items-center">
            <div className="w-48 h-48 rounded-full overflow-hidden mb-4 border-2 border-slate-100 shadow-xs relative group flex items-center justify-center bg-slate-100">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="New avatar preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Avatar
                  avatar={user.avatar}
                  name={user.name}
                  initials={user.initials}
                  initialsBg={user.initialsBg}
                  size="xl"
                />
              )}
            </div>

            <h2 className="text-lg font-bold text-slate-900">{user.name}</h2>
            <p className="text-xs text-slate-500 font-medium mb-3">{user.email}</p>

            <div className="flex items-center gap-2 justify-center mb-5">
              <span
                className={`${roleStyle.bg} ${roleStyle.text} text-xs font-semibold px-2.5 py-1 rounded-md border border-transparent capitalize`}
              >
                {user.role}
              </span>
              <span
                className={`${statusConfig.bg} ${statusConfig.text} text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1 capitalize`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot}`} />
                {user.status}
              </span>
            </div>

            <a
              href={`mailto:${user.email}`}
              className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-medium py-2.5
               rounded-lg shadow-xs hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Message</span>
            </a>

            {feedbackMessage && (
              <p
                className={`mt-3 text-xs font-medium ${
                  feedbackMessage.type === 'success' ? 'text-emerald-600' : 'text-red-500'
                }`}
              >
                {feedbackMessage.text}
              </p>
            )}
          </div>

          {/* Information Panel */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">Information</h3>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Email</span>
                </div>
                <span className="font-semibold text-slate-800 text-right max-w-40 truncate">
                  {user.email}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Role</span>
                </div>
                <span className="font-semibold text-slate-800 capitalize">{user.role}</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Joined</span>
                </div>
                <span className="font-semibold text-slate-800">{joinedDate}</span>
              </div>

              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <BadgeCheck className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>User ID</span>
                </div>
                <span
                  className="font-mono font-semibold text-slate-800 text-right max-w-28 truncate"
                  title={user.id}
                >
                  {user.id.slice(0, 8)}…
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="lg:col-span-2 space-y-6">
          {/* Summary Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Role
              </span>
              <span className="text-sm font-bold text-slate-900 mt-1 block capitalize">
                {user.role}
              </span>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Status
              </span>
              <span
                className={`text-sm font-bold mt-1 block capitalize ${statusConfig.text}`}
              >
                {user.status}
              </span>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Joined Date
              </span>
              <span className="text-sm font-bold text-slate-900 mt-1 block">
                {joinedDate}
              </span>
            </div>
          </div>

          {/* Quick Info */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-3">
            <h3 className="text-base font-bold text-slate-900 mb-1">Quick Info</h3>
            <div className="divide-y divide-slate-100 text-xs">
              <div className="flex justify-between py-2.5">
                <span className="text-slate-500">User ID</span>
                <span
                  className="font-mono font-semibold text-slate-700 text-right max-w-32 truncate"
                  title={user.id}
                >
                  {user.id.slice(0, 8)}…
                </span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-slate-500">Email</span>
                <span className="font-semibold text-slate-700 text-right max-w-48 truncate">
                  {user.email}
                </span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-slate-500">Role</span>
                <span className="font-semibold text-slate-700 capitalize">{user.role}</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-slate-500">Status</span>
                <span
                  className={`font-semibold capitalize ${
                    user.status === 'active' ? 'text-emerald-600' : 'text-slate-500'
                  }`}
                >
                  {user.status}
                </span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-slate-500">Member Since</span>
                <span className="font-semibold text-slate-700">{joinedDate}</span>
              </div>
            </div>
          </div>

          {/* Permissions placeholder — role-derived, no static content */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">System Access</h3>

            <div className="flex flex-col items-center gap-3 py-8 text-slate-400">
              <Shield className="w-8 h-8" />
              <div className="text-center">
                <p className="text-sm font-semibold text-slate-700 capitalize">
                  {user.role} Access Level
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Detailed permission management will be available here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
