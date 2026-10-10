import { useEffect, useState } from 'react';
import Item from './Item';

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
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Tienda de café | Granos, molido y cápsulas | Origen Café';
    updateMeta('description', 'Comprá café de especialidad en granos, molido y cápsulas. Elegí tu próximo café favorito en Origen Café.');
    updateProperty('og:title', 'Tienda de café | Origen Café');
    updateProperty('og:description', 'Cafés de especialidad, blends intensos y cápsulas para disfrutar una buena taza.');
    updateProperty('og:url', window.location.href);
  }, []);

  useEffect(() => {
    fetch('/productos.json').then((response) => response.json()).then(setProducts).finally(() => setLoading(false));
  }, []);

  const categories = ['Todos', ...new Set(products.map((product) => product.category))];
  const visibleProducts = activeCategory === 'Todos' ? products : products.filter((product) => product.category === activeCategory);

  return (
    <section className="catalog-page container">
      <div className="page-intro"><h1>Elegí tu próximo<br /><em>café favorito.</em></h1><p className="intro-copy">Granos, café molido y cápsulas para disfrutar una buena taza todos los días.</p></div>
      <div className="catalog-toolbar"><div className="filters">{categories.map((category) => <button type="button" key={category} onClick={() => setActiveCategory(category)} className={activeCategory === category ? 'filter active' : 'filter'}>{category}</button>)}</div><span className="results-count">{visibleProducts.length} piezas</span></div>
      {loading ? <div className="loading">Cargando la colección...</div> : <div className="product-grid">{visibleProducts.map((product) => <Item product={product} key={product.id} />)}</div>}
    </section>
  );
}
