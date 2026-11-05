import { Link } from 'react-router-dom'
import { ArrowUpRight, Clock } from 'lucide-react'
import { ARTICLES } from '../data/journal'
import { usePageMeta } from '../hooks/usePageMeta'
import { Reveal } from '../components/Reveal'

export function Journal() {
  usePageMeta('Journal — QUATRÉA', 'The QUATRÉA Journal: essays on finding your signature scent, how seasons shape fragrance, understanding notes, and the beauty of niche perfumery.')
  return (
    <main className="bg-cream pt-28">
      <div className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <Reveal className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-gold">Journal</p>
          <h1 className="mt-4 font-display text-5xl leading-[1.02] tracking-wide text-ink sm:text-6xl">Notes on Fragrance.</h1>
          <p className="mt-5 max-w-xl font-serif text-xl italic leading-relaxed text-ink/65">
            Essays from the atelier — on seasons, notes, and the quiet art of choosing a scent that feels like you.
          </p>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2">
          {ARTICLES.map((a, i) => (
            <article key={a.slug} className={i === 0 ? 'md:col-span-2' : ''}>
              <Link to={`/journal/${a.slug}`} className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-gold" aria-label={`Read: ${a.title}`}>
                <div className="overflow-hidden bg-white">
                  <img src={a.image} alt={a.imageAlt} loading="lazy" className={`w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04] ${i === 0 ? 'aspect-[16/8]' : 'aspect-[16/10]'}`} />
                </div>
                <div className="flex flex-wrap items-center gap-3 pt-5 text-[11px] font-semibold uppercase tracking-[0.25em] text-ink/50">
                  <span>{a.date}</span><span aria-hidden>·</span>
                  <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" aria-hidden /> {a.readingTime}</span>
                </div>
                <h2 className="mt-3 font-display text-3xl leading-tight tracking-wide text-ink transition-colors group-hover:text-gold sm:text-4xl">{a.title}</h2>
                <p className="mt-3 max-w-2xl font-serif text-xl italic leading-relaxed text-ink/65">{a.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-2 border-b border-ink pb-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-ink group-hover:border-gold group-hover:text-gold">
                  Read the article <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
