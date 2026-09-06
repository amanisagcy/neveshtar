import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { POSTS } from "../data";
import { IconArrow, IconCheck, IconMail, IconNib } from "../icons";
import { Reveal, SectionHead } from "../ui";

export default function Journal() {
  const [featured, ...rest] = POSTS;

  return (
    <section id="journal" className="relative scroll-mt-24 bg-cream py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            eyebrow="مجله نوشتار"
            callig="الهام"
            title="الهام برای خلاقیت بیشتر"
            text="راهنمای خرید، ایده‌های میز کار و داستان‌های پشت قلم‌ها — از سردبیری که خودش هم قلم‌باز است."
          />
          <Reveal delay={200} className="mb-2">
            <Link to="/journal" className="group flex items-center gap-2 border-b-2 border-gold pb-1 text-sm font-bold text-ink transition-colors hover:text-coraldeep">
              همه مقالات
              <IconArrow className="size-4 transition-transform duration-300 group-hover:-translate-x-1.5" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* featured post */}
          <Reveal variant="right">
            <Link to="/journal" className="group block h-full overflow-hidden rounded-xl border border-sand bg-paper shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift">
              <div className="relative h-72 overflow-hidden lg:h-[430px]">
                <img
                  src={featured.img}
                  alt={featured.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-107"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-inkdeep/80 via-inkdeep/20 to-transparent" aria-hidden />
                <span className="absolute top-5 start-5 rounded-full bg-coral px-3.5 py-1.5 text-xs font-bold text-cream">
                  {featured.cat}
                </span>
                <span className="absolute bottom-5 start-5 text-cream">
                  <span className="block text-2xl font-black leading-[1.5] md:text-3xl">{featured.title}</span>
                  <span className="mt-2 flex items-center gap-3 text-xs text-sand/85">
                    <span>{featured.date}</span>
                    <span className="size-1 rounded-full bg-gold" />
                    <span>{featured.read}</span>
                  </span>
                </span>
              </div>
              <div className="p-7">
                <p className="leading-8 text-mist">{featured.excerpt}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-coraldeep transition-all duration-300 group-hover:gap-3.5">
                  ادامه مطلب
                  <IconArrow className="size-4" />
                </span>
              </div>
            </Link>
          </Reveal>

          {/* list posts */}
          <div className="flex flex-col divide-y divide-sand">
            {rest.map((p, i) => (
              <Reveal key={p.id} delay={i * 110} variant="left" className="flex-1">
                <Link to="/journal" className="group flex h-full items-center gap-5 py-5 transition-colors lg:py-6">
                  <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-lg sm:h-28 sm:w-36">
                    <img
                      src={p.img}
                      alt={p.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <span className="font-latin absolute bottom-1.5 start-1.5 rounded bg-inkdeep/70 px-1.5 py-0.5 text-[0.6rem] tracking-widest text-goldsoft backdrop-blur-sm">
                      {String(i + 2).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <span className="text-[0.68rem] font-bold tracking-[0.2em] text-gold">{p.cat}</span>
                    <h3 className="mt-1.5 text-base font-black leading-7 text-inkdeep transition-colors group-hover:text-coraldeep md:text-lg">
                      {p.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 hidden text-sm leading-7 text-mist sm:block">{p.excerpt}</p>
                    <span className="mt-2 flex items-center gap-3 text-[0.7rem] text-mistlight">
                      <span>{p.date}</span>
                      <span className="size-1 rounded-full bg-gold/70" />
                      <span>{p.read}</span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        <Newsletter />
      </div>
    </section>
  );
}

/* ---------- newsletter ---------- */
function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.includes("@") || email.length < 5) {
      setError(true);
      return;
    }
    setError(false);
    setDone(true);
  };

  return (
    <Reveal variant="scale" className="mt-24">
      <div className="paper-lines relative overflow-hidden rounded-xl border border-sand bg-paper shadow-lift">
        <IconNib className="pointer-events-none absolute -bottom-10 -start-8 size-56 rotate-12 text-ink/[0.05]" />
        <span className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-l from-coral via-gold to-ink" aria-hidden />

        <div className="relative grid items-center gap-10 p-8 md:p-14 lg:grid-cols-2">
          <div>
            <p className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <span className="text-xs font-bold tracking-[0.3em] text-gold">خبرنامه نوشتار</span>
            </p>
            <h3 className="font-callig mt-4 text-3xl leading-[2.1] text-inkdeep md:text-4xl md:leading-[2.1]">
              ایده‌های جدید را از دست ندهید
            </h3>
            <p className="mt-4 max-w-md leading-8 text-mist">
              از جدیدترین محصولات، تخفیف‌ها و پیشنهادهای ویژه باخبر شوید — ماهی یک نامه، مثل یک
              پستکارد از دنیای قلم و کاغذ.
            </p>
          </div>

          {done ? (
            <div className="flex flex-col items-center gap-4 rounded-xl border border-gold/40 bg-cream/80 p-8 text-center">
              <span className="grid size-14 place-items-center rounded-full bg-gold/15 text-gold">
                <IconCheck className="size-7" />
              </span>
              <p className="text-lg font-black text-inkdeep">ایمیل شما ثبت شد؛ خوش آمدید!</p>
              <p className="text-sm leading-7 text-mist">اولین نامه نوشتار، همین هفته به صندوق‌تان می‌رسد.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="w-full">
              <label htmlFor="nl-email" className="mb-2 block text-sm font-bold text-inkdeep">
                ایمیل شما
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <IconMail className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-mistlight" />
                  <input
                    id="nl-email"
                    type="email"
                    dir="ltr"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError(false);
                    }}
                    placeholder="you@example.com"
                    className={`w-full rounded-lg border bg-cream py-4 pl-12 pr-4 text-left text-sm outline-none transition-all placeholder:text-mistlight focus:ring-2 ${
                      error ? "border-coraldeep ring-2 ring-coral/20" : "border-sand focus:border-gold focus:ring-gold/25"
                    }`}
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-lg bg-ink px-9 py-4 text-sm font-bold text-cream transition-all duration-300 hover:bg-coraldeep hover:shadow-glow"
                >
                  عضویت
                </button>
              </div>
              <p className={`mt-2.5 text-xs ${error ? "font-bold text-coraldeep" : "text-mistlight"}`}>
                {error ? "لطفاً یک ایمیل معتبر وارد کنید." : "بدون اسپم؛ هر وقت خواستید، با یک کلیک جدا می‌شوید."}
              </p>
            </form>
          )}
        </div>
      </div>
    </Reveal>
  );
}

