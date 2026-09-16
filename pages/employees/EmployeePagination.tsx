'use client';

import React from 'react';
import Pagination from '@/components/shared/Pagination';

interface EmployeePaginationProps {
  currentPage: number;
  totalPages: number;
  totalFilteredCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export default function EmployeePagination(props: EmployeePaginationProps) {
  return <Pagination {...props} entityLabel="employees" />;
};
