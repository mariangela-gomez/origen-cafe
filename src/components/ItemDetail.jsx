import { Link, useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { getProduct } from '../services/products';
import ItemCount from './ItemCount';

export default function ItemDetail() {
  const { id } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [feedback, setFeedback] = useState('');
  const { addItem, removeItem, isInCart } = useCart();
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true); setError(false); setProduct(null); setQuantity(1); setFeedback('');
    getProduct(id, { signal: controller.signal }).then(setProduct).catch(() => { if (!controller.signal.aborted) setError(true); }).finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [id, attempt]);
  useEffect(() => { if (product) document.title = `${product.name} | Origen Café`; }, [product]);
  if (loading) return <div className="container loading" role="status">Buscando producto...</div>;
  if (error) return <section className="container empty-page"><h1>No pudimos cargar este café.</h1><p>Revisá tu conexión y volvé a intentarlo.</p><button className="primary-button" onClick={() => setAttempt(attempt + 1)}>Reintentar</button></section>;
  if (!product) return <section className="container empty-page"><h1>No encontramos ese café.</h1><Link className="primary-button" to="/productos">Volver a la tienda</Link></section>;
  return <section className="detail-page container">
    <Link to={location.state?.catalogPath || '/productos'} className="back-link">← Volver a la tienda</Link>
    <div className="detail-layout"><div className="detail-image"><img src={product.image} alt={product.alt || product.name} decoding="async" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = '/foto-taza-cafe-latte.jpg'; }} /></div>
      <div className="detail-copy"><p className="detail-format">{product.category}</p><h1>{product.name}</h1><p className="detail-price">$ {product.price.toLocaleString('es-AR')}</p><div className="detail-line" /><p className="detail-description">{product.description}</p><div className="detail-meta"><span>Perfil de taza</span><strong>{product.color}</strong></div>
        <div className="detail-purchase"><p>Unidades para agregar</p><ItemCount quantity={quantity} minimum={0} onChange={(value) => { setQuantity(value); setFeedback(''); }} name={product.name} removeLabel={isInCart(product.id) ? 'Eliminar ' + product.name + ' del carrito' : 'Quitar selección de ' + product.name} removeDisabled={quantity === 0 && !isInCart(product.id)} onRemove={() => { removeItem(product.id); setQuantity(0); setFeedback(''); }} />
          <button type="button" className="primary-button" disabled={quantity === 0} onClick={() => { addItem(product, quantity); setFeedback(quantity + (quantity === 1 ? ' unidad agregada.' : ' unidades agregadas.')); }}>Agregar al carrito <span>+</span></button>
          <p className="cart-feedback" role="status">{feedback}</p>
          {isInCart(product.id) && <Link to="/carrito" className="back-link">Ver mi carrito →</Link>}
        </div>
      </div>
    </div>
  </section>;
}
