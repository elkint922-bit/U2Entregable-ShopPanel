import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getProductById } from "../services/productService";
import { addOrder, getOrders } from "../services/orderService";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    loadProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function loadProduct() {
    setLoading(true);
    setError("");
    try {
      const data = await getProductById(id);
      setProduct(data);

      const existingOrders = getOrders();
      setAdded(existingOrders.some((order) => order.productId === data.id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleAddOrder() {
    addOrder(product);
    setAdded(true);
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger">{error}</div>
        <button className="btn btn-secondary" onClick={() => navigate("/productos")}>
          Volver al listado
        </button>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <Link to="/productos" className="btn btn-link ps-0 mb-3">
        &larr; Volver al listado
      </Link>

      <div className="row g-4">
        <div className="col-md-5">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="img-fluid rounded shadow-sm"
          />
        </div>
        <div className="col-md-7">
          <h2>{product.title}</h2>
          <span className="badge bg-secondary mb-2">{product.category}</span>
          <p className="text-muted">{product.description}</p>
          <p className="fs-3 fw-bold text-success">
            ${product.price?.toFixed(2)}
          </p>
          <p className="small text-muted">
            Stock disponible: {product.stock} unidades
          </p>

          {added ? (
            <div className="alert alert-success">
              Este producto ya está en tus pedidos.{" "}
              <Link to="/pedidos">Ver mis pedidos</Link>
            </div>
          ) : (
            <button className="btn btn-primary btn-lg" onClick={handleAddOrder}>
              Registrar pedido
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
