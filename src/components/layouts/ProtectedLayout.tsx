import { Outlet } from "react-router-dom";
import { useAuth } from "@/auth/AuthProvider";
import { Spinner } from "../ui/spinner";

export const ProtectedLayout = () => {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <Spinner />;
  }

  if(!isAuthenticated) {
    return null;
  }

  return <Outlet />;
};
