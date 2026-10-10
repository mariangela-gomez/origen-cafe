import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ItemCount from './ItemCount';

export default function ProductActions({ product, label = 'Ver más información' }) {
  const { pathname, search } = useLocation();
  const { cart, addItem, removeItem, updateQuantity } = useCart();
  const quantity = cart.find((item) => String(item.id) === String(product.id))?.quantity || 0;

  return <div className="product-actions">
    <Link to={`/producto/${product.id}`} state={{ catalogPath: pathname === '/productos' ? pathname + search : '/productos' }} className="product-cta" aria-label={`Ver más información sobre ${product.name}`}>{label}</Link>
    <span className="sr-only">Unidades en tu carrito</span><ItemCount quantity={quantity} minimum={0} name={product.name} onChange={(nextQuantity) => {
      if (nextQuantity > quantity) addItem(product, nextQuantity - quantity);
      else if (nextQuantity === 0) removeItem(product.id);
      else updateQuantity(product.id, nextQuantity);
    }} />
  </div>;
}
