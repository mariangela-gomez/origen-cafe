import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CheckoutForm from '../components/CheckoutForm';
import { createOrder, validateBuyer } from '../services/orders';

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const [values, setValues] = useState({ name: '', email: '', confirmEmail: '' });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [order, setOrder] = useState(null);
  const sending = useRef(false);
  const reference = useRef(crypto.randomUUID());
  useEffect(() => { document.title = 'Confirmar pedido | Origen Café'; }, []);
  const onChange = event => { const { name, value } = event.target; setValues(previous => ({ ...previous, [name]: value })); setErrors(previous => ({ ...previous, [name]: '' })); };
  const onSubmit = async event => {
    event.preventDefault();
    if (sending.current) return;
    const nextErrors = validateBuyer(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) { document.getElementById(Object.keys(nextErrors)[0])?.focus(); return; }
    sending.current = true; setSubmitting(true); setError('');
    try { const result = await createOrder(values, cart, totalPrice, reference.current); setOrder(result); clearCart(); }
    catch (failure) { setError(failure.code ? 'No pudimos guardar el pedido. Tu carrito sigue intacto. Revisá tu conexión y volvé a intentarlo.' : failure.message); }
    finally { sending.current = false; setSubmitting(false); }
  };
  if (order) return <section className="container empty-page order-success" role="status"><h1>Tu pedido quedó<br /><em>registrado.</em></h1><p>Guardá esta referencia para consultar sobre tu pedido.</p><strong className="order-reference">{order.id}</strong><p>Total de productos: $ {order.total.toLocaleString('es-AR')}. </p><Link className="primary-button" to="/productos">Volver a la tienda</Link></section>;
  if (!cart.length) return <section className="container empty-page"><h1>Primero, elegí tu café.</h1><p>Tu carrito está vacío.</p><Link className="primary-button" to="/productos">Ir a la tienda</Link></section>;
  return <section className="container checkout-page"><Link className="back-link" to="/carrito">← Volver al carrito</Link><h1>Un último paso.</h1><div className="checkout-layout"><CheckoutForm values={values} errors={errors} onChange={onChange} onSubmit={onSubmit} submitting={submitting} error={error} /><aside className="cart-summary"><h2>Tu pedido</h2><ul className="checkout-items">{cart.map(item => <li key={item.id}><span>{item.quantity} × {item.name}</span><strong>$ {(item.price * item.quantity).toLocaleString('es-AR')}</strong></li>)}</ul><div className="cart-grand-total"><span>Total</span><strong>$ {totalPrice.toLocaleString('es-AR')}</strong></div><p>Total de productos. No incluye el costo de envío.</p></aside></div></section>;
}
