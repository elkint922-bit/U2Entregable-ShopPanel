const ORDERS_KEY = "shoppanel_orders";

/**
 * Obtiene todos los pedidos guardados en localStorage.
 */
export function getOrders() {
  const raw = localStorage.getItem(ORDERS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

/**
 * Guarda un producto como pedido nuevo con estado "Pendiente".
 * Si el producto ya fue pedido, no lo duplica.
 */
export function addOrder(product) {
  const orders = getOrders();

  const alreadyExists = orders.some((order) => order.productId === product.id);
  if (alreadyExists) {
    return orders;
  }

  const newOrder = {
    orderId: `ORD-${Date.now()}`,
    productId: product.id,
    name: product.title,
    image: product.thumbnail,
    price: product.price,
    status: "Pendiente",
    createdAt: new Date().toISOString(),
  };

  const updatedOrders = [...orders, newOrder];
  localStorage.setItem(ORDERS_KEY, JSON.stringify(updatedOrders));
  return updatedOrders;
}

/**
 * Actualiza el estado de un pedido existente.
 * Estados válidos: Pendiente, Confirmado, Enviado, Cancelado.
 */
export function updateOrderStatus(orderId, newStatus) {
  const orders = getOrders();
  const updatedOrders = orders.map((order) =>
    order.orderId === orderId ? { ...order, status: newStatus } : order
  );
  localStorage.setItem(ORDERS_KEY, JSON.stringify(updatedOrders));
  return updatedOrders;
}

/**
 * Elimina un pedido.
 */
export function removeOrder(orderId) {
  const orders = getOrders();
  const updatedOrders = orders.filter((order) => order.orderId !== orderId);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(updatedOrders));
  return updatedOrders;
}
