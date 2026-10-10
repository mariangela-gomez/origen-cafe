export default function ItemCount({ quantity, onChange, name = 'producto' }) {
  return <div className="quantity-control" role="group" aria-label={'Cantidad de ' + name}>
    <button type="button" aria-label={'Reducir cantidad de ' + name} disabled={quantity <= 1} onClick={() => onChange(quantity - 1)}>−</button>
    <output aria-live="polite" aria-label={'Unidades de ' + name}>{quantity}</output>
    <button type="button" aria-label={'Aumentar cantidad de ' + name} onClick={() => onChange(quantity + 1)}>+</button>
  </div>;
}
