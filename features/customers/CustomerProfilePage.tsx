'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ChevronRight, Pencil, Mail, MapPin, Phone, Globe, Calendar, ShoppingCart, Building2
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { useCustomer } from './hooks/useCustomer';
import Avatar from '@/components/shared/Avatar';
import { useImageUpload } from '@/hooks/useImageUpload';
import { useDeleteCustomerAvatar, useUploadCustomerAvatar } from './hooks/useUploadCustomerImage';

export default function CustomerProfilePage() {
  const params = useParams();
  const id = params.id as string;

  const { data, isLoading, isError } = useCustomer(id);
  const customer = data ?? null;

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

  const uploadAvatarMutation = useUploadCustomerAvatar();
  const deleteAvatarMutation = useDeleteCustomerAvatar();

  const isAvatarBusy =
    uploadAvatarMutation.isPending || deleteAvatarMutation.isPending;

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFeedbackMessage(null);
    handleImageChange(event);
  };

  const handleUploadAvatar = () => {
    if (!selectedFile || !id || isAvatarBusy) return;
    setFeedbackMessage(null);
    uploadAvatarMutation.mutate(
      { customerId: id, file: selectedFile },
      {
        onSuccess: () => {
          handleRemovePhoto();
          setFeedbackMessage({ type: 'success', text: 'Avatar updated successfully!' });
        },
        onError: () => {
          setFeedbackMessage({ type: 'error', text: 'Failed to upload customer avatar.' });
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
        setFeedbackMessage({ type: 'success', text: 'Avatar removed successfully!' });
      },
      onError: () => {
        setFeedbackMessage({ type: 'error', text: 'Failed to remove customer avatar.' });
      },
    });
  };

  if (isLoading) {
    return (
      <main className="space-y-6 max-w-7xl mx-auto pb-10">
        <div className="py-24 flex flex-col items-center gap-3 text-text-secondary">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-medium">Loading customer…</span>
        </div>
      </main>
    );
  }

  if (isError || !customer) {
    return (
      <main className="space-y-6 max-w-7xl mx-auto pb-10">
        <div className="py-24 text-center text-sm text-red-500 font-medium">
          Customer not found or failed to load.
        </div>
      </main>
    );
  }

  const avgOrderValue =
    customer.orders > 0 ? customer.totalSpent / customer.orders : 0;

  const joinedDate = customer.createdAt
    ? new Date(customer.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : '—';

  const statusConfig =
    customer.status === 'active'
      ? { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-600' }
      : { bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400' };

  return (
    <main className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 font-medium">
        <Link href="/customers" className="hover:text-slate-800 transition-colors">
          Customers
        </Link>
        <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
        <span className="text-slate-700 font-semibold">{customer.companyName}</span>
      </nav>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            {customer.companyName}
          </h1>
          <p className="text-sm text-slate-500 font-normal mt-1">
            Customer Profile &amp; Account History
          </p>
        </div>
        <Link
          href={`/customers/${customer.id}/edit`}
          className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-semibold px-4 py-2.5 rounded-lg shadow-2xs transition-colors cursor-pointer flex items-center gap-2 self-start sm:self-auto"
        >
          <Pencil className="w-4 h-4 text-slate-500" />
          <span>Edit Customer</span>
        </Link>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
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
                  avatar={customer.avatar}
                  name={customer.name}
                  initials={customer.initials}
                  initialsBg={customer.initialsBg}
                  size="xl"
                />
              )}
            </div>

            <h2 className="text-lg font-bold text-slate-900">{customer.companyName}</h2>
            <p className="text-xs text-slate-500 font-medium mb-3">
              Primary Contact:{' '}
              <span className="text-slate-800 font-semibold">{customer.contactName}</span>
            </p>

            <div className="flex items-center gap-2 justify-center mb-5">
              {customer.taxId && (
                <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-md border border-slate-200 flex items-center gap-1">
                  <Building2 className="w-3 h-3" />
                  {customer.taxId}
                </span>
              )}
              <span
                className={`${statusConfig.bg} ${statusConfig.text} text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot}`} />
                {customer.status ?? 'active'}
              </span>
            </div>

            {customer.email && (
              <a
                href={`mailto:${customer.email}`}
                className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-medium py-2.5 rounded-lg shadow-xs hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Send Email</span>
              </a>
            )}

            {/* Avatar feedback */}
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

          {/* Account Information */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">Account Information</h3>

            <div className="space-y-3.5 text-xs">
              {customer.email && (
                <div className="flex items-center justify-between py-1 border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-2 text-slate-500 font-medium">
                    <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>Email</span>
                  </div>
                  <span className="font-semibold text-slate-800 text-right max-w-40 truncate">
                    {customer.email}
                  </span>
                </div>
              )}

              {customer.phone && (
                <div className="flex items-center justify-between py-1 border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-2 text-slate-500 font-medium">
                    <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>Phone</span>
                  </div>
                  <span className="font-semibold text-slate-800">{customer.phone}</span>
                </div>
              )}

              {(customer.address || customer.city) && (
                <div className="flex items-center justify-between py-1 border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-2 text-slate-500 font-medium">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>Address</span>
                  </div>
                  <span className="font-semibold text-slate-800 text-right max-w-40">
                    {[customer.address, customer.city].filter(Boolean).join(', ')}
                  </span>
                </div>
              )}

              {customer.country && (
                <div className="flex items-center justify-between py-1 border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-2 text-slate-500 font-medium">
                    <Globe className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>Country</span>
                  </div>
                  <span className="font-semibold text-slate-800">{customer.country}</span>
                </div>
              )}

              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Joined</span>
                </div>
                <span className="font-semibold text-slate-800">{joinedDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Total Revenue
              </span>
              <span className="text-base sm:text-lg font-bold text-slate-900 mt-1 block">
                {formatCurrency(customer.totalSpent)}
              </span>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Total Orders
              </span>
              <span className="text-base sm:text-lg font-bold text-slate-900 mt-1 block">
                {customer.orders} {customer.orders === 1 ? 'Order' : 'Orders'}
              </span>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Avg Order Value
              </span>
              <span className="text-base sm:text-lg font-bold text-slate-900 mt-1 block">
                {customer.orders > 0 ? formatCurrency(avgOrderValue) : '—'}
              </span>
            </div>
          </div>

          {/* Recent Orders  */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Recent Customer Orders</h3>
              <Link
                href="/orders"
                className="text-xs font-semibold text-[#2563EB] hover:underline flex items-center gap-1"
              >
                <span>View All Orders</span>
              </Link>
            </div>

            {customer.orders === 0 ? (
              <div className="py-10 flex flex-col items-center gap-2 text-slate-400">
                <ShoppingCart className="w-8 h-8" />
                <p className="text-sm font-medium">No orders yet</p>
              </div>
            ) : (
              <div className="py-6 flex flex-col items-center gap-2 text-slate-400">
                <ShoppingCart className="w-7 h-7" />
                <p className="text-sm font-medium text-slate-500">
                  {customer.orders} order{customer.orders !== 1 ? 's' : ''} placed
                </p>
              </div>
            )}
          </div>

          {/* Quick Info */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-3">
            <h3 className="text-base font-bold text-slate-900 mb-1">Quick Info</h3>
            <div className="divide-y divide-slate-100 text-xs">
              <div className="flex justify-between py-2.5">
                <span className="text-slate-500">Customer ID</span>
                <span
                  className="font-mono font-semibold text-slate-700 text-right max-w-32 truncate"
                  title={customer.id}
                >
                  {customer.id.slice(0, 8)}…
                </span>
              </div>
              {customer.taxId && (
                <div className="flex justify-between py-2.5">
                  <span className="text-slate-500">Tax ID</span>
                  <span className="font-mono font-semibold text-slate-700">{customer.taxId}</span>
                </div>
              )}
              <div className="flex justify-between py-2.5">
                <span className="text-slate-500">Status</span>
                <span
                  className={`font-semibold capitalize ${
                    customer.status === 'active' ? 'text-emerald-600' : 'text-slate-500'
                  }`}
                >
                  {customer.status ?? 'active'}
                </span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-slate-500">Member Since</span>
                <span className="font-semibold text-slate-700">{joinedDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
