import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/productos";

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // Validación de campos vacíos
    if (!username.trim() || !password.trim()) {
      setError("Debes completar usuario y contraseña.");
      return;
    }

    setLoading(true);
    try {
      await login(username.trim(), password);
      navigate(from, { replace: true });
    } catch (err) {
      // Credenciales incorrectas o error de red/API
      setError(err.message || "No fue posible iniciar sesión.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div
        className="card shadow p-4"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h3 className="text-center mb-1">ShopPanel</h3>
        <p className="text-center text-muted mb-4">Inicia sesión para continuar</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Usuario
            </label>
            <input
              id="username"
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="emilys"
              autoComplete="username"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="alert alert-danger py-2 small" role="alert">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Iniciando sesión...
              </>
            ) : (
              "Iniciar sesión"
            )}
          </button>

          <p className="text-muted small mt-3 mb-0 text-center">
            Puedes usar un usuario de prueba de{" "}
            <a
              href="https://dummyjson.com/users"
              target="_blank"
              rel="noreferrer"
            >
              DummyJSON
            </a>{" "}
            (ej. usuario: <code>emilys</code>, contraseña: <code>emilyspass</code>)
          </p>
        </form>
      </div>
    </div>
  );
}
