import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { PRODUCTS, money } from '../data/products'
import { Reveal } from './Reveal'

export function ProductCard({ id }: { id: string }) {
  const p = PRODUCTS.find((x) => x.id === id)
  if (!p) return null
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <Link to={`/products/${p.slug}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-gold" aria-label={`Discover ${p.name}, ${p.season} fragrance`}>
        <div className="relative overflow-hidden bg-white" style={{ backgroundColor: p.bg }}>
          <img
            src={p.image}
            alt={`${p.name} — ${p.season} luxury perfume bottle by QUATRÉA`}
            loading="lazy"
            className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
          />
          <span
            className="absolute left-4 top-4 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-white"
            style={{ backgroundColor: p.accent }}
          >
            {p.season}
          </span>
        </div>
        <div className="flex items-start justify-between gap-4 pt-5">
          <div>
            <h3 className="font-display text-2xl tracking-wide text-ink">{p.name}</h3>
            <p className="mt-1 font-serif text-lg italic text-ink/60">{p.tagline}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-ink/50">{p.family}</p>
          </div>
          <p className="shrink-0 pt-1 text-sm font-semibold text-ink">From {money(p.prices['50ml'])}</p>
        </div>
        <span className="mt-4 inline-flex items-center gap-2 border-b border-ink pb-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-ink transition-colors group-hover:border-gold group-hover:text-gold">
          Discover fragrance <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </span>
      </Link>
    </motion.article>
  )
}

export function CollectionGrid({ ids }: { ids: string[] }) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
      {ids.map((id) => (
        <ProductCard key={id} id={id} />
      ))}
    </div>
  )
}

export function SectionHeading({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <Reveal className="mx-auto max-w-3xl text-center">
      <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-gold">{eyebrow}</p>
      <h2 className="mt-4 font-display text-4xl leading-[1.05] tracking-wide text-ink sm:text-5xl lg:text-6xl">{title}</h2>
      {intro && <p className="mx-auto mt-5 max-w-xl font-serif text-xl italic leading-relaxed text-ink/65">{intro}</p>}
    </Reveal>
  )
}
