import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { totalQuantity } = useCart();
  return (
    <header className="site-header">
      <div className="announcement">Origen Café · En grano, molido y cápsulas</div>
      <div className="nav-wrap container">
        <Link to="/" className="brand" aria-label="Origen Café inicio"><img className="brand-logo" src="/logo-origen-cafe.png" alt="Origen Café" /></Link>
        <nav className="nav-links" aria-label="Navegación principal">
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Inicio</NavLink>
          <NavLink to="/productos" className={({ isActive }) => isActive ? 'active' : ''}>Tienda</NavLink>
          <NavLink to="/carrito" className={({ isActive }) => isActive ? 'active' : ''}>Carrito</NavLink>
        </nav>
        <Link to="/carrito" className="cart-pill" aria-label={`Ver carrito, ${totalQuantity} ${totalQuantity === 1 ? "unidad" : "unidades"}`}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M6 7h15l-2 10H8L5 3H2"/><circle cx="9" cy="21" r="1"/><circle cx="18" cy="21" r="1"/></svg> <span aria-live="polite">{totalQuantity}</span></Link>
      </div>
    </header>
  );
}
