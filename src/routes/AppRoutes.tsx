import { Route, Routes, BrowserRouter } from "react-router-dom";
import { LoginPage } from "../pages/auth/LoginPage";
import { RegisterPage } from "../pages/auth/RegisterPage";
import { TransactionListPage } from "../pages/transaction/TransactionListPage";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/transactions" element={<TransactionListPage />} />
      </Routes>
    </BrowserRouter>
  );
};
