"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Bell, HelpCircle, User as UserIcon, LogOut, Settings, ShieldCheck, ChevronDown, Menu } from "lucide-react";
import { useAuth } from "@/features/auth/AuthProvider";

interface NavbarProps {
  onToggleMobileMenu?: () => void;
}

export default function Navbar({ onToggleMobileMenu }: NavbarProps = {}) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setIsOpen(false);
    await logout();
    router.replace("/login");
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <header className="w-full h-16 bg-white/70 backdrop-blur-md border-b border-border px-6 md:px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onToggleMobileMenu}
          className="p-2 -ml-2 text-text-secondary hover:text-text-main hover:bg-border-subtle rounded-lg md:hidden transition-colors"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden md:flex items-center gap-2 text-xs text-text-muted font-medium">
          <span>Dashboard</span>
          <span>/</span>
          <span className="text-text-main">ERP Core</span>
        </div>
      </div>

      <div className="flex-1 max-w-md mx-auto md:mx-0 md:ml-auto md:mr-auto">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-border rounded-lg placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-2xs"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* <button
          type="button"
          aria-label="Notifications"
          className="p-2 text-text-secondary hover:text-text-main hover:bg-border-subtle rounded-full transition-colors relative"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full ring-2 ring-white" />
        </button> */}

        {/* <button
          type="button"
          aria-label="Help"
          className="p-2 text-text-secondary hover:text-text-main hover:bg-border-subtle rounded-full transition-colors hidden sm:block"
        >
          <HelpCircle className="w-5 h-5" />
        </button> */}

        {/* User Profile Dropdown Menu */}
        <div className="pl-1 relative" ref={dropdownRef}>
          {user ? (
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="flex items-center gap-2.5 p-1 rounded-full hover:bg-border-subtle transition-all cursor-pointer group"
              aria-expanded={isOpen}
              aria-label="User menu"
            >
              <div className="w-9 h-9 rounded-full bg-linear-to-br from-primary to-primary-dark text-white font-bold text-xs flex items-center justify-center border border-primary/20 shadow-2xs group-hover:scale-105 transition-transform">
                {initials}
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-xs font-bold text-text-main leading-none truncate max-w-30">
                  {user.name}
                </span>
                <span className="text-[10px] text-text-muted capitalize leading-none mt-1">
                  {user.role}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-text-secondary hidden md:block" />
            </button>
          ) : (
            <Link
              href="/login"
              className="btn-primary text-xs"
            >
              Log In
            </Link>
          )}

          {/* Dropdown Content */}
          {isOpen && user && (
            <div className="absolute right-0 mt-2 w-60 bg-white border border-border rounded-xl shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2">
              {/* Header Info */}
              <div className="px-4 py-3 border-b border-border-subtle">
                <p className="text-xs font-bold text-text-main truncate">
                  {user.name}
                </p>
                <p className="text-[11px] text-text-muted truncate mt-0.5">
                  {user.email}
                </p>
                <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-primary-light text-primary text-[10px] font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-3 h-3" />
                  {user.role}
                </div>
              </div>

              {/* Menu Links */}
              <div className="py-1">
                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-text-secondary hover:text-text-main hover:bg-slate-50 transition-colors"
                >
                  <UserIcon className="w-4 h-4 text-primary" />
                  <span>My Profile</span>
                </Link>

                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-text-secondary hover:text-text-main hover:bg-slate-50 transition-colors"
                >
                  <Settings className="w-4 h-4 text-text-muted" />
                  <span>Account Settings</span>
                </Link>
              </div>

              {/* Logout Button */}
              <div className="pt-1 border-t border-border-subtle">
                <button
                  onClick={handleLogout}
                  type="button"
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-danger-text hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-red-500" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
