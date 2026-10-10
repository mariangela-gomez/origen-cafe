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

## Carrito con Context API

CartProvider envuelve la aplicación. Header, ItemDetail y Cart acceden al estado mediante useCart, sin pasar el carrito por componentes intermedios (prop drilling).

- addItem(product, quantity): agrega y acumula unidades sin duplicar filas.
- removeItem(id), updateQuantity(id, quantity), clearCart(), isInCart(id).
- totalQuantity y totalPrice se calculan a partir del carrito.
- Renderización condicional del carrito vacío, productos, enlace al carrito y mensajes de carga/error.
- Persistencia en localStorage; no es una base de datos ni crea pedidos.
- ItemCount reutiliza el selector de unidades en detalle, carrito, tienda y favoritos del inicio.

## Firebase y Cloud Firestore

Proyecto: origen-cafe-8e14f. La configuración pública está en src/services/firebase.js. El catálogo se consulta en la colección products; cada documento usa el ID del producto (1, 2, 3, 7, 8, 9, 10, 11, 12). Los IDs de Firestore son cadenas. getProducts consulta la colección y getProduct consulta directamente un documento. No hay fallback a JSON: un fallo de Firebase muestra un error recuperable.

Campos: name, category, price (número), tag, color, description, image y alt. Las imágenes siguen en public; Firestore guarda sus rutas. data/products.seed.json es una copia de migración que Vite no publica. El sitio no consulta ese archivo.

firestore.rules permite leer products y crear pedidos de demostración en orders. Las reglas verifican los productos, nombres, precios, cantidades y total contra el catálogo. Los pedidos no permiten lectura, edición ni borrado desde la aplicación. El resto de colecciones está cerrado. Los productos y pedidos se administran desde Firebase Console.

La web se publica en Vercel y usa el plan gratuito Spark de Firebase. No se activaron Firebase Hosting, Authentication, pagos ni envíos reales.

## Formulario de pedido

La ruta /finalizar-compra contiene un formulario controlado. Checkout maneja estado, validación y onSubmit; CheckoutForm presenta el formulario y FormField reutiliza los campos y sus errores. Al confirmar, una transacción verifica los precios vigentes y crea un pedido de demostración con una referencia única. El carrito se vacía solo si el guardado termina correctamente. Usar datos ficticios para las pruebas.

## Interfaz

Las categorías del inicio abren el catálogo con el filtro correspondiente; el filtro se conserva en la URL. Los enlaces de ayuda llevan a /pedidos-y-entregas, /privacidad y /contacto. ContactForm prepara una consulta en la aplicación de correo del visitante; el envío se completa desde allí. La presentación usa la paleta crema y marrón, tipografía editorial y controles compartidos. Las tarjetas de personas representan perfiles ilustrativos. ItemCount permite opcionalmente mostrar una papelera; en el detalle se puede bajar la selección a cero y eliminar el producto del carrito.
