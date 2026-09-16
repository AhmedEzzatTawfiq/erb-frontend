"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Users,
  Handshake,
  Package,
  Truck,
  ShoppingCart,
  FileText,
  BadgeCheck,
  Settings,
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { name: "Dashboard", href: "/", icon: LayoutGrid },
  { name: "Users", href: "/users", icon: Users },
  { name: "Customers", href: "/customers", icon: Handshake },
  { name: "Products", href: "/products", icon: Package },
  { name: "Suppliers", href: "/suppliers", icon: Truck },
  { name: "Orders", href: "/orders", icon: ShoppingCart },
  { name: "Invoices", href: "/invoices", icon: FileText },
  { name: "Employees", href: "/employees", icon: BadgeCheck },
  // { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-border flex flex-col shrink-0 min-h-screen">
      {/* Brand Header */}
      <div className="px-6 py-6 border-b border-transparent">
        <Link href="/" className="block">
          <h1 className="text-[22px] font-bold text-primary-dark tracking-tight leading-none">
            ERP Core
          </h1>
          <p className="text-xs font-normal text-[#64748B] mt-1.5">
            Enterprise Resource Planning
          </p>
        </Link>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));

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
    </aside>
  );
}
