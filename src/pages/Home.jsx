import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'Café en grano', image: '/cafe-colombia-especialidad-origen.png' },
  { name: 'Café molido', image: '/cafe-molido-tradicional-origen.png' },
  { name: 'Café en cápsulas', image: '/capsulas-compatibles-nespresso-origen.png' },
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
  const [products, setProducts] = useState([]);

  useEffect(() => {
    document.title = 'Origen Café | Café de especialidad tostado con amor';
    updateMeta('description', 'Descubrí café de especialidad, granos seleccionados, café molido y cápsulas de Origen Café.');
    updateProperty('og:title', 'Origen Café | Café de especialidad');
    updateProperty('og:description', 'Granos seleccionados, tostados con amor para acompañar tus mejores momentos.');
    updateProperty('og:url', window.location.href);
  }, []);

  useEffect(() => { fetch('/productos.json').then((response) => response.json()).then(setProducts); }, []);

  return (
    <div className="cafe-home">
      <section className="cafe-hero container">
        <div className="cafe-hero-copy"><p className="eyebrow">Café de especialidad</p><h1>El mejor café<br /><em>empieza en el origen.</em></h1><p>Granos seleccionados, tostados con cuidado y preparados para acompañar tus mejores momentos.</p><Link to="/productos" className="primary-button">Ir a la tienda <span>→</span></Link></div>
        <div className="cafe-hero-image"><video src="/video-hero-origen-cafe.mp4" autoPlay muted playsInline aria-label="Video de café de Origen Café" /></div>
      </section>

      <section className="categories cafe-categories container"><div className="section-intro"><p className="eyebrow">Explorá nuestra tienda</p><h2>Todo para tu<br /><em>ritual de café.</em></h2></div><div className="category-grid">{categories.map((category) => <Link to="/productos" className="category-card" key={category.name}><img src={category.image} alt={category.name} loading="lazy" decoding="async" onError={(event) => { event.currentTarget.src = '/foto-taza-cafe-latte.jpg'; }} /><strong>{category.name}</strong><span>Ver productos <b>→</b></span></Link>)}</div></section>

      <section className="favorites cafe-favorites container"><div className="favorites-heading"><div><p className="eyebrow">Nuestros favoritos</p><h2>Una buena taza<br /><em>cambia el día.</em></h2></div><div className="favorites-copy"><p>Perfiles elegidos para quienes disfrutan descubrir<br />un café con historia y personalidad.</p><Link to="/productos" className="primary-button">Ver todos los productos <span>→</span></Link></div></div><div className="favorites-grid">{products.filter((product) => [1, 2, 3, 10].includes(product.id)).map((product) => <Link to={`/producto/${product.id}`} className="favorite-card" key={product.id}><div className="favorite-image"><img src={product.image} alt={product.alt || product.name} loading="lazy" decoding="async" onError={(event) => { event.currentTarget.src = '/foto-taza-cafe-latte.jpg'; }} /><span className="heart">♡</span></div><div className="favorite-info"><div><strong>{product.name}</strong><span>{product.color}</span></div><b>${product.price.toLocaleString('es-AR')}</b></div></Link>)}</div></section>

      <section className="story cafe-story container" id="historia"><div className="story-media"><img src="/foto-taza-cafe-latte.jpg" alt="Taza de café de especialidad preparada" loading="lazy" decoding="async" /></div><div className="story-copy"><p className="eyebrow">Del grano a tu taza</p><h2>Más que café,<br /><em>una forma<br />de empezar.</em></h2><p>En Origen Café creemos que cada taza cuenta una historia: la de las personas que cultivan, tuestan y preparan un café hecho para disfrutarse sin apuro.</p><Link to="/productos" className="primary-button">Conocé nuestros cafés <span>→</span></Link></div></section>

    </div>
  );
}
