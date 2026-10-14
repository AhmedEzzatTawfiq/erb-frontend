"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User as UserIcon,
  Mail,
  Shield,
  Key,
  BadgeCheck,
  CheckCircle2,
  Lock,
  LogOut,
  RefreshCw,
  Clock,
  AlertCircle,
  Copy,
  Check,
  Laptop,
  Globe,
} from "lucide-react";
import { useAuth } from "@/features/auth/AuthProvider";
import { updateProfile, logoutAllDevices } from "./api";

type TabType = "general" | "security" | "permissions" | "activity";

export default function ProfilePage() {
  const router = useRouter();
  const { user, setUser, refetchUser, logout } = useAuth();

  const [activeTab, setActiveTab] = useState<TabType>("general");
  const [name, setName] = useState(user?.name || "");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  const [isLoggingOutAll, setIsLoggingOutAll] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  // Sync state if user changes
  React.useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user?.name]);

  if (!user) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <div className="flex items-center gap-3 text-text-secondary">
          <RefreshCw className="w-5 h-5 animate-spin text-primary" />
          <span className="font-medium">Loading profile data...</span>
        </div>
      </div>
    );
  }

  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setSaveError("Name cannot be empty.");
      return;
    }

    try {
      setIsSaving(true);
      setSaveSuccess(null);
      setSaveError(null);

      const updated = await updateProfile({ name: name.trim() });
      setUser((prev) => (prev ? { ...prev, name: updated.name } : updated));
      setSaveSuccess("Profile updated successfully!");
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : "Failed to update profile.";
      setSaveError(errorMsg);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogoutAll = async () => {
    if (!window.confirm("Are you sure you want to log out from all active sessions?")) {
      return;
    }

    try {
      setIsLoggingOutAll(true);
      await logoutAllDevices();
      await logout();
      router.replace("/login");
    } catch {
      setSaveError("Failed to logout from all devices.");
    } finally {
      setIsLoggingOutAll(false);
    }
  };

  const handleCopyId = () => {
    if (user?.id) {
      navigator.clipboard.writeText(user.id);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  const initials = user.name
    ? user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
    : "U";

  const roleStyles = {
    admin: {
      bg: "bg-purple-100 text-purple-800 border-purple-200",
      pillBg: "bg-purple-600 text-white",
      badge: "Administrator",
      desc: "Full system administration access, user management, and global configurations.",
    },
    manager: {
      bg: "bg-blue-100 text-blue-800 border-blue-200",
      pillBg: "bg-blue-600 text-white",
      badge: "Manager",
      desc: "Management access over orders, products, customers, and operations.",
    },
    employee: {
      bg: "bg-slate-100 text-slate-700 border-slate-200",
      pillBg: "bg-slate-600 text-white",
      badge: "Employee",
      desc: "Standard operational permissions for daily task processing.",
    },
  };

  const currentRoleStyle = roleStyles[user.role] || roleStyles.employee;

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-text-muted font-medium">
        <Link href="/" className="hover:text-text-main transition-colors">
          Dashboard
        </Link>
        <span>/</span>
        <span className="text-text-main font-semibold">My Profile</span>
      </nav>

      {/* Top Header Card */}
      <div className="bg-white border border-border rounded-2xl p-6 md:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        {/* Subtle decorative background gradient accent */}
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-5 relative z-10">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-linear-to-br from-primary to-primary-dark text-white font-bold text-2xl md:text-3xl flex items-center justify-center shadow-md ring-4 ring-primary-light/50 shrink-0">
            {initials}
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl md:text-3xl font-bold text-text-main tracking-tight">
                {user.name}
              </h1>
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-md border uppercase tracking-wider ${currentRoleStyle.bg}`}
              >
                {user.role}
              </span>
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold px-2.5 py-1 rounded-md flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Active Session
              </span>
            </div>

            <p className="text-sm text-text-secondary flex items-center gap-2">
              <Mail className="w-4 h-4 text-text-muted" />
              {user.email}
            </p>

            <div className="flex items-center gap-2 text-xs text-text-muted pt-1">
              <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-[11px] text-slate-600 border border-slate-200">
                ID: {user.id}
              </span>
              <button
                onClick={handleCopyId}
                type="button"
                className="hover:text-primary transition-colors flex items-center gap-1 text-[11px] font-medium"
                title="Copy User ID"
              >
                {copiedId ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 relative z-10 self-start md:self-auto">
          <button
            onClick={() => refetchUser()}
            type="button"
            className="btn-secondary text-xs"
            title="Refresh session data"
          >
            <RefreshCw className="w-3.5 h-3.5 text-text-secondary" />
            <span>Refresh Profile</span>
          </button>
          <button
            onClick={logout}
            type="button"
            className="bg-danger-bg hover:bg-red-200 text-danger-text text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center gap-2 transition-colors shadow-2xs cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column - Navigation & User Cards */}
        <div className="lg:col-span-1 space-y-6">
          {/* Navigation Tabs List */}
          <div className="bg-white border border-border rounded-xl p-2 shadow-2xs space-y-1">
            <button
              onClick={() => setActiveTab("general")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${activeTab === "general"
                  ? "bg-primary-light text-primary shadow-2xs"
                  : "text-text-secondary hover:bg-border-subtle hover:text-text-main font-medium"
                }`}
            >
              <UserIcon className="w-4 h-4 shrink-0" />
              <span>General Details</span>
            </button>

            <button
              onClick={() => setActiveTab("security")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${activeTab === "security"
                  ? "bg-primary-light text-primary shadow-2xs"
                  : "text-text-secondary hover:bg-border-subtle hover:text-text-main font-medium"
                }`}
            >
              <Key className="w-4 h-4 shrink-0" />
              <span>Security & Sessions</span>
            </button>

            <button
              onClick={() => setActiveTab("permissions")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${activeTab === "permissions"
                  ? "bg-primary-light text-primary shadow-2xs"
                  : "text-text-secondary hover:bg-border-subtle hover:text-text-main font-medium"
                }`}
            >
              <Shield className="w-4 h-4 shrink-0" />
              <span>Role Permissions</span>
            </button>

            <button
              onClick={() => setActiveTab("activity")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${activeTab === "activity"
                  ? "bg-primary-light text-primary shadow-2xs"
                  : "text-text-secondary hover:bg-border-subtle hover:text-text-main font-medium"
                }`}
            >
              <Clock className="w-4 h-4 shrink-0" />
              <span>Activity Log</span>
            </button>
          </div>

          {/* Account Overview Sidebar Card */}
          <div className="bg-white border border-border rounded-xl p-5 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold text-text-main uppercase tracking-wider">
              Account Overview
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-border-subtle">
                <span className="text-text-secondary">Role Title</span>
                <span className="font-semibold text-text-main capitalize">
                  {user.role}
                </span>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-border-subtle">
                <span className="text-text-secondary">Email Status</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Security Level</span>
                <span className="bg-primary-light text-primary font-bold px-2 py-0.5 rounded text-[10px]">
                  ENCRYPTED
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Tab Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* TAB 1: GENERAL DETAILS */}
          {activeTab === "general" && (
            <div className="bg-white border border-border rounded-xl p-6 md:p-8 shadow-2xs space-y-6">
              <div className="border-b border-border-subtle pb-4">
                <h2 className="text-lg font-bold text-text-main flex items-center gap-2">
                  <UserIcon className="w-5 h-5 text-primary" />
                  Personal Information
                </h2>
                <p className="text-xs text-text-secondary mt-1">
                  View and update your display name and personal preferences.
                </p>
              </div>

              {saveSuccess && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-xs font-semibold text-emerald-800 flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{saveSuccess}</span>
                </div>
              )}

              {saveError && (
                <div className="p-4 bg-danger-bg border border-red-200 rounded-lg text-xs font-semibold text-danger-text flex items-center gap-2 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{saveError}</span>
                </div>
              )}

              <form onSubmit={handleUpdateName} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-text-main">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        disabled
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 border border-border rounded-lg text-text-secondary cursor-not-allowed"
                        placeholder="Enter full name"
                        required
                      />
                      <UserIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                    </div>
                    <p className="text-[11px] text-text-muted">
                      Your name will be visible across ERP dashboard logs and actions.
                    </p>
                  </div>

                  {/* Email (Read Only) */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-text-main">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={user.email}
                        disabled
                        className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 border border-border rounded-lg text-text-secondary cursor-not-allowed"
                      />
                      <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                    </div>
                    <p className="text-[11px] text-text-muted">
                      Email address is managed by system admins and cannot be changed here.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-border-subtle">
                  {/* Assigned Role */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-text-main">
                      System Role
                    </label>
                    <div className="p-3 bg-slate-50 border border-border rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BadgeCheck className="w-4 h-4 text-primary" />
                        <span className="text-xs font-bold text-text-main capitalize">
                          {user.role}
                        </span>
                      </div>
                      <span className="text-[11px] text-text-muted">
                        Assigned by Admin
                      </span>
                    </div>
                  </div>

                  {/* Unique User Identifier */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-text-main">
                      User Identifier (ID)
                    </label>
                    <div className="p-3 bg-slate-50 border border-border rounded-lg flex items-center justify-between font-mono text-xs text-text-secondary">
                      <span>{user.id}</span>
                    </div>
                  </div>
                </div>

                {/* Form Action */}
                {/* <div className="flex items-center justify-end gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="btn-primary text-xs cursor-pointer disabled:opacity-50"
                  >
                    {isSaving ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                </div> */}
              </form>
            </div>
          )}

          {/* TAB 2: SECURITY & SESSIONS */}
          {activeTab === "security" && (
            <div className="space-y-6">
              {/* Security Status Card */}
              <div className="bg-white border border-border rounded-xl p-6 shadow-2xs space-y-4">
                <div className="flex items-center justify-between border-b border-border-subtle pb-4">
                  <div>
                    <h2 className="text-base font-bold text-text-main flex items-center gap-2">
                      <Lock className="w-5 h-5 text-primary" />
                      Security & Password
                    </h2>
                    <p className="text-xs text-text-secondary mt-0.5">
                      Manage authentication mechanisms and account protection options.
                    </p>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-emerald-600" />
                    Protected
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-slate-50 border border-border rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-text-main">
                        Password Authentication
                      </span>
                      <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-semibold">
                        ACTIVE
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary">
                      Your account uses password-based login stored securely with Bcrypt hashing.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 border border-border rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-text-main">
                        Security
                      </span>
                      <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold">
                        <Lock className="w-3 h-3 text-emerald-600" />
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary">
                      Your sessions are protected against XSS attacks using secure HttpOnly cookies.
                    </p>
                  </div>
                </div>
              </div>

              {/* Active Sessions Card */}
              <div className="bg-white border border-border rounded-xl p-6 shadow-2xs space-y-6">
                <div className="flex items-center justify-between border-b border-border-subtle pb-4">
                  <div>
                    <h3 className="text-base font-bold text-text-main flex items-center gap-2">
                      <Laptop className="w-5 h-5 text-primary" />
                      Active Devices & Sessions
                    </h3>
                    <p className="text-xs text-text-secondary mt-0.5">
                      Devices currently authorized and connected to your user account.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Current Device Session Item */}
                  <div className="p-4 bg-primary-light/40 border border-primary/20 rounded-xl flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Laptop className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-text-main">
                            Current Web Browser Session
                          </h4>
                          <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded">
                            THIS DEVICE
                          </span>
                        </div>
                        <p className="text-[11px] text-text-secondary mt-0.5 flex items-center gap-2">
                          <Globe className="w-3 h-3 text-text-muted" />
                          Web Browser &bull; Active Now
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Online
                      </span>
                    </div>
                  </div>
                </div>

                {/* Revoke All Sessions Action */}
                <div className="pt-4 border-t border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-text-main">
                      Sign Out From All Devices
                    </h4>
                    <p className="text-[11px] text-text-secondary mt-0.5">
                      This will revoke all active refresh tokens and log out all existing sessions.
                    </p>
                  </div>
                  <button
                    onClick={handleLogoutAll}
                    disabled={isLoggingOutAll}
                    type="button"
                    className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-50 shrink-0"
                  >
                    {isLoggingOutAll ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Logging Out All...</span>
                      </>
                    ) : (
                      <>
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Logout All Devices</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ROLE PERMISSIONS */}
          {activeTab === "permissions" && (
            <div className="bg-white border border-border rounded-xl p-6 md:p-8 shadow-2xs space-y-6">
              <div className="border-b border-border-subtle pb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-text-main flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Role Entitlements & Access
                  </h2>
                  <p className="text-xs text-text-secondary mt-1">
                    Permissions associated with your account role ({user.role.toUpperCase()}).
                  </p>
                </div>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-md border uppercase tracking-wider ${currentRoleStyle.bg}`}
                >
                  {currentRoleStyle.badge}
                </span>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <p className="text-xs text-text-secondary leading-relaxed">
                  {currentRoleStyle.desc}
                </p>
              </div>

              {/* Permissions Checklist */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50/70 border border-border rounded-xl flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-text-main">
                      Dashboard & Navigation Access
                    </h4>
                    <p className="text-[11px] text-text-secondary mt-0.5">
                      Full access to ERP navigation, analytics cards, and operational hubs.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50/70 border border-border rounded-xl flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-text-main">
                      Orders & Inventory Management
                    </h4>
                    <p className="text-[11px] text-text-secondary mt-0.5">
                      Ability to view and process product inventory and customer orders.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50/70 border border-border rounded-xl flex items-start gap-3">
                  {/* {user.role === "admin" || user.role === "manager" ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                  ) : (
                    <Lock className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                  )} */}

                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />

                  <div>
                    <h4 className="text-xs font-bold text-text-main">
                      Customer & Supplier Data
                    </h4>
                    {/* <p className="text-[11px] text-text-secondary mt-0.5">
                      {user.role === "employee"
                        ? "Restricted view permissions."
                        : "Management and edit access to customer files and suppliers."}
                    </p> */}
                    <p className="text-[11px] text-text-secondary mt-0.5">
                      Management and edit access to customer files and suppliers.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50/70 border border-border rounded-xl flex items-start gap-3">
                  {user.role === "admin" ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                  ) : (
                    <Lock className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                  )}
                  <div>
                    <h4 className="text-xs font-bold text-text-main">
                      User Management & Administration
                    </h4>
                    <p className="text-[11px] text-text-secondary mt-0.5">
                      {user.role === "admin"
                        ? "Full admin control over users, roles, and access controls."
                        : "Requires Administrator privileges."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ACTIVITY LOG */}
          {activeTab === "activity" && (
            <div className="bg-white border border-border rounded-xl p-6 md:p-8 shadow-2xs space-y-6">
              <div className="border-b border-border-subtle pb-4">
                <h2 className="text-lg font-bold text-text-main flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Recent Account Activity
                </h2>
                <p className="text-xs text-text-secondary mt-1">
                  Audit trail of your recent login events and account updates.
                </p>
              </div>

              <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-border-subtle">
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 absolute -left-5.75 top-1 border-2 border-white ring-2 ring-emerald-100" />
                  <h4 className="text-xs font-bold text-text-main">
                    Active Session Verified
                  </h4>
                  <p className="text-[11px] text-text-secondary mt-0.5">
                    User session successfully authenticated via JWT bearer token.
                  </p>
                  <span className="text-[10px] text-text-muted mt-1 block">
                    Just now
                  </span>
                </div>

                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-primary absolute -left-5.75 top-1 border-2 border-white ring-2 ring-blue-100" />
                  <h4 className="text-xs font-bold text-text-main">
                    Logged in to ERP Dashboard
                  </h4>
                  <p className="text-[11px] text-text-secondary mt-0.5">
                    Successful login with account {user.email}.
                  </p>
                  <span className="text-[10px] text-text-muted mt-1 block">
                    Today
                  </span>
                </div>

                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-purple-500 absolute -left-5.75 top-1 border-2 border-white ring-2 ring-purple-100" />
                  <h4 className="text-xs font-bold text-text-main">
                    Role Verification & Access Granted
                  </h4>
                  <p className="text-[11px] text-text-secondary mt-0.5">
                    Role level ({user.role.toUpperCase()}) confirmed by auth guard.
                  </p>
                  <span className="text-[10px] text-text-muted mt-1 block">
                    Session Start
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
