export interface User {
  id: string;
  username: string;
  email?: string;
  roles: string[];
}

export interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | undefined;
  user: User | null;
  login: () => void;
  logout: () => void;
  isUserInitialized: boolean;
}
