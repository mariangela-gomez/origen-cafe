import FormField from './FormField';

export default function CheckoutForm({ values, errors, onChange, onSubmit, submitting, error }) {
  return <form className="checkout-form" onSubmit={onSubmit} noValidate>
    <h2>Tus datos</h2><p>Completá tus datos para registrar tu pedido.</p>
    <fieldset disabled={submitting}>
      <FormField name="name" label="Nombre y apellido" placeholder="Ej.: Ana García" autoComplete="name" maxLength={100} required value={values.name} error={errors.name} onChange={onChange} />
      <FormField name="email" label="Email" placeholder="nombre@ejemplo.com" type="email" autoComplete="email" maxLength={200} required value={values.email} error={errors.email} onChange={onChange} />
      <FormField name="confirmEmail" label="Confirmá tu email" placeholder="Repetí tu email" type="email" autoComplete="off" maxLength={200} required value={values.confirmEmail} error={errors.confirmEmail} onChange={onChange} />
    </fieldset>
    <p className="form-privacy">Usaremos tus datos para identificar tu pedido y gestionar tus consultas.</p>
    {error && <p role="alert" className="field-error">{error}</p>}
    <button type="submit" className="primary-button" disabled={submitting}>{submitting ? 'Guardando tu pedido…' : 'Confirmar pedido'}</button>
  </form>;
}
