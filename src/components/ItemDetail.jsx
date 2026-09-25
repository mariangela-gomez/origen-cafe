import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ItemDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => { fetch('/productos.json').then((response) => response.json()).then((items) => setProduct(items.find((item) => String(item.id) === id))); }, [id]);

  if (!product) return <div className="container loading">Buscando producto...</div>;

  return <section className="detail-page container"><Link to="/productos" className="back-link">← Volver a la tienda</Link><div className="detail-layout"><div className="detail-image"><img src={product.image} alt={product.alt || product.name} decoding="async" onError={(event) => { event.currentTarget.src = '/foto-taza-cafe-latte.jpg'; }} /></div><div className="detail-copy"><p className="eyebrow">{product.category} · {product.tag}</p><h1>{product.name}</h1><p className="detail-price">${product.price.toLocaleString('es-AR')}</p><div className="detail-line" /><p className="detail-description">{product.description}</p><div className="detail-meta"><span>Perfil de taza</span><strong>{product.color}</strong></div><button type="button" className="primary-button">Agregar al carrito <span>+</span></button></div></div></section>;
}
