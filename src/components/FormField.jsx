export default function FormField({ name, label, error, value, onChange, ...props }) {
  return <div className="form-field"><label htmlFor={name}>{label}</label><input id={name} name={name} value={value} onChange={onChange} aria-invalid={Boolean(error)} aria-describedby={error ? `${name}-error` : undefined} {...props} />{error && <p className="field-error" id={`${name}-error`}>{error}</p>}</div>;
}
