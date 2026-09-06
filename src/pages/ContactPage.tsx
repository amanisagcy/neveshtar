import { useState, type FormEvent } from "react";
import { IMG, faDigits } from "../data";
import { IconChat, IconCheck, IconMail, IconPhone, IconPin } from "../icons";
import PageHeader from "../components/PageHeader";
import { Reveal } from "../ui";

const INFO = [
  { icon: IconPin, title: "نشانی فروشگاه", text: "تهران، خیابان ولیعصر، کوچه هنر، پلاک ۷" },
  { icon: IconPhone, title: "تلفن پشتیبانی", text: "۰۲۱ - ۹۱۰۹۰۲۲۰ (شنبه تا پنجشنبه، ۹ تا ۱۸)" },
  { icon: IconMail, title: "ایمیل", text: "hello@neveshtar.ir" },
  { icon: IconChat, title: "پاسخ‌گویی", text: "معمولاً در کمتر از ۲۴ ساعت کاری پاسخ می‌دهیم." },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", topic: "سفارش", msg: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.includes("@") || !form.msg.trim()) {
      setError("لطفاً نام، ایمیل معتبر و پیام را کامل کنید.");
      return;
    }
    setError("");
    setSent(true);
  };

  const inputCls =
    "w-full rounded-lg border border-sand bg-cream px-4 py-3 text-sm outline-none transition-all placeholder:text-mistlight focus:border-gold focus:ring-2 focus:ring-gold/25";

  return (
    <>
      <PageHeader
        eyebrow="تماس با ما"
        title="با نوشتار در ارتباط باشید"
        callig="ارتباط"
        crumb="تماس با ما"
        text="سوالی درباره سفارش، محصول یا همکاری دارید؟ برای ما بنویسید؛ تیم پشتیبانی منتظر شماست."
      />

      <section className="paper-grain relative overflow-hidden py-20">
        <span className="font-callig pointer-events-none absolute -top-6 right-0 select-none text-[10rem] leading-none text-ink/[0.04] md:text-[14rem]" aria-hidden>
          سلام
        </span>

        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[1fr_1.2fr]">
          {/* info */}
          <div>
            <div className="space-y-4">
              {INFO.map((c, i) => (
                <Reveal key={c.title} delay={i * 90}>
                  <div className="group flex items-start gap-4 rounded-xl border border-sand/70 bg-cream p-5 shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-gold/50 hover:shadow-lift">
                    <span className="grid size-12 shrink-0 place-items-center rounded-full border border-gold/40 bg-paper text-ink transition-all duration-500 group-hover:bg-gold group-hover:text-cream">
                      <c.icon className="size-5" />
                    </span>
                    <span>
                      <h3 className="font-black text-inkdeep">{c.title}</h3>
                      <p className="mt-1.5 text-sm leading-7 text-mist">{c.text}</p>
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={320}>
              <div className="relative mt-6 overflow-hidden rounded-xl shadow-lift">
                <img src={IMG.hero} alt="فضای فروشگاه نوشتار" className="h-56 w-full object-cover" />
                <span className="absolute inset-0 bg-gradient-to-t from-inkdeep/80 to-transparent" aria-hidden />
                <span className="absolute bottom-4 start-5 flex items-center gap-2 font-callig text-xl text-cream">
                  <IconPin className="size-5 text-goldsoft" />
                  گوشه‌ای از فضای نوشتار
                </span>
              </div>
            </Reveal>
          </div>

          {/* form */}
          <Reveal variant="left" delay={150}>
            <div className="paper-lines rounded-xl border border-sand bg-paper p-7 shadow-lift md:p-9">
              {sent ? (
                <div className="flex h-full min-h-80 flex-col items-center justify-center gap-4 text-center">
                  <span className="grid size-16 place-items-center rounded-full bg-gold/15 text-gold">
                    <IconCheck className="size-8" />
                  </span>
                  <h3 className="text-xl font-black text-inkdeep">پیام شما رسید!</h3>
                  <p className="max-w-sm leading-8 text-mist">
                    ممنون {form.name} عزیز؛ تیم نوشتار در اولین فرصت کاری با شما تماس می‌گیرد.
                  </p>
                  <button
                    onClick={() => {
                      setSent(false);
                      setForm({ name: "", email: "", topic: "سفارش", msg: "" });
                    }}
                    className="mt-2 rounded-lg bg-ink px-7 py-3 text-sm font-bold text-cream transition-colors hover:bg-coraldeep"
                  >
                    ارسال پیام دیگر
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-5">
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label htmlFor="c-name" className="mb-1.5 block text-[0.7rem] font-bold tracking-wide text-mist">
                        نام و نام خانوادگی
                      </label>
                      <input
                        id="c-name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="مثلاً: سارا محمدی"
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label htmlFor="c-email" className="mb-1.5 block text-[0.7rem] font-bold tracking-wide text-mist">
                        ایمیل
                      </label>
                      <input
                        id="c-email"
                        dir="ltr"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="you@example.com"
                        className={`${inputCls} text-left`}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="c-topic" className="mb-1.5 block text-[0.7rem] font-bold tracking-wide text-mist">
                      موضوع
                    </label>
                    <select
                      id="c-topic"
                      value={form.topic}
                      onChange={(e) => setForm({ ...form, topic: e.target.value })}
                      className={inputCls}
                    >
                      {["سفارش", "محصول", "بازگشت کالا", "همکاری", "سایر"].map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="c-msg" className="mb-1.5 block text-[0.7rem] font-bold tracking-wide text-mist">
                      پیام شما
                    </label>
                    <textarea
                      id="c-msg"
                      rows={5}
                      value={form.msg}
                      onChange={(e) => setForm({ ...form, msg: e.target.value })}
                      placeholder="هر چه می‌خواهید بگویید؛ اینجا می‌شنویم…"
                      className={`${inputCls} resize-none`}
                    />
                  </div>

                  {error && <p className="text-xs font-bold text-coraldeep">{error}</p>}

                  <button
                    type="submit"
                    className="w-full rounded-lg bg-ink py-4 font-bold text-cream transition-all duration-300 hover:bg-coraldeep hover:shadow-glow"
                  >
                    ارسال پیام
                  </button>
                  <p className="text-center text-[0.68rem] text-mistlight">
                    با ارسال پیام، با شرایط حریم خصوصی نوشتار موافقت می‌کنید. · {faDigits("۷")} روز هفته در کنار شماییم
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
