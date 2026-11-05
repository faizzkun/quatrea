import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Check, Minus, Plus, ShoppingBag } from 'lucide-react'
import { SIZES, getProduct, money, related, type Size } from '../data/products'
import { usePageMeta } from '../hooks/usePageMeta'
import { useCart } from '../context/CartContext'
import { Reveal } from '../components/Reveal'
import { ProductCard } from '../components/ProductCard'

function NotesBlock({ title, notes }: { title: string; notes: string[] }) {
  return (
    <div>
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">{title}</h3>
      <ul className="mt-3 space-y-2">
        {notes.map((n) => (
          <li key={n} className="flex items-center gap-2 text-[15px] text-ink/80">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden /> {n}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()
  const product = useMemo(() => (slug ? getProduct(slug) : undefined), [slug])
  const [size, setSize] = useState<Size>('50ml')
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const { add } = useCart()

  usePageMeta(
    product ? `${product.name} — ${product.season} | QUATRÉA` : 'Fragrance | QUATRÉA',
    product ? `${product.name}: ${product.tagline}. ${product.description}` : 'QUATRÉA luxury niche fragrance.',
  )

  if (!product) return <Navigate to="/collection" replace />

  const handleAdd = () => {
    add(product.id, size, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  return (
    <main className="pt-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Link to="/collection" className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-ink/60 transition-colors hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold">
          <ArrowLeft className="h-4 w-4" aria-hidden /> Back to Collection
        </Link>

        <div className="mt-8 grid grid-cols-1 gap-10 pb-16 lg:grid-cols-2 lg:gap-16">
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <div className="overflow-hidden" style={{ backgroundColor: product.bg }}>
              <img src={product.image} alt={`${product.name} — ${product.season} luxury perfume bottle by QUATRÉA`} className="aspect-[4/5] w-full object-cover" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: product.accent }}>{product.season} · {product.family}</p>
            <h1 className="mt-3 font-display text-5xl leading-none tracking-wide text-ink sm:text-6xl">{product.name}</h1>
            <p className="mt-3 font-serif text-2xl italic text-ink/65">{product.tagline}</p>
            <p className="mt-4 text-[15px] leading-relaxed text-ink/75">{product.description}</p>
            <p className="mt-6 font-display text-4xl text-ink" aria-live="polite">{money(product.prices[size])}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-ink/50">Eau de Parfum · {size}</p>

            <div className="mt-8">
              <span id="size-label" className="text-[11px] font-semibold uppercase tracking-[0.25em] text-ink/70">Select Size</span>
              <div className="mt-3 flex gap-2" role="group" aria-labelledby="size-label">
                {SIZES.map((s) => (
                  <button key={s} type="button" onClick={() => setSize(s)} aria-pressed={size === s} className={`flex-1 border px-2 py-3.5 text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${size === s ? 'border-ink bg-ink text-ivory' : 'border-ink/25 bg-white text-ink hover:border-ink'}`}>
                    {s}<span className="block text-xs font-normal opacity-70">{money(product.prices[s])}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="flex items-center border border-ink/25 bg-white" aria-label="Quantity">
                <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-3.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold" aria-label="Decrease quantity"><Minus className="h-4 w-4" aria-hidden /></button>
                <span className="w-10 text-center font-semibold" aria-live="polite">{qty}</span>
                <button type="button" onClick={() => setQty((q) => Math.min(9, q + 1))} className="p-3.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold" aria-label="Increase quantity"><Plus className="h-4 w-4" aria-hidden /></button>
              </div>
              <button type="button" onClick={handleAdd} className="flex flex-1 items-center justify-center gap-3 bg-ink px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-ivory transition-colors hover:bg-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold">
                {added ? <><Check className="h-4 w-4" aria-hidden /> Added to Bag</> : <><ShoppingBag className="h-4 w-4" aria-hidden /> Add to Bag — {money(product.prices[size] * qty)}</>}
              </button>
            </div>
            <p className="mt-3 text-xs text-ink/55">Complimentary shipping · Returns within 30 days · Sample vials included with every order</p>

            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-ink/10 pt-6 text-center">
              <div><dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/50">Longevity</dt><dd className="mt-1 text-sm font-semibold text-ink">{product.longevity}</dd></div>
              <div><dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/50">Sillage</dt><dd className="mt-1 text-sm font-semibold text-ink">{product.sillage}</dd></div>
              <div><dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/50">Personality</dt><dd className="mt-1 text-sm font-semibold text-ink">{product.personality.split(',')[0]}</dd></div>
            </dl>
          </motion.div>
        </div>
      </div>

      {/* Notes pyramid */}
      <section className="bg-ink py-16 text-ivory sm:py-20" aria-label="Fragrance notes">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <h2 className="font-display text-4xl tracking-wide sm:text-5xl">The Olfactory Pyramid</h2>
            <p className="mt-3 max-w-xl font-serif text-xl italic text-ivory/65">Three acts of the same story — opening, heart, and the part that stays.</p>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-3">
            <NotesBlock title="Top Notes" notes={product.top} />
            <NotesBlock title="Heart Notes" notes={product.heart} />
            <NotesBlock title="Base Notes" notes={product.base} />
          </div>
        </div>
      </section>

      {/* Story / inspiration / craftsmanship */}
      <section className="bg-ivory py-16 sm:py-24" aria-label="Story and craftsmanship">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-3">
          <Reveal>
            <h2 className="font-display text-3xl tracking-wide text-ink">The Story</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-ink/75">{product.story}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-3xl tracking-wide text-ink">Seasonal Inspiration</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-ink/75">{product.inspiration}</p>
            <p className="mt-4 text-sm text-ink/60"><strong className="text-ink">Personality:</strong> {product.personality}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <h2 className="font-display text-3xl tracking-wide text-ink">Ingredients &amp; Craft</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-ink/75">{product.craftsmanship}</p>
            <p className="mt-4 text-sm text-ink/60">Eau de Parfum · 20% parfum concentration · Macerated 6–8 weeks · Made in Grasse, France</p>
          </Reveal>
        </div>
      </section>

      {/* Related */}
      <section className="bg-cream py-16 sm:py-24" aria-label="Related fragrances">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <h2 className="font-display text-4xl tracking-wide text-ink sm:text-5xl">Complete the Year</h2>
            <p className="mt-3 font-serif text-xl italic text-ink/65">The other three seasons are waiting.</p>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {related(product.id).map((p) => <ProductCard key={p.id} id={p.id} />)}
          </div>
        </div>
      </section>
    </main>
  )
}
