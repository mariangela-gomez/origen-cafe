import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Checkout from './pages/Checkout';
import Information from './pages/Information';
import Layout from './components/Layout';
import Home from './pages/Home';
import ItemListContainer from './components/ItemListContainer';
import ItemDetail from './components/ItemDetail';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import AdminProducts from './pages/AdminProducts';
import AuthPage from './pages/AuthPage';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
    else window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<ItemListContainer />} />
        <Route path="/producto/:id" element={<ItemDetail />} />
        <Route path="/carrito" element={<Cart />} />
        <Route path="/finalizar-compra" element={<Checkout />} />
        <Route path="/informacion" element={<Information />} />
        <Route path="/pedidos-y-entregas" element={<Information section="pedidos" />} />
        <Route path="/privacidad" element={<Information section="privacidad" />} />
        <Route path="/contacto" element={<Information section="contacto" />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/registro" element={<AuthPage mode="register" />} />
        <Route path="/admin/productos" element={<ProtectedRoute><AdminProducts /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
