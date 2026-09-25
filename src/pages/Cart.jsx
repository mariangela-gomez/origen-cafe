import { Link } from 'react-router-dom';

export default function Cart() {
  return (
    <section className="empty-page container">
      <h1>El carrito está<br /><em>esperando.</em></h1>
      <p>Elegí tus aromas favoritos y armá una selección para hacer de tu casa un lugar más cálido.</p>
      <Link to="/productos" className="primary-button">Volver a la colección <span>→</span></Link>
    </section>
  );
}
