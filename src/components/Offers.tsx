import { useEffect, useRef, useState } from "react";
import { OFFERS, STATS, TESTIMONIALS, discountOf, faDigits, faNumber, faPrice } from "../data";
import { useCart } from "../store";
import { useCountUp } from "../hooks";
import { IconCart, IconCheck, IconQuote, IconSpark, IconStar } from "../icons";
import { Reveal, SectionHead, Stars } from "../ui";

/* ---------- countdown ---------- */
function useCountdown() {
  const target = useRef(Date.now() + 3 * 24 * 3600 * 1000 + 7 * 3600 * 1000 + 42 * 60 * 1000);
  const [left, setLeft] = useState(target.current - Date.now());

  useEffect(() => {
    const t = window.setInterval(() => setLeft(Math.max(target.current - Date.now(), 0)), 1000);
    return () => window.clearInterval(t);
  }, []);

  const s = Math.floor(left / 1000);
  return {
    d: Math.floor(s / 86400),
    h: Math.floor((s % 86400) / 3600),
    m: Math.floor((s % 3600) / 60),
    s: s % 60,
  };
}

function TimeCell({ v, label }: { v: number; label: string }) {
  return (
    <span className="flex flex-col items-center">
      <span className="grid min-w-12 place-items-center rounded-lg border border-gold/40 bg-cream px-2 py-1.5 text-lg font-black text-ink tabular-nums">
        {faDigits(String(v).padStart(2, "0"))}
      </span>
      <span className="mt-1 text-[0.62rem] font-semibold text-mist">{label}</span>
    </span>
  );
}

/* ---------- offers ---------- */
export function Offers() {
  const { add } = useCart();
  const t = useCountdown();

  return (
    <section id="offers" className="relative scroll-mt-24 overflow-hidden bg-cream py-24">
      <span className="font-callig pointer-events-none absolute -top-4 end-0 text-[10rem] leading-none text-gold/[0.06] md:text-[15rem]" aria-hidden>
        هدیه
      </span>

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHead
            eyebrow="تخفیف‌ها"
            callig="فرصت محدود"
            title="پیشنهادهای ویژه"
            text="پک‌های دست‌چین‌شده نوشتار؛ همه‌چیزِ یک شروع خوب، در یک بسته — با قیمتی که دیگر تکرار نمی‌شود."
          />
          <Reveal delay={220} className="mb-2">
            <div className="rounded-xl border border-sand bg-paper p-4 shadow-card">
              <p className="mb-2.5 flex items-center gap-2 text-xs font-bold text-mist">
                <IconSpark className="size-3.5 text-coral" />
                تا پایان پیشنهاد:
              </p>
              <div className="flex items-start gap-2" dir="ltr">
                <TimeCell v={t.d} label="روز" />
                <span className="pt-1.5 font-black text-gold">:</span>
                <TimeCell v={t.h} label="ساعت" />
                <span className="pt-1.5 font-black text-gold">:</span>
                <TimeCell v={t.m} label="دقیقه" />
                <span className="pt-1.5 font-black text-gold">:</span>
                <TimeCell v={t.s} label="ثانیه" />
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {OFFERS.map((o, i) => {
            const off = discountOf(o.price, o.oldPrice);
            return (
              <Reveal key={o.id} delay={i * 120}>
                <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-sand bg-paper shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-lift">
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={o.img}
                      alt={o.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1.1s] group-hover:scale-108"
                    />
                    <span className="img-veil absolute inset-0" aria-hidden />
                    <span className="absolute top-4 start-4 z-10 rounded-full bg-gold px-3 py-1 text-xs font-black text-inkdeep shadow-card">
                      {o.tag}
                    </span>
                    <span className="absolute top-4 end-4 z-10 grid size-11 place-items-center rounded-full bg-coral text-sm font-black text-cream shadow-glow">
                      ٪{faDigits(off)}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-black text-inkdeep">{o.title}</h3>
                    <p className="mt-1 text-xs text-mistlight">شامل {faDigits(o.items.length)} قلم کالای منتخب</p>

                    <ul className="mt-4 space-y-2.5">
                      {o.items.map((it) => (
                        <li key={it} className="flex items-center gap-2.5 text-sm text-ink">
                          <span className="grid size-5 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
                            <IconCheck className="size-3" />
                          </span>
                          {it}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex items-end justify-between border-t border-dashed border-sanddeep pt-5">
                      <span>
                        <span className="block text-xs text-mistlight line-through">{faNumber(o.oldPrice)}</span>
                        <span className="text-xl font-black text-coraldeep">{faPrice(o.price)}</span>
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        add({
                          id: 100 + o.id,
                          name: o.title,
                          brand: "Neveshtar",
                          brandFa: "نوشتار",
                          catId: "school",
                          price: o.price,
                          oldPrice: o.oldPrice,
                          rating: 5,
                          reviews: 0,
                          sold: 0,
                          img: o.img,
                          badge: o.tag,
                        })
                      }
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-coral py-3.5 text-sm font-bold text-cream transition-all duration-300 hover:bg-coraldeep hover:shadow-glow"
                    >
                      <IconCart className="size-[18px]" />
                      مشاهده محصول
                    </button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- testimonials ---------- */
const TONE_BG = {
  ink: "bg-ink text-goldsoft",
  gold: "bg-gold text-inkdeep",
  coral: "bg-coral text-cream",
};

export function Testimonials() {
  return (
    <section className="paper-grain relative py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead
          center
          eyebrow="نظرات مشتریان"
          callig="با افتخار"
          title="مشتریانی که تجربه متفاوتی داشتند"
          text="هیچ تبلیغی صادق‌تر از تجربه واقعی یک خریدار نیست؛ این‌ها را خودشان نوشته‌اند."
        />

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((tm, i) => (
            <Reveal key={tm.name} delay={(i % 2) * 120}>
              <figure className="group relative h-full rounded-xl border border-white/70 bg-white/70 p-7 shadow-card backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift">
                <IconQuote className="absolute -top-3 end-6 size-9 text-gold/25 transition-colors duration-500 group-hover:text-gold/60" />

                <div className="flex items-center gap-4">
                  <span className={`font-callig grid size-14 shrink-0 place-items-center rounded-full text-xl shadow-card ${TONE_BG[tm.tone]}`}>
                    {tm.initial}
                  </span>
                  <span className="flex-1">
                    <span className="block font-black text-inkdeep">{tm.name}</span>
                    <span className="block text-xs text-mistlight">{tm.role}</span>
                  </span>
                  <Stars rating={tm.rating} className="size-3.5" />
                </div>

                <blockquote className="mt-5 text-[0.95rem] leading-8 text-ink">
                  {tm.text}
                </blockquote>

                <figcaption className="mt-5 inline-flex items-center gap-2 rounded-full bg-sand/60 px-3.5 py-1.5 text-xs font-semibold text-mist">
                  <IconStar className="size-3 text-gold" />
                  خرید: {tm.product}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- stats ---------- */
function StatItem({ value, label, delay }: { value: number; label: string; delay: number }) {
  const { ref, value: v } = useCountUp(value);
  return (
    <Reveal delay={delay} className="h-full">
      <div className="flex h-full flex-col items-center gap-1 py-2 text-center lg:border-s lg:border-cream/10 lg:pe-8 lg:first:border-0">
        <span className="text-4xl font-black text-goldsoft md:text-5xl">
          <span className="text-coral">+</span>
          <span ref={ref}>{faNumber(v)}</span>
        </span>
        <span className="mt-1 text-sm font-semibold text-sand/80">{label}</span>
      </div>
    </Reveal>
  );
}

export function Stats() {
  return (
    <section className="dotted-grid border-y border-ink/20 bg-ink py-14">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-10 px-5 md:px-8 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <StatItem key={s.label} value={s.value} label={s.label} delay={i * 100} />
        ))}
      </div>
    </section>
  );
}
