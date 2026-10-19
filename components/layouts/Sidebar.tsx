"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid, Users, Handshake,
  Package, Truck, ShoppingCart,
  FileText, BadgeCheck, UserCircle,
  LogOut, X,
} from "lucide-react";
import { useAuth } from "@/features/auth/AuthProvider";
 
interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutGrid },
  { name: "Users", href: "/users", icon: Users },
  { name: "Customers", href: "/customers", icon: Handshake },
  { name: "Products", href: "/products", icon: Package },
  { name: "Suppliers", href: "/suppliers", icon: Truck },
  { name: "Orders", href: "/orders", icon: ShoppingCart },
  { name: "Invoices", href: "/invoices", icon: FileText },
  { name: "Employees", href: "/employees", icon: BadgeCheck },
  { name: "My Profile", href: "/profile", icon: UserCircle },
];

interface SidebarProps {
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}

export default function Sidebar({ mobileOpen = false, setMobileOpen }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  // Close mobile sidebar on route change
  useEffect(() => {
    if (setMobileOpen) {
      setMobileOpen(false);
    }
  }, [pathname, setMobileOpen]);

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 md:hidden transition-opacity"
          onClick={() => setMobileOpen?.(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-border flex flex-col shrink-0 min-h-screen transition-transform duration-200 ease-in-out md:static md:translate-x-0 ${
          mobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Brand Header */}
        <div className="px-6 py-6 border-b border-border-subtle flex items-center justify-between">
          <Link href="/" className="block">
            <h1 className="text-[22px] font-bold text-primary-dark tracking-tight leading-none">
              ERP Core
            </h1>
            <p className="text-xs font-normal text-[#64748B] mt-1.5">
              Enterprise Resource Planning
            </p>
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen?.(false)}
            className="p-1.5 text-text-secondary hover:text-text-main hover:bg-border-subtle rounded-lg md:hidden transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(`${item.href}/`));

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-lg text-sm transition-all duration-150 ${
                  isActive
                    ? "bg-primary-light text-primary font-semibold shadow-2xs"
                    : "text-text-secondary hover:bg-border-subtle hover:text-text-main font-medium"
                }`}
              >
                <Icon
                  className={`w-5 h-5 shrink-0 ${
                    isActive ? "text-primary" : "text-text-secondary"
                  }`}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom User Card */}
        {user && (
          <div className="p-3 border-t border-border-subtle m-3 bg-slate-50/80 rounded-xl space-y-2">
            <Link
              href="/profile"
              className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-white transition-colors group"
            >
              <div className="w-9 h-9 rounded-lg bg-linear-to-br from-primary to-primary-dark text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                {initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-text-main truncate group-hover:text-primary transition-colors">
                  {user.name}
                </p>
                <p className="text-[10px] text-text-muted capitalize truncate">
                  {user.role}
                </p>
              </div>
            </Link>

            <button
              onClick={() => logout()}
              type="button"
              className="w-full flex items-center justify-center gap-2 py-1.5 px-3 text-[11px] font-semibold text-text-secondary hover:text-danger-text hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

