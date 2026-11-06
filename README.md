# Origen Café

Tienda online de café de especialidad, hecha con React como proyecto final del curso de React JS.

Desarrollado por **Mariangela Gómez**.

**Sitio publicado:** https://origen-cafe-three.vercel.app

## Qué incluye

- **Catálogo** cargado desde Cloud Firestore, con filtro por categoría, búsqueda en tiempo real y paginador.
- **Detalle de producto** y **carrito** con Context API (agregar, quitar, cambiar cantidades y vaciar). El carrito se guarda en `localStorage`.
- **Finalizar compra** con un formulario controlado y validado. Antes de guardar el pedido se verifican los precios actuales en Firestore.
- **Registro e inicio de sesión** con Firebase Authentication, manejados desde un `AuthContext`.
- **Panel de productos** (`/admin/productos`), protegido: solo entra quien inició sesión. Permite crear, editar y eliminar productos, con validaciones y una confirmación antes de borrar.
- **Subida de imágenes** desde el panel. La foto se reduce a 800 px y se convierte a WebP antes de guardarse.
- Mensajes de carga y de error cuando falla la conexión con Firebase.
- Diseño responsive con CSS nativo, incluido un menú hamburguesa en móvil.

## Tecnologías

React, Vite, React Router, Firebase (Firestore y Authentication) y CSS nativo. Desplegado en Vercel.

## Ejecutar en local

```bash
npm install
npm run dev
```

La configuración de Firebase está en `src/services/firebase.js`. Son datos públicos de la app web; la seguridad la controlan las reglas de Firestore.

## Estructura

```
src/
  components/   Header, Footer, Item, ItemDetail, ItemListContainer, formularios y ProtectedRoute
  context/      CartContext y AuthContext
  pages/        Home, Cart, Checkout, AuthPage (login y registro), AdminProducts, Información y NotFound
  services/     Conexión con Firebase: productos, pedidos y administración
data/           products.seed.json, copia de los productos iniciales (la app no la usa)
```

## Firebase

Proyecto `origen-cafe-8e14f`, plan gratuito Spark. Las reglas están en `firestore.rules`:

- **`products`:** lectura pública. Crear, editar y eliminar requiere haber iniciado sesión, y se valida el id, el nombre, la categoría, el precio (mayor que 0) y el tamaño de la imagen.
- **`orders`:** solo se pueden crear pedidos de demostración, y las reglas comprueban productos, precios, cantidades y total contra el catálogo. No se pueden leer, editar ni borrar desde la app.
- Todo lo demás está cerrado.

Los pedidos son de prueba: no hay pagos ni envíos reales.
