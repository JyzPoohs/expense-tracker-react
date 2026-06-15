import { Route, Routes } from "react-router-dom";
import { Dashboard } from "@/pages/Dashboard";
import { TransactionListPage } from "@/pages/transaction/TransactionList";
import { Profile } from "@/pages/Profile";
import { Settings } from "@/pages/settings/Settings";
import { ProtectedLayout } from "@/components/layouts/ProtectedLayout";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedLayout/>}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/transactions" element={<TransactionListPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};
