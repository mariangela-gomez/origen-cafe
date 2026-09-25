import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="empty-page container">
      <p className="eyebrow">404</p><h1>Esta página se<br /><em>fue de paseo.</em></h1>
      <Link to="/" className="primary-button">Volver al inicio <span>→</span></Link>
    </section>
  );
}
