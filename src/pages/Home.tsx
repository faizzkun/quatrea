import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { PRODUCTS } from '../data/products'
import { usePageMeta } from '../hooks/usePageMeta'
import { Reveal } from '../components/Reveal'
import { CollectionGrid, SectionHeading } from '../components/ProductCard'
import { SeasonSection } from '../components/SeasonSection'

gsap.registerPlugin(ScrollTrigger)

export function Home() {
  usePageMeta(
    'QUATRÉA — Four Seasons. Four Expressions of You.',
    'QUATRÉA is a luxury niche perfume house. Four fragrances, four seasons, four expressions of you — an exploration of time, nature, and the art of fragrance.',
  )
  const heroRef = useRef<HTMLElement>(null)
  const heroImgRef = useRef<HTMLImageElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 768) return
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.2, delay: 0.3, ease: 'power3.out' })
      gsap.fromTo(
        heroImgRef.current,
        { scale: 1.12 },
        { scale: 1, ease: 'none', scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true } },
      )
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <main>
      {/* HERO */}
      <section ref={heroRef} className="relative flex min-h-svh items-end overflow-hidden bg-ivory" aria-label="Introduction">
        <div className="absolute inset-0">
          <img
            ref={heroImgRef}
            src="/images/hero.webp"
            alt="Four QUATRÉA perfume bottles — spring, summer, autumn and winter — on an ivory stone plinth"
            className="h-full w-full object-cover object-center"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-ink/20" aria-hidden />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-32 sm:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-gold">Maison de Parfum — Grasse</p>
          <h1 ref={titleRef} className="mt-5 max-w-4xl font-display text-5xl leading-[0.95] tracking-wide text-white sm:text-7xl lg:text-8xl">
            FOUR SEASONS.<br />FOUR EXPRESSIONS<br />OF YOU.
          </h1>
          <p className="mt-6 max-w-xl font-serif text-2xl italic leading-relaxed text-white/85">
            An exploration of time, nature, and the art of fragrance.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link to="/collection" className="inline-flex items-center gap-3 bg-ivory px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-ink transition-colors hover:bg-gold hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2">
              Explore the Collection <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <a href="#seasons" className="inline-flex items-center gap-2 px-2 py-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gold">
              Scroll the seasons <ArrowDown className="h-4 w-4 animate-bounce" aria-hidden />
            </a>
          </div>
        </div>
      </section>

      {/* SCROLL STORYTELLING */}
      <div id="seasons">
        <div className="bg-ivory px-5 py-16 text-center sm:px-8">
          <SectionHeading
            eyebrow="The Journey"
            title="One Year. Four Moods."
            intro="Scroll slowly. Each season arrives in its own light, its own air, its own scent — and each one is a different way of being yourself."
          />
        </div>
        {PRODUCTS.map((p, i) => (
          <SeasonSection key={p.id} product={p} index={i} />
        ))}
      </div>

      {/* COLLECTION */}
      <section className="bg-cream py-20 sm:py-28" aria-label="The collection">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading eyebrow="The Collection" title="Four Fragrances" intro="Each composed slowly, in small batches, to be worn with the year — never against it." />
          <div className="mt-14">
            <CollectionGrid ids={PRODUCTS.map((p) => p.id)} />
          </div>
          <div className="mt-14 text-center">
            <Link to="/collection" className="inline-flex items-center gap-3 border border-ink px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-ink transition-colors hover:bg-ink hover:text-ivory focus:outline-none focus-visible:ring-2 focus-visible:ring-gold">
              View All Fragrances <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="bg-ivory py-20 sm:py-28" aria-label="Brand philosophy">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-gold">Philosophy</p>
            <h2 className="mt-4 font-display text-4xl leading-[1.05] tracking-wide text-ink sm:text-5xl">
              Perfume is not worn. It is <em className="font-serif italic">remembered.</em>
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-ink/75">
              We believe a fragrance should not announce you before you speak — it should stay in the room after you have gone, the way a season stays in a coat. QUATRÉA makes only four fragrances because we would rather make four things well than forty things adequately.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-ink/75">
              Each composition begins with a season, not a trend. We ask what spring actually smells like at first light, what summer holds at golden hour, what autumn keeps by the fire, what winter hides under snow — and we compose until the answer is in the bottle.
            </p>
            <Link to="/our-story" className="mt-8 inline-flex items-center gap-3 border-b border-ink pb-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-ink hover:border-gold hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold">
              Read Our Story <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="overflow-hidden">
              <img src="/images/craftsmanship.webp" alt="A perfumer's organ in Grasse — amber essence bottles and dried botanicals on a wooden workbench" loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-[1200ms] hover:scale-[1.03]" />
            </div>
            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-ink/50">The atelier organ — Grasse, France</p>
          </Reveal>
        </div>
      </section>

      {/* CRAFTSMANSHIP */}
      <section className="bg-ink py-20 text-ivory sm:py-28" aria-label="Craftsmanship">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading eyebrow="Craftsmanship" title="Made Slowly, In Small Batches" intro="Natural materials, long maceration, and no shortcuts — the quiet disciplines behind every bottle." />
          <div className="mt-14 grid grid-cols-1 gap-px bg-ivory/15 sm:grid-cols-3">
            {[
              { n: '01', t: 'Sourced with intent', d: 'Cold-pressed Sicilian citrus, three-year-aged iris butter, cultivated oud, and vanilla bourbon — chosen for character, not for cost.' },
              { n: '02', t: 'Macerated for weeks', d: 'Each blend rests for six to eight weeks so the top, heart and base settle into one another instead of sitting in layers.' },
              { n: '03', t: 'Bottled by hand', d: 'Filled, sealed and checked in small batches at the atelier. No fragrance leaves until it smells like the season it was made for.' },
            ].map((c) => (
              <div key={c.n} className="bg-ink p-8">
                <p className="font-display text-5xl text-gold">{c.n}</p>
                <h3 className="mt-4 font-display text-2xl tracking-wide">{c.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ivory/70">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden py-24 sm:py-32" aria-label="Discover your season">
        <img src="/images/hero.webp" alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-ink/60" aria-hidden />
        <div className="relative z-10 mx-auto max-w-3xl px-5 text-center">
          <Reveal>
            <h2 className="font-display text-5xl leading-[1.02] tracking-wide text-white sm:text-6xl lg:text-7xl">DISCOVER YOUR SEASON.</h2>
            <p className="mx-auto mt-5 max-w-lg font-serif text-2xl italic text-white/85">Which season are you today?</p>
            <Link to="/collection" className="mt-10 inline-flex items-center gap-3 bg-ivory px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-ink transition-colors hover:bg-gold hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2">
              Explore The Collection <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
