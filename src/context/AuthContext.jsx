import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let token = null;
    let userObj = null;
    try {
      token = localStorage.getItem("token");
      const userInfo = localStorage.getItem("user");
      if (userInfo && userInfo !== "undefined" && userInfo !== "null") {
        userObj = JSON.parse(userInfo);
        // Nếu userObj không phải object hoặc thiếu trường cơ bản thì set null
        if (!userObj || typeof userObj !== "object" || !userObj.email) {
          userObj = null;
        }
      }
    } catch {
      userObj = null;
      token = null;
    }
    if (token && userObj) {
      setIsLoggedIn(true);
      setUser(userObj);
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, []);

  const login = (token, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setIsLoggedIn(true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
