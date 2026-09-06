import { useState, type FormEvent } from "react";
import { BRANDS, CATEGORIES, PRICE_RANGES, type Filters } from "../data";
import { IconChevron, IconFilter, IconSearch, IconSort } from "../icons";

interface Props {
  onSearch: (f: Filters) => void;
  initial?: Filters;
  className?: string;
}

const SORT_LABEL: Record<string, string> = {
  cheap: "ارزان‌ترین",
  expensive: "گران‌ترین",
  popular: "پرفروش‌ترین",
  featured: "پیشنهادی",
};

export default function SearchConsole({ onSearch, initial, className = "" }: Props) {
  const [q, setQ] = useState(initial?.q ?? "");
  const [cat, setCat] = useState(initial?.cat ?? "all");
  const [brand, setBrand] = useState(initial?.brand ?? "all");
  const [price, setPrice] = useState(initial?.price ?? "all");
  const [sort, setSort] = useState(initial?.sort ?? "featured");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    onSearch({ q, cat, brand, price, sort });
  };

  const cycleSort = () =>
    setSort((s) => (s === "popular" ? "featured" : s === "featured" ? "cheap" : s === "cheap" ? "expensive" : "popular"));

  const selectCls =
    "w-full appearance-none rounded-lg border border-sand bg-cream py-3 pe-9 ps-4 text-sm font-medium text-inkdeep outline-none transition-all focus:border-gold focus:ring-2 focus:ring-gold/25";
  const labelCls = "mb-1.5 block text-[0.7rem] font-bold tracking-wide text-mist";

  return (
    <form
      onSubmit={submit}
      className={`rounded-xl border border-white/60 bg-white/85 p-4 shadow-card backdrop-blur-2xl md:p-5 ${className}`}
      aria-label="جستجوی محصول"
    >
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-[minmax(0,1.5fr)_1fr_1fr_1fr_auto]">
        <div>
          <label htmlFor="q" className={labelCls}>
            جستجوی محصول
          </label>
          <div className="relative">
            <IconSearch className="pointer-events-none absolute start-3.5 top-1/2 size-[18px] -translate-y-1/2 text-mistlight" />
            <input
              id="q"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="مثلاً: دفتر چرمی، روان‌نویس، پلنر…"
              className="w-full rounded-lg border border-sand bg-cream py-3 pe-4 ps-11 text-sm outline-none transition-all placeholder:text-mistlight focus:border-gold focus:ring-2 focus:ring-gold/25"
            />
          </div>
        </div>

        <div>
          <label htmlFor="cat" className={labelCls}>
            دسته‌بندی
          </label>
          <div className="relative">
            <select id="cat" value={cat} onChange={(e) => setCat(e.target.value)} className={selectCls}>
              <option value="all">همه دسته‌ها</option>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <IconChevron className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 rotate-90 text-mistlight" />
          </div>
        </div>

        <div>
          <label htmlFor="brand" className={labelCls}>
            برند
          </label>
          <div className="relative">
            <select id="brand" value={brand} onChange={(e) => setBrand(e.target.value)} className={selectCls}>
              <option value="all">همه برندها</option>
              {BRANDS.map((b) => (
                <option key={b.en} value={b.en}>
                  {b.fa} ({b.en})
                </option>
              ))}
              <option value="Neveshtar">نوشتار (Neveshtar)</option>
            </select>
            <IconChevron className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 rotate-90 text-mistlight" />
          </div>
        </div>

        <div>
          <label htmlFor="price" className={labelCls}>
            محدوده قیمت
          </label>
          <div className="relative">
            <select id="price" value={price} onChange={(e) => setPrice(e.target.value)} className={selectCls}>
              {PRICE_RANGES.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.label}
                </option>
              ))}
            </select>
            <IconChevron className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 rotate-90 text-mistlight" />
          </div>
        </div>

        <div className="flex items-end gap-2">
          <button
            type="button"
            aria-label="تغییر مرتب‌سازی"
            title="مرتب‌سازی"
            onClick={cycleSort}
            className="grid size-[46px] shrink-0 place-items-center rounded-lg border border-sand bg-cream text-ink transition-all hover:border-coral hover:text-coraldeep"
          >
            {sort === "featured" ? <IconFilter className="size-5" /> : <IconSort className="size-5 text-coraldeep" />}
          </button>
          <button
            type="submit"
            className="flex h-[46px] flex-1 items-center justify-center gap-2 rounded-lg bg-ink px-7 text-sm font-bold text-cream transition-all hover:bg-coraldeep hover:shadow-glow lg:flex-none"
          >
            <IconSearch className="size-4" />
            جستجو
          </button>
        </div>
      </div>

      {sort !== "featured" && (
        <p className="mt-3 flex items-center gap-2 border-t border-sand/70 pt-3 text-xs text-mist">
          <IconSort className="size-3.5 text-gold" />
          مرتب‌سازی فعال: <b className="text-inkdeep">{SORT_LABEL[sort]}</b>
        </p>
      )}
    </form>
  );
}
