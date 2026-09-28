'use client';

import React from 'react';
import Link from 'next/link';
import { Eye, Pencil, Trash2 } from 'lucide-react';

interface ActionDropDownProps {
  href: string;
  id: string;
  editLabel: string;
  deleteLabel: string;
  setActiveDropdown: (id: string | null) => void;
  onDeleteUser: (id: string) => void;
}

export default function ActionDropDown({
  href,
  id,
  setActiveDropdown,
  onDeleteUser,
  editLabel,
  deleteLabel
}: ActionDropDownProps) {
  return (
    <div className="absolute right-5 top-12 z-20 w-40 bg-white border border-border rounded-xl shadow-lg py-1 animate-in fade-in zoom-in-95 duration-150 text-left">
      <Link
        href={href}
        onClick={() => setActiveDropdown(null)}
        className="w-full px-4 py-2 text-xs font-semibold text-text-main hover:bg-slate-50 flex items-center gap-2"
      >
        <Eye className="w-3.5 h-3.5 text-text-secondary" />
        View Details
      </Link>
      <Link
        href={`${href}/edit`}
        onClick={() => setActiveDropdown(null)}
        className="w-full px-4 py-2 text-xs font-semibold text-text-main hover:bg-slate-50 flex items-center gap-2"
      >
        <Pencil className="w-3.5 h-3.5 text-text-secondary" />
        {editLabel}
      </Link>
      <div className="border-t border-border my-1" />
      <button
        type="button"
        onClick={() => {
          setActiveDropdown(null);
          onDeleteUser(id);
        }}
        className="w-full px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2 text-left"
      >
        <Trash2 className="w-3.5 h-3.5 text-red-600" />
       {deleteLabel}
      </button>
    </div>
  );
}
