import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { CreditCard, Lock, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { PRODUCTS, SIZES, money, type Size } from '../data/products'
import { usePageMeta } from '../hooks/usePageMeta'
import { useCart } from '../context/CartContext'
import { Reveal } from '../components/Reveal'

export function Cart() {
  usePageMeta('Shopping Bag — QUATRÉA', 'Your QUATRÉA shopping bag. Review your fragrances, change sizes and quantities, and check out.')
  const { items, setQty, remove, setSize, subtotal, clear } = useCart()
  const [checkoutOpen, setCheckoutOpen] = useState(false)

  return (
    <main className="bg-cream pt-28">
      <div className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-gold">Shopping Bag</p>
          <h1 className="mt-4 font-display text-5xl leading-[1.02] tracking-wide text-ink sm:text-6xl">Your Bag.</h1>
        </Reveal>

        {items.length === 0 ? (
          <div className="flex flex-col items-center py-24 text-center">
            <ShoppingBag className="h-12 w-12 text-ink/25" aria-hidden />
            <p className="mt-5 font-display text-3xl text-ink">Your bag is empty</p>
            <p className="mt-2 max-w-sm font-serif text-xl italic text-ink/60">Four seasons are waiting. Begin with the one that feels like today.</p>
            <Link to="/collection" className="mt-8 bg-ink px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-ivory hover:bg-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-3">
            <ul className="space-y-8 lg:col-span-2">
              {items.map((item) => {
                const p = PRODUCTS.find((x) => x.id === item.productId)
                if (!p) return null
                return (
                  <li key={`${item.productId}-${item.size}`} className="flex gap-5 border-b border-ink/10 bg-white p-4 sm:p-5">
                    <Link to={`/products/${p.slug}`} className="shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold">
                      <img src={p.image} alt={`${p.name} bottle`} className="h-32 w-24 object-cover sm:h-40 sm:w-32" />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <Link to={`/products/${p.slug}`} className="font-display text-2xl tracking-wide text-ink hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold">{p.name}</Link>
                          <p className="text-xs uppercase tracking-[0.2em] text-ink/50">{p.season} · {p.family}</p>
                        </div>
                        <button type="button" onClick={() => remove(item.productId, item.size)} className="p-2 text-ink/50 hover:text-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold" aria-label={`Remove ${p.name} ${item.size} from bag`}>
                          <Trash2 className="h-4 w-4" aria-hidden />
                        </button>
                      </div>
                      <label className="mt-4 block max-w-xs text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/60">
                        Size
                        <select value={item.size} onChange={(e) => setSize(item.productId, item.size, e.target.value as Size)} className="mt-1 block w-full border border-ink/20 bg-white px-2 py-2 text-sm normal-case tracking-normal text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-gold">
                          {SIZES.map((s) => <option key={s} value={s}>{s} — {money(p.prices[s])}</option>)}
                        </select>
                      </label>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center border border-ink/20">
                          <button type="button" onClick={() => setQty(item.productId, item.size, item.qty - 1)} className="p-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold" aria-label="Decrease quantity"><Minus className="h-4 w-4" aria-hidden /></button>
                          <span className="w-9 text-center text-sm font-semibold" aria-label={`Quantity ${item.qty}`}>{item.qty}</span>
                          <button type="button" onClick={() => setQty(item.productId, item.size, item.qty + 1)} className="p-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold" aria-label="Increase quantity"><Plus className="h-4 w-4" aria-hidden /></button>
                        </div>
                        <p className="font-semibold text-ink">{money(p.prices[item.size] * item.qty)}</p>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
            <aside className="h-fit bg-white p-7 shadow-[0_2px_30px_rgba(20,18,16,0.06)] lg:sticky lg:top-28" aria-label="Order summary">
              <h2 className="font-display text-2xl tracking-wide text-ink">Order Summary</h2>
              <dl className="mt-5 space-y-2 text-sm text-ink/75">
                <div className="flex justify-between"><dt>Subtotal</dt><dd>{money(subtotal)}</dd></div>
                <div className="flex justify-between"><dt>Shipping</dt><dd>Complimentary</dd></div>
                <div className="flex justify-between"><dt>Taxes</dt><dd>Calculated at checkout</dd></div>
              </dl>
              <div className="mt-4 flex justify-between border-t border-ink/10 pt-4 text-base font-semibold text-ink"><span>Total</span><span>{money(subtotal)}</span></div>
              <button type="button" onClick={() => setCheckoutOpen(true)} className="mt-6 flex w-full items-center justify-center gap-2 bg-ink py-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-ivory transition-colors hover:bg-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold">
                <Lock className="h-4 w-4" aria-hidden /> Proceed to Checkout
              </button>
              <button type="button" onClick={clear} className="mt-3 w-full py-2 text-xs uppercase tracking-[0.2em] text-ink/50 hover:text-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold">
                Clear Bag
              </button>
              <Link to="/collection" className="mt-4 block text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-ink underline decoration-gold underline-offset-4 hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold">
                Continue Shopping
              </Link>
            </aside>
          </div>
        )}
      </div>

      <AnimatePresence>
        {checkoutOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/60 sm:items-center sm:p-6" onClick={() => setCheckoutOpen(false)} role="dialog" aria-modal="true" aria-label="Checkout">
            <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} className="w-full max-w-lg bg-cream p-8 sm:p-10" onClick={(e) => e.stopPropagation()}>
              <CreditCard className="h-8 w-8 text-gold" aria-hidden />
              <h2 className="mt-4 font-display text-3xl tracking-wide text-ink">Checkout</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-ink/75">
                <strong>Payment integration pending — no payment will be taken.</strong> Checkout is a demonstration until a payment gateway is connected. Your order total is <strong>{money(subtotal)}</strong> with complimentary shipping.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink/60">
                To enable real checkout, connect a payment provider (for example Stripe) and wire it to this panel. No card details are collected here.
              </p>
              <div className="mt-6 flex gap-3">
                <button type="button" onClick={() => setCheckoutOpen(false)} className="flex-1 border border-ink px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-ink hover:bg-ink hover:text-ivory focus:outline-none focus-visible:ring-2 focus-visible:ring-gold">
                  Keep Shopping
                </button>
                <Link to="/collection" onClick={() => setCheckoutOpen(false)} className="flex-1 bg-ink px-6 py-3.5 text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-ivory hover:bg-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold">
                  Continue Browsing
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
