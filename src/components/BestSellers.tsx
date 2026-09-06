import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { faNumber, faPrice } from "../data";
import { useAdminStore } from "../adminStore";
import { useCart } from "../store";
import { useInView, useReducedMotion } from "../hooks";
import { IconArrow, IconCart, IconChevron } from "../icons";
import { Reveal, SectionHead, Stars } from "../ui";

export default function BestSellers() {
  const { add } = useCart();
  const { products } = useAdminStore();
  const ITEMS = useMemo(
    () => [...products.filter((p) => p.visible)].sort((a, b) => b.sold - a.sold),
    [products],
  );
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(3);
  const hovered = useRef(false);
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

  const cardStep = () => {
    const el = trackRef.current;
    const card = el?.querySelector<HTMLElement>("[data-card]");
    return card ? card.offsetWidth + 24 : 340;
  };

  const maxIdx = () => Math.max(ITEMS.length - visible, 0);

  const goNext = (wrap = false) => {
    const el = trackRef.current;
    if (!el) return;
    const step = cardStep();
    const atEnd = Math.abs(el.scrollLeft) >= el.scrollWidth - el.clientWidth - step * 0.6;
    if (atEnd && wrap) {
      el.scrollTo({ left: 0, behavior: reduced ? "auto" : "smooth" });
      return;
    }
    el.scrollBy({ left: -step, behavior: reduced ? "auto" : "smooth" });
  };

  const goPrev = () => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: cardStep(), behavior: reduced ? "auto" : "smooth" });
  };

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      setVisible(w >= 1024 ? 3 : w >= 640 ? 2 : 1);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const step = cardStep();
      setIdx(Math.min(Math.round(Math.abs(el.scrollLeft) / step), maxIdx()));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [visible]); // eslint-disable-line react-hooks/exhaustive-deps

  /* autoplay */
  useEffect(() => {
    if (reduced || !inView) return;
    const t = window.setInterval(() => {
      if (!hovered.current && !document.hidden) goNext(true);
    }, 4200);
    return () => window.clearInterval(t);
  }, [reduced, inView, visible]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section id="best" className="dotted-grid relative scroll-mt-24 overflow-hidden bg-inkdeep py-24">
      <div
        className="pointer-events-none absolute -top-40 -start-40 size-[480px] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #FF8A65 0%, transparent 70%)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-48 -end-32 size-[420px] rounded-full opacity-15 blur-3xl"
        style={{ background: "radial-gradient(circle, #D4A017 0%, transparent 70%)" }}
        aria-hidden
      />

      <div ref={ref} className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            dark
            eyebrow="پرفروش‌ترین‌ها"
            callig="انتخاب مردم"
            title="محبوب‌ترین انتخاب‌ها"
            text="محصولاتی که مشتریان نوشتار بیش از همه دوست داشته‌اند — با امتیاز واقعی و تعداد خرید."
          />
          <Reveal delay={200} className="mb-2 flex items-center gap-3">
            <button
              onClick={goPrev}
              aria-label="قبلی"
              className="grid size-12 place-items-center rounded-full border border-cream/25 text-cream transition-all hover:border-gold hover:bg-gold hover:text-inkdeep"
            >
              <IconChevron className="size-5" />
            </button>
            <button
              onClick={() => goNext(true)}
              aria-label="بعدی"
              className="grid size-12 place-items-center rounded-full border border-cream/25 text-cream transition-all hover:border-gold hover:bg-gold hover:text-inkdeep"
            >
              <IconChevron className="size-5 rotate-180" />
            </button>
          </Reveal>
        </div>

        <div
          className="no-scrollbar -mx-5 mt-12 overflow-x-auto scroll-smooth px-5 md:-mx-8 md:px-8"
          ref={trackRef}
          onMouseEnter={() => (hovered.current = true)}
          onMouseLeave={() => (hovered.current = false)}
          onTouchStart={() => (hovered.current = true)}
          onTouchEnd={() => (hovered.current = false)}
        >
          <div className="flex gap-6 pb-2">
            {ITEMS.map((p, i) => (
              <article
                key={p.id}
                data-card
                className="group flex w-full shrink-0 snap-start gap-5 rounded-xl border border-cream/10 bg-white/[0.05] p-4 backdrop-blur-sm transition-all duration-500 hover:border-gold/50 hover:bg-white/[0.09] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <div className="relative w-28 shrink-0 overflow-hidden rounded-lg sm:w-32">
                  <img
                    src={p.img}
                    alt={p.name}
                    loading="lazy"
                    className="h-full min-h-36 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <span className="font-latin absolute top-2 start-2 rounded bg-inkdeep/70 px-1.5 py-0.5 text-[0.65rem] tracking-widest text-goldsoft backdrop-blur-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex min-w-0 flex-1 flex-col py-1">
                  <span className="font-latin text-[0.62rem] tracking-[0.22em] text-mistlight uppercase">
                    {p.brand}
                  </span>
                  <h3 className="mt-1 truncate text-base font-bold text-cream">{p.name}</h3>
                  <span className="mt-1.5 flex items-center gap-2">
                    <Stars rating={p.rating} className="size-3" />
                    <span className="text-[0.7rem] text-sand/70">
                      {faNumber(p.sold)} خرید
                    </span>
                  </span>
                  <span className="mt-auto block pt-3 text-sm font-black text-goldsoft">
                    {faPrice(p.price)}
                  </span>
                  <button
                    onClick={() => add(p)}
                    className="mt-2.5 flex items-center justify-center gap-2 rounded-lg bg-coral py-2 text-xs font-bold text-cream transition-all duration-300 hover:bg-coraldeep"
                  >
                    <IconCart className="size-4" />
                    خرید سریع
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* progress dots */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {Array.from({ length: maxIdx() + 1 }).map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === idx ? "w-8 bg-gold" : "w-1.5 bg-cream/25"
              }`}
            />
          ))}
        </div>

        <Reveal delay={150} className="mt-10 text-center">
          <Link
            to="/shop"
            className="group inline-flex items-center gap-2 text-sm font-bold text-goldsoft transition-colors hover:text-coral"
          >
            مشاهده همه محصولات فروشگاه
            <IconArrow className="size-4 transition-transform duration-300 group-hover:-translate-x-1.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
