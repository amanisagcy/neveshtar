import { useEffect, useState } from "react";
import { faDigits, faNumber, faPrice } from "../data";
import { useCart } from "../store";
import { IconArrow, IconCart, IconCheck, IconClose, IconMinus, IconPlus, IconTrash } from "../icons";

const FREE_SHIPPING = 1000000;

export default function CartDrawer() {
  const { items, isOpen, closeCart, setQty, remove, total, count, clear } = useCart();
  const [ordered, setOrdered] = useState(false);
  const [orderNo] = useState(() => Math.floor(100000 + Math.random() * 900000));

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeCart]);

  useEffect(() => {
    if (!isOpen) window.setTimeout(() => setOrdered(false), 450);
  }, [isOpen]);

  const remaining = Math.max(FREE_SHIPPING - total, 0);
  const progress = Math.min((total / FREE_SHIPPING) * 100, 100);

  const checkout = () => {
    setOrdered(true);
    clear();
  };

  return (
    <>
      {/* backdrop */}
      <div
        className={`fixed inset-0 z-[70] bg-inkdeep/55 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeCart}
        aria-hidden
      />

      {/* panel — slides from the left (cart lives on the left in RTL) */}
      <aside
        className={`fixed inset-y-0 left-0 z-[75] flex w-full max-w-md flex-col bg-paper shadow-lift transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="سبد خرید"
      >
        <header className="flex items-center justify-between border-b border-sand bg-cream px-6 py-5">
          <h2 className="flex items-center gap-3 text-lg font-black text-inkdeep">
            <IconCart className="size-5 text-coraldeep" />
            سبد خرید
            {count > 0 && (
              <span className="rounded-full bg-ink px-2.5 py-0.5 text-xs font-bold text-cream">
                {faDigits(count)} کالا
              </span>
            )}
          </h2>
          <button
            onClick={closeCart}
            aria-label="بستن سبد خرید"
            className="grid size-10 place-items-center rounded-lg border border-sand text-ink transition-all hover:border-coral hover:text-coraldeep"
          >
            <IconClose className="size-5" />
          </button>
        </header>

        {ordered ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
            <span className="grid size-20 place-items-center rounded-full bg-gold/15 text-gold">
              <IconCheck className="size-10" />
            </span>
            <div>
              <h3 className="text-xl font-black text-inkdeep">سفارش شما ثبت شد!</h3>
              <p className="mt-3 leading-8 text-mist">
                این یک نمایش نمونه از فرایند خرید نوشتار است.
                <br />
                شماره سفارش: <b className="text-inkdeep" dir="ltr">{faDigits(orderNo)}</b>
              </p>
            </div>
            <button
              onClick={closeCart}
              className="mt-2 rounded-lg bg-ink px-8 py-3 text-sm font-bold text-cream transition-colors hover:bg-coraldeep"
            >
              بازگشت به فروشگاه
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <svg viewBox="0 0 96 96" className="size-28 text-sanddeep" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M20 30h56l-7 42a6 6 0 0 1-6 5H33a6 6 0 0 1-6-5Z" strokeLinejoin="round" />
              <path d="M36 30v-4a12 12 0 0 1 24 0v4" strokeLinecap="round" />
              <path d="M38 45v16m20-16v16" strokeLinecap="round" opacity=".5" />
            </svg>
            <h3 className="text-lg font-black text-inkdeep">سبد شما هنوز خالی است</h3>
            <p className="text-sm leading-7 text-mist">
              ابزار خلق ایده‌هایتان را از میان محصولات منتخب نوشتار انتخاب کنید.
            </p>
            <a
              href="#shop"
              onClick={closeCart}
              className="mt-2 flex items-center gap-2 rounded-lg bg-coral px-7 py-3 text-sm font-bold text-cream transition-colors hover:bg-coraldeep"
            >
              مشاهده محصولات
              <IconArrow className="size-4" />
            </a>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
              {items.map(({ product: p, qty }) => (
                <div key={p.id} className="flex gap-4 rounded-xl border border-sand bg-cream p-3.5 shadow-card">
                  <img src={p.img} alt={p.name} className="h-24 w-20 shrink-0 rounded-lg object-cover" />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h4 className="truncate text-sm font-bold text-inkdeep">{p.name}</h4>
                        <p className="mt-0.5 text-[0.7rem] text-mistlight">{p.brandFa}</p>
                      </div>
                      <button
                        onClick={() => remove(p.id)}
                        aria-label={`حذف ${p.name}`}
                        className="text-mistlight transition-colors hover:text-coraldeep"
                      >
                        <IconTrash className="size-[18px]" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <span className="flex items-center gap-3 rounded-full border border-sand px-2 py-1">
                        <button
                          onClick={() => setQty(p.id, qty + 1)}
                          aria-label="افزایش تعداد"
                          className="grid size-6 place-items-center rounded-full text-ink transition-colors hover:bg-sand"
                        >
                          <IconPlus className="size-3.5" />
                        </button>
                        <span className="w-5 text-center text-sm font-black text-inkdeep tabular-nums">
                          {faDigits(qty)}
                        </span>
                        <button
                          onClick={() => setQty(p.id, qty - 1)}
                          aria-label="کاهش تعداد"
                          className="grid size-6 place-items-center rounded-full text-ink transition-colors hover:bg-sand"
                        >
                          <IconMinus className="size-3.5" />
                        </button>
                      </span>
                      <span className="text-sm font-black text-coraldeep">{faPrice(p.price * qty)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <footer className="space-y-4 border-t border-sand bg-cream px-6 py-5">
              {remaining > 0 ? (
                <div>
                  <p className="mb-2 text-xs font-semibold text-mist">
                    تا <b className="text-gold">ارسال رایگان</b> فقط{" "}
                    <b className="text-inkdeep">{faNumber(remaining)} تومان</b> مانده!
                  </p>
                  <div className="h-1.5 overflow-hidden rounded-full bg-sand">
                    <div
                      className="h-full rounded-full bg-gradient-to-l from-gold to-coral transition-all duration-700"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              ) : (
                <p className="flex items-center gap-2 rounded-lg bg-gold/12 px-4 py-2.5 text-xs font-bold text-ink">
                  <IconCheck className="size-4 text-gold" />
                  تبریک! ارسال سفارش شما رایگان شد.
                </p>
              )}

              <div className="flex items-center justify-between">
                <span className="text-sm text-mist">جمع سبد خرید</span>
                <span className="text-lg font-black text-inkdeep">{faPrice(total)}</span>
              </div>
              <p className="text-[0.7rem] text-mistlight">هزینه ارسال در مرحله بعد محاسبه می‌شود.</p>

              <button
                onClick={checkout}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-coral py-4 font-bold text-cream transition-all duration-300 hover:bg-coraldeep hover:shadow-glow"
              >
                تکمیل خرید
                <IconArrow className="size-5" />
              </button>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}

/* ---------- toast ---------- */
export function Toast() {
  const { toast } = useCart();
  return (
    <div
      className={`fixed bottom-6 left-1/2 z-[80] -translate-x-1/2 transition-all duration-500 ${
        toast ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
      role="status"
      aria-live="polite"
    >
      {toast && (
        <div
          key={toast.id}
          className="flex items-center gap-3 rounded-xl border border-gold/30 bg-inkdeep px-5 py-3.5 text-sm font-bold text-cream shadow-lift"
        >
          <span className="grid size-7 place-items-center rounded-full bg-coral text-cream">
            <IconCheck className="size-4" />
          </span>
          {toast.msg}
        </div>
      )}
    </div>
  );
}
