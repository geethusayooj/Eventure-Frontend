import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProviderWrapper = ({ children }) => {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState();

  const authenticateUser = () => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      axios
        .get(`/api/auth/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          const user = response.data;
          setToken(storedToken);
          setUser(user);
          setIsAuthenticated(true);
        })
        .catch((error) => {
          setToken();
          setUser(null);
          setIsAuthenticated(false);
        });
    } else {
      setToken();
      setUser(null);
      setIsAuthenticated(false);
    }
  };
  // Log out the user
  const logout = () => {
    setUser({});
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("authToken"); // Remove token from localStorage
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, token, authenticateUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
