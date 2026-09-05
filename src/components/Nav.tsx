import { useEffect, useState } from "react";
import { NAV_LINKS, faDigits } from "../data";
import { useCart } from "../store";
import { useActiveSection, useScrolled } from "../hooks";
import { IconCart, IconClose, IconMenu, IconNib, IconUser } from "../icons";

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <a href="#home" className="group flex items-center gap-2.5">
      <span
        className={`grid size-11 place-items-center rounded-xl transition-colors duration-300 ${
          dark ? "bg-cream/10 text-gold" : "bg-ink text-gold group-hover:bg-coraldeep group-hover:text-cream"
        }`}
      >
        <IconNib className="size-6" />
      </span>
      <span className="leading-none">
        <span className={`font-callig block text-[1.35rem] leading-[1.9] ${dark ? "text-cream" : "text-inkdeep"}`}>
          نوشتار
        </span>
        <span className="font-latin block text-[0.6rem] tracking-[0.42em] text-gold uppercase">
          Neveshtar
        </span>
      </span>
    </a>
  );
}

export default function Nav() {
  const scrolled = useScrolled(50);
  const { count, openCart } = useCart();
  const [open, setOpen] = useState(false);
  const active = useActiveSection(NAV_LINKS.map((l) => l.href.slice(1)));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 lg:px-6">
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-xl px-5 py-3 transition-all duration-500 ${
            scrolled
              ? "border border-white/40 bg-white/75 shadow-lift backdrop-blur-xl"
              : "border border-transparent bg-transparent"
          }`}
        >
          <Logo dark={!scrolled} />

          <nav className="hidden items-center gap-6 xl:flex" aria-label="منوی اصلی">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`nav-link text-[0.92rem] font-medium transition-colors ${
                  active === l.href ? "active text-coraldeep" : "text-inkdeep hover:text-coraldeep"
                }`}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#footer"
              className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-inkdeep transition-colors hover:bg-sand/60 lg:flex"
            >
              <IconUser className="size-[18px] text-ink" />
              ورود / ثبت‌نام
            </a>

            <button
              onClick={openCart}
              aria-label="سبد خرید"
              className="relative grid size-11 place-items-center rounded-lg border border-sand bg-cream/70 text-ink transition-all hover:border-coral hover:text-coraldeep"
            >
              <IconCart className="size-5" />
              {count > 0 && (
                <span
                  key={count}
                  className="anim-floaty absolute -top-1.5 -left-1.5 grid size-5 place-items-center rounded-full bg-coral text-[0.65rem] font-bold text-cream"
                  style={{ ["--rot" as string]: "0deg" }}
                >
                  {faDigits(count)}
                </span>
              )}
            </button>

            <a
              href="#shop"
              className="hidden rounded-lg bg-ink px-5 py-2.5 text-sm font-bold text-cream shadow-card transition-all hover:bg-coraldeep hover:shadow-glow xl:block"
            >
              مشاهده محصولات
            </a>

            <button
              onClick={() => setOpen(true)}
              aria-label="باز کردن منو"
              className="grid size-11 place-items-center rounded-lg border border-sand bg-cream/70 text-ink xl:hidden"
            >
              <IconMenu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      {/* mobile menu */}
      <div
        className={`fixed inset-0 z-[60] transition-all duration-500 xl:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="absolute inset-0 bg-inkdeep/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
        <div
          className={`paper-grain absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col bg-paper shadow-lift transition-transform duration-500 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-sand p-5">
            <Logo />
            <button
              onClick={() => setOpen(false)}
              aria-label="بستن منو"
              className="grid size-10 place-items-center rounded-lg border border-sand text-ink"
            >
              <IconClose className="size-5" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto p-6" aria-label="منوی موبایل">
            {NAV_LINKS.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between border-b border-sand/70 py-4 text-lg font-bold transition-all duration-500 hover:text-coraldeep ${
                  open ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
                }`}
                style={{ transitionDelay: `${120 + i * 55}ms` }}
              >
                {l.label}
                <span className="font-latin text-xs tracking-widest text-mistlight">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </a>
            ))}
            <a
              href="#footer"
              onClick={() => setOpen(false)}
              className="mt-5 flex items-center gap-2 py-3 text-base font-semibold text-mist"
            >
              <IconUser className="size-5" /> ورود / ثبت‌نام
            </a>
          </nav>
          <div className="border-t border-sand p-6">
            <a
              href="#shop"
              onClick={() => setOpen(false)}
              className="block rounded-lg bg-ink py-3.5 text-center font-bold text-cream transition-colors hover:bg-coraldeep"
            >
              مشاهده محصولات
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
