import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/products';
import ProductActions from '../components/ProductActions';

const categories = [
  { category: 'En grano', name: 'Café en grano', image: '/cafe-colombia-especialidad-origen.png' },
  { category: 'Molido', name: 'Café molido', image: '/cafe-molido-tradicional-origen.png' },
  { category: 'Cápsulas', name: 'Café en cápsulas', image: '/capsulas-compatibles-nespresso-origen.png' },
];

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

export default function Home() {
  const [reduceMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    document.title = 'Origen Café | Café de especialidad tostado con amor';
    updateMeta('description', 'Descubrí café de especialidad, granos seleccionados, café molido y cápsulas de Origen Café.');
    updateProperty('og:title', 'Origen Café | Café de especialidad');
    updateProperty('og:description', 'Granos seleccionados, tostados con amor para acompañar tus mejores momentos.');
    updateProperty('og:url', window.location.href);
  }, []);

  useEffect(() => { const controller = new AbortController(); getProducts({ signal: controller.signal }).then(setProducts).catch(() => { if (!controller.signal.aborted) setError(true); }); return () => controller.abort(); }, []);

  return (
    <div className="cafe-home">
      <section className="cafe-hero container">
        <div className="cafe-hero-copy"><h1>Encontrá tu café.<br /><em>Hacé tu ritual.</em></h1><p>En grano, molido o en cápsulas. Elegí el formato que preparás en casa y descubrí las notas de tu próxima taza.</p><Link to="/productos" className="primary-button">Ir a la tienda <span>→</span></Link></div>
        <div className="cafe-hero-image"><video src="/video-hero-origen-cafe.mp4" autoPlay={!reduceMotion} muted playsInline loop aria-label="Video de café de Origen Café" /></div>
      </section>

      <section className="categories cafe-categories container"><div className="section-intro"><h2>¿Cómo preparás<br /><em>tu café?</em></h2></div><div className="category-grid">{categories.map((category) => <Link to={`/productos?categoria=${encodeURIComponent(category.category)}`} className="category-card" key={category.name}><img src={category.image} alt={category.name} loading="lazy" decoding="async" onError={(event) => { event.currentTarget.src = '/foto-taza-cafe-latte.jpg'; }} /><strong>{category.name}</strong><span>Ver productos <b>→</b></span></Link>)}</div></section>

      <section className="favorites cafe-favorites container"><div className="favorites-heading"><div><h2>Cuatro cafés.<br /><em>Distintos caminos.</em></h2></div><div className="favorites-copy"><p>Caramelo y frutas, chocolate y nuez, o un perfil más intenso. Compará las notas y elegí por sabor.</p><Link to="/productos" className="primary-button">Ver todos los productos <span>→</span></Link></div></div>{error && <p role="alert">No pudimos cargar los cafés favoritos. Probá recargar la página.</p>}<div className="favorites-grid">{products.filter((product) => ['1', '2', '3', '10'].includes(String(product.id))).map((product) => <article className="favorite-card" key={product.id}><Link to={`/producto/${product.id}`}><div className="favorite-image"><img src={product.image} alt={product.alt || product.name} loading="lazy" decoding="async" onError={(event) => { event.currentTarget.src = '/foto-taza-cafe-latte.jpg'; }} /></div><div className="favorite-info"><div><strong>{product.name}</strong><span>{product.color}</span></div><b>${product.price.toLocaleString('es-AR')}</b></div></Link><ProductActions product={product} label="Ver más" /></article>)}</div></section>

      <section className="story cafe-story container" id="historia"><div className="story-media"><img src="/foto-taza-cafe-latte.jpg" alt="Taza de café de especialidad preparada" loading="lazy" decoding="async" /></div><div className="story-copy"><h2>Elegir también<br /><em>es parte del ritual.</em></h2><p>Si tenés un molino, empezá por nuestros cafés en grano. Para cafetera de filtro, explorá los molidos. Y si preferís una preparación rápida, mirá las cápsulas y los instantáneos. Cada ficha te cuenta su perfil de taza.</p><Link to="/productos" className="primary-button">Encontrá tu formato <span>→</span></Link></div></section>

    </div>
  );
}
