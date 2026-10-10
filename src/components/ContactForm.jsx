import { useState } from 'react';
import FormField from './FormField';

export default function ContactForm() {
  const [values, setValues] = useState({ contactName: '', contactEmail: '', subject: 'Consulta sobre un café', message: '' });
  const [errors, setErrors] = useState({});
  const onChange = event => { const { name, value } = event.target; setValues(previous => ({ ...previous, [name]: value })); setErrors(previous => ({ ...previous, [name]: '' })); };
  const onSubmit = event => {
    event.preventDefault();
    const nextErrors = {};
    if (!values.contactName.trim()) nextErrors.contactName = 'Campo requerido';
    if (!values.contactEmail.trim()) nextErrors.contactEmail = 'Campo requerido';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.contactEmail.trim())) nextErrors.contactEmail = 'Ingresá un email válido.';
    if (!values.message.trim()) nextErrors.message = 'Campo requerido';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) { document.getElementById(Object.keys(nextErrors)[0])?.focus(); return; }
    const body = `Nombre: ${values.contactName.trim()}\nEmail: ${values.contactEmail.trim()}\n\n${values.message.trim()}`;
    window.location.href = `mailto:gcmariangela@gmail.com?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(body)}`;
  };
  return <form className="checkout-form contact-form" onSubmit={onSubmit} noValidate><fieldset>
    <FormField name="contactName" label="Nombre y apellido" placeholder="Ej.: Ana García" autoComplete="name" maxLength={100} required value={values.contactName} error={errors.contactName} onChange={onChange} />
    <FormField name="contactEmail" label="Email" placeholder="nombre@ejemplo.com" type="email" autoComplete="email" maxLength={200} required value={values.contactEmail} error={errors.contactEmail} onChange={onChange} />
    <div className="form-field"><label htmlFor="subject">¿Sobre qué querés consultar?</label><select id="subject" name="subject" value={values.subject} onChange={onChange}><option>Consulta sobre un café</option><option>Consulta sobre mi pedido</option><option>Consulta sobre mis datos</option><option>Otra consulta</option></select></div>
    <div className="form-field"><label htmlFor="message">Tu mensaje</label><textarea id="message" name="message" placeholder="Contanos en qué podemos ayudarte. Si tenés un pedido, incluí su referencia." rows={5} maxLength={2000} required value={values.message} onChange={onChange} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined} />{errors.message && <p className="field-error" id="message-error">{errors.message}</p>}</div>
  </fieldset><p className="form-privacy">Se abrirá tu aplicación de correo con el mensaje preparado. Revisalo y envialo desde allí.</p><button className="primary-button" type="submit">Preparar email</button></form>;
}
