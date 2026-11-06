import { useEffect, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import FormField from '../components/FormField';
import { authErrorMessage, useAuth } from '../context/AuthContext';

function validate(values, isRegister) {
  const errors = {};
  if (!values.email.trim()) errors.email = 'Campo requerido';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Ingresá un email válido.';
  if (!values.password) errors.password = 'Campo requerido';
  else if (isRegister && values.password.length < 6) errors.password = 'Mínimo 6 caracteres.';
  if (isRegister && values.confirmPassword !== values.password) errors.confirmPassword = 'Las contraseñas deben coincidir.';
  return errors;
}

export default function AuthPage({ mode = 'login' }) {
  const isRegister = mode === 'register';
  const { login, register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const destination = useLocation().state?.from || '/admin/productos';
  const [values, setValues] = useState({ email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  useEffect(() => { document.title = `${isRegister ? 'Crear cuenta' : 'Ingresar'} | Origen Café`; }, [isRegister]);
  if (isAuthenticated && !busy) return <Navigate to={destination} replace />;

  const onChange = event => { const { name, value } = event.target; setValues(previous => ({ ...previous, [name]: value })); setErrors(previous => ({ ...previous, [name]: '' })); };
  const onSubmit = async event => {
    event.preventDefault();
    if (busy) return;
    const nextErrors = validate(values, isRegister);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) { document.getElementById(Object.keys(nextErrors)[0])?.focus(); return; }
    setBusy(true); setError('');
    try { await (isRegister ? register : login)(values.email, values.password); navigate(destination, { replace: true }); }
    catch (failure) { setError(authErrorMessage(failure)); setBusy(false); }
  };

  return <section className="container admin-page">
    <h1>{isRegister ? 'Crear cuenta' : 'Ingresar'}</h1>
    <form className="checkout-form admin-form" onSubmit={onSubmit} noValidate>
      <fieldset disabled={busy}>
        <FormField name="email" label="Email" type="email" autoComplete="username" value={values.email} error={errors.email} onChange={onChange} />
        <FormField name="password" label="Contraseña" type="password" autoComplete={isRegister ? 'new-password' : 'current-password'} value={values.password} error={errors.password} onChange={onChange} />
        {isRegister && <FormField name="confirmPassword" label="Confirmá tu contraseña" type="password" autoComplete="new-password" value={values.confirmPassword} error={errors.confirmPassword} onChange={onChange} />}
      </fieldset>
      {error && <p role="alert" className="field-error">{error}</p>}
      <button type="submit" className="primary-button" disabled={busy}>{busy ? 'Un momento…' : isRegister ? 'Crear cuenta' : 'Ingresar'}</button>
      <p>{isRegister ? <>¿Ya tenés cuenta? <Link to="/login">Ingresá</Link></> : <>¿No tenés cuenta? <Link to="/registro">Registrate</Link></>}</p>
    </form>
  </section>;
}
