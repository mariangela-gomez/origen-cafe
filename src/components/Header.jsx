import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="site-header">
      <div className="announcement">Envíos gratis a partir de $80.000 <span>·</span> Café tostado con amor</div>
      <div className="nav-wrap container">
        <Link to="/" className="brand" aria-label="Origen Café inicio"><img className="brand-logo" src="/logo-origen-cafe.png" alt="Origen Café" /></Link>
        <nav className="nav-links" aria-label="Navegación principal">
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Inicio</NavLink>
          <NavLink to="/productos" className={({ isActive }) => isActive ? 'active' : ''}>Tienda</NavLink>
          <NavLink to="/carrito" className={({ isActive }) => isActive ? 'active' : ''}>Carrito</NavLink>
        </nav>
        <Link to="/carrito" className="cart-pill" aria-label="Ver carrito">🛒 <span>0</span></Link>
      </div>
    </header>
  );
}
