export type OrderStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Pending';
export type PaymentStatus = 'Paid' | 'Pending' | 'Failed' | 'Refunded';

export interface Order {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    initials: string;
    initialsBg: string;
  };
  date: string;
  items: number;
  total: number;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
}
