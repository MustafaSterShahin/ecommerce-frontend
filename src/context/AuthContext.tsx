import { createContext, useState, useEffect, type ReactNode } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  username: string;
  role: string;
  token: string;
  login: (token: string, username: string, role: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  username: "",
  role: "",
  token: "",
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    const storedRole = localStorage.getItem("role");

    if (storedToken && storedUsername && storedRole) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
      setRole(storedRole);
      setToken(storedToken);
    }
  }, []);

  const login = (token: string, username: string, role: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("role", role);
    setIsLoggedIn(true);
    setUsername(username);
    setRole(role);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setUsername("");
    setRole("");
    setToken("");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, role, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
