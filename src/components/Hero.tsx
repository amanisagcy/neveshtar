import { useState, type FormEvent } from "react";
import {
  BRANDS,
  CATEGORIES,
  EMPTY_FILTERS,
  IMG,
  PRICE_RANGES,
  faDigits,
  faPrice,
  type Filters,
} from "../data";
import { useInView } from "../hooks";
import { IconArrow, IconChevron, IconFilter, IconSearch, IconSort, IconSpark } from "../icons";
import { Stars } from "../ui";

/* ---------- floating search console ---------- */
function SearchConsole({ onSearch }: { onSearch: (f: Filters) => void }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [brand, setBrand] = useState("all");
  const [price, setPrice] = useState("all");
  const [sort, setSort] = useState("featured");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    onSearch({ q, cat, brand, price, sort });
  };

  const selectCls =
    "w-full appearance-none rounded-lg border border-sand bg-cream py-3 pe-9 ps-4 text-sm font-medium text-inkdeep outline-none transition-all focus:border-gold focus:ring-2 focus:ring-gold/25";
  const labelCls = "mb-1.5 block text-[0.7rem] font-bold tracking-wide text-mist";

  return (
    <form
      onSubmit={submit}
      className="relative z-30 mx-auto w-full max-w-6xl rounded-xl border border-white/60 bg-white/80 p-4 shadow-lift backdrop-blur-2xl md:p-5"
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
            aria-label="فیلتر و مرتب‌سازی"
            title="مرتب‌سازی"
            onClick={() =>
              setSort(sort === "popular" ? "featured" : sort === "featured" ? "cheap" : sort === "cheap" ? "expensive" : "popular")
            }
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
          مرتب‌سازی فعال:{" "}
          <b className="text-inkdeep">
            {sort === "cheap" ? "ارزان‌ترین" : sort === "expensive" ? "گران‌ترین" : "پرفروش‌ترین"}
          </b>
        </p>
      )}
    </form>
  );
}

/* ---------- hero ---------- */
export default function Hero({ onSearch }: { onSearch: (f: Filters) => void }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);

  return (
    <section id="home" className="relative flex min-h-svh flex-col overflow-hidden">
      {/* backdrop */}
      <div className="absolute inset-0">
        <img
          src={IMG.hero}
          alt="میز کار خلاقانه با دفتر و قلم لوکس"
          className="anim-kenburns h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-inkdeep/85 via-inkdeep/45 to-inkdeep/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-inkdeep/70 via-transparent to-inkdeep/30" />
      </div>

      {/* vertical latin caption */}
      <div className="absolute bottom-40 left-6 z-10 hidden lg:block" aria-hidden>
        <p
          className="font-latin text-[0.7rem] tracking-[0.5em] text-cream/50 uppercase"
          style={{ writingMode: "vertical-rl" }}
        >
          The art of writing — Est. 1398
        </p>
      </div>

      {/* content */}
      <div ref={ref} className={`relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pt-36 pb-12 md:px-8 md:pb-56 ${inView ? "is-in" : ""}`}>
        <div className="max-w-2xl">
          <div className="mask-line">
            <span className="flex items-center gap-3">
              <span className="h-px w-12 bg-gold" />
              <span className="text-sm font-semibold tracking-[0.3em] text-goldsoft">
                فروشگاه لوکس لوازم‌التحریر
              </span>
              <span className="font-callig text-xl leading-none text-coral">به نامِ قلم</span>
            </span>
          </div>

          <h1 className="mt-6 text-[2.35rem] leading-[1.45] font-black text-cream md:text-6xl md:leading-[1.4] lg:text-[4rem]">
            <span className="mask-line">
              <span style={{ transitionDelay: "120ms" }}>ایده‌های شما،</span>
            </span>
            <span className="mask-line">
              <span style={{ transitionDelay: "240ms" }}>
                با <span className="relative inline-block text-goldsoft">
                  بهترین ابزارها
                  <svg
                    className="absolute -bottom-2 right-0 w-full"
                    viewBox="0 0 220 14"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      className="draw-underline"
                      d="M3 10.5C60 4 150 2.5 217 7.5"
                      stroke="#FF8A65"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </span>
            </span>
            <span className="mask-line">
              <span style={{ transitionDelay: "360ms" }}>آغاز می‌شوند</span>
            </span>
          </h1>

          <div className="mask-line mt-7">
            <p className="max-w-xl text-base leading-8 text-sand/90 md:text-lg" style={{ transitionDelay: "0ms" }}>
              مجموعه‌ای از بهترین لوازم‌التحریر، ابزارهای طراحی و محصولات خلاقانه برای مدرسه،
              دانشگاه و محیط کار — انتخاب‌شده برای کسانی که نوشتن را دوست دارند.
            </p>
          </div>

          <div className="mask-line mt-9">
            <span className="flex flex-wrap items-center gap-4">
              <a
                href="#shop"
                className="group flex items-center gap-3 rounded-lg bg-coral px-8 py-4 text-base font-bold text-cream shadow-glow transition-all duration-300 hover:bg-coraldeep hover:gap-4"
              >
                خرید محصولات
                <IconArrow className="size-5 transition-transform duration-300 group-hover:-translate-x-1" />
              </a>
              <a
                href="#categories"
                className="rounded-lg border border-cream/35 bg-white/10 px-8 py-4 text-base font-bold text-cream backdrop-blur-md transition-all duration-300 hover:border-goldsoft hover:bg-white/20"
              >
                مشاهده دسته‌بندی‌ها
              </a>
            </span>
          </div>

          <div className="mask-line mt-10">
            <span className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-sand/80">
              <span className="flex items-center gap-2">
                <Stars rating={5} className="size-3" />
                <b className="text-cream">{faDigits("4.9")}</b> از {faDigits("12,400")} نظر
              </span>
              <span className="hidden h-4 w-px bg-cream/25 sm:block" />
              <span className="flex items-center gap-2">
                <IconSpark className="size-4 text-goldsoft" />
                ارسال رایگان برای خرید بالای {faDigits("1,000,000")} تومان
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* floating bestseller chip */}
      <a
        href="#best"
        className="anim-floaty absolute top-40 left-8 z-10 hidden w-64 items-center gap-3 rounded-xl border border-white/25 bg-white/12 p-3.5 backdrop-blur-xl transition-colors hover:bg-white/20 xl:flex"
        style={{ ["--rot" as string]: "-2deg" }}
      >
        <img src={IMG.pens} alt="خودکار لوکس فلزی" className="size-16 rounded-lg object-cover" />
        <span className="leading-6">
          <span className="block text-[0.65rem] tracking-widest text-goldsoft">پرفروش این هفته</span>
          <span className="block text-sm font-bold text-cream">خودکار لوکس فلزی</span>
          <span className="block text-xs text-sand/85">{faPrice(1250000)}</span>
        </span>
      </a>

      {/* rotating seal */}
      <div className="absolute bottom-52 left-10 z-10 hidden size-32 lg:block" aria-hidden>
        <svg viewBox="0 0 100 100" className="anim-spin-slow absolute inset-0 size-full text-cream/75">
          <defs>
            <path id="circlePath" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
          </defs>
          <text className="font-latin" fontSize="8.2" letterSpacing="2.6" fill="currentColor">
            <textPath href="#circlePath">NEVESHTAR • PREMIUM STATIONERY • SINCE 1398 •</textPath>
          </text>
        </svg>
        <span className="absolute inset-0 grid place-items-center">
          <svg viewBox="0 0 32 32" className="size-8 text-gold" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M16 2.5 25.5 12 16 29.5 6.5 12Z" strokeLinejoin="round" />
            <circle cx="16" cy="13" r="2.6" fill="currentColor" stroke="none" />
          </svg>
        </span>
      </div>

      {/* search console overlapping bottom */}
      <div className="relative z-20 px-4 pb-8 md:absolute md:inset-x-0 md:bottom-0 md:translate-y-1/2 md:pb-0 md:px-6">
        <SearchConsole onSearch={onSearch} />
      </div>

      {/* fade to paper */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-40 bg-gradient-to-t from-paper/70 to-transparent md:block" aria-hidden />
    </section>
  );
}
