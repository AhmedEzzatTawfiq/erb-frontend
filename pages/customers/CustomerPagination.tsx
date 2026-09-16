'use client';

import React from 'react';
import { Pagination } from '@/components/shared/Pagination';

interface CustomerPaginationProps {
  currentPage: number;
  totalPages: number;
  totalFilteredCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export default function CustomerPagination(props: CustomerPaginationProps) {
  return <Pagination {...props} entityLabel="entries" />;
};
