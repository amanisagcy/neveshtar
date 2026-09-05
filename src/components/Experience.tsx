import { BRANDS, FEATURES, IMG } from "../data";
import {
  IconArrow,
  IconChat,
  IconCheck,
  IconGift,
  IconLayers,
  IconSeal,
  IconShield,
  IconTruck,
} from "../icons";
import { Reveal, SectionHead, PenDivider } from "../ui";

const FEATURE_ICONS = {
  truck: IconTruck,
  shield: IconShield,
  seal: IconSeal,
  chat: IconChat,
  gift: IconGift,
  layers: IconLayers,
};

const CHECKLIST = [
  "انتخاب دستی هر محصول توسط تیم سردبیری",
  "کاغذهای بدون اسید و دوست‌دار محیط زیست",
  "گارانتی بازگشت وجه تا ۷ روز",
  "باشگاه مشتریان نوشتار با مزایای اختصاصی",
];

export default function Experience() {
  return (
    <section id="about" className="scroll-mt-24">
      {/* why us */}
      <div className="paper-grain py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHead
            center
            eyebrow="چرا نوشتار؟"
            callig="اعتماد"
            title="تجربه خریدی متفاوت"
            text="ما فروشگاه نیستیم که فقط بفروشد؛ ما کنجِ دنجِ اهالی قلم و کاغذ هستیم — با استانداردهایی که خودمان دوست داریم."
          />

          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => {
              const Icon = FEATURE_ICONS[f.icon];
              return (
                <Reveal key={f.title} delay={(i % 3) * 110}>
                  <div className="group flex h-full items-start gap-4 rounded-xl border border-sand/70 bg-cream p-6 shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-lift">
                    <span className="grid size-13 shrink-0 place-items-center rounded-full border border-gold/40 bg-paper text-ink transition-all duration-500 group-hover:scale-110 group-hover:bg-gold group-hover:text-cream">
                      <Icon className="size-6" />
                    </span>
                    <span>
                      <h3 className="text-base font-black text-inkdeep">{f.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-mist">{f.text}</p>
                    </span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>

      {/* editorial split */}
      <div className="relative overflow-hidden bg-cream py-28">
        <span
          className="font-callig pointer-events-none absolute -top-8 -start-6 text-[9rem] leading-none text-ink/[0.04] md:text-[13rem]"
          aria-hidden
        >
          نوشتن
        </span>

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 md:px-8 lg:grid-cols-2">
          <Reveal variant="right" className="relative">
            <div className="relative">
              <span className="absolute -bottom-6 -start-6 h-2/3 w-2/3 rounded-xl border-2 border-gold/70" aria-hidden />
              <div className="group relative overflow-hidden rounded-xl shadow-lift">
                <img
                  src={IMG.editorial}
                  alt="باز کردن یک دفترچه شیک زیر نور طلایی"
                  className="h-[420px] w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-106 md:h-[520px]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-inkdeep/50 to-transparent" aria-hidden />
                <blockquote className="absolute bottom-6 end-6 start-6 text-cream">
                  <p className="font-callig text-2xl leading-[2.2] md:text-3xl">
                    «کاغذ خوب، فکر را روان می‌کند.»
                  </p>
                </blockquote>
              </div>

              <div className="anim-floaty absolute -top-6 -start-4 flex items-center gap-3 rounded-xl border border-white/50 bg-white/85 px-4 py-3 shadow-lift backdrop-blur-xl md:-start-10" style={{ ["--rot" as string]: "2deg" }}>
                <span className="grid size-10 place-items-center rounded-full bg-gold/15 text-gold">
                  <IconSeal className="size-5" />
                </span>
                <span className="leading-5">
                  <span className="block text-sm font-black text-inkdeep">ضمانت اصالت</span>
                  <span className="block text-[0.7rem] text-mist">نمایندگی رسمی برندها</span>
                </span>
              </div>
            </div>
          </Reveal>

          <div>
            <SectionHead
              eyebrow="تجربه برند"
              callig="فلسفه ما"
              title="ابزار مناسب، خلاقیت شما را چند برابر می‌کند"
              text="ما مجموعه‌ای از محصولات باکیفیت را انتخاب کرده‌ایم تا تجربه نوشتن و خلق کردن، بهتر از همیشه شود. هر قلم، هر دفتر و هر ابزار — با وسواس انتخاب شده است."
            />

            <ul className="mt-8 space-y-4">
              {CHECKLIST.map((c, i) => (
                <Reveal key={c} delay={i * 90}>
                  <li className="flex items-center gap-3">
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
                      <IconCheck className="size-4" />
                    </span>
                    <span className="font-medium text-inkdeep">{c}</span>
                  </li>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={200} className="mt-10 flex flex-wrap items-center gap-5">
              <a
                href="#footer"
                className="group flex items-center gap-3 rounded-lg bg-ink px-7 py-3.5 font-bold text-cream transition-all duration-300 hover:bg-coraldeep hover:shadow-glow"
              >
                درباره برند ما
                <IconArrow className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
              </a>
              <a
                href="#faq"
                className="border-b-2 border-gold pb-1 text-sm font-bold text-ink transition-colors hover:text-coraldeep"
              >
                پرسش‌های پرتکرار
              </a>
            </Reveal>
          </div>
        </div>
      </div>

      {/* brands marquee */}
      <div className="border-y border-sand bg-paper py-12">
        <p className="mb-8 text-center text-xs font-bold tracking-[0.3em] text-mistlight">
          برندهایی که به آن‌ها اعتماد داریم
        </p>
        <div className="marquee-shell relative overflow-hidden" dir="ltr">
          <span className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-paper to-transparent" aria-hidden />
          <span className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-paper to-transparent" aria-hidden />
          <div className="anim-marquee flex w-max items-center">
            {[...BRANDS, ...BRANDS].map((b, i) => (
              <span key={`${b.en}-${i}`} className="flex items-center">
                <span className="group mx-10 flex flex-col items-center transition-colors duration-300">
                  <span className="font-latin text-2xl font-medium tracking-[0.18em] text-mistlight/80 transition-colors duration-300 group-hover:text-ink md:text-3xl">
                    {b.en}
                  </span>
                  <span className="mt-1 text-[0.7rem] text-mistlight/0 transition-all duration-300 group-hover:text-gold">
                    {b.fa}
                  </span>
                </span>
                <svg viewBox="0 0 8 8" className="size-2 text-gold/50" aria-hidden>
                  <path d="M4 0 8 4 4 8 0 4Z" fill="currentColor" />
                </svg>
              </span>
            ))}
          </div>
        </div>
        <PenDivider className="mt-10" />
      </div>
    </section>
  );
}
