import { createContext, useContext, useEffect, useState } from "react";

import type { ReactNode } from "react";
import type { AuthContextType, User } from "@/types/auth";

import keycloak from "./keycloak";

const AuthContext = createContext<AuthContextType | null>(null);

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [token, setToken] = useState<string>();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    keycloak
      .init({
        onLoad: "login-required",
        pkceMethod: "S256",
        checkLoginIframe: false,
      })
      .then((authenticated) => {
        setIsAuthenticated(authenticated);
        if (!authenticated) {
          console.log("Not authenticated");
        } else {
          console.log("Authenticated");
          console.log("Token:", keycloak.token);
        }

        if (authenticated) {
          setToken(keycloak.token);

          const parsed = keycloak.tokenParsed;

          setUser({
            id: Number(parsed?.sub),
            username: (parsed?.preferred_username as string) || "",
            email: parsed?.email as string,
            roles:
              (
                parsed?.realm_access as {
                  roles?: string[];
                }
              )?.roles || [],
          });
        }
      });
  }, []);

  const login = () => keycloak.login();

  const logout = () => keycloak.logout();

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        token,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
