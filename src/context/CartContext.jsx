import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { CART_KEY, cartReducer, cartTotals, validItem } from './cartState';

const CartContext = createContext(null);
function readCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    return Array.isArray(saved) ? saved.filter(validItem).reduce((cart, item) => cartReducer(cart, { type: 'add', product: item, quantity: item.quantity }), []) : [];
  } catch { return []; }
}
export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, undefined, readCart);
  const [storageError, setStorageError] = useState(false);
  useEffect(() => {
    try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); setStorageError(false); }
    catch { setStorageError(true); }
  }, [cart]);
  const addItem = (product, quantity = 1) => dispatch({ type: 'add', product, quantity });
  const removeItem = (id) => dispatch({ type: 'remove', id });
  const updateQuantity = (id, quantity) => dispatch({ type: 'quantity', id, quantity });
  const clearCart = () => dispatch({ type: 'clear' });
  const isInCart = (id) => cart.some((item) => String(item.id) === String(id));
  return <CartContext.Provider value={{ cart, addItem, removeItem, updateQuantity, clearCart, isInCart, storageError, ...cartTotals(cart) }}>{children}</CartContext.Provider>;
}
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart debe usarse dentro de CartProvider');
  return context;
}
