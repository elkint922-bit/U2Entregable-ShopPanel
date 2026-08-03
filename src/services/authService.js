const BASE_URL = "https://dummyjson.com";

/**
 * Inicia sesión contra la API de DummyJSON.
 * Documentación: POST /auth/login
 * @param {string} username
 * @param {string} password
 * @returns {Promise<Object>} datos del usuario autenticado + tokens
 */
export async function loginRequest(username, password) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
      expiresInMins: 60,
    }),
  });

  if (!response.ok) {
    // DummyJSON responde 400 con { message: "Invalid credentials" }
    const errorData = await response.json().catch(() => null);
    const message =
      errorData?.message || "No fue posible iniciar sesión. Verifica tus credenciales.";
    throw new Error(message);
  }

  const data = await response.json();
  return data;
}
