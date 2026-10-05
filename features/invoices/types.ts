export type InvoiceStatus = 'pending' | 'paid' | 'overdue';

export interface InvoiceLine {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
}

export interface InvoiceCustomer {
  id: string;
  companyName: string;
  contactName: string;
  email: string | null;
}

export interface InvoiceOrder {
  id: string;
  orderDate: string;
  status: string;
  totalAmount: number;
}

export interface InvoiceApi {
  id: string;
  orderId: string;
  customerId: string;
  invoiceDate: string;
  dueDate: string;
  status: InvoiceStatus;
  totalAmount: number;
  paidAt: string | null;
  customer: InvoiceCustomer;
  order: InvoiceOrder;
  lines: InvoiceLine[];
}

export interface GetInvoicesParams {
  status?: InvoiceStatus;
  customerId?: string;
  from?: string;
  to?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface UseInvoicesParams extends GetInvoicesParams {}

export interface UpdateInvoiceStatusInput {
  status: InvoiceStatus;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  totalCount?: number;
  total?: number;
  totalPages: number;
}

export interface InvoicesResponse {
  data: InvoiceApi[];
  meta: PaginationMeta;
}

