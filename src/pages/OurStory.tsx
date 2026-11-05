import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PRODUCTS } from '../data/products'
import { usePageMeta } from '../hooks/usePageMeta'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/ProductCard'

export function OurStory() {
  usePageMeta(
    'Our Story — QUATRÉA',
    'The story of QUATRÉA: a small atelier in Grasse, four fragrances, four seasons, and a belief that perfume should be remembered, not announced.',
  )
  return (
    <main className="bg-ivory pt-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-gold">Our Story</p>
          <h1 className="mt-4 font-display text-5xl leading-[1.02] tracking-wide text-ink sm:text-6xl lg:text-7xl">
            A Small Atelier,<br />A Slow Idea.
          </h1>
          <p className="mx-auto mt-6 max-w-xl font-serif text-2xl italic leading-relaxed text-ink/65">
            QUATRÉA began with a question asked in a garden in Grasse: why do we wear the same scent in January that we wore in July?
          </p>
        </Reveal>
      </div>

      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8" aria-label="The beginning">
        <Reveal>
          <p className="text-lg leading-relaxed text-ink/80">
            The atelier was founded by a small group of perfumers who had spent their careers making fragrances for other houses — beautiful work, but always answered to a calendar that was not the year’s. A spring launch, a summer edition, a limited flanker: the seasons were used as marketing, never as material.
          </p>
          <p className="mt-5 text-lg leading-relaxed text-ink/80">
            So they did the opposite. They chose four seasons and gave each one a full year of work. No brief from a boardroom, no target demographic, no note chosen because it tested well. Only a walk through a garden in April, a long afternoon in July, an evening by a fire in October, a night of snow in January — and the discipline to compose until the bottle smelled like the day it was made for.
          </p>
          <p className="mt-5 text-lg leading-relaxed text-ink/80">
            That is why QUATRÉA makes four fragrances and no more. A house that makes forty scents is a catalogue. A house that makes four is a point of view.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8" aria-label="The four-season inspiration">
        <SectionHeading eyebrow="Four-Season Inspiration" title="The Year, Composed" />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((p) => (
            <Reveal key={p.id}>
              <Link to={`/products/${p.slug}`} className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-gold">
                <div className="overflow-hidden" style={{ backgroundColor: p.bg }}>
                  <img src={p.image} alt={`${p.name} perfume bottle`} loading="lazy" className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.05]" />
                </div>
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: p.accent }}>{p.season}</p>
                <h3 className="mt-1 font-display text-2xl tracking-wide text-ink">{p.name}</h3>
                <p className="mt-2 font-serif text-lg italic leading-relaxed text-ink/65">{p.inspiration}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-ink py-20 text-ivory sm:py-24" aria-label="Craftsmanship">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
          <Reveal>
            <img src="/images/craftsmanship.webp" alt="The perfumer's organ at the QUATRÉA atelier in Grasse" loading="lazy" className="aspect-[4/3] w-full object-cover" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-gold">Craftsmanship</p>
            <h2 className="mt-4 font-display text-4xl leading-[1.05] tracking-wide sm:text-5xl">Slow Is Not a Style.<br />It Is a Method.</h2>
            <p className="mt-6 text-[15px] leading-relaxed text-ivory/75">
              Every QUATRÉA composition is macerated for six to eight weeks before it is judged, because a fragrance that is rushed will always smell rushed — the top notes shouting over a base that never had time to settle. Natural materials are chosen for character: cold-pressed citrus within hours of harvest, iris butter aged three years, cultivated oud balanced with rose absolute.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-ivory/75">
              The bottles are filled in small batches, checked by hand, and released only when they smell like the season on the label. If a batch does not, it waits. Time is the one ingredient we never negotiate on.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8" aria-label="Philosophy">
        <Reveal>
          <p className="font-serif text-3xl italic leading-relaxed text-ink/80 sm:text-4xl">
            “Perfume is not worn. It is remembered — in a room, on a coat, in a season you thought you had forgotten.”
          </p>
          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">The QUATRÉA Philosophy</p>
          <Link to="/collection" className="mt-10 inline-flex items-center gap-3 bg-ink px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-ivory transition-colors hover:bg-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold">
            Discover the Collection <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </Reveal>
      </section>
    </main>
  )
}
