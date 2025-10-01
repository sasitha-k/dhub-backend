"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [cookies] = useCookies(["token"]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!cookies.token) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, [cookies.token]);

  return (
    <UserContext.Provider value={{ isAuthenticated, token: cookies.token, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuthUser = () => useContext(UserContext);
