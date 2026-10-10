import { collection, doc, runTransaction, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export function validateBuyer(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Campo requerido';
  else if (values.name.trim().length < 2) errors.name = 'Ingresá tu nombre y apellido.';
  if (!values.email.trim()) errors.email = 'Campo requerido';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Ingresá un email válido.';
  if (!values.confirmEmail.trim()) errors.confirmEmail = 'Campo requerido';
  else if (values.confirmEmail.trim().toLowerCase() !== values.email.trim().toLowerCase()) errors.confirmEmail = 'Los emails deben coincidir.';
  return errors;
}

export async function createOrder(buyer, cart, expectedTotal, reference) {
  if (!cart.length || cart.length > 9) throw new Error('Revisá tu selección antes de confirmar.');
  const orderRef = doc(collection(db, 'orders'), reference);
  const total = await runTransaction(db, async (transaction) => {
    const products = await Promise.all(cart.map(item => transaction.get(doc(db, 'products', String(item.id)))));
    const items = products.map((snapshot, index) => {
      const item = cart[index];
      if (!snapshot.exists() || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 99) throw new Error('Un producto ya no está disponible o su cantidad supera 99. Revisá el carrito.');
      const product = snapshot.data();
      if (!Number.isFinite(product.price) || product.price < 0) throw new Error('No pudimos verificar el precio de un producto.');
      return { id: snapshot.id, name: product.name, price: product.price, quantity: item.quantity };
    });
    const currentTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    if (currentTotal !== expectedTotal) throw new Error('Los precios cambiaron. Quitá los productos del carrito y agregalos de nuevo para revisar el total actualizado.');
    transaction.set(orderRef, { buyer: { name: buyer.name.trim(), email: buyer.email.trim().toLowerCase() }, items, total: currentTotal, createdAt: serverTimestamp(), status: 'demo' });
    return currentTotal;
  });
  return { id: orderRef.id, total };
}
