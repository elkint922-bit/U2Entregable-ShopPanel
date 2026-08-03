const BASE_URL = "https://dummyjson.com";

/**
 * Obtiene el listado de productos.
 * GET /products
 */
export async function getProducts(limit = 30) {
  const response = await fetch(`${BASE_URL}/products?limit=${limit}`);

  if (!response.ok) {
    throw new Error("No fue posible cargar los productos. Intenta nuevamente.");
  }

  const data = await response.json();
  return data.products;
}

/**
 * Obtiene el detalle de un producto por id.
 * GET /products/{id}
 */
export async function getProductById(id) {
  const response = await fetch(`${BASE_URL}/products/${id}`);

  if (response.status === 404) {
    throw new Error("El producto solicitado no existe.");
  }

  if (!response.ok) {
    throw new Error("No fue posible cargar el detalle del producto.");
  }

  const data = await response.json();
  return data;
}

/**
 * Búsqueda de productos por término (funcionalidad opcional).
 * GET /products/search?q=termino
 */
export async function searchProducts(term) {
  const response = await fetch(
    `${BASE_URL}/products/search?q=${encodeURIComponent(term)}`
  );

  if (!response.ok) {
    throw new Error("No fue posible realizar la búsqueda.");
  }

  const data = await response.json();
  return data.products;
}
