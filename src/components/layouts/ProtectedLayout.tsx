import { Outlet } from "react-router-dom";
import { useAuth } from "@/auth/AuthProvider";
import { Spinner } from "../ui/spinner";

export const ProtectedLayout = () => {
  const { isLoading, isAuthenticated, isUserInitialized } = useAuth();

  if (isLoading || !isUserInitialized) {
    return <div className="text-center py-10"><Spinner /> Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <Outlet />;
};
