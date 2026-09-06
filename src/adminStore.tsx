import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { PRODUCTS, type Product } from "./data";

/* ---------- types ---------- */
export interface AdminProduct extends Product {
  stock: number;
  visible: boolean;
}

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export interface OrderItem {
  name: string;
  qty: number;
  price: number;
  img: string;
}

export interface Order {
  id: string;
  no: number;
  customer: string;
  phone: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
}

export interface StoreSettings {
  name: string;
  email: string;
  phone: string;
  address: string;
  freeShip: number;
}

/* ---------- seeds ---------- */
const seedProducts = (): AdminProduct[] =>
  PRODUCTS.map((p, i) => ({
    ...p,
    stock: i % 9 === 7 ? 0 : 6 + ((i * 13) % 38),
    visible: true,
  }));

const mk = (
  no: number,
  customer: string,
  phone: string,
  date: string,
  status: OrderStatus,
  picks: [number, number][],
): Order => ({
  id: `o${no}`,
  no,
  customer,
  phone,
  date,
  status,
  items: picks.map(([i, qty]) => ({
    name: PRODUCTS[i].name,
    qty,
    price: PRODUCTS[i].price,
    img: PRODUCTS[i].img,
  })),
  total: picks.reduce((s, [i, q]) => s + PRODUCTS[i].price * q, 0),
});

const seedOrders = (): Order[] => [
  mk(10238, "سارا محمدی", "۰۹۱۲ ۴۴۵ ۶۷۸۹", "۱۴۰۴/۱۰/۲۴", "pending", [[3, 1], [11, 2]]),
  mk(10237, "امیر رضایی", "۰۹۳۵ ۲۱۰ ۸۸۴۲", "۱۴۰۴/۱۰/۲۳", "pending", [[9, 1]]),
  mk(10236, "نگار کریمی", "۰۹۱۹ ۷۷۲ ۳۴۱۵", "۱۴۰۴/۱۰/۲۲", "processing", [[0, 1], [2, 1]]),
  mk(10235, "حسین موسوی", "۰۹۰۲ ۱۱۸ ۵۵۲۰", "۱۴۰۴/۱۰/۲۱", "processing", [[5, 2], [11, 1]]),
  mk(10234, "مریم احمدی", "۰۹۳۷ ۶۴۰ ۹۹۱۱", "۱۴۰۴/۱۰/۲۰", "shipped", [[1, 1], [8, 1]]),
  mk(10233, "آرش توکلی", "۰۹۱۲ ۰۰۳ ۷۷۴۶", "۱۴۰۴/۱۰/۱۸", "shipped", [[6, 1], [4, 2]]),
  mk(10232, "لیلا صادقی", "۰۹۳۰ ۵۵۶ ۲۰۱۸", "۱۴۰۴/۱۰/۱۵", "delivered", [[0, 2], [7, 1]]),
  mk(10231, "کیان نصیری", "۰۹۱۲ ۸۸۷ ۱۲۳۰", "۱۴۰۴/۱۰/۱۲", "delivered", [[3, 1], [9, 1], [11, 3]]),
  mk(10230, "شیرین قائمی", "۰۹۱۹ ۲۳۴ ۶۰۰۷", "۱۴۰۴/۱۰/۰۹", "cancelled", [[2, 1]]),
];

const seedSettings: StoreSettings = {
  name: "نوشتار",
  email: "hello@neveshtar.ir",
  phone: "۰۲۱ - ۹۱۰۹۰۲۲۰",
  address: "تهران، خیابان ولیعصر، کوچه هنر، پلاک ۷",
  freeShip: 1000000,
};

/* ---------- persistence ---------- */
const K = {
  auth: "nv_admin_auth",
  products: "nv_admin_products_v1",
  orders: "nv_admin_orders_v1",
  settings: "nv_admin_settings_v1",
};

function load<T>(key: string, seed: () => T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw) as T;
  } catch {
    /* corrupted → reseed */
  }
  return seed();
}

function save(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full — ignore */
  }
}

/* ---------- context ---------- */
interface AdminCtx {
  authed: boolean;
  login: (user: string, pass: string) => boolean;
  logout: () => void;
  products: AdminProduct[];
  addProduct: (p: AdminProduct) => void;
  updateProduct: (p: AdminProduct) => void;
  deleteProduct: (id: number) => void;
  adjustStock: (id: number, delta: number) => void;
  toggleVisible: (id: number) => void;
  orders: Order[];
  setOrderStatus: (id: string, s: OrderStatus) => void;
  deleteOrder: (id: string) => void;
  placeOrder: (customer: string, items: OrderItem[]) => number;
  settings: StoreSettings;
  saveSettings: (s: StoreSettings) => void;
  resetDemo: () => void;
  toast: string;
  notify: (msg: string) => void;
}

const Ctx = createContext<AdminCtx | null>(null);

export function useAdminStore(): AdminCtx {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAdminStore خارج از AdminProvider استفاده شده است");
  return v;
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState<boolean>(() => {
    try {
      return localStorage.getItem(K.auth) === "1";
    } catch {
      return false;
    }
  });
  const [products, setProducts] = useState<AdminProduct[]>(() => load(K.products, seedProducts));
  const [orders, setOrders] = useState<Order[]>(() => load(K.orders, seedOrders));
  const [settings, setSettings] = useState<StoreSettings>(() => load(K.settings, () => seedSettings));
  const [toast, setToast] = useState("");

  useEffect(() => save(K.products, products), [products]);
  useEffect(() => save(K.orders, orders), [orders]);
  useEffect(() => save(K.settings, settings), [settings]);

  const notify = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(""), 2600);
  }, []);

  /* auth */
  const login = useCallback((user: string, pass: string) => {
    if (user.trim() === "admin" && pass === "neveshtar") {
      setAuthed(true);
      try {
        localStorage.setItem(K.auth, "1");
      } catch { /* noop */ }
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setAuthed(false);
    try {
      localStorage.removeItem(K.auth);
    } catch { /* noop */ }
  }, []);

  /* products */
  const addProduct = useCallback((p: AdminProduct) => {
    setProducts((prev) => [p, ...prev]);
  }, []);
  const updateProduct = useCallback((p: AdminProduct) => {
    setProducts((prev) => prev.map((x) => (x.id === p.id ? p : x)));
  }, []);
  const deleteProduct = useCallback((id: number) => {
    setProducts((prev) => prev.filter((x) => x.id !== id));
  }, []);
  const adjustStock = useCallback((id: number, delta: number) => {
    setProducts((prev) =>
      prev.map((x) => (x.id === id ? { ...x, stock: Math.max(0, x.stock + delta) } : x)),
    );
  }, []);
  const toggleVisible = useCallback((id: number) => {
    setProducts((prev) => prev.map((x) => (x.id === id ? { ...x, visible: !x.visible } : x)));
  }, []);

  /* orders */
  const setOrderStatus = useCallback((id: string, s: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: s } : o)));
  }, []);
  const deleteOrder = useCallback((id: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  }, []);
  const placeOrder = useCallback((customer: string, items: OrderItem[]) => {
    const no = 10239 + Math.floor(Math.random() * 400);
    const date = new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());
    const order: Order = {
      id: `o${no}`,
      no,
      customer,
      phone: "—",
      date,
      items,
      total: items.reduce((s, it) => s + it.price * it.qty, 0),
      status: "pending",
    };
    setOrders((prev) => [order, ...prev]);
    /* reduce stock like a real shop */
    setProducts((prev) =>
      prev.map((p) => {
        const it = items.find((x) => x.name === p.name);
        return it ? { ...p, stock: Math.max(0, p.stock - it.qty) } : p;
      }),
    );
    return no;
  }, []);

  /* settings */
  const saveSettings = useCallback((s: StoreSettings) => setSettings(s), []);

  const resetDemo = useCallback(() => {
    setProducts(seedProducts());
    setOrders(seedOrders());
    setSettings(seedSettings);
    try {
      localStorage.removeItem(K.products);
      localStorage.removeItem(K.orders);
      localStorage.removeItem(K.settings);
    } catch { /* noop */ }
  }, []);

  const value = useMemo<AdminCtx>(
    () => ({
      authed,
      login,
      logout,
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      adjustStock,
      toggleVisible,
      orders,
      setOrderStatus,
      deleteOrder,
      placeOrder,
      settings,
      saveSettings,
      resetDemo,
      toast,
      notify,
    }),
    [
      authed, login, logout, products, addProduct, updateProduct, deleteProduct, adjustStock,
      toggleVisible, orders, setOrderStatus, deleteOrder, placeOrder, settings, saveSettings,
      resetDemo, toast, notify,
    ],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

/* ---------- shared meta ---------- */
export const STATUS_META: Record<OrderStatus, { label: string; cls: string; dot: string }> = {
  pending: { label: "در انتظار پرداخت", cls: "bg-gold/15 text-[#8a6a10]", dot: "bg-gold" },
  processing: { label: "در حال پردازش", cls: "bg-ink/10 text-ink", dot: "bg-ink" },
  shipped: { label: "ارسال شده", cls: "bg-coral/15 text-coraldeep", dot: "bg-coral" },
  delivered: { label: "تحویل شده", cls: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500" },
  cancelled: { label: "لغو شده", cls: "bg-red-100 text-red-600", dot: "bg-red-500" },
};
