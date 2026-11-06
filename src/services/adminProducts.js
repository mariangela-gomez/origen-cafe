import { doc, deleteDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import { getProducts } from './products';

export const emptyProduct = { name: '', category: '', price: '', image: '/foto-taza-cafe-latte.jpg', tag: '', color: '', description: '' };

export function validateProduct(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = 'Ingresá un nombre (mínimo 2 caracteres).';
  if (!values.category.trim()) errors.category = 'Campo requerido';
  const price = Number(values.price);
  if (values.price === '' || !Number.isInteger(price) || price <= 0) errors.price = 'Ingresá un precio entero mayor que 0.';
  if (!values.image.trim()) errors.image = 'Campo requerido';
  return errors;
}

function toData(values) {
  return {
    name: values.name.trim(),
    category: values.category.trim(),
    price: Number(values.price),
    image: values.image.trim(),
    tag: values.tag.trim(),
    color: values.color.trim(),
    description: values.description.trim(),
  };
}

// CREATE: los ids de productos son numéricos (1, 2, 3...) porque las reglas de
// "orders" exigen /^[0-9]{1,3}$/. Por eso se usa setDoc con el siguiente id en lugar de addDoc.
export async function createProduct(values) {
  const products = await getProducts();
  const nextId = String(products.reduce((max, product) => Math.max(max, Number(product.id) || 0), 0) + 1);
  await setDoc(doc(db, 'products', nextId), toData(values));
  return nextId;
}

// UPDATE
export function updateProduct(id, values) {
  return updateDoc(doc(db, 'products', String(id)), toData(values));
}

// DELETE
export function deleteProduct(id) {
  return deleteDoc(doc(db, 'products', String(id)));
}
