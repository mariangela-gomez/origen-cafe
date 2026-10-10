import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from './firebase';

function checkAbort(signal) {
  if (signal?.aborted) throw new DOMException('Consulta cancelada', 'AbortError');
}
function readProduct(snapshot) {
  const data = snapshot.data();
  if (typeof data.name !== 'string' || typeof data.category !== 'string' || !Number.isFinite(data.price) || data.price < 0) throw new Error('Producto inválido en Firestore: ' + snapshot.id);
  return { ...data, id: snapshot.id };
}
export async function getProducts({ signal } = {}) {
  checkAbort(signal);
  const snapshot = await getDocs(collection(db, 'products'));
  checkAbort(signal);
  return snapshot.docs.map(readProduct).sort((a, b) => Number(a.id) - Number(b.id));
}
export async function getProduct(id, { signal } = {}) {
  checkAbort(signal);
  const snapshot = await getDoc(doc(db, 'products', String(id)));
  checkAbort(signal);
  return snapshot.exists() ? readProduct(snapshot) : null;
}
