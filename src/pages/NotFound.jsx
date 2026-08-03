import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-center px-3">
      <h1 className="display-1 fw-bold text-primary">404</h1>
      <p className="fs-4">La página que buscas no existe.</p>
      <Link to="/" className="btn btn-primary mt-3">
        Volver al inicio
      </Link>
    </div>
  );
}
