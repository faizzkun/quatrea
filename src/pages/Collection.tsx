import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Eye, X } from 'lucide-react'
import { PRODUCTS, SIZES, money, type Fragrance, type Season, type Size } from '../data/products'
import { usePageMeta } from '../hooks/usePageMeta'
import { useCart } from '../context/CartContext'
import { Reveal } from '../components/Reveal'
import { ProductCard } from '../components/ProductCard'

type Sort = 'featured' | 'price-asc' | 'price-desc' | 'name'

const FAMILIES = ['All', 'Floral Green', 'Citrus Amber', 'Woody Spicy', 'Woody Musky'] as const
const SEASONS: ('All' | Season)[] = ['All', 'Spring', 'Summer', 'Autumn', 'Winter']

export function Collection() {
  usePageMeta('The Collection — QUATRÉA', 'All four QUATRÉA fragrances: Éclosion, Solstice d’Or, Braise Royale and Nuit Glacée. Filter by season, fragrance family or price.')
  const [season, setSeason] = useState<'All' | Season>('All')
  const [family, setFamily] = useState<string>('All')
  const [sort, setSort] = useState<Sort>('featured')
  const [quick, setQuick] = useState<Fragrance | null>(null)
  const [qSize, setQSize] = useState<Size>('50ml')
  const { add } = useCart()

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => (season === 'All' || p.season === season) && (family === 'All' || p.family === family))
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.prices['50ml'] - b.prices['50ml'])
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.prices['50ml'] - a.prices['50ml'])
    if (sort === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [season, family, sort])

  const selectCls =
    'border border-ink/25 bg-white px-3 py-2.5 text-sm text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-gold'

  return (
    <main className="bg-cream pt-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-gold">The Collection</p>
          <h1 className="mt-4 font-display text-5xl leading-[1.02] tracking-wide text-ink sm:text-6xl">Four Seasons,<br />Four Fragrances.</h1>
          <p className="mt-5 max-w-xl font-serif text-xl italic leading-relaxed text-ink/65">
            Every fragrance is composed for its season — and for the person that season brings out in you.
          </p>
        </Reveal>

        {/* Filters */}
        <div className="mt-12 flex flex-col gap-4 border-y border-ink/10 py-5 lg:flex-row lg:items-end lg:justify-between" role="search" aria-label="Filter and sort fragrances">
          <div className="flex flex-wrap gap-6">
            <label className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/60">
              Season
              <select value={season} onChange={(e) => setSeason(e.target.value as 'All' | Season)} className={`mt-2 block ${selectCls}`} aria-label="Filter by season">
                {SEASONS.map((s) => <option key={s} value={s}>{s === 'All' ? 'All Seasons' : s}</option>)}
              </select>
            </label>
            <label className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/60">
              Fragrance Family
              <select value={family} onChange={(e) => setFamily(e.target.value)} className={`mt-2 block ${selectCls}`} aria-label="Filter by fragrance family">
                {FAMILIES.map((f) => <option key={f} value={f}>{f === 'All' ? 'All Families' : f}</option>)}
              </select>
            </label>
            <label className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/60">
              Sort By
              <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className={`mt-2 block ${selectCls}`} aria-label="Sort fragrances">
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name A–Z</option>
              </select>
            </label>
          </div>
          <p className="text-sm text-ink/60" aria-live="polite">
            {filtered.length} fragrance{filtered.length === 1 ? '' : 's'} shown
          </p>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-display text-3xl text-ink">No fragrances match those filters.</p>
            <p className="mt-2 font-serif text-xl italic text-ink/60">Try a different season or family.</p>
            <button type="button" onClick={() => { setSeason('All'); setFamily('All') }} className="mt-6 bg-ink px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-ivory hover:bg-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold">
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-8 gap-y-14 py-14 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((p) => (
              <div key={p.id} className="relative">
                <ProductCard id={p.id} />
                <button
                  type="button"
                  onClick={() => { setQuick(p); setQSize('50ml') }}
                  className="mt-3 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-ink/70 transition-colors hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  aria-label={`Quick view ${p.name}`}
                >
                  <Eye className="h-4 w-4" aria-hidden /> Quick View
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick view modal */}
      <AnimatePresence>
        {quick && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/60 p-0 sm:items-center sm:p-6" onClick={() => setQuick(null)} role="dialog" aria-modal="true" aria-label={`Quick view ${quick.name}`}>
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative grid w-full max-w-3xl grid-cols-1 bg-cream sm:grid-cols-2"
              onClick={(e) => e.stopPropagation()}
            >
              <button type="button" onClick={() => setQuick(null)} className="absolute right-3 top-3 z-10 bg-cream p-2 text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-gold" aria-label="Close quick view">
                <X className="h-5 w-5" aria-hidden />
              </button>
              <img src={quick.image} alt={`${quick.name} perfume bottle`} className="aspect-[4/5] w-full object-cover sm:aspect-auto sm:h-full" />
              <div className="p-7 sm:p-9">
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: quick.accent }}>{quick.season} · {quick.family}</p>
                <h2 className="mt-3 font-display text-4xl tracking-wide text-ink">{quick.name}</h2>
                <p className="mt-2 font-serif text-xl italic text-ink/65">{quick.tagline}</p>
                <p className="mt-4 text-sm leading-relaxed text-ink/75">{quick.description}</p>
                <p className="mt-5 font-display text-3xl text-ink">{money(quick.prices[qSize])}</p>
                <div className="mt-5 flex gap-2" role="group" aria-label="Choose size">
                  {SIZES.map((s) => (
                    <button key={s} type="button" onClick={() => setQSize(s)} aria-pressed={qSize === s} className={`flex-1 border px-2 py-3 text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${qSize === s ? 'border-ink bg-ink text-ivory' : 'border-ink/25 bg-white text-ink hover:border-ink'}`}>
                      {s}
                    </button>
                  ))}
                </div>
                <button type="button" onClick={() => { add(quick.id, qSize); setQuick(null) }} className="mt-4 w-full bg-ink py-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-ivory transition-colors hover:bg-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold">
                  Add to Bag — {money(quick.prices[qSize])}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
