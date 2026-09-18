const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api/feedback";

const AUTH_URL = API_URL.replace(/\/feedback$/, "/auth");

/**
 * Logs an administrator into the application.
 *
 * @param {string} email - Administrator email address.
 * @param {string} password - Administrator password.
 * @returns {Promise<Object>} Authentication response from the server.
 */
export const loginAdmin = async (email, password) => {
  const response = await fetch(`${AUTH_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};

/**
 * Checks whether the current browser has a valid
 * administrator authentication session.
 *
 * @returns {Promise<boolean>} True when the admin session is valid.
 */
export const checkAdminAuth = async () => {
  const response = await fetch(`${AUTH_URL}/check`, {
    method: "GET",
    credentials: "include",
  });

  return response.ok;
};
/**
 * Logs the administrator out of the application.
 *
 * @returns {Promise<Object>} Logout response from the server.
 */
export const logoutAdmin = async () => {
  const response = await fetch(`${AUTH_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Logout failed");
  }

  return data;
};