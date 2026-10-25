import { useState } from "react";
import { getCurrentUser, loginUser, logoutUser, registerUser } from "../services/auth";
import { AuthContext } from "./AuthContext";

function AuthProvider({ children }) {
  const [user, setUser] = useState(getCurrentUser);

  function register(data) {
    setUser(registerUser(data));
  }

  function login(data) {
    setUser(loginUser(data));
  }

  function logout() {
    logoutUser();
    setUser(null);
  }

  return <AuthContext value={{ user, register, login, logout }}>{children}</AuthContext>;
}

export default AuthProvider;
