export type InvoiceStatus = 'Paid' | 'Pending' | 'Overdue' | 'Cancelled' | 'Draft';

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customer: string;
  orderNumber: string;
  amount: number;
  dueDate: string;
  createdDate: string;
  status: InvoiceStatus;
}
