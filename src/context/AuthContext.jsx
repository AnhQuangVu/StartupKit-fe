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
    // If this user is flagged as first-login and hasn't seen onboarding yet,
    // remove the localStorage key so the onboarding tour can auto-start.
    try {
      // If we previously set a force flag (registration completed but no auto-login),
      // honor it: remove the force flag and clear onboarding_seen so the tour runs.
      const force = localStorage.getItem('force_onboarding');
      if (force === 'true') {
        localStorage.removeItem('force_onboarding');
        localStorage.removeItem('onboarding_seen');
        // ensure the in-memory user shows as first-login so UI that checks the flag runs
        const patched = { ...(userData || {}), is_first_login: true, onboarding_seen: false };
        localStorage.setItem('user', JSON.stringify(patched));
        setUser(patched);
      }
      if (userData && userData.is_first_login && !userData.onboarding_seen) {
        localStorage.removeItem('onboarding_seen');
      }
    } catch (e) {
      // ignore
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
  };

  const updateUser = (patch = {}) => {
    try {
      const current = user || JSON.parse(localStorage.getItem('user') || '{}');
      const updated = { ...(current || {}), ...patch };
      localStorage.setItem('user', JSON.stringify(updated));
      setUser(updated);
      // keep isLoggedIn flag
      if (updated && Object.keys(updated).length > 0) setIsLoggedIn(true);
      return updated;
    } catch (e) {
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
