export const CART_KEY = 'origen-cafe-cart';
export function validItem(item) {
  return item && ['string', 'number'].includes(typeof item.id) && typeof item.name === 'string' && Number.isFinite(item.price) && item.price >= 0 && Number.isSafeInteger(item.quantity) && item.quantity > 0;
}
export function cartReducer(cart, action) {
  switch (action.type) {
    case 'add': {
      const item = { ...action.product, quantity: action.quantity };
      if (!validItem(item)) return cart;
      const existing = cart.find((entry) => String(entry.id) === String(item.id));
      if (!existing) return [...cart, item];
      if (!Number.isSafeInteger(existing.quantity + item.quantity)) return cart;
      return cart.map((entry) => entry === existing ? { ...entry, quantity: entry.quantity + item.quantity } : entry);
    }
    case 'quantity':
      if (!Number.isSafeInteger(action.quantity) || action.quantity < 1) return cart;
      return cart.map((item) => String(item.id) === String(action.id) ? { ...item, quantity: action.quantity } : item);
    case 'remove': return cart.filter((item) => String(item.id) !== String(action.id));
    case 'clear': return [];
    default: return cart;
  }
}
export function cartTotals(cart) {
  return cart.reduce((totals, item) => ({ totalQuantity: totals.totalQuantity + item.quantity, totalPrice: totals.totalPrice + item.price * item.quantity }), { totalQuantity: 0, totalPrice: 0 });
}
