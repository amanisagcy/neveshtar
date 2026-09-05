import { useCallback, useState } from "react";
import { EMPTY_FILTERS, type Filters } from "./data";
import { CartProvider } from "./store";
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

export default function App() {
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const reduced = useReducedMotion();

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
    (brandEn: string) => {
      setFilters({ ...EMPTY_FILTERS, brand: brandEn });
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
    <CartProvider>
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
    </CartProvider>
  );
}
