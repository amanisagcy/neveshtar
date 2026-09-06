import { useEffect, useRef, useState } from "react";
import { BRANDS, CATEGORIES, IMG, PRODUCTS, faDigits } from "../data";
import { useActiveSection, useScrolled } from "../hooks";
import { useCart } from "../store";
import {
  IconArrow,
  IconCart,
  IconChevron,
  IconClose,
  IconMenu,
  IconNib,
  IconTruck,
  IconUser,
} from "../icons";

const LINKS = [
  { href: "#home", label: "صفحه اصلی", mega: false },
  { href: "#shop", label: "فروشگاه", mega: false },
  { href: "#categories", label: "دسته‌بندی محصولات", mega: true },
  { href: "#best", label: "پرفروش‌ترین‌ها", mega: false },
  { href: "#offers", label: "تخفیف‌ها", mega: false },
  { href: "#journal", label: "مجله", mega: false },
  { href: "#about", label: "درباره ما", mega: false },
];

const SECTION_IDS = LINKS.map((l) => l.href.slice(1));

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <a href="#home" className="group flex items-center gap-2.5" aria-label="نوشتار — صفحه اصلی">
      <span
        className={`grid size-10 place-items-center rounded-lg transition-all duration-500 group-hover:-rotate-6 ${
          dark ? "border border-cream/40 bg-white/12 text-goldsoft" : "bg-ink text-goldsoft"
        }`}
      >
        <IconNib className="size-6" />
      </span>
      <span className="leading-tight">
        <span className={`block text-xl font-black ${dark ? "text-cream" : "text-inkdeep"}`}>نوشتار</span>
        <span className={`font-latin block text-[0.58rem] tracking-[0.35em] uppercase ${dark ? "text-sand/80" : "text-mist"}`}>
          Neveshtar
        </span>
      </span>
    </a>
  );
}

/* ---------- mega menu panel ---------- */
interface MegaProps {
  open: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onCategory: (id: string) => void;
  onBrand: (en: string) => void;
  onAll: () => void;
  close: () => void;
}

function MegaPanel({ open, onEnter, onLeave, onCategory, onBrand, onAll, close }: MegaProps) {

  return (
    <div
      className={`absolute inset-x-0 top-full z-40 hidden transition-all duration-300 ease-out lg:block ${
        open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0"
      }`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      aria-hidden={!open}
    >
      <div className="mx-auto max-w-7xl px-4 pt-1 pb-6 md:px-6">
        <div className="overflow-hidden rounded-xl border border-sand/90 bg-cream/95 shadow-lift ring-1 ring-inkdeep/5 backdrop-blur-2xl">
          <div className="grid grid-cols-12 gap-8 p-7 lg:gap-6 lg:p-8">
            {/* categories */}
            <div className="col-span-6">
              <p className="mb-4 flex items-center gap-2 text-[0.7rem] font-bold tracking-[0.25em] text-mistlight">
                <span className="h-px w-6 bg-gold" />
                همه دسته‌بندی‌ها
              </p>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map((c, i) => (
                  <button
                    key={c.id}
                    tabIndex={open ? 0 : -1}
                    onClick={() => {
                      onCategory(c.id);
                      close();
                    }}
                    className={`group flex items-center gap-3.5 rounded-xl border border-transparent p-2.5 text-start transition-all duration-300 hover:border-gold/40 hover:bg-paper ${
                      open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                    }`}
                    style={{ transitionDelay: open ? `${80 + i * 45}ms` : "0ms" }}
                  >
                    <span className="relative block size-13 shrink-0 overflow-hidden rounded-lg">
                      <img
                        src={c.img}
                        alt={c.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-112"
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className="truncate text-sm font-black text-inkdeep transition-colors group-hover:text-coraldeep">
                          {c.name}
                        </span>
                        <IconArrow className="size-4 shrink-0 text-mistlight opacity-0 transition-all duration-300 group-hover:-translate-x-0.5 group-hover:text-coraldeep group-hover:opacity-100" />
                      </span>
                      <span className="mt-1 block text-[0.68rem] leading-5 text-mistlight">
                        <b className="text-gold">{faDigits(c.count)}</b> محصول
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* brands */}
            <div className="col-span-3 border-s border-sand/80 ps-6">
              <p className="mb-4 flex items-center gap-2 text-[0.7rem] font-bold tracking-[0.25em] text-mistlight">
                <span className="h-px w-6 bg-gold" />
                برندهای محبوب
              </p>
              <div className="grid grid-cols-1 gap-1">
                {BRANDS.map((b, i) => (
                  <button
                    key={b.en}
                    tabIndex={open ? 0 : -1}
                    onClick={() => {
                      onBrand(b.en);
                      close();
                    }}
                    className={`group flex items-baseline justify-between gap-2 rounded-lg px-2.5 py-2 text-start transition-all duration-300 hover:bg-paper ${
                      open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                    }`}
                    style={{ transitionDelay: open ? `${160 + i * 40}ms` : "0ms" }}
                  >
                    <span className="font-latin text-[0.95rem] tracking-[0.08em] text-ink transition-colors group-hover:text-coraldeep">
                      {b.en}
                    </span>
                    <span className="text-[0.65rem] font-semibold text-mistlight transition-colors group-hover:text-gold">
                      {b.fa}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* collection promo */}
            <div className="col-span-3">
              <button
                tabIndex={open ? 0 : -1}
                onClick={() => {
                  onAll();
                  close();
                }}
                className={`group relative block h-full min-h-64 w-full overflow-hidden rounded-xl text-start transition-all duration-500 ${
                  open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: open ? "240ms" : "0ms" }}
              >
                <img
                  src={IMG.desk}
                  alt="مجموعه جدید نوشتار"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-108"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-inkdeep/90 via-inkdeep/35 to-inkdeep/10" aria-hidden />
                <span className="absolute top-4 start-4 rounded-full bg-coral px-3 py-1 text-[0.65rem] font-bold text-cream">
                  مجموعه جدید
                </span>
                <span className="absolute inset-x-5 bottom-5">
                  <span className="block font-callig text-xl leading-[1.9] text-cream">پاییز با قلمِ تازه</span>
                  <span className="mt-1 block text-xs leading-6 text-sand/85">
                    دفترها، پلنرها و قلم‌های فصل — یک‌جا ببینید.
                  </span>
                  <span className="mt-3 inline-flex items-center gap-2 text-xs font-black text-goldsoft transition-all duration-300 group-hover:gap-3.5">
                    مشاهده همه محصولات
                    <IconArrow className="size-3.5" />
                  </span>
                </span>
              </button>
            </div>
          </div>

          {/* quick access strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-sand/80 bg-paper/70 px-8 py-3.5">
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-mist">
              <span className="text-mistlight">دسترسی سریع:</span>
              <button
                tabIndex={open ? 0 : -1}
                onClick={() => {
                  onAll();
                  close();
                }}
                className="rounded-full border border-sand bg-cream px-3.5 py-1.5 text-inkdeep transition-all hover:border-coral hover:text-coraldeep"
              >
                همه محصولات
              </button>
              <a
                tabIndex={open ? 0 : -1}
                href="#best"
                onClick={close}
                className="rounded-full border border-sand bg-cream px-3.5 py-1.5 text-inkdeep transition-all hover:border-coral hover:text-coraldeep"
              >
                پرفروش‌ترین‌ها
              </a>
              <a
                tabIndex={open ? 0 : -1}
                href="#offers"
                onClick={close}
                className="rounded-full border border-sand bg-cream px-3.5 py-1.5 text-inkdeep transition-all hover:border-coral hover:text-coraldeep"
              >
                تخفیف‌های فعال
              </a>
            </div>
            <p className="flex items-center gap-2 text-[0.7rem] font-semibold text-mist">
              <IconTruck className="size-4 text-gold" />
              ارسال رایگان برای خرید بالای {faDigits("1,000,000")} تومان
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- main nav ---------- */
interface NavProps {
  onCategory: (catId: string) => void;
  onBrand: (brandEn: string) => void;
  onAllProducts: () => void;
}

export default function Nav({ onCategory, onBrand, onAllProducts }: NavProps) {
  const scrolled = useScrolled(40);
  const active = useActiveSection(SECTION_IDS);
  const { count, openCart } = useCart();

  const [drawer, setDrawer] = useState(false);
  const [mega, setMega] = useState(false);
  const [megaMobile, setMegaMobile] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);

  const openMega = () => {
    window.clearTimeout(closeTimer.current);
    setMega(true);
  };
  const scheduleCloseMega = () => {
    closeTimer.current = window.setTimeout(() => setMega(false), 150);
  };

  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawer]);

  const go = (href: string) => {
    setDrawer(false);
    const el = document.getElementById(href.slice(1));
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const catFromMega = (id: string) => {
    setDrawer(false);
    setMegaMobile(false);
    onCategory(id);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={`transition-all duration-500 ${
            scrolled
              ? "border-b border-white/50 bg-white/80 shadow-[0_8px_30px_-12px_rgba(27,38,59,0.15)] backdrop-blur-xl"
              : "border-b border-white/15 bg-white/0 backdrop-blur-md"
          }`}
        >
          <div
            className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 transition-all duration-500 md:px-8 ${
              scrolled ? "py-3" : "py-5"
            }`}
          >
            <Logo dark={!scrolled} />

            <nav className="hidden items-center gap-6 xl:flex" aria-label="منوی اصلی">
              {LINKS.map((l, i) =>
                l.mega ? (
                  <div
                    key={l.href}
                    onMouseEnter={openMega}
                    onMouseLeave={scheduleCloseMega}
                    onFocus={openMega}
                  >
                    <a
                      href={l.href}
                      onClick={(e) => {
                        e.preventDefault();
                        setMega((m) => !m);
                      }}
                      aria-expanded={mega}
                      aria-haspopup="true"
                      className={`nav-link flex items-center gap-1.5 text-sm font-semibold transition-colors ${
                        scrolled ? "text-inkdeep hover:text-coraldeep" : "text-cream hover:text-goldsoft"
                      } ${active === l.href ? "active text-coraldeep" : ""}`}
                    >
                      {l.label}
                      <IconChevron
                        className={`size-3.5 transition-transform duration-300 ${mega ? "rotate-90 text-gold" : ""}`}
                      />
                    </a>
                  </div>
                ) : (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={(e) => {
                      e.preventDefault();
                      go(l.href);
                    }}
                    className={`nav-link text-sm font-semibold transition-colors ${
                      scrolled ? "text-inkdeep hover:text-coraldeep" : "text-cream hover:text-goldsoft"
                    } ${active === l.href ? "active text-coraldeep" : ""}`}
                  >
                    {l.label}
                  </a>
                ),
              )}
            </nav>

            <div className="flex items-center gap-2.5">
              <a
                href="#footer"
                className={`hidden items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-all duration-300 md:flex ${
                  scrolled
                    ? "border-sand text-ink hover:border-gold hover:text-gold"
                    : "border-cream/30 text-cream hover:border-goldsoft hover:text-goldsoft"
                }`}
              >
                <IconUser className="size-4" />
                ورود / ثبت‌نام
              </a>

              <button
                onClick={openCart}
                aria-label={`سبد خرید — ${count} کالا`}
                className={`relative grid size-11 place-items-center rounded-lg border transition-all duration-300 ${
                  scrolled
                    ? "border-sand text-ink hover:border-coral hover:text-coraldeep"
                    : "border-cream/30 text-cream hover:border-goldsoft hover:text-goldsoft"
                }`}
              >
                <IconCart className="size-5" />
                {count > 0 && (
                  <span className="absolute -top-2 -left-2 grid size-5 place-items-center rounded-full bg-coral text-[0.65rem] font-bold text-cream shadow-glow">
                    {faDigits(count)}
                  </span>
                )}
              </button>

              <a
                href="#shop"
                className="hidden items-center gap-2 rounded-lg bg-coral px-5 py-2.5 text-sm font-bold text-cream transition-all duration-300 hover:bg-coraldeep hover:shadow-glow lg:flex"
              >
                مشاهده محصولات
                <IconArrow className="size-4" />
              </a>

              <button
                onClick={() => setDrawer(true)}
                aria-label="باز کردن منو"
                className={`grid size-11 place-items-center rounded-lg border transition-colors xl:hidden ${
                  scrolled ? "border-sand text-ink" : "border-cream/30 text-cream"
                }`}
              >
                <IconMenu className="size-5" />
              </button>
            </div>
          </div>

          {/* mega menu */}
          <MegaPanel
            open={mega && !drawer}
            onEnter={openMega}
            onLeave={scheduleCloseMega}
            onCategory={onCategory}
            onBrand={onBrand}
            onAll={onAllProducts}
            close={() => setMega(false)}
          />
        </div>
      </header>

      {/* mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] bg-inkdeep/50 backdrop-blur-sm transition-opacity duration-500 ${
          drawer ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setDrawer(false)}
        aria-hidden
      />
      <aside
        className={`fixed inset-y-0 right-0 z-[65] flex w-[86%] max-w-sm flex-col bg-paper shadow-lift transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          drawer ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="منوی موبایل"
      >
        <div className="flex items-center justify-between border-b border-sand bg-cream px-5 py-4">
          <Logo />
          <button
            onClick={() => setDrawer(false)}
            aria-label="بستن منو"
            className="grid size-10 place-items-center rounded-lg border border-sand text-ink transition-colors hover:border-coral hover:text-coraldeep"
          >
            <IconClose className="size-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-5 py-6" aria-label="منوی اصلی موبایل">
          <ul className="space-y-1">
            {LINKS.map((l) =>
              l.mega ? (
                <li key={l.href}>
                  <button
                    onClick={() => setMegaMobile((o) => !o)}
                    aria-expanded={megaMobile}
                    className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-base font-bold text-inkdeep transition-colors hover:bg-cream hover:text-coraldeep"
                  >
                    {l.label}
                    <IconChevron
                      className={`size-4 text-mistlight transition-transform duration-300 ${megaMobile ? "rotate-90 text-gold" : ""}`}
                    />
                  </button>
                  <div className={`acc-body ${megaMobile ? "open" : ""}`}>
                    <div>
                      <ul className="grid grid-cols-2 gap-2 pt-1 pb-3 pe-2 ps-4">
                        {CATEGORIES.map((c) => (
                          <li key={c.id}>
                            <button
                              onClick={() => catFromMega(c.id)}
                              className="group flex w-full items-center gap-2.5 rounded-lg border border-sand/70 bg-cream p-2 text-start transition-all hover:border-gold/50"
                            >
                              <img src={c.img} alt={c.name} className="size-10 rounded-md object-cover" />
                              <span className="min-w-0">
                                <span className="block truncate text-[0.78rem] font-bold text-inkdeep group-hover:text-coraldeep">
                                  {c.name}
                                </span>
                                <span className="block text-[0.62rem] text-mistlight">
                                  {faDigits(PRODUCTS.filter((p) => p.catId === c.id).length)} محصول
                                </span>
                              </span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              ) : (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={(e) => {
                      e.preventDefault();
                      go(l.href);
                    }}
                    className={`block rounded-lg px-4 py-3 text-base font-bold transition-colors ${
                      active === l.href ? "bg-cream text-coraldeep" : "text-inkdeep hover:bg-cream hover:text-coraldeep"
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              ),
            )}
          </ul>

          <div className="mt-6 border-t border-sand pt-6">
            <p className="mb-3 px-1 text-[0.68rem] font-bold tracking-[0.25em] text-mistlight">برندهای محبوب</p>
            <div className="flex flex-wrap gap-2">
              {BRANDS.map((b) => (
                <button
                  key={b.en}
                  onClick={() => {
                    setDrawer(false);
                    onBrand(b.en);
                  }}
                  className="font-latin rounded-full border border-sand bg-cream px-3.5 py-1.5 text-xs tracking-wider text-ink transition-all hover:border-coral hover:text-coraldeep"
                >
                  {b.en}
                </button>
              ))}
            </div>
          </div>
        </nav>

        <div className="space-y-3 border-t border-sand bg-cream px-5 py-5">
          <a
            href="#footer"
            className="flex items-center justify-center gap-2 rounded-lg border border-sand py-3 text-sm font-bold text-ink transition-colors hover:border-gold hover:text-gold"
          >
            <IconUser className="size-4" />
            ورود / ثبت‌نام
          </a>
          <button
            onClick={() => {
              setDrawer(false);
              openCart();
            }}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-ink py-3 text-sm font-bold text-cream transition-colors hover:bg-coraldeep"
          >
            <IconCart className="size-4" />
            سبد خرید {count > 0 && <span>({faDigits(count)} کالا)</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
