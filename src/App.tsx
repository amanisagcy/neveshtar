import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { CartProvider } from "./store";
import { AdminProvider, useAdminStore } from "./adminStore";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import CategoriesPage from "./pages/CategoriesPage";
import BestsellersPage from "./pages/BestsellersPage";
import OffersPage from "./pages/OffersPage";
import JournalPage from "./pages/JournalPage";
import AboutPage from "./pages/AboutPage";
import FaqPage from "./pages/FaqPage";
import ContactPage from "./pages/ContactPage";
import AdminLogin from "./components/admin/AdminLogin";
import AdminPanel from "./components/admin/AdminPanel";

function AdminGate() {
  const { authed } = useAdminStore();
  return authed ? <AdminPanel /> : <AdminLogin />;
}

export default function App() {
  return (
    <AdminProvider>
      <CartProvider>
        <HashRouter>
          <Routes>
            <Route path="/admin" element={<AdminGate />} />
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/bestsellers" element={<BestsellersPage />} />
              <Route path="/offers" element={<OffersPage />} />
              <Route path="/journal" element={<JournalPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </HashRouter>
      </CartProvider>
    </AdminProvider>
  );
}
