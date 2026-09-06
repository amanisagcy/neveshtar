import { useState, type FormEvent } from "react";
import { IMG } from "../../data";
import { useAdminStore } from "../../adminStore";
import { IconArrow, IconEye, IconEyeOff, IconNib, IconSpark, IconUser } from "../../icons";
import { Logo } from "../Nav";

export default function AdminLogin() {
  const { login, notify } = useAdminStore();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(0);
  const [loading, setLoading] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!user.trim() || !pass) {
      setError("نام کاربری و رمز عبور را وارد کنید.");
      setShake((s) => s + 1);
      return;
    }
    setLoading(true);
    setError("");
    window.setTimeout(() => {
      const ok = login(user, pass);
      if (ok) {
        notify("خوش آمدید، مدیر نوشتار!");
      } else {
        setLoading(false);
        setError("نام کاربری یا رمز عبور اشتباه است.");
        setShake((s) => s + 1);
      }
    }, 700);
  };

  const fill = () => {
    setUser("admin");
    setPass("neveshtar");
    setError("");
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* form side */}
      <section className="paper-grain relative flex items-center justify-center px-5 py-14">
        <a
          href="#/"
          className="absolute top-6 start-6 flex items-center gap-2 text-sm font-bold text-mist transition-colors hover:text-coraldeep"
        >
          <IconArrow className="size-4 -scale-x-100" />
          بازگشت به فروشگاه
        </a>

        <div key={shake} className={`w-full max-w-md ${shake ? "anim-shake" : ""}`}>
          <div className="rounded-xl border border-sand bg-cream p-8 shadow-lift md:p-10">
            <div className="flex items-center justify-between">
              <Logo />
              <span className="rounded-full bg-ink px-3.5 py-1.5 text-[0.68rem] font-bold tracking-wider text-goldsoft">
                پنل مدیریت
              </span>
            </div>

            <h1 className="mt-8 text-2xl font-black text-inkdeep md:text-3xl">ورود به پنل مدیریت</h1>
            <p className="mt-2 text-sm leading-7 text-mist">
              مدیریت محصولات، سفارش‌ها و مشتریان فروشگاه نوشتار از این‌جاست.
            </p>

            <form onSubmit={submit} className="mt-8 space-y-5">
              <div>
                <label htmlFor="admin-user" className="mb-1.5 block text-sm font-bold text-inkdeep">
                  نام کاربری
                </label>
                <div className="relative">
                  <IconUser className="pointer-events-none absolute start-4 top-1/2 size-5 -translate-y-1/2 text-mistlight" />
                  <input
                    id="admin-user"
                    dir="ltr"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    placeholder="admin"
                    className="w-full rounded-lg border border-sand bg-paper py-3.5 pe-4 ps-12 text-left text-sm outline-none transition-all placeholder:text-mistlight focus:border-gold focus:ring-2 focus:ring-gold/25"
                    autoComplete="username"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="admin-pass" className="mb-1.5 block text-sm font-bold text-inkdeep">
                  رمز عبور
                </label>
                <div className="relative">
                  <IconNib className="pointer-events-none absolute start-4 top-1/2 size-5 -translate-y-1/2 text-mistlight" />
                  <input
                    id="admin-pass"
                    dir="ltr"
                    type={showPass ? "text" : "password"}
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-sand bg-paper py-3.5 pe-12 ps-12 text-left text-sm outline-none transition-all placeholder:text-mistlight focus:border-gold focus:ring-2 focus:ring-gold/25"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    aria-label={showPass ? "پنهان کردن رمز" : "نمایش رمز"}
                    className="absolute end-3.5 top-1/2 -translate-y-1/2 text-mistlight transition-colors hover:text-ink"
                  >
                    {showPass ? <IconEyeOff className="size-5" /> : <IconEye className="size-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2.5 rounded-lg bg-ink py-4 font-bold text-cream transition-all duration-300 hover:bg-coraldeep hover:shadow-glow disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <span className="size-4 animate-spin rounded-full border-2 border-cream/30 border-t-cream" />
                    در حال بررسی…
                  </>
                ) : (
                  <>ورود به پنل</>
                )}
              </button>
            </form>

            <div className="mt-6 flex items-center justify-between gap-3 rounded-lg border border-gold/35 bg-gold/8 px-4 py-3.5">
              <p className="text-xs leading-6 text-mist">
                ورود آزمایشی:
                <br />
                <b className="font-latin tracking-wider text-inkdeep" dir="ltr">admin / neveshtar</b>
              </p>
              <button
                onClick={fill}
                className="shrink-0 flex items-center gap-1.5 rounded-full bg-gold px-4 py-2 text-xs font-bold text-cream transition-transform hover:scale-105"
              >
                <IconSpark className="size-3.5" />
                پر کردن خودکار
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* brand side */}
      <section className="relative hidden overflow-hidden lg:block">
        <img src={IMG.editorial} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-l from-inkdeep via-inkdeep/85 to-ink/60" />
        <div className="dotted-grid absolute inset-0 opacity-40" aria-hidden />

        <div className="relative flex h-full flex-col justify-between p-12">
          <p className="font-latin text-xs tracking-[0.4em] text-goldsoft uppercase">Neveshtar Admin</p>

          <div className="max-w-md">
            <p className="font-callig text-5xl leading-[2] text-cream">نوشتار</p>
            <h2 className="mt-2 text-2xl font-black leading-[1.6] text-cream">
              مدیریتِ جایی که ایده‌ها متولد می‌شوند
            </h2>
            <p className="mt-4 leading-8 text-sand/80">
              آمار فروش، موجودی قفسه‌ها، سفارش‌های در راه و حالِ خوش مشتری‌ها — همه در یک نگاه.
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs text-sand/70">
            <span className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-400" />
              اتصال امن
            </span>
            <span>نسخه ۲.۴</span>
            <span className="font-latin tracking-[0.25em]">EST. 1398</span>
          </div>
        </div>
      </section>
    </div>
  );
}
