import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          ShopPanel
        </Link>

        {isAuthenticated && (
          <>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/productos">
                    Productos
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/pedidos">
                    Mis pedidos
                  </NavLink>
                </li>
              </ul>
            </div>

            <div className="d-flex align-items-center gap-3">
              <div className="d-flex align-items-center text-light">
                <img
                  src={user.image}
                  alt={user.username}
                  className="rounded-circle me-2"
                  style={{ width: 32, height: 32, objectFit: "cover" }}
                />
                <span className="small">
                  {user.firstName} {user.lastName}
                </span>
              </div>
              <button
                className="btn btn-outline-light btn-sm"
                onClick={handleLogout}
              >
                Cerrar sesión
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
