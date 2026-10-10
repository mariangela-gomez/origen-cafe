# Origen Café — Pre-entrega React JS

Tienda de café de especialidad desarrollada para la pre-entrega de React JS.

Desarrollado por **Mariangela Gómez**.

## Incluye

- Layout con Header, navegación y Footer.
- Catálogo consultado en Cloud Firestore mediante el SDK de Firebase.
- Componentes reutilizables `Item` e `ItemDetail`.
- Rutas con `react-router-dom` para inicio, productos, detalle y carrito.
- Diseño responsive con CSS nativo.
- Footer con información de Origen Café, contacto y tarjetas del equipo.

## Ejecutar localmente

```bash
pnpm install
pnpm dev
```

También se puede utilizar `npm install` y `npm run dev` si Node/npm está configurado correctamente.

## Clases 8 y 9: carrito con Context API

CartProvider envuelve la aplicación. Header, ItemDetail y Cart acceden al estado mediante useCart, sin pasar el carrito por componentes intermedios (prop drilling).

- addItem(product, quantity): agrega y acumula unidades sin duplicar filas.
- removeItem(id), updateQuantity(id, quantity), clearCart(), isInCart(id).
- totalQuantity y totalPrice se calculan a partir del carrito.
- Renderización condicional del carrito vacío, productos, enlace al carrito y mensajes de carga/error.
- Persistencia en localStorage; no es una base de datos ni crea pedidos.
- ItemCount reutiliza el selector de unidades en detalle y carrito.

## Firebase y Cloud Firestore

Proyecto: origen-cafe-8e14f. La configuración pública está en src/services/firebase.js. El catálogo se consulta en la colección products; cada documento usa el ID del producto (1, 2, 3, 7, 8, 9, 10, 11, 12). Los IDs de Firestore son cadenas. getProducts consulta la colección y getProduct consulta directamente un documento. No hay fallback a JSON: un fallo de Firebase muestra un error recuperable.

Campos: name, category, price (número), tag, color, description, image y alt. Las imágenes siguen en public; Firestore guarda sus rutas. data/products.seed.json es una copia de migración que Vite no publica. El sitio no consulta ese archivo.

firestore.rules permite leer únicamente products y bloquea toda escritura desde el cliente. El resto de colecciones está cerrado. Los productos se administran desde Firebase Console. Los precios del carrito son informativos; un futuro backend de checkout deberá validar precios y stock antes de crear pedidos o pagos.

La web puede seguir en Vercel: Firestore guarda los datos y Vercel publica React. Firebase Hosting, Authentication y checkout no se activaron como parte de esta conexión.
