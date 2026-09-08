"use client";

import { Search, Bell, HelpCircle } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="w-full h-16 bg-white/70 backdrop-blur-md border-b border-border px-6 md:px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="hidden md:flex items-center gap-2 text-xs text-text-muted font-medium">
        <span>Dashboard</span>
        <span>/</span>
        <span className="text-text-main">ERP Core</span>
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
        <button
          type="button"
          aria-label="Notifications"
          className="p-2 text-text-secondary hover:text-text-main hover:bg-border-subtle rounded-full transition-colors relative"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full ring-2 ring-white" />
        </button>

        <button
          type="button"
          aria-label="Help"
          className="p-2 text-text-secondary hover:text-text-main hover:bg-border-subtle rounded-full transition-colors"
        >
          <HelpCircle className="w-5 h-5" />
        </button>

        <div className="pl-1 flex items-center">
          <button
            type="button"
            className="flex items-center rounded-full ring-2 ring-transparent hover:ring-primary/20 transition-all"
          >
            <div className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden relative border border-border flex items-center justify-center text-xs font-bold text-brand-title">
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
                alt="User Avatar"
                width={36}
                height={36}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
