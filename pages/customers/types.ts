export interface Customer {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  orders: number;
  totalSpent: number;
  status: 'Active' | 'Inactive';
  avatar?: string;
  initials?: string;
  initialsBg?: string;
  joinedDate: string;
}
