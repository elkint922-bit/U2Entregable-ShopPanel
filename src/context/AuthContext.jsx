import { createContext, useContext, useState, useEffect } from "react";
import { loginRequest } from "../services/authService";

const AuthContext = createContext(null);

const USER_KEY = "shoppanel_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const storedUser = localStorage.getItem(USER_KEY);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem(USER_KEY);
      }
    }
    setLoading(false);
  }, []);

  async function login(username, password) {
    const data = await loginRequest(username, password);

    const authenticatedUser = {
      id: data.id,
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      image: data.image,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };

    setUser(authenticatedUser);
    localStorage.setItem(USER_KEY, JSON.stringify(authenticatedUser));
    return authenticatedUser;
  }

  function logout() {
    setUser(null);
    localStorage.removeItem(USER_KEY);
  }

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}
