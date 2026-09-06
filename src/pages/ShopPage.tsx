import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { EMPTY_FILTERS, faDigits, type Filters } from "../data";
import { useAdminStore } from "../adminStore";
import SearchConsole from "../components/SearchConsole";
import { CrumbBar } from "../components/PageHeader";
import Featured from "../components/Featured";
import { Reveal } from "../ui";

export default function ShopPage() {
  const [params, setParams] = useSearchParams();
  const { products } = useAdminStore();

  const filters: Filters = useMemo(
    () => ({
      q: params.get("q") ?? EMPTY_FILTERS.q,
      cat: params.get("cat") ?? EMPTY_FILTERS.cat,
      brand: params.get("brand") ?? EMPTY_FILTERS.brand,
      price: params.get("price") ?? EMPTY_FILTERS.price,
      sort: (params.get("sort") as Filters["sort"]) ?? EMPTY_FILTERS.sort,
    }),
    [params],
  );

  const onSearch = (f: Filters) => {
    const p = new URLSearchParams();
    if (f.q) p.set("q", f.q);
    if (f.cat !== "all") p.set("cat", f.cat);
    if (f.brand !== "all") p.set("brand", f.brand);
    if (f.price !== "all") p.set("price", f.price);
    if (f.sort !== "featured") p.set("sort", f.sort);
    setParams(p);
  };

  const onClear = () => setParams(new URLSearchParams());

  const visibleCount = products.filter((p) => p.visible).length;

  return (
    <>
      <CrumbBar crumb="فروشگاه" note={`${faDigits(visibleCount)} محصول فعال`} />

      <div className="paper-grain">
        <div className="mx-auto max-w-7xl px-5 pb-4 pt-10 md:px-8">
          <Reveal variant="scale">
            <SearchConsole key={params.toString()} onSearch={onSearch} initial={filters} />
          </Reveal>
        </div>
      </div>

      <Featured filters={filters} onClear={onClear} />
    </>
  );
}
