export interface Supplier {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  productsSupplied: string[];
  status: 'Active' | 'Inactive' | 'Pending';
  initials?: string;
  initialsBg?: string;
  avatar?: string;
  joinedDate: string;
}
