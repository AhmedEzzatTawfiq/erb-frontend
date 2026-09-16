'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';

export interface FilterSelectOption {
  label: string;
  value: string;
}

interface FilterSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: FilterSelectOption[];
  label?: string;
  leadingIcon?: React.ReactNode;
  className?: string;
}

export default function FilterSelect({
  value,
  onChange,
  options,
  label,
  leadingIcon,
  className = '',
}: FilterSelectProps) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="text-[11px] font-bold text-text-secondary uppercase tracking-wider block">
          {label}
        </label>
      )}
      <div className="relative">
        {leadingIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
            {leadingIcon}
          </span>
        )}
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full appearance-none ${leadingIcon ? 'pl-9' : 'pl-4'} pr-10 py-2.5 text-sm bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-2xs text-text-main font-medium cursor-pointer`}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
      </div>
    </div>
  );
};
