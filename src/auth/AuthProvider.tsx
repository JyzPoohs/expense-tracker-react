import { createContext, useContext, useEffect, useState } from "react";

import type { ReactNode } from "react";
import type { AuthContextType, User } from "@/types/auth";

import keycloak from "./keycloak";
import { initializeUser } from "@/services/authService";

const AuthContext = createContext<AuthContextType | null>(null);

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string>();
  const [user, setUser] = useState<User | null>(null);
  const [isUserInitialized, setIsUserInitialized] = useState(false);
  const [keycloakInitialized, setKeycloakInitialized] = useState(false);

  useEffect(() => {
    if (keycloakInitialized) return;

    setKeycloakInitialized(true);

    keycloak
      .init({
        onLoad: "login-required",
        pkceMethod: "S256",
        checkLoginIframe: false,
      })
      .then(async (authenticated) => {
        setIsAuthenticated(authenticated);

        if (authenticated) {
          setToken(keycloak.token);
          console.log("Token:", keycloak.token);

          const parsed = keycloak.tokenParsed;

          setUser({
            id: parsed?.sub as string,
            username: (parsed?.preferred_username as string) || "",
            email: parsed?.email as string,
            roles:
              (
                parsed?.realm_access as {
                  roles?: string[];
                }
              )?.roles || [],
          });

          await initializeUser();

          setIsUserInitialized(true);

        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      keycloak.updateToken(60);
    }, 60000);

    return () => clearInterval(interval);

  }, []);

  const login = () => keycloak.login();

  const logout = () => keycloak.logout();

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        token,
        user,
        login,
        logout,
        isUserInitialized
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
