import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getOrders, updateOrderStatus, removeOrder } from "../services/orderService";

const STATUS_OPTIONS = ["Pendiente", "Confirmado", "Enviado", "Cancelado"];

const STATUS_BADGE = {
  Pendiente: "bg-warning text-dark",
  Confirmado: "bg-info text-dark",
  Enviado: "bg-primary",
  Cancelado: "bg-danger",
};

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  function handleStatusChange(orderId, newStatus) {
    const updated = updateOrderStatus(orderId, newStatus);
    setOrders(updated);
  }

  function handleRemove(orderId) {
    const updated = removeOrder(orderId);
    setOrders(updated);
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Mis pedidos</h2>

      {orders.length === 0 ? (
        <div className="alert alert-info">
          Aún no tienes pedidos registrados.{" "}
          <Link to="/productos">Explora los productos</Link> y registra tu primer pedido.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderId}>
                  <td className="d-flex align-items-center gap-2">
                    <img
                      src={order.image}
                      alt={order.name}
                      style={{ width: 48, height: 48, objectFit: "contain" }}
                    />
                    <span>{order.name}</span>
                  </td>
                  <td>${order.price?.toFixed(2)}</td>
                  <td>
                    <span
                      className={`badge me-2 ${STATUS_BADGE[order.status] || "bg-secondary"}`}
                    >
                      {order.status}
                    </span>
                    <select
                      className="form-select form-select-sm d-inline-block w-auto"
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.orderId, e.target.value)
                      }
                    >
                      {STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="small text-muted">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleRemove(order.orderId)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
