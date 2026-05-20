import { OrderValidator } from '../src/OrderValidator';
import { Order } from '../src/types';

const validator = new OrderValidator();

const validOrder: Order = {
  id: 'order-1',
  customerId: 'customer-1',
  status: 'pending',
  createdAt: new Date(),
  items: [{ productId: 'prod-1', quantity: 2, pricePerUnit: 9.99 }],
};

describe('OrderValidator', () => {
  it('should pass a valid order', () => {
    const result = validator.validate(validOrder);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should fail if order ID is missing', () => {
    const result = validator.validate({ ...validOrder, id: '' });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Order ID is required.');
  });

  it('should fail if items list is empty', () => {
    const result = validator.validate({ ...validOrder, items: [] });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Order must contain at least one item.');
  });

  it('should fail if item quantity is out of range', () => {
    const result = validator.validate({
      ...validOrder,
      items: [{ productId: 'prod-1', quantity: 0, pricePerUnit: 5 }],
    });
    expect(result.valid).toBe(false);
  });

  it('should fail if item price is negative', () => {
    const result = validator.validate({
      ...validOrder,
      items: [{ productId: 'prod-1', quantity: 1, pricePerUnit: -1 }],
    });
    expect(result.valid).toBe(false);
  });

  it('should calculate the correct total', () => {
    const total = validator.calculateTotal({
      ...validOrder,
      items: [
        { productId: 'prod-1', quantity: 2, pricePerUnit: 10 },
        { productId: 'prod-2', quantity: 1, pricePerUnit: 5 },
      ],
    });
    expect(total).toBe(25);
  });
});
