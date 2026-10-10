import { Link, useLocation } from 'react-router-dom';
import ProductActions from './ProductActions';

export default function Item({ product }) {
  const { pathname, search } = useLocation();
  return (
    <article className="product-card">
      <Link to={`/producto/${product.id}`} state={{ catalogPath: pathname + search }} className="product-image-wrap">
        <img src={product.image} alt={product.alt || product.name} className="product-image" loading="lazy" decoding="async" onError={(event) => { event.currentTarget.src = '/foto-taza-cafe-latte.jpg'; }} />
        <span className="product-tag">{product.tag}</span>
      </Link>
      <div className="product-info"><div><p className="product-category">{product.category}</p><h3>{product.name}</h3></div><strong>${product.price.toLocaleString('es-AR')}</strong></div>
      <p className="product-color">{product.color}</p>
      <ProductActions product={product} />
    </article>
  );
}
