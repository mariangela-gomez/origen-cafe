import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ContactForm from '../components/ContactForm';

const pages = {
  pedidos: { title: 'Pedidos y entregas', lead: 'Todo lo que necesitás saber para elegir tu café y registrar tu pedido.', content: <>
    <section><h2>Cómo hacer tu pedido</h2><p>Elegí tus cafés, ajustá las cantidades y revisá el resumen del carrito. Para registrar tu pedido, completá tu nombre y email. Al finalizar, vas a ver una referencia: guardala para identificar tu selección cuando nos consultes.</p><p>Registrar el pedido no realiza un cobro ni confirma su despacho. No ingreses datos de tarjetas o cuentas bancarias en el formulario.</p><Link className="back-link" to="/productos">Elegir mis cafés →</Link></section>
    <section><h2>Modalidad y costo de entrega</h2><p>Antes de acordar una entrega, es necesario confirmar el destino, la disponibilidad de los productos y la modalidad de recepción. El total que ves en el carrito corresponde únicamente a los productos; no incluye un costo de envío.</p><p>No se asigna una fecha de entrega automáticamente al registrar el pedido. Consultá las opciones disponibles antes de organizar su recepción.</p></section>
    <section><h2>Cambios en tu pedido</h2><p>Antes de confirmar, podés sumar o quitar unidades, eliminar productos o vaciar el carrito. Si ya registraste tu pedido, escribinos con su referencia e indicá qué necesitás cambiar.</p></section>
    <section><h2>¿Necesitás ayuda?</h2><p>Si tu consulta es sobre un pedido, incluí su referencia y el detalle de lo que necesitás. Si recibiste un producto con un inconveniente, conservá el empaque y describí qué ocurrió.</p><Link className="back-link" to="/contacto">Contactar con Origen Café →</Link></section>
  </> },
  privacidad: { title: 'Política de privacidad', lead: 'Qué información compartís con Origen Café y cómo se utiliza.', content: <>
    <section><h2>Información que recibimos</h2><p>Cuando registrás un pedido, recibimos tu nombre, email, productos seleccionados, cantidades, precios, total y fecha de registro. La confirmación del email se utiliza para comprobar que lo escribiste correctamente; no se guarda como un dato adicional.</p><p>Si nos escribís, recibimos los datos que incluyas en tu mensaje. No solicitamos contraseñas, documentos de identidad ni información bancaria.</p></section>
    <section><h2>Para qué usamos tus datos</h2><p>La información del pedido permite identificar tu selección y relacionarla con su referencia. Los datos que compartas en una consulta sirven para entender tu solicitud y responder por email.</p><p>Registrar un pedido no te suscribe a un newsletter ni a comunicaciones promocionales.</p></section>
    <section><h2>Almacenamiento y acceso</h2><p>Los pedidos se guardan en un servicio de almacenamiento de Google ubicado en Brasil. Sus datos no se publican en el catálogo ni están disponibles para consulta pública desde esta web.</p><p>Utilizamos proveedores de alojamiento, almacenamiento y correo para el funcionamiento de la tienda. Estos servicios pueden procesar información técnica necesaria para atender las solicitudes del navegador o entregar los mensajes.</p></section>
    <section><h2>El carrito en tu navegador</h2><p>Guardamos tu selección en el almacenamiento local del navegador para que puedas volver al carrito sin empezar de nuevo. Podés eliminar esa selección con «Vaciar carrito» o borrar los datos del sitio desde la configuración de tu navegador.</p><p>Vaciar el carrito no elimina un pedido que ya hayas registrado.</p></section>
    <section><h2>Acceso, corrección y eliminación</h2><p>Podés solicitar información sobre tus datos, su corrección o su eliminación escribiendo a <a className="inline-link" href="mailto:gcmariangela@gmail.com">gcmariangela@gmail.com</a>. Indicá el email que utilizaste y, si la tenés, la referencia del pedido. No incluyas documentos ni datos bancarios en tu consulta.</p><p>Para conocer tus derechos sobre datos personales, podés consultar la <a className="inline-link" href="https://www.argentina.gob.ar/aaip/datospersonales/derechos" target="_blank" rel="noreferrer">Agencia de Acceso a la Información Pública</a>.</p></section>
  </> },
  contacto: { title: 'Hablemos de café.', lead: '¿Una duda sobre tu selección o una consulta sobre un pedido? Contanos qué necesitás.', content: <>
    <section><h2>Escribinos</h2><p>Si tu consulta es sobre un pedido, incluí su referencia. Si buscás un café, contanos cómo lo preparás y qué sabores te gustan.</p><a className="contact-email inline-link" href="mailto:gcmariangela@gmail.com">gcmariangela@gmail.com</a><ContactForm /></section>
    <section><h2>Antes de escribirnos</h2><p>Podés encontrar información sobre el registro de pedidos y las entregas, o consultar cómo se utilizan tus datos.</p><div className="information-links"><Link className="back-link" to="/pedidos-y-entregas">Pedidos y entregas →</Link><Link className="back-link" to="/privacidad">Política de privacidad →</Link></div></section>
  </> },
};

export default function Information({ section }) {
  const { hash } = useLocation();
  const selected = section || (hash === '#contacto' ? 'contacto' : hash === '#privacidad' ? 'privacidad' : 'pedidos');
  const page = pages[selected];
  useEffect(() => { document.title = `${selected === 'contacto' ? 'Contacto' : page.title} | Origen Café`; }, [selected, page.title]);
  return <article className="container information-page"><nav className="information-nav" aria-label="Información de la tienda"><Link to="/pedidos-y-entregas" aria-current={selected === 'pedidos' ? 'page' : undefined}>Pedidos y entregas</Link><Link to="/privacidad" aria-current={selected === 'privacidad' ? 'page' : undefined}>Privacidad</Link><Link to="/contacto" aria-current={selected === 'contacto' ? 'page' : undefined}>Contacto</Link></nav><h1>{page.title}</h1><p className="information-lead">{page.lead}</p>{page.content}</article>;
}
