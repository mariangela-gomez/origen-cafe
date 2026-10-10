import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Item from './Item';
import { getProducts } from '../services/products';

function updateMeta(name, content) {
  const tag = document.querySelector(`meta[name="${name}"]`) || document.createElement('meta');
  tag.setAttribute('name', name);
  tag.setAttribute('content', content);
  if (!tag.parentNode) document.head.appendChild(tag);
}

function updateProperty(property, content) {
  const tag = document.querySelector(`meta[property="${property}"]`) || document.createElement('meta');
  tag.setAttribute('property', property);
  tag.setAttribute('content', content);
  if (!tag.parentNode) document.head.appendChild(tag);
}

export default function ItemListContainer() {
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedCategory = searchParams.get('categoria') || 'Todos';
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    document.title = 'Tienda de café | Granos, molido y cápsulas | Origen Café';
    updateMeta('description', 'Comprá café de especialidad en granos, molido y cápsulas. Elegí tu próximo café favorito en Origen Café.');
    updateProperty('og:title', 'Tienda de café | Origen Café');
    updateProperty('og:description', 'Cafés de especialidad, blends intensos y cápsulas para disfrutar una buena taza.');
    updateProperty('og:url', window.location.href);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true); setError(false);
    getProducts({ signal: controller.signal }).then(setProducts).catch(() => { if (!controller.signal.aborted) setError(true); }).finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [attempt]);

  const categories = ['Todos', ...new Set(products.map((product) => product.category))];
  const activeCategory = categories.includes(requestedCategory) ? requestedCategory : 'Todos';
  const visibleProducts = activeCategory === 'Todos' ? products : products.filter((product) => product.category === activeCategory);

  return (
    <section className="catalog-page container">
      <div className="page-intro"><h1>Elegí tu próximo<br /><em>café favorito.</em></h1><p className="intro-copy">Granos, café molido y cápsulas para disfrutar una buena taza todos los días.</p></div>
      <div className="catalog-toolbar"><div className="filters">{categories.map((category) => <button type="button" key={category} aria-pressed={activeCategory === category} onClick={() => setSearchParams(category === 'Todos' ? {} : { categoria: category })} className={activeCategory === category ? 'filter active' : 'filter'}>{category}</button>)}</div><span className="results-count">{visibleProducts.length} {visibleProducts.length === 1 ? 'café' : 'cafés'}</span></div>
      {loading ? <div className="loading" role="status">Cargando la colección...</div> : error ? <div role="alert"><p>No pudimos cargar la colección. Revisá tu conexión.</p><button className="primary-button" onClick={() => setAttempt(attempt + 1)}>Reintentar</button></div> : !visibleProducts.length ? <p>No hay cafés disponibles en esta categoría.</p> : <div className="product-grid">{visibleProducts.map((product) => <Item product={product} key={product.id} />)}</div>}
    </section>
  );
}
