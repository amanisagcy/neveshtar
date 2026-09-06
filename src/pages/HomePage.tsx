import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BRANDS, IMG, faDigits, type Filters } from "../data";
import { EMPTY_FILTERS } from "../data";
import { useInView } from "../hooks";
import { IconArrow, IconNib, IconSpark } from "../icons";
import { Reveal, PenDivider } from "../ui";
import SearchConsole from "../components/SearchConsole";

/* sections that become the table of contents */
const SECTIONS = [
  { to: "/shop", no: "۰۱", title: "فروشگاه", desc: "همه محصولات با جستجو، فیلتر و مرتب‌سازی", img: IMG.notebooks, num: "۱۲" },
  { to: "/categories", no: "۰۲", title: "دسته‌بندی‌ها", desc: "دفتر، قلم، طراحی، مدرسه، اداری و میز کار", img: IMG.pens, num: "۱۸" },
  { to: "/bestsellers", no: "۰۳", title: "پرفروش‌ترین‌ها", desc: "محبوب‌ترین انتخاب‌های مشتریان نوشتار", img: IMG.design, num: "۲۴" },
  { to: "/offers", no: "۰۴", title: "تخفیف‌ها", desc: "پیشنهادها و پک‌های ویژه این فصل", img: IMG.school, num: "۳۱" },
  { to: "/journal", no: "۰۵", title: "مجله", desc: "الهام، راهنمای خرید و ایده‌های میز کار", img: IMG.editorial, num: "۳۸" },
  { to: "/about", no: "۰۶", title: "درباره ما", desc: "داستان برند، ارزش‌ها و تیم نوشتار", img: IMG.hero, num: "۴۶" },
  { to: "/faq", no: "۰۷", title: "پرسش‌های پرتکرار", desc: "پاسخ به سوال‌های خرید، ارسال و بازگشت", img: IMG.office, num: "۵۲" },
];

function Masthead() {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={IMG.hero} alt="" aria-hidden className="anim-kenburns h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-l from-inkdeep/90 via-inkdeep/60 to-inkdeep/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-inkdeep/75 via-transparent to-inkdeep/35" />
      </div>

      <div
        ref={ref}
        className={`relative z-10 mx-auto flex min-h-[88svh] w-full max-w-7xl flex-col justify-center px-5 py-24 md:px-8 ${inView ? "is-in" : ""}`}
      >
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <div className="mask-line">
              <span className="flex items-center gap-3">
                <span className="h-px w-12 bg-gold" />
                <span className="text-sm font-semibold tracking-[0.3em] text-goldsoft">فصلنامه تخصصی لوازم‌التحریر</span>
              </span>
            </div>
            <div className="mask-line mt-5">
              <span className="font-latin text-xs tracking-[0.5em] text-cream/60 uppercase">Neveshtar — Vol. 05</span>
            </div>

            <h1 className="mt-6 text-4xl leading-[1.4] font-black text-cream md:text-6xl md:leading-[1.35]">
              <span className="mask-line">
                <span style={{ transitionDelay: "120ms" }}>
                  <span className="font-callig font-normal text-goldsoft">نوشتار</span>
                </span>
              </span>
              <span className="mask-line">
                <span style={{ transitionDelay: "240ms" }}>جایی که ایده‌ها</span>
              </span>
              <span className="mask-line">
                <span style={{ transitionDelay: "360ms" }}>
                  با <span className="text-coral">قلم</span> آغاز می‌شوند
                </span>
              </span>
            </h1>

            <div className="mask-line mt-7">
              <p className="max-w-lg text-base leading-8 text-sand/90 md:text-lg">
                این فقط یک فروشگاه نیست؛ فضای خلق ایده‌هاست. فهرست زیر را ورق بزنید و وارد هر بخش که
                می‌خواهید بشوید.
              </p>
            </div>

            <div className="mask-line mt-9">
              <span className="flex flex-wrap items-center gap-4">
                <Link
                  to="/shop"
                  className="group flex items-center gap-3 rounded-lg bg-coral px-8 py-4 font-bold text-cream shadow-glow transition-all duration-300 hover:bg-coraldeep hover:gap-4"
                >
                  خرید محصولات
                  <IconArrow className="size-5 transition-transform group-hover:-translate-x-1" />
                </Link>
                <Link
                  to="/categories"
                  className="rounded-lg border border-cream/35 bg-white/10 px-8 py-4 font-bold text-cream backdrop-blur-md transition-all hover:border-goldsoft hover:bg-white/20"
                >
                  مشاهده دسته‌بندی‌ها
                </Link>
              </span>
            </div>
          </div>

          {/* cover collage */}
          <div className="relative hidden lg:block">
            <Reveal variant="scale" delay={200}>
              <div className="anim-floaty relative overflow-hidden rounded-xl border border-cream/25 shadow-lift">
                <img src={IMG.editorial} alt="دفتر و قلم لوکس" className="h-[440px] w-full object-cover" />
                <span className="absolute inset-x-5 bottom-5 flex items-center gap-3 rounded-lg bg-inkdeep/60 p-3.5 backdrop-blur-md">
                  <IconNib className="size-6 shrink-0 text-goldsoft" />
                  <span className="font-callig text-lg leading-[1.8] text-cream">هر صفحه، یک شروع تازه</span>
                </span>
              </div>
            </Reveal>
            <Reveal variant="left" delay={380}>
              <div
                className="anim-floaty absolute -bottom-8 -start-8 flex items-center gap-3 rounded-xl border border-white/30 bg-white/12 px-4 py-3 backdrop-blur-xl"
                style={{ ["--rot" as string]: "-3deg", animationDelay: "1.2s" }}
              >
                <IconSpark className="size-5 text-goldsoft" />
                <span className="text-sm font-bold text-cream">
                  ارسال رایگان بالای {faDigits("1,000,000")} تومان
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function TableOfContents() {
  const [hovered, setHovered] = useState(0);
  const navigate = useNavigate();

  return (
    <section className="paper-lines relative py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_360px]">
          {/* the index */}
          <div>
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-gold" />
                <span className="text-sm font-semibold tracking-[0.25em] text-gold">فهرست مطالب</span>
              </div>
              <h2 className="mt-4 text-3xl font-black leading-[1.3] text-inkdeep md:text-5xl md:leading-[1.25]">
                ورق بزنید؛ <span className="text-coraldeep">هر بخش</span> صفحه خودش را دارد
              </h2>
            </Reveal>

            <nav aria-label="فهرست بخش‌های سایت" className="mt-12">
              {SECTIONS.map((s, i) => (
                <Reveal key={s.to} delay={i * 60}>
                  <Link
                    to={s.to}
                    onMouseEnter={() => setHovered(i)}
                    onFocus={() => setHovered(i)}
                    className="group flex items-baseline gap-4 border-b border-sand/80 py-6 transition-colors first:pt-0 hover:bg-cream/70"
                  >
                    <span className="font-latin w-9 shrink-0 text-sm tracking-widest text-mistlight transition-colors group-hover:text-coral">
                      {s.no}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                        <span className="text-2xl font-black text-inkdeep transition-all duration-300 group-hover:-translate-x-1 group-hover:text-coraldeep md:text-3xl">
                          {s.title}
                        </span>
                        <span className="text-sm text-mist transition-colors group-hover:text-ink">{s.desc}</span>
                      </span>
                    </span>
                    <span className="hidden flex-1 border-b-2 border-dotted border-sanddeep sm:block" aria-hidden />
                    <span className="font-latin shrink-0 text-sm text-mistlight transition-colors group-hover:text-gold">
                      ص {s.num}
                    </span>
                    <IconArrow className="size-5 shrink-0 self-center text-mistlight transition-all duration-300 group-hover:-translate-x-1.5 group-hover:text-coraldeep" />
                  </Link>
                </Reveal>
              ))}
            </nav>
          </div>

          {/* live preview */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <Reveal variant="left" delay={150}>
                <div className="relative overflow-hidden rounded-xl shadow-lift">
                  {SECTIONS.map((s, i) => (
                    <img
                      key={s.to}
                      src={s.img}
                      alt={s.title}
                      className={`h-[420px] w-full object-cover transition-all duration-700 ${
                        i === hovered ? "scale-100 opacity-100" : "pointer-events-none absolute inset-0 scale-105 opacity-0"
                      }`}
                    />
                  ))}
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-inkdeep/85 to-transparent p-5">
                    <span className="block font-callig text-2xl leading-[1.9] text-cream">{SECTIONS[hovered].title}</span>
                    <span className="mt-1 block text-xs text-sand/85">{SECTIONS[hovered].desc}</span>
                  </span>
                </div>
                <button
                  onClick={() => navigate(SECTIONS[hovered].to)}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-ink py-3.5 font-bold text-cream transition-all hover:bg-coraldeep hover:shadow-glow"
                >
                  ورود به {SECTIONS[hovered].title}
                  <IconArrow className="size-4" />
                </button>
              </Reveal>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function BrandStrip() {
  return (
    <div className="border-y border-sand bg-cream py-10">
      <p className="mb-6 text-center text-xs font-bold tracking-[0.3em] text-mistlight">برندهایی که کنار ما هستند</p>
      <div className="marquee-shell relative overflow-hidden" dir="ltr">
        <span className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-cream to-transparent" aria-hidden />
        <span className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-cream to-transparent" aria-hidden />
        <div className="anim-marquee flex w-max items-center">
          {[...BRANDS, ...BRANDS].map((b, i) => (
            <span key={`${b.en}-${i}`} className="mx-10 font-latin text-2xl tracking-[0.18em] text-mistlight/70 transition-colors hover:text-ink">
              {b.en}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const onSearch = (f: Filters) => {
    const p = new URLSearchParams();
    if (f.q) p.set("q", f.q);
    if (f.cat !== "all") p.set("cat", f.cat);
    if (f.brand !== "all") p.set("brand", f.brand);
    if (f.price !== "all") p.set("price", f.price);
    if (f.sort !== "featured") p.set("sort", f.sort);
    navigate(`/shop?${p.toString()}`);
  };

  return (
    <>
      <Masthead />

      {/* quick search into the shop */}
      <div className="relative z-20 mx-auto -mt-12 w-full max-w-6xl px-4 md:px-6">
        <Reveal variant="scale">
          <SearchConsole onSearch={onSearch} initial={EMPTY_FILTERS} />
        </Reveal>
      </div>

      <TableOfContents />
      <BrandStrip />

      <section className="paper-grain py-24">
        <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
          <PenDivider />
          <Reveal delay={100}>
            <h2 className="font-callig mt-8 text-3xl leading-[2] text-inkdeep md:text-4xl md:leading-[2]">
              «کاغذ خوب، فکر را روان می‌کند»
            </h2>
            <p className="mx-auto mt-5 max-w-2xl leading-8 text-mist">
              نوشتار مجموعه‌ای دست‌چین از بهترین ابزارهای نوشتن و طراحی است. از فهرست بالا وارد هر
              بخش شوید یا مستقیم از فروشگاه دیدن کنید.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <Link
              to="/about"
              className="group mt-8 inline-flex items-center gap-2 border-b-2 border-gold pb-1 font-bold text-ink transition-all hover:gap-3.5 hover:text-coraldeep"
            >
              داستان نوشتار را بخوانید
              <IconArrow className="size-4 transition-transform group-hover:-translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
