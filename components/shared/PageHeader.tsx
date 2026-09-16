'use client';

import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  actions?: React.ReactNode;
}

export default function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-text-main tracking-tight">
          {title}
        </h1>
        <p className="text-sm text-text-secondary mt-1 font-medium">
          {subtitle}
        </p>
      </div>

      {actions && (
        <div className="flex items-center gap-3">
          {actions}
        </div>
      )}
    </div>
  );
};
