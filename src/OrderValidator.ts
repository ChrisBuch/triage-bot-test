import { Order, ValidationResult } from './types';

const MAX_ITEMS = 50;
const MAX_QUANTITY_PER_ITEM = 100;

export class OrderValidator {
  validate(order: Order): ValidationResult {
    const errors: string[] = [];

    if (!order.id || order.id.trim() === '') {
      errors.push('Order ID is required.');
    }

    if (!order.customerId || order.customerId.trim() === '') {
      errors.push('Customer ID is required.');
    }

    if (!order.items || order.items.length === 0) {
      errors.push('Order must contain at least one item.');
    } else if (order.items.length > MAX_ITEMS) {
      errors.push(`Order cannot contain more than ${MAX_ITEMS} items.`);
    } else {
      for (const item of order.items) {
        if (!item.productId || item.productId.trim() === '') {
          errors.push('Each item must have a product ID.');
        }
        if (item.quantity <= 0 || item.quantity > MAX_QUANTITY_PER_ITEM) {
          errors.push(`Item quantity must be between 1 and ${MAX_QUANTITY_PER_ITEM}.`);
        }
        if (item.pricePerUnit < 0) {
          errors.push('Item price cannot be negative.');
        }
      }
    }

    return { valid: errors.length === 0, errors };
  }

  calculateTotal(order: Order): number {
    return order.items.reduce((sum, item) => sum + item.quantity * item.pricePerUnit, 0);
  }

  isCancellable(order: Order): boolean {
    return order.status === 'pending' || order.status === 'confirmed';
  }
}
