import { useCallback, useEffect, useState } from "react";
import { EMPTY_FILTERS, type Filters } from "./data";
import { CartProvider } from "./store";
import { AdminProvider, useAdminStore } from "./adminStore";
import { useReducedMotion } from "./hooks";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import Featured from "./components/Featured";
import BestSellers from "./components/BestSellers";
import Experience from "./components/Experience";
import { Offers, Stats, Testimonials } from "./components/Offers";
import Journal from "./components/Journal";
import { Faq, Footer } from "./components/FaqFooter";
import CartDrawer, { Toast } from "./components/CartDrawer";
import AdminLogin from "./components/admin/AdminLogin";
import AdminPanel from "./components/admin/AdminPanel";

function AdminGate() {
  const { authed } = useAdminStore();
  return authed ? <AdminPanel /> : <AdminLogin />;
}

export default function App() {
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const reduced = useReducedMotion();
  const [hash, setHash] = useState(() => window.location.hash);

  useEffect(() => {
    const fn = () => setHash(window.location.hash);
    window.addEventListener("hashchange", fn);
    return () => window.removeEventListener("hashchange", fn);
  }, []);

  const isAdmin = hash.startsWith("#/admin");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isAdmin]);

  const scrollToShop = useCallback(() => {
    document.getElementById("shop")?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  }, [reduced]);

  const handleSearch = useCallback(
    (f: Filters) => {
      setFilters(f);
      scrollToShop();
    },
    [scrollToShop],
  );

  const handlePickCategory = useCallback(
    (catId: string) => {
      setFilters({ ...EMPTY_FILTERS, cat: catId });
      scrollToShop();
    },
    [scrollToShop],
  );

  const handlePickBrand = useCallback(
    (brand: string) => {
      setFilters({ ...EMPTY_FILTERS, brand });
      scrollToShop();
    },
    [scrollToShop],
  );

  const handleAllProducts = useCallback(() => {
    setFilters(EMPTY_FILTERS);
    scrollToShop();
  }, [scrollToShop]);

  const clearFilters = useCallback(() => setFilters(EMPTY_FILTERS), []);

  return (
    <AdminProvider>
      <CartProvider>
        {isAdmin ? (
          <AdminGate />
        ) : (
          <div className="min-h-screen bg-paper text-inkdeep">
            <Nav onCategory={handlePickCategory} onBrand={handlePickBrand} onAllProducts={handleAllProducts} />
            <main>
              <Hero onSearch={handleSearch} />
              <Categories onPick={handlePickCategory} />
              <Featured filters={filters} onClear={clearFilters} />
              <BestSellers />
              <Experience />
              <Offers />
              <Testimonials />
              <Stats />
              <Journal />
              <Faq />
            </main>
            <Footer />
            <CartDrawer />
            <Toast />
            <div className="noise-overlay" aria-hidden />
          </div>
        )}
      </CartProvider>
    </AdminProvider>
  );
}
