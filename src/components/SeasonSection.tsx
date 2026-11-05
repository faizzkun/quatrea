import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { Fragrance } from '../data/products'

gsap.registerPlugin(ScrollTrigger)

export function SeasonSection({ product, index }: { product: Fragrance; index: number }) {
  const ref = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const reverse = index % 2 === 1

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 768) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { y: 60, scale: 1.06 },
        {
          y: -40,
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
        },
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-20 sm:py-28"
      style={{ backgroundColor: product.bg }}
      aria-label={`${product.season} — ${product.name}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -top-6 right-0 select-none font-display text-[22vw] leading-none opacity-[0.07]"
        style={{ color: product.accent }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className={`mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16 ${reverse ? '' : ''}`}>
        <div className={reverse ? 'lg:order-2' : ''}>
          <div className="overflow-hidden">
            <img
              ref={imgRef}
              src={product.image}
              alt={`${product.name} perfume bottle in a ${product.season.toLowerCase()} setting`}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
        </div>
        <div className={reverse ? 'lg:order-1' : ''}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: product.accent }}>
            {product.season} · {product.family}
          </p>
          <h3 className="mt-4 font-display text-5xl leading-none tracking-wide text-ink sm:text-6xl lg:text-7xl">{product.name}</h3>
          <p className="mt-3 font-serif text-2xl italic text-ink/65">{product.tagline}</p>
          <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-ink/75">{product.description}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {[...product.top.slice(0, 2), ...product.heart.slice(0, 1), ...product.base.slice(0, 1)].map((n) => (
              <span key={n} className="border border-ink/20 bg-white/60 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-ink/70">
                {n}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <p className="text-sm text-ink/60">
              From <span className="text-lg font-semibold text-ink">${product.prices['50ml']}</span> · {product.longevity} · {product.sillage} sillage
            </p>
          </div>
          <Link
            to={`/products/${product.slug}`}
            className="mt-8 inline-flex items-center gap-3 bg-ink px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-ivory transition-colors hover:bg-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
          >
            Discover {product.name} <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  )
}
