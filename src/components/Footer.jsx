import { Link } from 'react-router-dom';

const team = [
  { name: 'Mariangela Gómez', role: 'Fundadora', initials: 'MG', photo: '/mariangela-gomez.png' },
  { name: 'Nicolás Vera', role: 'Producto & diseño', initials: 'NV', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80' },
  { name: 'Julieta Sosa', role: 'Experiencia de marca', initials: 'JS', photo: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=160&q=80' },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-brand"><img className="footer-logo" src="/logo-origen-cafe-footer.png" alt="Origen Café" /><p>Café de especialidad elegido<br />para disfrutar sin apuro.</p></div>
        <div className="footer-column"><h3>Origen</h3><Link to="/#historia">Nuestra historia</Link><Link to="/productos">Cafés y tienda</Link><Link to="/productos?categoria=En%20grano">Nuestros granos</Link></div>
        <div className="footer-column"><h3>Ayuda</h3><Link to="/contacto">Contacto</Link><Link to="/pedidos-y-entregas">Pedidos y entregas</Link><Link to="/privacidad">Privacidad</Link></div>
        <div className="footer-column footer-contact"><h3>Contacto</h3><a href="mailto:gcmariangela@gmail.com">gcmariangela@gmail.com</a><span>Buenos Aires, Argentina</span></div>
      </div>
      <div className="container team-section"><div><h3>El equipo de Origen</h3></div><div className="team-grid">{team.map((person) => <div className="person-card" key={person.name}><div className="avatar"><img src={person.photo} alt={person.name} onError={(event) => { event.currentTarget.style.display = 'none'; }} /></div><strong>{person.name}</strong><span>{person.role}</span></div>)}</div></div>
      <div className="container footer-bottom"><span>© 2026 Origen Café</span><span>Café de especialidad · Buenos Aires</span></div>
    </footer>
  );
}
