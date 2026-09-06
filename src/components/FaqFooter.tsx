import { useState } from "react";
import { CATEGORIES, FAQS, NAV_LINKS } from "../data";
import {
  IconArrow,
  IconChat,
  IconInstagram,
  IconLinkedin,
  IconMail,
  IconNib,
  IconPhone,
  IconPin,
  IconPlus,
  IconSeal,
  IconShield,
  IconTelegram,
  IconX,
} from "../icons";
import { Reveal, SectionHead } from "../ui";
import { Logo } from "./Nav";

/* ---------- FAQ ---------- */
export function Faq() {
  const [openIdx, setOpenIdx] = useState<number>(0);

  return (
    <section id="faq" className="paper-grain scroll-mt-24 py-24">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-[1fr_1.4fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHead
            eyebrow="پرسش و پاسخ"
            callig="همراه شما"
            title="پرسش‌های پرتکرار"
            text="پاسخ کوتاه و روشن به سؤال‌هایی که بیش از همه از ما می‌پرسید."
          />

          <Reveal delay={200} className="mt-10">
            <div className="dotted-grid overflow-hidden rounded-xl bg-ink p-7 text-cream shadow-lift">
              <span className="grid size-12 place-items-center rounded-full bg-gold/15 text-goldsoft">
                <IconChat className="size-6" />
              </span>
              <h3 className="mt-4 text-lg font-black">به کمک نیاز دارید؟</h3>
              <p className="mt-2 text-sm leading-7 text-sand/80">
                تیم پشتیبانی نوشتار، ۷ روز هفته از ساعت ۹ تا ۲۱ پاسخ‌گوی شماست.
              </p>
              <a
                href="tel:02191008844"
                className="mt-5 flex items-center justify-between rounded-lg bg-coral px-5 py-3 text-sm font-bold text-cream transition-all hover:bg-coraldeep"
                dir="ltr"
              >
                <span className="flex items-center gap-2">
                  <IconPhone className="size-4" />
                  {`021-9100-8844`}
                </span>
                <IconArrow className="size-4 -scale-x-100" />
              </a>
            </div>
          </Reveal>
        </div>

        <div>
          {FAQS.map((f, i) => {
            const open = openIdx === i;
            return (
              <Reveal key={f.q} delay={i * 60}>
                <div className={`border-b border-sand transition-colors ${open ? "bg-cream/60" : ""}`}>
                  <button
                    onClick={() => setOpenIdx(open ? -1 : i)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-5 rounded-lg px-4 py-5 text-start"
                  >
                    <span className={`text-base font-bold transition-colors md:text-lg ${open ? "text-coraldeep" : "text-inkdeep"}`}>
                      <span className="font-latin me-3 text-xs tracking-widest text-mistlight">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {f.q}
                    </span>
                    <span
                      className={`grid size-9 shrink-0 place-items-center rounded-full border transition-all duration-500 ${
                        open ? "rotate-45 border-coral bg-coral text-cream" : "border-gold/50 text-gold"
                      }`}
                    >
                      <IconPlus className="size-4" />
                    </span>
                  </button>
                  <div className={`acc-body ${open ? "open" : ""}`}>
                    <div>
                      <p className="px-4 pb-6 leading-8 text-mist">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- footer ---------- */
const SOCIALS = [
  { label: "اینستاگرام", href: "https://instagram.com", Icon: IconInstagram },
  { label: "تلگرام", href: "https://t.me", Icon: IconTelegram },
  { label: "ایکس", href: "https://x.com", Icon: IconX },
  { label: "لینکدین", href: "https://linkedin.com", Icon: IconLinkedin },
];

export function Footer() {
  return (
    <footer id="footer" className="dotted-grid relative overflow-hidden bg-[linear-gradient(155deg,#161f30_0%,#1B263B_38%,#243B53_78%,#2c4a68_100%)] text-cream">
      <span
        className="font-callig pointer-events-none absolute -top-10 -end-4 text-[11rem] leading-none text-cream/[0.03] md:text-[16rem]"
        aria-hidden
      >
        نوشتار
      </span>

      <div className="relative mx-auto max-w-7xl px-5 pt-20 pb-8 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
          {/* brand */}
          <div>
            <Logo dark />
            <p className="mt-6 max-w-sm text-sm leading-8 text-sand/70">
              نوشتار از سال ۱۳۹۸ با یک باور ساده شروع شد: ابزارِ خوب، فکر را روان می‌کند. امروز،
              کنجِ دنجِ اهالی قلم و کاغذ هستیم — با محصولاتی که خودمان هم با عشق استفاده می‌کنیم.
            </p>
            <div className="mt-7 flex items-center gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid size-11 place-items-center rounded-lg border border-cream/15 text-sand/80 transition-all duration-300 hover:-translate-y-1 hover:border-coral hover:bg-coral hover:text-cream"
                >
                  <Icon className="size-5" />
                </a>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <span className="flex items-center gap-2 rounded-lg border border-cream/15 px-3.5 py-2 text-xs font-semibold text-sand/80">
                <IconSeal className="size-4 text-goldsoft" />
                ضمانت اصالت کالا
              </span>
              <span className="flex items-center gap-2 rounded-lg border border-cream/15 px-3.5 py-2 text-xs font-semibold text-sand/80">
                <IconShield className="size-4 text-goldsoft" />
                نماد اعتماد الکترونیکی
              </span>
            </div>
          </div>

          {/* shop links */}
          <nav aria-label="فروشگاه">
            <h3 className="text-sm font-black tracking-[0.2em] text-goldsoft">فروشگاه</h3>
            <ul className="mt-6 space-y-3.5">
              {CATEGORIES.slice(0, 5).map((c) => (
                <li key={c.id}>
                  <a href="#categories" className="group flex items-center gap-2 text-sm text-sand/75 transition-colors hover:text-coral">
                    <span className="h-px w-3 bg-gold/50 transition-all duration-300 group-hover:w-5 group-hover:bg-coral" />
                    {c.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* quick links */}
          <nav aria-label="دسترسی سریع">
            <h3 className="text-sm font-black tracking-[0.2em] text-goldsoft">دسترسی سریع</h3>
            <ul className="mt-6 space-y-3.5">
              {NAV_LINKS.slice(1).map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="group flex items-center gap-2 text-sm text-sand/75 transition-colors hover:text-coral">
                    <span className="h-px w-3 bg-gold/50 transition-all duration-300 group-hover:w-5 group-hover:bg-coral" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* contact */}
          <div>
            <h3 className="text-sm font-black tracking-[0.2em] text-goldsoft">تماس با ما</h3>
            <ul className="mt-6 space-y-4 text-sm text-sand/75">
              <li className="flex items-start gap-3">
                <IconPin className="mt-0.5 size-4 shrink-0 text-goldsoft" />
                تهران، خیابان ولی‌عصر، کوچه هنر، پلاک ۷ — خانه نوشتار
              </li>
              <li className="flex items-center gap-3">
                <IconPhone className="size-4 shrink-0 text-goldsoft" />
                <span dir="ltr" className="tracking-wide">021-9100-8844</span>
              </li>
              <li className="flex items-center gap-3">
                <IconMail className="size-4 shrink-0 text-goldsoft" />
                <span dir="ltr">hello@neveshtar.ir</span>
              </li>
            </ul>
            <div className="mt-7 rounded-xl border border-cream/12 bg-cream/[0.05] p-4">
              <p className="text-xs leading-6 text-sand/65">
                <b className="text-goldsoft">ساعت کاری:</b> شنبه تا پنجشنبه، ۹ تا ۲۱ — جمعه‌ها، ۱۰ تا ۱۸
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-7 text-[0.8rem] text-sand/55 md:flex-row">
          <p className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span>© ۱۴۰۴ نوشتار — تمامی حقوق این وب‌سایت محفوظ است.</span>
            <a
              href="#/admin"
              className="flex items-center gap-1.5 rounded-full border border-cream/15 px-3.5 py-1.5 font-bold text-sand/70 transition-all duration-300 hover:border-gold hover:text-goldsoft"
            >
              <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="10.5" width="14" height="9" rx="2" />
                <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
              </svg>
              پنل مدیریت
            </a>
          </p>
          <p className="flex items-center gap-2">
            ساخته‌شده با
            <svg viewBox="0 0 24 24" className="size-4 text-coral" fill="currentColor" aria-label="عشق">
              <path d="M12 20.2S3.5 15 3.5 9.3a4.6 4.6 0 0 1 8.5-2.5A4.6 4.6 0 0 1 20.5 9.3c0 5.7-8.5 10.9-8.5 10.9Z" />
            </svg>
            برای اهالی قلم و کاغذ
          </p>
          <a href="#home" className="group flex items-center gap-2 font-bold text-sand/70 transition-colors hover:text-goldsoft">
            بازگشت به بالا
            <IconArrow className="size-4 rotate-90 transition-transform duration-300 group-hover:-translate-y-1" />
          </a>
        </div>
      </div>
    </footer>
  );
}

/* small brand divider reused above footer */
export function FooterNib() {
  return <IconNib className="size-5" />;
}
