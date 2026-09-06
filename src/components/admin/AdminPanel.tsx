import { useMemo, useState, type FormEvent } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BRANDS, CATEGORIES, IMG, faDigits, faNumber, faPrice } from "../../data";
import {
  STATUS_META,
  useAdminStore,
  type AdminProduct,
  type Order,
  type OrderStatus,
} from "../../adminStore";
import { useCountUp } from "../../hooks";
import {
  IconArrow,
  IconBell,
  IconBox,
  IconCart,
  IconCheck,
  IconClose,
  IconEdit,
  IconGear,
  IconGrid,
  IconLogout,
  IconMenu,
  IconMinus,
  IconNib,
  IconPlus,
  IconReceipt,
  IconSearch,
  IconTrash,
  IconTruck,
  IconUsers,
} from "../../icons";
import { Logo } from "../Nav";

type View = "dashboard" | "products" | "orders" | "customers" | "settings";

const VIEWS: { id: View; label: string; icon: (p: { className?: string }) => React.ReactNode }[] = [
  { id: "dashboard", label: "داشبورد", icon: (p) => <IconGrid {...p} /> },
  { id: "products", label: "محصولات", icon: (p) => <IconBox {...p} /> },
  { id: "orders", label: "سفارش‌ها", icon: (p) => <IconReceipt {...p} /> },
  { id: "customers", label: "مشتریان", icon: (p) => <IconUsers {...p} /> },
  { id: "settings", label: "تنظیمات", icon: (p) => <IconGear {...p} /> },
];

const TITLES: Record<View, { title: string; sub: string }> = {
  dashboard: { title: "داشبورد", sub: "نمای کلی فروشگاه نوشتار" },
  products: { title: "مدیریت محصولات", sub: "افزودن، ویرایش و کنترل موجودی" },
  orders: { title: "مدیریت سفارش‌ها", sub: "پیگیری و تغییر وضعیت سفارش‌ها" },
  customers: { title: "مشتریان", sub: "خریداران فروشگاه نوشتار" },
  settings: { title: "تنظیمات فروشگاه", sub: "اطلاعات و پیکربندی کلی" },
};

const SALES = [
  { m: "فروردین", v: 96 },
  { m: "اردیبهشت", v: 118 },
  { m: "خرداد", v: 104 },
  { m: "تیر", v: 131 },
  { m: "مرداد", v: 149 },
  { m: "شهریور", v: 178 },
  { m: "مهر", v: 162 },
  { m: "آبان", v: 143 },
  { m: "آذر", v: 155 },
  { m: "دی", v: 186 },
];

const WEEK = [
  { d: "شنبه", o: 14 },
  { d: "یکشنبه", o: 21 },
  { d: "دوشنبه", o: 11 },
  { d: "سه‌شنبه", o: 17 },
  { d: "چهارشنبه", o: 26 },
  { d: "پنجشنبه", o: 31 },
  { d: "جمعه", o: 19 },
];

/* ================= stat card ================= */
function StatCard({
  label,
  value,
  suffix,
  delta,
  up,
  icon,
}: {
  label: string;
  value: number;
  suffix?: string;
  delta: string;
  up: boolean;
  icon: React.ReactNode;
}) {
  const { ref, value: v } = useCountUp(value);
  return (
    <div className="group rounded-xl border border-sand/80 bg-cream p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="flex items-start justify-between">
        <span className="grid size-11 place-items-center rounded-lg bg-ink/8 text-ink transition-all duration-300 group-hover:bg-gold group-hover:text-cream">
          {icon}
        </span>
        <span
          className={`rounded-full px-2.5 py-1 text-[0.68rem] font-bold ${
            up ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"
          }`}
        >
          {delta}
        </span>
      </div>
      <p className="mt-4 text-2xl font-black text-inkdeep md:text-3xl">
        <span ref={ref}>{faNumber(v)}</span>
        {suffix && <span className="ms-1.5 text-sm font-bold text-mist">{suffix}</span>}
      </p>
      <p className="mt-1 text-sm text-mist">{label}</p>
    </div>
  );
}

function StatusPill({ s }: { s: OrderStatus }) {
  const meta = STATUS_META[s];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.7rem] font-bold ${meta.cls}`}>
      <span className={`size-1.5 rounded-full ${meta.dot}`} />
      {meta.label}
    </span>
  );
}

/* ================= dashboard ================= */
function Dashboard({ goto }: { goto: (v: View) => void }) {
  const { orders, products } = useAdminStore();
  const pending = orders.filter((o) => o.status === "pending").length;
  const visibleCount = products.filter((p) => p.visible).length;
  const customers = new Set(orders.filter((o) => o.status !== "cancelled").map((o) => o.customer)).size;
  const recent = orders.slice(0, 5);
  const top = [...products].sort((a, b) => b.sold - a.sold).slice(0, 5);
  const maxSold = top[0]?.sold ?? 1;
  const lowStock = products.filter((p) => p.visible && p.stock > 0 && p.stock < 8);
  const { adjustStock, notify } = useAdminStore();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="درآمد این ماه" value={186} suffix="میلیون تومان" delta="٪۱۲+" up icon={<IconReceipt className="size-5" />} />
        <StatCard label="سفارش‌های در انتظار" value={pending} delta="٪۸+" up icon={<IconCart className="size-5" />} />
        <StatCard label="محصولات فعال" value={visibleCount} delta="٪۴+" up icon={<IconBox className="size-5" />} />
        <StatCard label="مشتریان خریدار" value={customers} delta="٪۲-" up={false} icon={<IconUsers className="size-5" />} />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        {/* sales chart */}
        <div className="rounded-xl border border-sand/80 bg-cream p-6 shadow-card xl:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-inkdeep">روند فروش سالانه</h3>
              <p className="mt-1 text-xs text-mist">درآمد ماهانه به میلیون تومان — ۱۴۰۴</p>
            </div>
            <span className="flex items-center gap-2 text-xs font-bold text-coraldeep">
              <span className="size-2.5 rounded-full bg-coral" />
              اوج: شهریور و دی
            </span>
          </div>
          <div dir="ltr" className="mt-5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SALES} margin={{ top: 10, right: 6, left: -18, bottom: 0 }}>
                <defs>
                  <linearGradient id="gInk" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#243B53" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#243B53" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 6" stroke="#E8E2DA" vertical={false} />
                <XAxis dataKey="m" tick={{ fontSize: 11, fill: "#667085", fontFamily: "Vazirmatn" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#98A2B3" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid #E8E2DA",
                    fontFamily: "Vazirmatn",
                    direction: "rtl",
                    fontSize: 12,
                  }}
                  formatter={(v) => [`${faNumber(Number(v))} میلیون تومان`, "درآمد"]}
                />
                <Area type="monotone" dataKey="v" stroke="#243B53" strokeWidth={2.5} fill="url(#gInk)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* weekly orders */}
        <div className="rounded-xl border border-sand/80 bg-cream p-6 shadow-card">
          <h3 className="text-lg font-black text-inkdeep">سفارش‌های این هفته</h3>
          <p className="mt-1 text-xs text-mist">تعداد سفارش ثبت‌شده در روز</p>
          <div dir="ltr" className="mt-5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WEEK} margin={{ top: 10, right: 0, left: -22, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 6" stroke="#E8E2DA" vertical={false} />
                <XAxis dataKey="d" tick={{ fontSize: 10, fill: "#667085", fontFamily: "Vazirmatn" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#98A2B3" }} axisLine={false} tickLine={false} />
                <Tooltip
                  cursor={{ fill: "rgba(255,138,101,0.08)" }}
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid #E8E2DA",
                    fontFamily: "Vazirmatn",
                    direction: "rtl",
                    fontSize: 12,
                  }}
                  formatter={(v) => [`${faNumber(Number(v))} سفارش`, "روز"]}
                />
                <Bar dataKey="o" fill="#FF8A65" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        {/* recent orders */}
        <div className="rounded-xl border border-sand/80 bg-cream p-6 shadow-card xl:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-inkdeep">آخرین سفارش‌ها</h3>
            <button
              onClick={() => goto("orders")}
              className="flex items-center gap-1.5 text-sm font-bold text-coraldeep transition-all hover:gap-2.5"
            >
              همه سفارش‌ها
              <IconArrow className="size-4" />
            </button>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[520px] text-sm">
              <thead>
                <tr className="border-b border-sand text-start text-[0.7rem] text-mistlight">
                  <th className="pb-3 pe-3 text-start font-bold">شماره</th>
                  <th className="pb-3 pe-3 text-start font-bold">مشتری</th>
                  <th className="pb-3 pe-3 text-start font-bold">تاریخ</th>
                  <th className="pb-3 pe-3 text-start font-bold">مبلغ</th>
                  <th className="pb-3 text-start font-bold">وضعیت</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((o) => (
                  <tr key={o.id} className="border-b border-sand/60 transition-colors last:border-0 hover:bg-paper">
                    <td className="py-3.5 pe-3 font-latin font-semibold text-mist" dir="ltr">#{faDigits(o.no)}</td>
                    <td className="py-3.5 pe-3 font-bold text-inkdeep">{o.customer}</td>
                    <td className="py-3.5 pe-3 text-mist">{o.date}</td>
                    <td className="py-3.5 pe-3 font-black text-ink">{faPrice(o.total)}</td>
                    <td className="py-3.5"><StatusPill s={o.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* top + low stock */}
        <div className="space-y-5">
          <div className="rounded-xl border border-sand/80 bg-cream p-6 shadow-card">
            <h3 className="text-lg font-black text-inkdeep">پرفروش‌ترین‌ها</h3>
            <ul className="mt-4 space-y-4">
              {top.map((p) => (
                <li key={p.id} className="flex items-center gap-3">
                  <img src={p.img} alt="" className="size-10 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-inkdeep">{p.name}</p>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-sand">
                      <div
                        className="h-full rounded-full bg-gradient-to-l from-gold to-coral transition-all duration-1000"
                        style={{ width: `${(p.sold / maxSold) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-xs font-bold text-mist">{faNumber(p.sold)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-gold/40 bg-gold/8 p-6">
            <h3 className="flex items-center gap-2 text-base font-black text-inkdeep">
              <IconTruck className="size-5 text-gold" />
              کمبود موجودی
            </h3>
            {lowStock.length === 0 ? (
              <p className="mt-3 text-sm text-mist">همه محصولات موجودی کافی دارند.</p>
            ) : (
              <ul className="mt-3 space-y-3">
                {lowStock.slice(0, 3).map((p) => (
                  <li key={p.id} className="flex items-center justify-between gap-2 text-sm">
                    <span className="truncate font-bold text-inkdeep">{p.name}</span>
                    <button
                      onClick={() => {
                        adjustStock(p.id, 20);
                        notify(`۲۰ عدد به موجودی «${p.name}» اضافه شد.`);
                      }}
                      className="shrink-0 rounded-full bg-ink px-3.5 py-1.5 text-[0.68rem] font-bold text-cream transition-colors hover:bg-coraldeep"
                    >
                      +۲۰ عدد ({faDigits(p.stock)} مانده)
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= product form modal ================= */
function ProductModal({ editing, onClose }: { editing: AdminProduct | "new"; onClose: () => void }) {
  const { products, addProduct, updateProduct, notify } = useAdminStore();
  const isNew = editing === "new";
  const base: AdminProduct = isNew
    ? {
        id: 0,
        name: "",
        brand: "Neveshtar",
        brandFa: "نوشتار",
        catId: "notebooks",
        price: 500000,
        rating: 4.5,
        reviews: 8,
        sold: 0,
        img: IMG.notebooks,
        stock: 10,
        visible: true,
      }
    : editing;

  const [f, setF] = useState<AdminProduct>({ ...base });
  const [err, setErr] = useState("");

  const set = <K extends keyof AdminProduct>(k: K, v: AdminProduct[K]) => setF((prev) => ({ ...prev, [k]: v }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!f.name.trim() || f.price <= 0) {
      setErr("نام محصول و قیمت معتبر الزامی است.");
      return;
    }
    const brand = BRANDS.find((b) => b.en === f.brand);
    const final: AdminProduct = {
      ...f,
      brandFa: brand ? brand.fa : "نوشتار",
      oldPrice: f.oldPrice && f.oldPrice > f.price ? f.oldPrice : undefined,
      badge: f.badge || undefined,
    };
    if (isNew) {
      const maxId = products.reduce((m, p) => Math.max(m, p.id), 100);
      addProduct({ ...final, id: maxId + 1 });
      notify("محصول جدید به فروشگاه اضافه شد.");
    } else {
      updateProduct(final);
      notify("تغییرات محصول ذخیره شد.");
    }
    onClose();
  };

  const inputCls =
    "w-full rounded-lg border border-sand bg-paper px-4 py-3 text-sm outline-none transition-all focus:border-gold focus:ring-2 focus:ring-gold/25";
  const labelCls = "mb-1.5 block text-xs font-bold text-inkdeep";

  return (
    <div className="fixed inset-0 z-[85] grid place-items-center overflow-y-auto bg-inkdeep/60 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-2xl rounded-xl border border-sand bg-cream shadow-lift"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <header className="flex items-center justify-between border-b border-sand px-6 py-4">
          <h3 className="text-lg font-black text-inkdeep">{isNew ? "افزودن محصول جدید" : "ویرایش محصول"}</h3>
          <button onClick={onClose} aria-label="بستن" className="grid size-9 place-items-center rounded-lg border border-sand text-mist transition-colors hover:border-coral hover:text-coraldeep">
            <IconClose className="size-4" />
          </button>
        </header>

        <form onSubmit={submit} className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelCls}>نام محصول</label>
            <input value={f.name} onChange={(e) => set("name", e.target.value)} placeholder="مثلاً: دفتر چرمی کلاسیک" className={inputCls} />
          </div>

          <div>
            <label className={labelCls}>برند</label>
            <select value={f.brand} onChange={(e) => set("brand", e.target.value)} className={inputCls}>
              <option value="Neveshtar">نوشتار (Neveshtar)</option>
              {BRANDS.map((b) => (
                <option key={b.en} value={b.en}>
                  {b.fa} ({b.en})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelCls}>دسته‌بندی</label>
            <select value={f.catId} onChange={(e) => set("catId", e.target.value)} className={inputCls}>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelCls}>قیمت (تومان)</label>
            <input type="number" min={0} step={10000} value={f.price} onChange={(e) => set("price", Number(e.target.value))} className={inputCls} />
          </div>

          <div>
            <label className={labelCls}>قیمت قبل از تخفیف (اختیاری)</label>
            <input
              type="number"
              min={0}
              step={10000}
              value={f.oldPrice ?? ""}
              onChange={(e) => set("oldPrice", e.target.value ? Number(e.target.value) : undefined)}
              className={inputCls}
              placeholder="—"
            />
          </div>

          <div>
            <label className={labelCls}>موجودی</label>
            <input type="number" min={0} value={f.stock} onChange={(e) => set("stock", Number(e.target.value))} className={inputCls} />
          </div>

          <div>
            <label className={labelCls}>نشان ویژه</label>
            <select value={f.badge ?? ""} onChange={(e) => set("badge", e.target.value)} className={inputCls}>
              <option value="">بدون نشان</option>
              <option value="پیشنهاد سردبیر">پیشنهاد سردبیر</option>
              <option value="جدید">جدید</option>
              <option value="پرفروش">پرفروش</option>
              <option value="محبوب طراحان">محبوب طراحان</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className={labelCls}>تصویر محصول</label>
            <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
              {Object.values(IMG).map((src) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => set("img", src)}
                  className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                    f.img === src ? "border-gold ring-2 ring-gold/30" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 sm:col-span-2">
            <button
              type="button"
              onClick={() => set("visible", !f.visible)}
              className={`relative h-7 w-12 rounded-full transition-colors duration-300 ${f.visible ? "bg-emerald-500" : "bg-sanddeep"}`}
              role="switch"
              aria-checked={f.visible}
              aria-label="نمایش در فروشگاه"
            >
              <span
                className={`absolute top-1 size-5 rounded-full bg-cream shadow transition-all duration-300 ${
                  f.visible ? "start-6" : "start-1"
                }`}
              />
            </button>
            <span className="text-sm font-bold text-inkdeep">نمایش در فروشگاه</span>
          </div>

          {err && (
            <p className="rounded-lg bg-red-50 px-4 py-2.5 text-xs font-bold text-red-600 sm:col-span-2">{err}</p>
          )}

          <div className="flex gap-3 sm:col-span-2">
            <button type="submit" className="flex-1 rounded-lg bg-ink py-3.5 text-sm font-bold text-cream transition-colors hover:bg-coraldeep">
              {isNew ? "افزودن محصول" : "ذخیره تغییرات"}
            </button>
            <button type="button" onClick={onClose} className="rounded-lg border border-sand px-6 py-3.5 text-sm font-bold text-mist transition-colors hover:border-ink hover:text-ink">
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ================= products view ================= */
function ProductsView() {
  const { products, deleteProduct, adjustStock, toggleVisible, notify } = useAdminStore();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [modal, setModal] = useState<AdminProduct | "new" | null>(null);
  const [confirmId, setConfirmId] = useState<number | null>(null);

  const list = useMemo(
    () =>
      products.filter((p) => {
        if (cat !== "all" && p.catId !== cat) return false;
        if (q.trim() && !p.name.includes(q.trim()) && !p.brandFa.includes(q.trim())) return false;
        return true;
      }),
    [products, q, cat],
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <IconSearch className="pointer-events-none absolute start-4 top-1/2 size-4 -translate-y-1/2 text-mistlight" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="جستجوی نام محصول یا برند…"
            className="w-full rounded-lg border border-sand bg-cream py-3 pe-4 ps-11 text-sm outline-none transition-all focus:border-gold focus:ring-2 focus:ring-gold/25"
          />
        </div>
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value)}
          className="rounded-lg border border-sand bg-cream px-4 py-3 text-sm font-bold text-inkdeep outline-none focus:border-gold"
        >
          <option value="all">همه دسته‌ها</option>
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <button
          onClick={() => setModal("new")}
          className="flex items-center justify-center gap-2 rounded-lg bg-coral px-6 py-3 text-sm font-bold text-cream transition-all hover:bg-coraldeep hover:shadow-glow"
        >
          <IconPlus className="size-4" />
          افزودن محصول
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-sand/80 bg-cream shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-sm">
            <thead className="bg-paper text-[0.7rem] text-mistlight">
              <tr>
                <th className="p-4 text-start font-bold">محصول</th>
                <th className="p-4 text-start font-bold">دسته</th>
                <th className="p-4 text-start font-bold">قیمت</th>
                <th className="p-4 text-start font-bold">موجودی</th>
                <th className="p-4 text-start font-bold">نمایش</th>
                <th className="p-4 text-start font-bold">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {list.map((p) => (
                <tr key={p.id} className={`border-t border-sand/60 transition-colors hover:bg-paper ${!p.visible ? "opacity-55" : ""}`}>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={p.img} alt="" className="size-12 rounded-lg object-cover" />
                      <div className="min-w-0">
                        <p className="truncate font-bold text-inkdeep">{p.name}</p>
                        <p className="text-[0.68rem] text-mistlight">{p.brandFa}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-mist">{CATEGORIES.find((c) => c.id === p.catId)?.name ?? "—"}</td>
                  <td className="p-4">
                    <span className="font-black text-ink">{faPrice(p.price)}</span>
                    {p.oldPrice && <span className="ms-2 text-[0.68rem] text-mistlight line-through">{faNumber(p.oldPrice)}</span>}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => adjustStock(p.id, -1)}
                        aria-label="کاهش موجودی"
                        className="grid size-7 place-items-center rounded-md border border-sand text-mist transition-colors hover:border-coral hover:text-coraldeep"
                      >
                        <IconMinus className="size-3.5" />
                      </button>
                      <span className={`w-8 text-center font-black tabular-nums ${p.stock === 0 ? "text-red-500" : p.stock < 8 ? "text-gold" : "text-inkdeep"}`}>
                        {faDigits(p.stock)}
                      </span>
                      <button
                        onClick={() => adjustStock(p.id, 1)}
                        aria-label="افزایش موجودی"
                        className="grid size-7 place-items-center rounded-md border border-sand text-mist transition-colors hover:border-emerald-400 hover:text-emerald-600"
                      >
                        <IconPlus className="size-3.5" />
                      </button>
                      {p.stock === 0 && <span className="rounded-full bg-red-100 px-2 py-0.5 text-[0.62rem] font-bold text-red-600">ناموجود</span>}
                    </div>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => {
                        toggleVisible(p.id);
                        notify(p.visible ? "محصول از فروشگاه پنهان شد." : "محصول در فروشگاه فعال شد.");
                      }}
                      className={`relative h-6 w-11 rounded-full transition-colors duration-300 ${p.visible ? "bg-emerald-500" : "bg-sanddeep"}`}
                      role="switch"
                      aria-checked={p.visible}
                      aria-label={`نمایش ${p.name}`}
                    >
                      <span className={`absolute top-0.5 size-5 rounded-full bg-cream shadow transition-all duration-300 ${p.visible ? "start-[22px]" : "start-0.5"}`} />
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setModal(p)}
                        aria-label={`ویرایش ${p.name}`}
                        className="grid size-8 place-items-center rounded-md border border-sand text-ink transition-colors hover:border-gold hover:bg-gold/10 hover:text-gold"
                      >
                        <IconEdit className="size-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirmId === p.id) {
                            deleteProduct(p.id);
                            setConfirmId(null);
                            notify("محصول حذف شد.");
                          } else {
                            setConfirmId(p.id);
                            window.setTimeout(() => setConfirmId((c) => (c === p.id ? null : c)), 2600);
                          }
                        }}
                        aria-label={`حذف ${p.name}`}
                        className={`flex h-8 items-center gap-1 rounded-md border px-2 text-xs font-bold transition-all ${
                          confirmId === p.id
                            ? "border-red-500 bg-red-500 text-cream"
                            : "border-sand text-mist hover:border-red-300 hover:text-red-500"
                        }`}
                      >
                        <IconTrash className="size-4" />
                        {confirmId === p.id && "تأیید؟"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {list.length === 0 && (
          <p className="px-6 py-14 text-center text-sm text-mist">محصولی با این مشخصات پیدا نشد.</p>
        )}
      </div>

      {modal && <ProductModal editing={modal} onClose={() => setModal(null)} />}
    </div>
  );
}

/* ================= orders view ================= */
function OrdersView() {
  const { orders, setOrderStatus, deleteOrder, notify } = useAdminStore();
  const [tab, setTab] = useState<OrderStatus | "all">("all");
  const [q, setQ] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const tabs: (OrderStatus | "all")[] = ["all", "pending", "processing", "shipped", "delivered", "cancelled"];
  const count = (t: OrderStatus | "all") => (t === "all" ? orders.length : orders.filter((o) => o.status === t).length);

  const list = orders.filter((o) => {
    if (tab !== "all" && o.status !== tab) return false;
    if (q.trim() && !o.customer.includes(q.trim()) && !String(o.no).includes(q.trim())) return false;
    return true;
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-2 text-xs font-bold transition-all duration-300 ${
              tab === t ? "bg-ink text-cream shadow-card" : "border border-sand bg-cream text-mist hover:border-gold hover:text-ink"
            }`}
          >
            {t === "all" ? "همه" : STATUS_META[t].label}
            <span className={`ms-1.5 ${tab === t ? "text-goldsoft" : "text-mistlight"}`}>{faDigits(count(t))}</span>
          </button>
        ))}
        <div className="relative ms-auto w-full sm:w-64">
          <IconSearch className="pointer-events-none absolute start-3.5 top-1/2 size-4 -translate-y-1/2 text-mistlight" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="مشتری یا شماره سفارش…"
            className="w-full rounded-lg border border-sand bg-cream py-2.5 pe-4 ps-10 text-xs outline-none focus:border-gold focus:ring-2 focus:ring-gold/25"
          />
        </div>
      </div>

      <div className="space-y-3">
        {list.map((o) => (
          <div key={o.id} className="overflow-hidden rounded-xl border border-sand/80 bg-cream shadow-card transition-shadow hover:shadow-lift">
            <button
              onClick={() => setExpanded(expanded === o.id ? null : o.id)}
              className="grid w-full grid-cols-2 items-center gap-3 p-4 text-start sm:grid-cols-[110px_1fr_120px_140px_140px_40px]"
            >
              <span className="font-latin text-sm font-semibold text-mist" dir="ltr">#{faDigits(o.no)}</span>
              <span>
                <span className="block font-black text-inkdeep">{o.customer}</span>
                <span className="block text-[0.68rem] text-mistlight" dir="rtl">{o.phone}</span>
              </span>
              <span className="text-xs text-mist">{o.date}</span>
              <span className="text-sm font-black text-ink">{faPrice(o.total)}</span>
              <span className="justify-self-start sm:justify-self-auto"><StatusPill s={o.status} /></span>
              <IconArrow className={`size-4 text-mistlight transition-transform duration-300 ${expanded === o.id ? "rotate-90" : ""} -scale-x-100`} />
            </button>

            <div className={`acc-body ${expanded === o.id ? "open" : ""}`}>
              <div>
                <div className="border-t border-dashed border-sand bg-paper/60 p-5">
                  <div className="grid gap-6 lg:grid-cols-2">
                    <ul className="space-y-3">
                      {o.items.map((it, i) => (
                        <li key={i} className="flex items-center gap-3 rounded-lg border border-sand bg-cream p-2.5">
                          <img src={it.img} alt="" className="size-11 rounded-md object-cover" />
                          <span className="flex-1 text-sm font-bold text-inkdeep">{it.name}</span>
                          <span className="text-xs text-mist">×{faDigits(it.qty)}</span>
                          <span className="text-sm font-black text-coraldeep">{faPrice(it.price * it.qty)}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="space-y-4">
                      <div>
                        <label className="mb-1.5 block text-xs font-bold text-inkdeep">تغییر وضعیت سفارش</label>
                        <select
                          value={o.status}
                          onChange={(e) => {
                            setOrderStatus(o.id, e.target.value as OrderStatus);
                            notify(`وضعیت سفارش #${faDigits(o.no)} تغییر کرد.`);
                          }}
                          className="w-full rounded-lg border border-sand bg-cream px-4 py-3 text-sm font-bold outline-none focus:border-gold"
                        >
                          {(Object.keys(STATUS_META) as OrderStatus[]).map((s) => (
                            <option key={s} value={s}>
                              {STATUS_META[s].label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-cream p-3">
                        <span className="text-xs text-mist">مبلغ نهایی</span>
                        <span className="text-lg font-black text-inkdeep">{faPrice(o.total)}</span>
                      </div>
                      <button
                        onClick={() => {
                          deleteOrder(o.id);
                          setExpanded(null);
                          notify("سفارش حذف شد.");
                        }}
                        className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 py-2.5 text-sm font-bold text-red-500 transition-colors hover:bg-red-50"
                      >
                        <IconTrash className="size-4" />
                        حذف سفارش
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {list.length === 0 && (
          <p className="rounded-xl border border-dashed border-sanddeep bg-cream/60 px-6 py-16 text-center text-sm text-mist">
            سفارشی با این فیلتر وجود ندارد.
          </p>
        )}
      </div>
    </div>
  );
}

/* ================= customers view ================= */
function CustomersView() {
  const { orders } = useAdminStore();

  const customers = useMemo(() => {
    const map = new Map<string, { name: string; phone: string; orders: number; spent: number; last: string }>();
    orders
      .filter((o) => o.status !== "cancelled")
      .forEach((o) => {
        const c = map.get(o.customer) ?? { name: o.customer, phone: o.phone, orders: 0, spent: 0, last: o.date };
        c.orders += 1;
        c.spent += o.total;
        map.set(o.customer, c);
      });
    return [...map.values()].sort((a, b) => b.spent - a.spent);
  }, [orders]);

  const colors = ["bg-ink", "bg-coraldeep", "bg-gold", "bg-inksoft", "bg-coral", "bg-inkmist"];

  return (
    <div className="overflow-hidden rounded-xl border border-sand/80 bg-cream shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] text-sm">
          <thead className="bg-paper text-[0.7rem] text-mistlight">
            <tr>
              <th className="p-4 text-start font-bold">مشتری</th>
              <th className="p-4 text-start font-bold">تماس</th>
              <th className="p-4 text-start font-bold">تعداد سفارش</th>
              <th className="p-4 text-start font-bold">مجموع خرید</th>
              <th className="p-4 text-start font-bold">آخرین خرید</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c, i) => (
              <tr key={c.name} className="border-t border-sand/60 transition-colors hover:bg-paper">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <span className={`grid size-10 shrink-0 place-items-center rounded-full text-sm font-black text-cream ${colors[i % colors.length]}`}>
                      {c.name[0]}
                    </span>
                    <span className="font-bold text-inkdeep">{c.name}</span>
                    {c.orders >= 2 && (
                      <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[0.62rem] font-bold text-[#8a6a10]">مشتری وفادار</span>
                    )}
                  </div>
                </td>
                <td className="p-4 text-mist">{c.phone}</td>
                <td className="p-4 font-black text-ink">{faDigits(c.orders)}</td>
                <td className="p-4 font-black text-coraldeep">{faPrice(c.spent)}</td>
                <td className="p-4 text-mist">{c.last}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {customers.length === 0 && <p className="px-6 py-14 text-center text-sm text-mist">هنوز مشتری‌ای ثبت نشده است.</p>}
    </div>
  );
}

/* ================= settings view ================= */
function SettingsView() {
  const { settings, saveSettings, resetDemo, logout, notify } = useAdminStore();
  const [f, setF] = useState({ ...settings });
  const [confirmReset, setConfirmReset] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    saveSettings(f);
    notify("تنظیمات فروشگاه ذخیره شد.");
  };

  const inputCls =
    "w-full rounded-lg border border-sand bg-paper px-4 py-3 text-sm outline-none transition-all focus:border-gold focus:ring-2 focus:ring-gold/25";

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <form onSubmit={submit} className="rounded-xl border border-sand/80 bg-cream p-7 shadow-card">
        <h3 className="flex items-center gap-2.5 text-lg font-black text-inkdeep">
          <IconGear className="size-5 text-gold" />
          اطلاعات فروشگاه
        </h3>
        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-bold text-inkdeep">نام فروشگاه</label>
            <input value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} className={inputCls} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-bold text-inkdeep">ایمیل</label>
              <input dir="ltr" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} className={`${inputCls} text-left`} />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold text-inkdeep">تلفن</label>
              <input value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} className={inputCls} />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-bold text-inkdeep">آدرس</label>
            <input value={f.address} onChange={(e) => setF({ ...f, address: e.target.value })} className={inputCls} />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-bold text-inkdeep">آستانه ارسال رایگان (تومان)</label>
            <input type="number" step={100000} value={f.freeShip} onChange={(e) => setF({ ...f, freeShip: Number(e.target.value) })} className={inputCls} />
          </div>
          <button type="submit" className="w-full rounded-lg bg-ink py-3.5 text-sm font-bold text-cream transition-colors hover:bg-coraldeep">
            ذخیره تنظیمات
          </button>
        </div>
      </form>

      <div className="space-y-6">
        <div className="rounded-xl border border-sand/80 bg-cream p-7 shadow-card">
          <h3 className="text-lg font-black text-inkdeep">حساب مدیریت</h3>
          <div className="mt-5 flex items-center gap-4">
            <span className="grid size-14 place-items-center rounded-full bg-ink text-xl font-black text-goldsoft">م</span>
            <div>
              <p className="font-black text-inkdeep">مدیر نوشتار</p>
              <p className="font-latin text-xs tracking-wider text-mistlight" dir="ltr">admin@neveshtar.ir</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-sand py-3 text-sm font-bold text-mist transition-colors hover:border-coral hover:text-coraldeep"
          >
            <IconLogout className="size-4" />
            خروج از حساب
          </button>
        </div>

        <div className="rounded-xl border border-red-200 bg-red-50/50 p-7">
          <h3 className="text-lg font-black text-red-600">منطقه خطر</h3>
          <p className="mt-2 text-sm leading-7 text-mist">
            با بازنشانی، همه محصولات، سفارش‌ها و تنظیمات به حالت اولیه نمایشی برمی‌گردند.
          </p>
          <button
            onClick={() => {
              if (confirmReset) {
                resetDemo();
                setConfirmReset(false);
                notify("داده‌های نمایشی بازنشانی شدند.");
              } else {
                setConfirmReset(true);
                window.setTimeout(() => setConfirmReset(false), 2800);
              }
            }}
            className={`mt-4 flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-bold transition-all ${
              confirmReset ? "bg-red-500 text-cream" : "border border-red-300 text-red-500 hover:bg-red-500 hover:text-cream"
            }`}
          >
            <IconTrash className="size-4" />
            {confirmReset ? "مطمئنم، بازنشانی کن" : "بازنشانی داده‌های نمایشی"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= panel shell ================= */
export default function AdminPanel() {
  const { orders, products, logout, notify, toast } = useAdminStore();
  const [view, setView] = useState<View>("dashboard");
  const [open, setOpen] = useState(false);
  const pending = orders.filter((o) => o.status === "pending").length;

  const go = (v: View) => {
    setView(v);
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const badges: Partial<Record<View, number>> = { products: products.length, orders: pending };

  return (
    <div className="min-h-svh bg-paper">
      {/* mobile backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-inkdeep/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden
      />

      {/* sidebar */}
      <aside
        className={`fixed inset-y-0 start-0 z-[65] flex w-64 flex-col bg-inkdeep text-cream transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:translate-x-0 ${
          open ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="dotted-grid pointer-events-none absolute inset-0 opacity-30" aria-hidden />

        <div className="relative flex items-center justify-between border-b border-cream/10 px-6 py-6">
          <Logo dark />
          <button onClick={() => setOpen(false)} aria-label="بستن منو" className="text-cream/60 transition-colors hover:text-cream lg:hidden">
            <IconClose className="size-5" />
          </button>
        </div>

        <nav className="relative flex-1 space-y-1.5 overflow-y-auto px-4 py-6">
          {VIEWS.map((v) => (
            <button
              key={v.id}
              onClick={() => go(v.id)}
              className={`group relative flex w-full items-center gap-3.5 rounded-lg px-4 py-3 text-sm font-bold transition-all duration-300 ${
                view === v.id ? "bg-cream/12 text-goldsoft" : "text-cream/70 hover:bg-cream/6 hover:text-cream"
              }`}
            >
              <span className={`absolute inset-y-2 start-0 w-1 rounded-full bg-gold transition-all duration-300 ${view === v.id ? "opacity-100" : "opacity-0"}`} />
              {v.icon({ className: "size-5" })}
              {v.label}
              {badges[v.id] !== undefined && (
                <span className={`ms-auto rounded-full px-2 py-0.5 text-[0.65rem] font-bold ${view === v.id ? "bg-gold text-inkdeep" : "bg-cream/12 text-cream/80"}`}>
                  {faDigits(badges[v.id] as number)}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="relative space-y-3 border-t border-cream/10 px-4 py-5">
          <a
            href="#/"
            className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-bold text-cream/70 transition-colors hover:bg-cream/6 hover:text-cream"
          >
            <IconNib className="size-5 text-gold" />
            مشاهده فروشگاه
          </a>
          <div className="flex items-center gap-3 rounded-lg bg-cream/6 px-4 py-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gold text-base font-black text-inkdeep">م</span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-black">مدیر نوشتار</p>
              <p className="font-latin text-[0.62rem] tracking-wider text-cream/50" dir="ltr">admin</p>
            </div>
            <button
              onClick={() => {
                logout();
                notify("از پنل مدیریت خارج شدید.");
              }}
              aria-label="خروج"
              className="text-cream/50 transition-colors hover:text-coral"
            >
              <IconLogout className="size-5" />
            </button>
          </div>
        </div>
      </aside>

      {/* main */}
      <div className="lg:ps-64">
        <header className="sticky top-0 z-50 flex items-center gap-4 border-b border-sand bg-paper/85 px-5 py-4 backdrop-blur-xl lg:px-8">
          <button onClick={() => setOpen(true)} aria-label="باز کردن منو" className="grid size-10 place-items-center rounded-lg border border-sand bg-cream text-ink lg:hidden">
            <IconMenu className="size-5" />
          </button>
          <div className="min-w-0">
            <h1 className="truncate text-lg font-black text-inkdeep md:text-xl">{TITLES[view].title}</h1>
            <p className="hidden text-xs text-mist sm:block">{TITLES[view].sub}</p>
          </div>
          <div className="ms-auto flex items-center gap-3">
            <span className="hidden items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-[0.68rem] font-bold text-emerald-700 sm:flex">
              <span className="size-2 animate-pulse rounded-full bg-emerald-500" />
              فروشگاه فعال
            </span>
            <button aria-label="اعلان‌ها" className="relative grid size-10 place-items-center rounded-lg border border-sand bg-cream text-ink transition-colors hover:border-gold">
              <IconBell className="size-5" />
              {pending > 0 && <span className="absolute -top-1 -end-1 grid size-4.5 place-items-center rounded-full bg-coral text-[0.6rem] font-black text-cream">{faDigits(pending)}</span>}
            </button>
          </div>
        </header>

        <main className="p-5 lg:p-8">
          {view === "dashboard" && <Dashboard goto={go} />}
          {view === "products" && <ProductsView />}
          {view === "orders" && <OrdersView />}
          {view === "customers" && <CustomersView />}
          {view === "settings" && <SettingsView />}
        </main>
      </div>

      {/* admin toast */}
      <div
        className={`fixed bottom-6 left-1/2 z-[90] -translate-x-1/2 transition-all duration-500 ${
          toast ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
        }`}
        role="status"
        aria-live="polite"
      >
        {toast && (
          <div className="flex items-center gap-3 rounded-xl border border-gold/30 bg-inkdeep px-5 py-3.5 text-sm font-bold text-cream shadow-lift">
            <span className="grid size-7 place-items-center rounded-full bg-gold text-inkdeep">
              <IconCheck className="size-4" />
            </span>
            {toast}
          </div>
        )}
      </div>
    </div>
  );
}
