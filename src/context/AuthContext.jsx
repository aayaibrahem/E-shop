import React, { createContext, useEffect, useState } from "react";

// Create context
export const authContext = createContext();

// AuthContext component
const AuthContext = ({ children }) => {
  const [token, setToken] = useState(null);
  console.log(token);
  useEffect(() => {
    if (localStorage.getItem("tkn") !== null) {
      setToken(localStorage.getItem("tkn"));
    }
  }, []);
  return (
    <authContext.Provider value={{ token, setToken }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContext;
