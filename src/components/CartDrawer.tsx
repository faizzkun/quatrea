import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { PRODUCTS, SIZES, money, type Size } from '../data/products'
import { useCart } from '../context/CartContext'

export function CartDrawer() {
  const { items, drawerOpen, setDrawerOpen, setQty, remove, setSize, subtotal } = useCart()
  return (
    <AnimatePresence>
      {drawerOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] bg-ink/50" onClick={() => setDrawerOpen(false)} aria-hidden />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 z-[80] flex h-full w-full max-w-md flex-col bg-cream shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping bag"
          >
            <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
              <h2 className="flex items-center gap-2 font-display text-2xl tracking-wide text-ink">
                <ShoppingBag className="h-5 w-5" aria-hidden /> Your Bag
              </h2>
              <button type="button" onClick={() => setDrawerOpen(false)} className="p-2 text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-gold" aria-label="Close bag">
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <ShoppingBag className="h-10 w-10 text-ink/30" aria-hidden />
                  <p className="mt-4 font-display text-2xl text-ink">Your bag is empty</p>
                  <p className="mt-2 max-w-xs font-serif text-lg italic text-ink/60">Four seasons are waiting. Begin with the one that feels like today.</p>
                  <Link to="/collection" onClick={() => setDrawerOpen(false)} className="mt-6 bg-ink px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-ivory hover:bg-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold">
                    Explore the Collection
                  </Link>
                </div>
              ) : (
                <ul className="space-y-6">
                  {items.map((item) => {
                    const p = PRODUCTS.find((x) => x.id === item.productId)
                    if (!p) return null
                    return (
                      <li key={`${item.productId}-${item.size}`} className="flex gap-4 border-b border-ink/10 pb-6">
                        <img src={p.image} alt={`${p.name} bottle`} className="h-24 w-20 shrink-0 object-cover" />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-display text-lg tracking-wide text-ink">{p.name}</p>
                              <p className="text-xs uppercase tracking-[0.2em] text-ink/50">{p.season} · {p.family}</p>
                            </div>
                            <button type="button" onClick={() => remove(item.productId, item.size)} className="p-1 text-ink/50 hover:text-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold" aria-label={`Remove ${p.name} ${item.size} from bag`}>
                              <Trash2 className="h-4 w-4" aria-hidden />
                            </button>
                          </div>
                          <label className="mt-3 block text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/60">
                            Size
                            <select
                              value={item.size}
                              onChange={(e) => setSize(item.productId, item.size, e.target.value as Size)}
                              className="mt-1 block w-full border border-ink/20 bg-white px-2 py-2 text-sm normal-case tracking-normal text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                            >
                              {SIZES.map((s) => (
                                <option key={s} value={s}>{s} — {money(p.prices[s])}</option>
                              ))}
                            </select>
                          </label>
                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center border border-ink/20">
                              <button type="button" onClick={() => setQty(item.productId, item.size, item.qty - 1)} className="p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold" aria-label="Decrease quantity"><Minus className="h-3.5 w-3.5" aria-hidden /></button>
                              <span className="w-8 text-center text-sm font-semibold" aria-label={`Quantity ${item.qty}`}>{item.qty}</span>
                              <button type="button" onClick={() => setQty(item.productId, item.size, item.qty + 1)} className="p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold" aria-label="Increase quantity"><Plus className="h-3.5 w-3.5" aria-hidden /></button>
                            </div>
                            <p className="text-sm font-semibold text-ink">{money(p.prices[item.size] * item.qty)}</p>
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
            {items.length > 0 && (
              <div className="border-t border-ink/10 px-6 py-5">
                <div className="flex justify-between text-sm text-ink/70"><span>Subtotal</span><span>{money(subtotal)}</span></div>
                <div className="mt-1 flex justify-between text-sm text-ink/70"><span>Shipping</span><span>Complimentary</span></div>
                <div className="mt-3 flex justify-between border-t border-ink/10 pt-3 text-base font-semibold text-ink"><span>Total</span><span>{money(subtotal)}</span></div>
                <Link to="/cart" onClick={() => setDrawerOpen(false)} className="mt-5 block bg-ink py-4 text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-ivory hover:bg-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold">
                  View Bag &amp; Checkout
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
