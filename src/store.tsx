import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "./data";

export interface CartItem {
  product: Product;
  qty: number;
}

interface CartCtx {
  items: CartItem[];
  count: number;
  total: number;
  isOpen: boolean;
  toast: { msg: string; id: number } | null;
  add: (p: Product, qty?: number, silent?: boolean) => void;
  remove: (id: number) => void;
  setQty: (id: number, qty: number) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState<{ msg: string; id: number } | null>(null);
  const timer = useRef<number | undefined>(undefined);

  const pushToast = useCallback((msg: string) => {
    setToast({ msg, id: Date.now() });
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(null), 2600);
  }, []);

  const add = useCallback(
    (p: Product, qty = 1, silent = false) => {
      setItems((prev) => {
        const found = prev.find((i) => i.product.id === p.id);
        if (found)
          return prev.map((i) =>
            i.product.id === p.id ? { ...i, qty: Math.min(i.qty + qty, 9) } : i,
          );
        return [...prev, { product: p, qty }];
      });
      if (!silent) pushToast(`«${p.name}» به سبد خرید اضافه شد`);
    },
    [pushToast],
  );

  const remove = useCallback((id: number) => {
    setItems((prev) => prev.filter((i) => i.product.id !== id));
  }, []);

  const setQty = useCallback((id: number, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.product.id !== id)
        : prev.map((i) =>
            i.product.id === id ? { ...i, qty: Math.min(qty, 9) } : i,
          ),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const { count, total } = useMemo(() => {
    let c = 0;
    let t = 0;
    items.forEach((i) => {
      c += i.qty;
      t += i.qty * i.product.price;
    });
    return { count: c, total: t };
  }, [items]);

  const value = useMemo(
    () => ({ items, count, total, isOpen, toast, add, remove, setQty, clear, openCart, closeCart }),
    [items, count, total, isOpen, toast, add, remove, setQty, clear, openCart, closeCart],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart(): CartCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
