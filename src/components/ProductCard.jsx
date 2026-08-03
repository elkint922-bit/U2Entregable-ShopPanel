import { Link } from "react-router-dom";

/**
 * Tarjeta reutilizable de producto.
 * Recibe la información del producto mediante props.
 */
export default function ProductCard({ product }) {
  return (
    <div className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4">
      <div className="card h-100 shadow-sm product-card">
        <img
          src={product.thumbnail}
          className="card-img-top p-3"
          alt={product.title}
          style={{ height: "200px", objectFit: "contain" }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text text-muted small flex-grow-1">
            {product.description?.slice(0, 80)}
            {product.description?.length > 80 ? "..." : ""}
          </p>
          <p className="fw-bold fs-5 text-success mb-2">
            ${product.price?.toFixed(2)}
          </p>
          <Link
            to={`/productos/${product.id}`}
            className="btn btn-outline-primary mt-auto"
          >
            Ver detalle
          </Link>
        </div>
      </div>
    </div>
  );
}
