import { useMemo, useState } from "react";
import {
  CATEGORIES,
  PRODUCTS,
  PRICE_RANGES,
  discountOf,
  faDigits,
  faNumber,
  faPrice,
  type Filters,
  type Product,
} from "../data";
import { useCart } from "../store";
import { IconCart, IconClose, IconHeart } from "../icons";
import { Reveal, SectionHead, Stars } from "../ui";

/* ---------- product card ---------- */
export function ProductCard({ p, delay = 0 }: { p: Product; delay?: number }) {
  const { add } = useCart();
  const [liked, setLiked] = useState(false);
  const off = discountOf(p.price, p.oldPrice);

  return (
    <Reveal delay={delay} variant="scale">
      <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-sand/80 bg-cream shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-lift">
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={p.img}
            alt={p.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-108"
          />
          <span className="img-veil absolute inset-0" aria-hidden />

          {off > 0 && (
            <span className="absolute top-4 start-4 z-10 rounded-full bg-coral px-3 py-1 text-xs font-bold text-cream shadow-glow">
              ٪{faDigits(off)} تخفیف
            </span>
          )}
          {p.badge && (
            <span className="absolute bottom-4 start-4 z-10 rounded-full border border-cream/25 bg-inkdeep/60 px-3 py-1 text-[0.68rem] font-semibold text-goldsoft backdrop-blur-md">
              {p.badge}
            </span>
          )}

          <button
            onClick={() => setLiked(!liked)}
            aria-label={liked ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
            className={`absolute top-4 end-4 z-10 grid size-9 place-items-center rounded-full backdrop-blur-md transition-all duration-300 ${
              liked ? "bg-coral text-cream" : "bg-white/25 text-cream hover:bg-white/45"
            }`}
          >
            <IconHeart className={`size-[18px] ${liked ? "fill-current" : ""}`} />
          </button>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center justify-between gap-3">
            <span className="font-latin text-[0.7rem] tracking-[0.22em] text-mistlight uppercase">
              {p.brand}
            </span>
            <span className="flex items-center gap-1.5">
              <Stars rating={p.rating} className="size-3" />
              <span className="text-xs font-bold text-ink">{faDigits(p.rating)}</span>
            </span>
          </div>

          <h3 className="mt-2.5 text-lg font-bold leading-7 text-inkdeep transition-colors group-hover:text-coraldeep">
            {p.name}
          </h3>
          <p className="mt-1 text-xs text-mistlight">{faNumber(p.sold)} خرید موفق</p>

          <div className="mt-4 flex flex-1 items-end justify-between gap-3">
            <span>
              {p.oldPrice && (
                <span className="block text-xs text-mistlight line-through">{faNumber(p.oldPrice)}</span>
              )}
              <span className="block text-base font-black text-ink">{faPrice(p.price)}</span>
            </span>
          </div>

          <button
            onClick={() => add(p)}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-ink py-3 text-sm font-bold text-cream transition-all duration-300 hover:bg-coraldeep hover:shadow-glow"
          >
            <IconCart className="size-[18px]" />
            افزودن به سبد خرید
          </button>
        </div>
      </article>
    </Reveal>
  );
}

/* ---------- featured grid with filtering ---------- */
export default function Featured({ filters, onClear }: { filters: Filters; onClear: () => void }) {
  const list = useMemo(() => {
    const range = PRICE_RANGES.find((r) => r.id === filters.price) ?? PRICE_RANGES[0];
    const q = filters.q.trim().toLowerCase();
    const filtered = PRODUCTS.filter((p) => {
      if (q && !(p.name.includes(filters.q.trim()) || p.brand.toLowerCase().includes(q) || p.brandFa.includes(filters.q.trim())))
        return false;
      if (filters.cat !== "all" && p.catId !== filters.cat) return false;
      if (filters.brand !== "all" && p.brand !== filters.brand) return false;
      if (p.price < range.min || p.price > range.max) return false;
      return true;
    });
    const sorted = [...filtered];
    switch (filters.sort) {
      case "cheap":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "expensive":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "popular":
        sorted.sort((a, b) => b.sold - a.sold);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    return sorted;
  }, [filters]);

  const catName = CATEGORIES.find((c) => c.id === filters.cat)?.name;
  const hasFilter =
    filters.q !== "" || filters.cat !== "all" || filters.brand !== "all" || filters.price !== "all";

  return (
    <section id="shop" className="relative scroll-mt-28 py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            eyebrow="فروشگاه"
            callig="دست‌چین‌شده"
            title="محصولات منتخب"
            text="هر محصول پیش از ورود به نوشتار، توسط تیم سردبیری تست می‌شود؛ فقط بهترین‌ها می‌مانند."
          />
          <Reveal delay={200} className="mb-2 flex items-center gap-3">
            <span className="rounded-full border border-sand bg-cream px-4 py-2 text-sm font-semibold text-mist">
              نمایش <b className="text-inkdeep">{faDigits(list.length)}</b> محصول
            </span>
            {hasFilter && (
              <button
                onClick={onClear}
                className="flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-bold text-cream transition-colors hover:bg-coraldeep"
              >
                <IconClose className="size-3.5" />
                پاک کردن فیلترها
              </button>
            )}
          </Reveal>
        </div>

        {catName && (
          <Reveal delay={100}>
            <p className="mt-6 text-sm text-mist">
              در حال مشاهده دسته‌بندی: <b className="text-coraldeep">{catName}</b>
            </p>
          </Reveal>
        )}

        {list.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((p, i) => (
              <ProductCard key={p.id} p={p} delay={(i % 4) * 90} />
            ))}
          </div>
        ) : (
          <div className="mt-16 rounded-xl border border-dashed border-sanddeep bg-cream/60 px-6 py-20 text-center">
            <p className="font-callig text-3xl text-ink/70">چیزی پیدا نشد…</p>
            <p className="mx-auto mt-4 max-w-md leading-8 text-mist">
              با این فیلترها محصولی یافت نشد. فیلترها را پاک کنید یا عبارت دیگری را جستجو کنید.
            </p>
            <button
              onClick={onClear}
              className="mt-6 rounded-lg bg-ink px-6 py-3 text-sm font-bold text-cream transition-colors hover:bg-coraldeep"
            >
              نمایش همه محصولات
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
