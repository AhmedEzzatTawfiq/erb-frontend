'use client';

import Link from 'next/link';
import {
  ChevronRight, Pencil, MapPin, Phone,
  BadgeCheck, Briefcase, Calendar,
  MessageSquare,
  Loader2, Check, X, AlertCircle, Sparkles,
} from 'lucide-react';

import { useParams } from 'next/navigation';
import { useEmployee } from './hooks/useEmployee';
import { useState } from 'react';
import { useImageUpload } from '@/hooks/useImageUpload';
import { useUploadEmployeeAvatar, useDeleteEmployeeAvatar } from './hooks/useUploadEmployeeImage';
import Avatar from '@/components/shared/Avatar';
import { EmployeeStatus } from './types';


export default function EmployeeProfilePage() {
  const params = useParams();
  const id = params?.id as string;
  
  const { data, isLoading, isError } = useEmployee(id);
  const employee = data ?? null;          


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

  const uploadAvatarMutation = useUploadEmployeeAvatar();
  const deleteAvatarMutation = useDeleteEmployeeAvatar();

  const isAvatarBusy =
    uploadAvatarMutation.isPending || deleteAvatarMutation.isPending;

  const handleAvatarChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFeedbackMessage(null);
    handleImageChange(event);
  };

  const handleUploadAvatar = () => {
    if (!selectedFile || !id || isAvatarBusy) return;

    setFeedbackMessage(null);

    uploadAvatarMutation.mutate(
      { employeeId: id, file: selectedFile },
      {
        onSuccess: () => {
          handleRemovePhoto();
          setFeedbackMessage({
            type: 'success',
            text: 'Avatar updated successfully!',
          });
        },
        onError: () => {
          setFeedbackMessage({
            type: 'error',
            text: 'Failed to upload employee avatar.',
          });
        },
      },
    );
  };

  const handleDeleteAvatar = () => {
    if (!id || isAvatarBusy) return;

    setFeedbackMessage(null);

    deleteAvatarMutation.mutate(id, {
      onSuccess: () => {
        handleRemovePhoto();
        setFeedbackMessage({
          type: 'success',
          text: 'Avatar removed successfully!',
        });
      },
      onError: () => {
        setFeedbackMessage({
          type: 'error',
          text: 'Failed to remove employee avatar.',
        });
      },
    });
  };



  if (isLoading) {
    return <div className="p-8 text-slate-500 font-medium">Loading employee details...</div>;
  }

  if (isError || !employee) {
    return <div className="p-8 text-red-500 font-medium">Employee not found.</div>;
  }

  const deptName =
    typeof employee.department === 'string'
      ? employee.department
      : employee.department?.name;

  const jobTitle = employee.position || employee.jobTitle || 'N/A';

  const hireDate = employee.hireDate
    ? new Date(employee.hireDate)
    : null;

  const joined =
    hireDate && !Number.isNaN(hireDate.getTime())
      ? hireDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
      : 'N/A';

  const STATUS_STYLES: Record<string, string> = {
    active: 'bg-blue-50 text-blue-700 border border-blue-200',
    inactive: 'bg-red-50 text-red-600 border border-red-200',
  };

  const EmployeeStatusBadge: React.FC<{ status: EmployeeStatus }> = ({ status }) => {
    const displayStatus = status === 'active' ? 'Active' : status === 'inactive' ? 'Terminated' : status;
    const style = STATUS_STYLES[status] || STATUS_STYLES[displayStatus] || 'bg-slate-100 text-slate-600 border border-slate-200';

    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${style}`}>
        {displayStatus}
      </span>
    );
  };



  const activities = [
    {
      id: 'joined',
      title: 'Joined the Company',
      description: 'Official employment start date',
      date: employee.hireDate,
      icon: Briefcase,
      color: 'bg-blue-600',
    }
  ]
    .map((activity) => ({
      ...activity,
      formattedDate: activity.date
        ? new Date(activity.date).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        })
        : null,
    }))
    .filter(
      (activity) =>
        activity.formattedDate &&
        activity.date &&
        !Number.isNaN(new Date(activity.date).getTime()),
    )
    .sort(
      (a, b) =>
        new Date(b.date!).getTime() - new Date(a.date!).getTime(),
    );

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
        <span className="text-slate-700 font-semibold">{employee.name}</span>
      </nav>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
          {employee.name}
        </h1>
        <Link
          href={`/employees/${employee.id}/edit`}
          className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-semibold px-4 py-2 rounded-lg shadow-2xs transition-colors cursor-pointer flex items-center gap-2 self-start sm:self-auto"
        >
          <Pencil className="w-4 h-4 text-slate-500" />
          <span>Edit Employee</span>
        </Link>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs text-center flex flex-col items-center">
            {/* Avatar Section */}
            <div className="relative mb-3 group">
              <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-slate-200 shadow-xs relative flex items-center justify-center bg-slate-100">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="New avatar preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Avatar
                    avatar={employee.avatar}
                    name={employee.name}
                    initials={employee.initials}
                    initialsBg={employee.initialsBg}
                    size="xl"
                  />
                )}

                {/* Uploading overlay */}
                {(uploadAvatarMutation.isPending || deleteAvatarMutation.isPending) && (
                  <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex flex-col items-center justify-center text-white z-10">
                    <Loader2 className="w-6 h-6 animate-spin text-white mb-1" />
                    <span className="text-[10px] font-semibold">
                      {uploadAvatarMutation.isPending ? 'Uploading...' : 'Removing...'}
                    </span>
                  </div>
                )}
              </div>

              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
              />

              {avatarError && (
                <p role="alert" className="mt-2 text-xs text-red-600">
                  {avatarError}
                </p>
              )}
            </div>

            {/* When a new file is selected: Save / Cancel Controls */}
            {selectedFile && (
              <div className="mb-4 flex flex-col items-center gap-2 w-full max-w-xs">
                <p className="text-xs font-semibold text-blue-600 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  New photo selected
                </p>
                <div className="flex items-center gap-2 w-full">
                  <button
                    type="button"
                    onClick={handleUploadAvatar}
                    disabled={uploadAvatarMutation.isPending}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-1.5 px-3 rounded-lg shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {uploadAvatarMutation.isPending ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        Save Photo
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    disabled={uploadAvatarMutation.isPending}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-1"
                  >
                    <X className="w-3.5 h-3.5" />
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Feedback Message */}
            {feedbackMessage && (
              <div
                className={`mb-3 px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 w-full justify-center ${feedbackMessage.type === 'success'
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-700'
                  : 'bg-red-50 border border-red-200 text-red-700'
                  }`}
              >
                {feedbackMessage.type === 'success' ? (
                  <Check className="w-3.5 h-3.5 shrink-0" />
                ) : (
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                )}
                <span>{feedbackMessage.text}</span>
              </div>
            )}

            <h2 className="text-lg font-bold text-slate-900">{employee.name}</h2>
            <p className="text-xs text-slate-500 font-medium mb-3">
              {employee.email}
            </p>

            <div className="flex items-center gap-2 justify-center flex-wrap mb-5">
              <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-md">
                {jobTitle}
              </span>
              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1.5`}
              >
                <EmployeeStatusBadge status={employee.status} />
              </span>
            </div>

            <a
              href={`mailto:${employee.email}`}
              className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-medium py-2.5 rounded-lg shadow-xs hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contact Employee</span>
            </a>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">Information</h3>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Department</span>
                </div>
                <span className="font-semibold text-slate-800">
                  {deptName}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Address</span>
                </div>
                <span className="font-semibold text-slate-800">
                  {employee.address || 'N/A'}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Phone</span>
                </div>
                <span className="font-semibold text-slate-800">
                  {employee.phone || 'N/A'}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <BadgeCheck className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Employee ID</span>
                </div>
                <span className="font-semibold text-slate-800">
                  {employee.employeeId || employee.id.slice(0, 8)}
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Joined Date</span>
                </div>
                <span className="font-semibold text-slate-800">{joined}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="lg:col-span-2 space-y-6">

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Employment Details
            </h3>

            <hr className="border-t border-slate-200/80" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-lg">
                <span className="text-slate-400 font-semibold block uppercase tracking-wider text-[10px]">
                  Job Title
                </span>
                <span className="font-bold text-slate-900 text-sm mt-1 block">
                  {jobTitle}
                </span>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-100 rounded-lg">
                <span className="text-slate-400 font-semibold block uppercase tracking-wider text-[10px]">
                  Department
                </span>
                <span className="font-bold text-slate-900 text-sm mt-1 block">
                  {deptName || 'N/A'}
                </span>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-100 rounded-lg">
                <span className="text-slate-400 font-semibold block uppercase tracking-wider text-[10px]">
                  Hire Date
                </span>
                <span className="font-bold text-slate-900 text-sm mt-1 block">
                  {joined}
                </span>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-100 rounded-lg">
                <span className="text-slate-400 font-semibold block uppercase tracking-wider text-[10px]">
                  Salary
                </span>
                <span className="font-bold text-slate-900 text-sm mt-1 block">
                  {employee.salary != null
                    ? employee.salary.toLocaleString('en-US')
                    : 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* Status Timeline */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
            <h2 className="text-base font-bold text-slate-900">
              Employee Activity
            </h2>

            <div className="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
              {/* Employee Created */}
              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600 absolute -left-5.75 top-1 border-2 border-white" />

                <h4 className="text-xs font-semibold text-slate-900">
                  Employee Created
                </h4>

                <p className="text-[11px] text-slate-400 mt-0.5">
                  {employee.hireDate
                    ? new Date(employee.hireDate).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })
                    : '—'}
                </p>
              </div>

              {/* Status Changed */}
              {employee.status && (
                <div className="relative">
                  <div
                    className={`w-2.5 h-2.5 rounded-full absolute -left-5.75 top-1 border-2 border-white ${employee.status === 'active'
                      ? 'bg-emerald-600'
                      : employee.status === 'inactive'
                        ? 'bg-amber-500'
                        : 'bg-red-600'
                      }`}
                  />

                  <h4 className="text-xs font-semibold text-slate-900">
                    Status Changed
                  </h4>

                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Current status:{' '}
                    <span className="font-semibold capitalize">
                      {employee.status}
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
