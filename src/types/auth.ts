export interface User {
  id: number;
  username: string;
  email?: string;
  roles: string[];
}

export interface AuthContextType {
  isAuthenticated: boolean;
  token: string | undefined;
  user: User | null;
  login: () => void;
  logout: () => void;
}
