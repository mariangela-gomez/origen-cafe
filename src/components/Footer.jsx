import { Link } from 'react-router-dom';

const team = [
  { name: 'Camila Ortega', role: 'Dirección creativa', initials: 'CO', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80' },
  { name: 'Nicolás Vera', role: 'Producto & diseño', initials: 'NV', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80' },
  { name: 'Julieta Sosa', role: 'Experiencia de marca', initials: 'JS', photo: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=160&q=80' },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-brand"><img className="footer-logo" src="/logo-origen-cafe-footer.png" alt="Origen Café" /><p>Café de especialidad elegido<br />para disfrutar sin apuro.</p></div>
        <div className="footer-column"><h3>Origen</h3><Link to="/">Nuestra historia</Link><Link to="/productos">Cafés y tienda</Link><Link to="/">Nuestros granos</Link></div>
        <div className="footer-column"><h3>Ayuda</h3><Link to="/">Contacto</Link><Link to="/">Envíos y cambios</Link><Link to="/">Políticas de privacidad</Link></div>
        <div className="footer-column footer-contact"><h3>Visitá Origen</h3><p>Un café para quedarse un rato.</p><strong>Buenos Aires</strong><span>Lun. a sáb. · 9 a 19 h</span></div>
      </div>
      <div className="container team-section"><div><p className="eyebrow">Hecho en equipo</p><h3>Las personas detrás de Origen</h3></div><div className="team-grid">{team.map((person) => <div className="person-card" key={person.name}><div className="avatar"><img src={person.photo} alt={person.name} onError={(event) => { event.currentTarget.style.display = 'none'; }} /><span>{person.initials}</span></div><strong>{person.name}</strong><span>{person.role}</span></div>)}</div></div>
      <div className="container footer-bottom"><span>© 2026 Origen Café</span><span>Buenos Aires, Argentina · Instagram · Pinterest</span></div>
    </footer>
  );
}
