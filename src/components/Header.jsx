import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { totalQuantity } = useCart();
  const { isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (event) => { if (event.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);
  return (
    <header className="site-header">
      <div className="announcement">Origen Café · En grano, molido y cápsulas</div>
      <div className="nav-wrap container">
        <Link to="/" className="brand" aria-label="Origen Café inicio"><img className="brand-logo" src="/logo-origen-cafe.png" alt="Origen Café" /></Link>
        <nav id="main-nav" className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Navegación principal" onClick={() => setMenuOpen(false)}>
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Inicio</NavLink>
          <NavLink to="/productos" className={({ isActive }) => isActive ? 'active' : ''}>Tienda</NavLink>
          <NavLink to="/carrito" className={({ isActive }) => isActive ? 'active' : ''}>Carrito</NavLink>
        </nav>
        <div className="header-actions"><button type="button" className="menu-toggle" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} aria-controls="main-nav" onClick={() => setMenuOpen(open => !open)}><span aria-hidden="true" /></button><Link to="/carrito" className="cart-pill" aria-label={`Ver carrito, ${totalQuantity} ${totalQuantity === 1 ? "unidad" : "unidades"}`}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M6 7h15l-2 10H8L5 3H2"/><circle cx="9" cy="21" r="1"/><circle cx="18" cy="21" r="1"/></svg> <span aria-live="polite">{totalQuantity}</span></Link>{isAuthenticated ? <><Link to="/admin/productos" className="auth-button">Panel</Link><button type="button" className="auth-button auth-button-outline" onClick={logout}>Salir</button></> : <Link to="/login" className="auth-button">Iniciar sesión</Link>}</div>
      </div>
    </header>
  );
}
