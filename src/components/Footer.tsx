import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUp, Instagram, Twitter, X } from 'lucide-react'
import { PRODUCTS } from '../data/products'

export function Footer() {
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')
  const [error, setError] = useState('')

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.')
      setMsg('')
      return
    }
    setError('')
    setMsg('Thank you — newsletter service pending. Your address was not subscribed; connect a newsletter service to enable sign-ups.')
    setEmail('')
  }

  return (
    <footer className="bg-ink text-ivory">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-display text-3xl tracking-[0.18em]">QUATRÉA</p>
            <p className="mt-4 max-w-sm font-serif text-xl italic leading-relaxed text-ivory/65">
              Four seasons. Four expressions of you.
            </p>
            <form onSubmit={subscribe} className="mt-8 max-w-sm" noValidate>
              <label htmlFor="newsletter-email" className="text-[11px] font-semibold uppercase tracking-[0.25em] text-ivory/70">
                Join the Maison list
              </label>
              <div className="mt-3 flex border border-ivory/30 focus-within:border-gold">
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full bg-transparent px-4 py-3 text-sm text-ivory placeholder:text-ivory/40 focus:outline-none"
                />
                <button type="submit" className="shrink-0 bg-gold px-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-ivory focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
                  Join
                </button>
              </div>
              {error && <p className="mt-2 text-sm text-red-300" role="alert">{error}</p>}
              {msg && <p className="mt-2 text-sm text-ivory/75" role="status">{msg}</p>}
            </form>
          </div>
          <nav aria-label="Footer navigation">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-ivory/60">Maison</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link className="hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold" to="/collection">Collection</Link></li>
              <li><Link className="hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold" to="/our-story">Our Story</Link></li>
              <li><Link className="hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold" to="/journal">Journal</Link></li>
              <li><Link className="hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold" to="/contact">Contact</Link></li>
              <li><Link className="hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold" to="/cart">Shopping Bag</Link></li>
            </ul>
          </nav>
          <nav aria-label="Season navigation">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-ivory/60">The Four Seasons</p>
            <ul className="mt-4 space-y-3 text-sm">
              {PRODUCTS.map((p) => (
                <li key={p.id}>
                  <Link className="hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold" to={`/products/${p.slug}`}>
                    {p.name} — {p.season}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex gap-3">
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="QUATRÉA on Instagram" className="p-2 ring-1 ring-ivory/25 transition-colors hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"><Instagram className="h-4 w-4" aria-hidden /></a>
              <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="QUATRÉA on X" className="p-2 ring-1 ring-ivory/25 transition-colors hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"><Twitter className="h-4 w-4" aria-hidden /></a>
              <a href="https://www.pinterest.com" target="_blank" rel="noreferrer" aria-label="QUATRÉA on Pinterest" className="p-2 ring-1 ring-ivory/25 transition-colors hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"><X className="h-4 w-4" aria-hidden /></a>
            </div>
          </nav>
        </div>
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-ivory/15 pt-6 text-xs text-ivory/55 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} QUATRÉA — A fictional luxury fragrance house. All fragrances are original creations.</p>
          <p>
            Website crafted by{' '}
            <a href="https://faizankhan.pages.dev/" target="_blank" rel="noreferrer" className="text-ivory underline decoration-gold underline-offset-4 hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold">Faizan Khan</a>
            {' '}· <a href="tel:+923164438828" className="text-ivory underline decoration-gold underline-offset-4 hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold">+92 316 443 8828</a>
          </p>
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="inline-flex items-center gap-2 text-ivory hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold" aria-label="Back to top">
            Back to top <ArrowUp className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>
    </footer>
  )
}
