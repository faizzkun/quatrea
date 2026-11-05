import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { PRODUCTS, type Size } from '../data/products'

export interface CartItem {
  productId: string
  size: Size
  qty: number
}

interface CartCtx {
  items: CartItem[]
  count: number
  subtotal: number
  add: (productId: string, size: Size, qty?: number) => void
  remove: (productId: string, size: Size) => void
  setQty: (productId: string, size: Size, qty: number) => void
  setSize: (productId: string, oldSize: Size, newSize: Size) => void
  clear: () => void
  drawerOpen: boolean
  setDrawerOpen: (open: boolean) => void
  toast: string | null
}

const Ctx = createContext<CartCtx | null>(null)
const KEY = 'quatrea-cart-v1'

function load(): CartItem[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as CartItem[]
    return Array.isArray(parsed)
      ? parsed.filter((i) => PRODUCTS.some((p) => p.id === i.productId) && i.qty > 0)
      : []
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => load())
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items))
    } catch {
      /* storage unavailable — cart still works in memory */
    }
  }, [items])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 3200)
    return () => clearTimeout(t)
  }, [toast])

  const add = useCallback((productId: string, size: Size, qty = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.productId === productId && i.size === size)
      if (idx >= 0) {
        const next = [...prev]
        next[idx] = { ...next[idx], qty: next[idx].qty + qty }
        return next
      }
      return [...prev, { productId, size, qty }]
    })
    const p = PRODUCTS.find((x) => x.id === productId)
    setToast(`${p ? p.name : 'Fragrance'} · ${size} added to your bag`)
    setDrawerOpen(true)
  }, [])

  const remove = useCallback((productId: string, size: Size) => {
    setItems((prev) => prev.filter((i) => !(i.productId === productId && i.size === size)))
  }, [])

  const setQty = useCallback((productId: string, size: Size, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => !(i.productId === productId && i.size === size))
        : prev.map((i) => (i.productId === productId && i.size === size ? { ...i, qty } : i)),
    )
  }, [])

  const setSize = useCallback((productId: string, oldSize: Size, newSize: Size) => {
    setItems((prev) => {
      const item = prev.find((i) => i.productId === productId && i.size === oldSize)
      if (!item || oldSize === newSize) return prev
      const rest = prev.filter((i) => !(i.productId === productId && i.size === oldSize))
      const existing = rest.find((i) => i.productId === productId && i.size === newSize)
      if (existing) {
        return rest.map((i) =>
          i.productId === productId && i.size === newSize ? { ...i, qty: i.qty + item.qty } : i,
        )
      }
      return [...rest, { ...item, size: newSize }]
    })
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const { count, subtotal } = useMemo(() => {
    let c = 0
    let s = 0
    for (const i of items) {
      const p = PRODUCTS.find((x) => x.id === i.productId)
      if (!p) continue
      c += i.qty
      s += p.prices[i.size] * i.qty
    }
    return { count: c, subtotal: s }
  }, [items])

  const value = useMemo(
    () => ({ items, count, subtotal, add, remove, setQty, setSize, clear, drawerOpen, setDrawerOpen, toast }),
    [items, count, subtotal, add, remove, setQty, setSize, clear, drawerOpen, toast],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useCart() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
