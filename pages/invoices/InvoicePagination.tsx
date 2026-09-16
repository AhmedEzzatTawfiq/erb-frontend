'use client';

import React from 'react';
import Pagination from '@/components/shared/Pagination';

interface InvoicePaginationProps {
  currentPage: number;
  totalPages: number;
  totalFilteredCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export default function InvoicePagination(props: InvoicePaginationProps) {
  return <Pagination {...props} entityLabel="entries" />;
};
