import { useState, useEffect } from "react";
import { getProducts, searchProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);
    setError("");
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch(e) {
    e.preventDefault();
    if (!searchTerm.trim()) {
      loadProducts();
      return;
    }
    setLoading(true);
    setError("");
    try {
      const data = await searchProducts(searchTerm.trim());
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-4">
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center mb-4 gap-2">
        <h2 className="mb-0">Panel de productos</h2>
        <form className="d-flex" onSubmit={handleSearch}>
          <input
            type="text"
            className="form-control me-2"
            placeholder="Buscar producto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            Buscar
          </button>
        </form>
      </div>

      {loading && (
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando productos...</span>
          </div>
        </div>
      )}

      {!loading && error && (
        <div className="alert alert-danger" role="alert">
          {error}{" "}
          <button
            className="btn btn-sm btn-outline-danger ms-2"
            onClick={loadProducts}
          >
            Reintentar
          </button>
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="alert alert-info">
          No se encontraron productos para tu búsqueda.
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="row">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
