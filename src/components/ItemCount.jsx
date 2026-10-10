export default function ItemCount({ quantity, onChange, name = 'producto', minimum = 1, onRemove, removeLabel, removeDisabled = false }) {
  return <div className="quantity-control" role="group" aria-label={'Cantidad de ' + name}>
    <button type="button" aria-label={'Reducir cantidad de ' + name} disabled={quantity <= minimum} onClick={() => onChange(quantity - 1)}>−</button>
    <output aria-live="polite" aria-label={'Unidades de ' + name}>{quantity}</output>
    <button type="button" aria-label={'Aumentar cantidad de ' + name} onClick={() => onChange(quantity + 1)}>+</button>
    {onRemove && <button type="button" className="quantity-remove" aria-label={removeLabel || 'Eliminar ' + name} disabled={removeDisabled} onClick={onRemove}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7" /></svg></button>}
  </div>;
}
