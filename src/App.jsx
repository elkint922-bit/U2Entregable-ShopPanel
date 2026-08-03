import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Orders from "./pages/Orders";
import NotFound from "./pages/NotFound";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Navbar />
      <Routes>
        {/* Ruta raíz: redirige según el estado de autenticación */}
        <Route
          path="/"
          element={
            <Navigate to={isAuthenticated ? "/productos" : "/login"} replace />
          }
        />

        {/* Ruta pública */}
        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/productos" element={<Products />} />
          <Route path="/productos/:id" element={<ProductDetail />} />
          <Route path="/pedidos" element={<Orders />} />
        </Route>

        {/* Ruta para páginas inexistentes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
