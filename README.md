# ShopPanel

Panel de usuario para una plataforma de pedidos de productos, desarrollado con React + Vite, React Router, Context API y DummyJSON como API externa de prueba.

## Requisitos previos

- Node.js 18 o superior
- npm

## Instalación

```bash
npm install
```

## Ejecutar en modo desarrollo

```bash
npm run dev
```

Esto abrirá el proyecto normalmente en `http://localhost:5173`.

## Generar build de producción

```bash
npm run build
```

## Credenciales de prueba (DummyJSON)

Puedes usar cualquier usuario listado en https://dummyjson.com/users. Por ejemplo:

- **Usuario:** `emilys`
- **Contraseña:** `emilyspass`

## Estructura del proyecto

```
src/
├── components/       # Componentes reutilizables
│   ├── Navbar.jsx
│   ├── ProductCard.jsx
│   └── ProtectedRoute.jsx
├── context/           # Manejo global de sesión (Context API)
│   └── AuthContext.jsx
├── pages/             # Vistas asociadas a las rutas
│   ├── Login.jsx
│   ├── Products.jsx
│   ├── ProductDetail.jsx
│   ├── Orders.jsx
│   └── NotFound.jsx
├── services/          # Comunicación con la API externa y localStorage
│   ├── authService.js
│   ├── productService.js
│   └── orderService.js
├── App.jsx            # Definición de rutas
└── main.jsx           # Punto de entrada, providers globales
```

## Rutas de la aplicación

| Ruta              | Tipo       | Descripción                          |
|-------------------|------------|---------------------------------------|
| `/login`          | Pública    | Inicio de sesión                      |
| `/productos`      | Protegida  | Listado de productos                  |
| `/productos/:id`  | Protegida  | Detalle de un producto (ruta dinámica)|
| `/pedidos`        | Protegida  | Consulta y gestión de pedidos         |
| `*`               | Pública    | Página 404                            |

## Funcionalidades implementadas

- Autenticación contra `POST https://dummyjson.com/auth/login`.
- Persistencia de sesión en `localStorage`.
- Rutas protegidas mediante componente `ProtectedRoute` + Context API.
- Consumo de productos (`GET /products`, `GET /products/{id}`, `GET /products/search`).
- Registro simulado de pedidos con estado inicial "Pendiente", persistidos en `localStorage`.
- Cambio de estado de pedido: Pendiente -> Confirmado / Enviado / Cancelado.
- Validaciones de formulario (campos vacios, credenciales incorrectas).
- Estados de carga y manejo de errores en todas las vistas.
- Interfaz responsiva con Bootstrap 5.

## Despliegue en GitHub

```bash
git init
git add .
git commit -m "ShopPanel: panel de usuario con React, Context API y DummyJSON"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/shoppanel.git
git push -u origin main
```
