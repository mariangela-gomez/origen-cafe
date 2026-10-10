import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Configuración pública de la aplicación web. Los permisos se controlan con reglas de Firestore.
const firebaseConfig = {
  apiKey: 'AIzaSyDL9ZNLH4F-XmC3foMMlFrZr1Pxo5nhCDU',
  authDomain: 'origen-cafe-8e14f.firebaseapp.com',
  projectId: 'origen-cafe-8e14f',
  storageBucket: 'origen-cafe-8e14f.firebasestorage.app',
  messagingSenderId: '460947725634',
  appId: '1:460947725634:web:b21f375c04b038c8d47cdb',
};
export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
