'use client';

import DashboardHeader from './DashboardHeader';
import DashboardStats from './DashboardStats';
import DashboardCharts from './DashboardCharts';
import DashboardQuickActions from './DashboardQuickActions';
import DashboardRecentActivity, { DEFAULT_RECENT_ACTIVITIES, RecentActivityOrder } from './DashboardRecentActivity';
import UserFormModal from '@/pages/users/UserFormModal';
import InvoiceFormModal from '@/pages/invoices/InvoiceFormModal';
import OrderFormModal from '@/pages/orders/OrderFormModal';
import { User } from '@/pages/users/types';
import { Invoice } from '@/pages/invoices/types';
import { Order } from '@/pages/orders/types';
import { CheckCircle2, X } from 'lucide-react';
import { useState } from 'react';

export default function DashboardPage() {
  // Recent Activities State
  const [recentActivities, setRecentActivities] = useState<RecentActivityOrder[]>(DEFAULT_RECENT_ACTIVITIES);

  // Modal state
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  // Form data state
  const [userFormData, setUserFormData] = useState({
    name: '',
    email: '',
    role: 'Viewer' as User['role'],
    status: 'Active' as User['status'],
  });

  const [invoiceFormData, setInvoiceFormData] = useState({
    customer: '',
    orderNumber: '',
    amount: 0,
    dueDate: '',
    createdDate: new Date().toISOString().split('T')[0],
    status: 'Draft' as Invoice['status'],
  });

  const [orderFormData, setOrderFormData] = useState({
    customerName: '',
    items: 1,
    total: 0,
    status: 'Pending' as Order['status'],
    paymentStatus: 'Pending' as Order['paymentStatus'],
    date: new Date().toISOString().split('T')[0],
  });

  // Notification Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Open Handlers
  const handleOpenAddUser = () => {
    setUserFormData({ name: '', email: '', role: 'Viewer', status: 'Active' });
    setIsUserModalOpen(true);
  };

  const handleOpenCreateInvoice = () => {
    setInvoiceFormData({
      customer: '',
      orderNumber: '',
      amount: 0,
      dueDate: '',
      createdDate: new Date().toISOString().split('T')[0],
      status: 'Draft',
    });
    setIsInvoiceModalOpen(true);
  };

  const handleOpenCreateOrder = () => {
    setOrderFormData({
      customerName: '',
      items: 1,
      total: 0,
      status: 'Pending',
      paymentStatus: 'Pending',
      date: new Date().toISOString().split('T')[0],
    });
    setIsOrderModalOpen(true);
  };

  // Submit Handlers
  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userFormData.name || !userFormData.email) return;

    setIsUserModalOpen(false);
    showToast(`User "${userFormData.name}" added successfully!`);
  };

  const handleSaveInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invoiceFormData.customer || !invoiceFormData.amount) return;

    setIsInvoiceModalOpen(false);
    showToast(`Invoice for "${invoiceFormData.customer}" created successfully!`);
  };

  const handleSaveOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderFormData.customerName) return;

    const newActivity: RecentActivityOrder = {
      id: `act-${Date.now()}`,
      orderNumber: `#ORD-0${Math.floor(926 + Math.random() * 100)}`,
      customer: orderFormData.customerName,
      amount: Number(orderFormData.total) || 0,
      status: orderFormData.status === 'Processing' ? 'Processing' : orderFormData.status === 'Shipped' ? 'Shipped' : orderFormData.status === 'Delivered' ? 'Completed' : 'Pending',
      date: 'Just now',
    };

    setRecentActivities((prev) => [newActivity, ...prev]);
    setIsOrderModalOpen(false);
    showToast(`Order for "${orderFormData.customerName}" created successfully!`);
  };

  return (
    <main className="space-y-6 max-w-7xl mx-auto pb-10 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-emerald-900 text-white px-4 py-3 rounded-xl shadow-xl animate-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="ml-2 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <DashboardHeader />
      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2 items-start">
        {/* Charts & Recent Activity span 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          <DashboardCharts />
          <DashboardRecentActivity activities={recentActivities} />
        </div>

        {/* Quick Actions takes 1 column */}
        <DashboardQuickActions
          onAddUser={handleOpenAddUser}
          onCreateInvoice={handleOpenCreateInvoice}
          onCreateOrder={handleOpenCreateOrder}
        />
      </div>

      {/* Quick Action Modals */}
      <UserFormModal
        isOpen={isUserModalOpen}
        editUser={null}
        formData={userFormData}
        setFormData={setUserFormData}
        onClose={() => setIsUserModalOpen(false)}
        onSubmit={handleSaveUser}
      />

      <InvoiceFormModal
        isOpen={isInvoiceModalOpen}
        editInvoice={null}
        formData={invoiceFormData}
        setFormData={setInvoiceFormData}
        onClose={() => setIsInvoiceModalOpen(false)}
        onSubmit={handleSaveInvoice}
      />

      <OrderFormModal
        isOpen={isOrderModalOpen}
        editOrder={null}
        formData={orderFormData}
        setFormData={setOrderFormData}
        onClose={() => setIsOrderModalOpen(false)}
        onSubmit={handleSaveOrder}
      />
    </main>
  );
};

