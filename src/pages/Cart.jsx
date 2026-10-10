import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ItemCount from '../components/ItemCount';
const money = (value) => '$ ' + value.toLocaleString('es-AR');

export default function Cart() {
  const { cart, removeItem, updateQuantity, clearCart, totalQuantity, totalPrice, storageError } = useCart();
  if (!cart.length) return <section className="empty-page container"><h1>El carrito está<br /><em>esperando.</em></h1><p>Elegí tus aromas favoritos y armá una selección para hacer de tu casa un lugar más cálido.</p><Link to="/productos" className="primary-button">Volver a la colección <span>→</span></Link></section>;
  return <section className="cart-page container">
    <div className="cart-heading"><h1>Tu selección de café.</h1><Link className="back-link" to="/productos">Seguir comprando →</Link></div>
    {storageError && <p role="alert">El navegador no permite guardar el carrito. Tus productos se conservarán mientras esta página siga abierta.</p>}
    <div className="cart-layout"><div><ul className="cart-items">{cart.map((item) => <li className="cart-row" key={item.id}>
      <Link className="cart-image" to={'/producto/' + item.id}><img src={item.image} alt={item.alt || item.name} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = '/foto-taza-cafe-latte.jpg'; }} /></Link>
      <div className="cart-product"><Link to={'/producto/' + item.id}><h2>{item.name}</h2></Link><p>{item.category}</p><p>{money(item.price)} por unidad</p><button type="button" className="cart-text-button" aria-label={'Eliminar ' + item.name} onClick={() => removeItem(item.id)}>Eliminar</button></div>
      <ItemCount quantity={item.quantity} onChange={(quantity) => updateQuantity(item.id, quantity)} name={item.name} />
      <strong className="cart-line-total">{money(item.price * item.quantity)}</strong>
    </li>)}</ul><button type="button" className="cart-text-button clear-cart" onClick={clearCart}>Vaciar carrito</button></div>
    <aside className="cart-summary" aria-label="Resumen del carrito"><h2>Resumen</h2><div><span>Unidades</span><span>{totalQuantity}</span></div><div className="cart-grand-total" aria-live="polite"><span>Total de productos</span><strong>{money(totalPrice)}</strong></div><p>El total corresponde a los productos seleccionados. El envío se calcula al finalizar la compra.</p><p className="checkout-note">Próximamente podrás finalizar tu compra desde aquí.</p></aside></div>
  </section>;
}
