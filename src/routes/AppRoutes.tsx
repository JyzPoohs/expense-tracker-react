import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Dashboard } from "@/pages/Dashboard";
import { TransactionListPage } from "@/pages/transaction/TransactionListPage";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/transactions" element={<TransactionListPage />} />
      </Routes>
    </BrowserRouter>
  );
};
