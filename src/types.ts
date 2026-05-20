export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  productId: string;
  quantity: number;
  pricePerUnit: number;
}

export interface Order {
  id: string;
  customerId: string;
  items: OrderItem[];
  status: OrderStatus;
  createdAt: Date;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}
