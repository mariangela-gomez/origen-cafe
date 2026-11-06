import { createContext, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../services/firebase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => onAuthStateChanged(auth, (current) => { setUser(current); setLoading(false); }), []);
  const login = (email, password) => signInWithEmailAndPassword(auth, email.trim(), password);
  const register = (email, password) => createUserWithEmailAndPassword(auth, email.trim(), password);
  const logout = () => signOut(auth);
  return <AuthContext.Provider value={{ user, loading, isAuthenticated: Boolean(user), login, register, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return context;
}

export function authErrorMessage(failure) {
  switch (failure?.code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found': return 'Email o contraseña incorrectos.';
    case 'auth/email-already-in-use': return 'Ya existe una cuenta con ese email.';
    case 'auth/weak-password': return 'La contraseña debe tener al menos 6 caracteres.';
    case 'auth/invalid-email': return 'Ingresá un email válido.';
    case 'auth/too-many-requests': return 'Demasiados intentos. Esperá un momento e intentá de nuevo.';
    case 'auth/operation-not-allowed': return 'El acceso con email y contraseña no está habilitado en Firebase.';
    default: return 'No pudimos completar la operación. Revisá tu conexión e intentá de nuevo.';
  }
}
