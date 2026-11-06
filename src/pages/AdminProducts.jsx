import { useCallback, useEffect, useState } from 'react';
import FormField from '../components/FormField';
import { getProducts } from '../services/products';
import { createProduct, deleteProduct, emptyProduct, updateProduct, validateProduct } from '../services/adminProducts';

function friendlyError(failure) {
  if (failure?.code === 'permission-denied') return 'Firestore no permite modificar productos con las reglas actuales (permission-denied).';
  return 'No pudimos completar la operación. Revisá tu conexión e intentá de nuevo.';
}

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState(emptyProduct);
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const load = useCallback(() => getProducts().then(setProducts).catch(() => setError('No pudimos cargar los productos.')).finally(() => setLoading(false)), []);
  useEffect(() => { document.title = 'Administrar productos | Origen Café'; load(); }, [load]);

  const reset = () => { setValues(emptyProduct); setEditingId(null); setErrors({}); };
  const onChange = event => { const { name, value } = event.target; setValues(previous => ({ ...previous, [name]: value })); setErrors(previous => ({ ...previous, [name]: '' })); };

  const onEdit = product => {
    setEditingId(product.id); setMessage(''); setError(''); setErrors({});
    setValues({ name: product.name, category: product.category, price: String(product.price), image: product.image || '', tag: product.tag || '', color: product.color || '', description: product.description || '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onSubmit = async event => {
    event.preventDefault();
    if (busy) return;
    const nextErrors = validateProduct(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) { document.getElementById(Object.keys(nextErrors)[0])?.focus(); return; }
    setBusy(true); setMessage(''); setError('');
    try {
      if (editingId) { await updateProduct(editingId, values); setMessage(`Producto ${editingId} actualizado.`); }
      else { const id = await createProduct(values); setMessage(`Producto creado con id ${id}.`); }
      reset(); await load();
    } catch (failure) { setError(friendlyError(failure)); }
    finally { setBusy(false); }
  };

  const onDelete = async product => {
    if (busy || !window.confirm(`¿Eliminar "${product.name}"? Esta acción no se puede deshacer.`)) return;
    setBusy(true); setMessage(''); setError('');
    try { await deleteProduct(product.id); setMessage(`Producto "${product.name}" eliminado.`); if (editingId === product.id) reset(); await load(); }
    catch (failure) { setError(friendlyError(failure)); }
    finally { setBusy(false); }
  };

  return <section className="container admin-page">
    <h1>Administrar productos</h1>
    <p>Agregá, editá o eliminá productos de la colección <code>products</code> de Firestore.</p>
    <form className="checkout-form admin-form" onSubmit={onSubmit} noValidate>
      <h2>{editingId ? `Editar producto ${editingId}` : 'Nuevo producto'}</h2>
      <fieldset disabled={busy}>
        <FormField name="name" label="Nombre" maxLength={100} value={values.name} error={errors.name} onChange={onChange} />
        <FormField name="category" label="Categoría" placeholder="Ej.: Granos" maxLength={50} value={values.category} error={errors.category} onChange={onChange} />
        <FormField name="price" label="Precio" type="number" min="1" step="1" value={values.price} error={errors.price} onChange={onChange} />
        <FormField name="image" label="Imagen (ruta)" value={values.image} error={errors.image} onChange={onChange} />
        <FormField name="tag" label="Etiqueta" maxLength={30} value={values.tag} onChange={onChange} />
        <FormField name="color" label="Perfil de taza" maxLength={100} value={values.color} onChange={onChange} />
        <FormField name="description" label="Descripción" maxLength={500} value={values.description} onChange={onChange} />
      </fieldset>
      {error && <p role="alert" className="field-error">{error}</p>}
      {message && <p role="status" className="admin-message">{message}</p>}
      <div className="admin-actions">
        <button type="submit" className="primary-button" disabled={busy}>{busy ? 'Guardando…' : editingId ? 'Guardar cambios' : 'Crear producto'}</button>
        {editingId && <button type="button" className="admin-secondary" onClick={reset} disabled={busy}>Cancelar edición</button>}
      </div>
    </form>
    {loading ? <p role="status">Cargando productos...</p> : <table className="admin-table">
      <thead><tr><th>ID</th><th>Nombre</th><th>Categoría</th><th>Precio</th><th><span className="sr-only">Acciones</span></th></tr></thead>
      <tbody>{products.map(product => <tr key={product.id}>
        <td>{product.id}</td><td>{product.name}</td><td>{product.category}</td><td>$ {product.price.toLocaleString('es-AR')}</td>
        <td className="admin-row-actions"><button type="button" className="admin-secondary" onClick={() => onEdit(product)} disabled={busy}>Editar</button><button type="button" className="admin-danger" onClick={() => onDelete(product)} disabled={busy}>Eliminar</button></td>
      </tr>)}</tbody>
    </table>}
  </section>;
}
