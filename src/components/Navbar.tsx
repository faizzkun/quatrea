import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, ShoppingBag, X } from 'lucide-react'
import { useCart } from '../context/CartContext'

const LINKS = [
  { to: '/collection', label: 'Collection' },
  { to: '/our-story', label: 'Our Story' },
  { to: '/journal', label: 'Journal' },
  { to: '/contact', label: 'Contact' },
]

export function Navbar() {
  const { count, setDrawerOpen } = useCart()
  const [open, setOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0)
      setScrolled(h.scrollTop > 24)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? 'bg-ivory/95 shadow-[0_1px_0_rgba(20,18,16,0.08)] backdrop-blur' : 'bg-transparent'}`}>
      <div className="h-[2px] bg-gold" style={{ width: `${progress}%` }} aria-hidden />
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8" aria-label="Main navigation">
        <Link to="/" className="font-display text-2xl tracking-[0.18em] text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-gold" aria-label="QUATRÉA home">
          QUATRÉA
        </Link>
        <ul className="hidden items-center gap-9 lg:flex">
          {LINKS.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  `group relative text-[11px] font-semibold uppercase tracking-[0.25em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${isActive ? 'text-gold' : 'text-ink/75 hover:text-ink'}`
                }
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" aria-hidden />
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="relative flex items-center gap-2 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            aria-label={`Open shopping bag, ${count} item${count === 1 ? '' : 's'}`}
          >
            <ShoppingBag className="h-5 w-5" aria-hidden />
            <span className="hidden sm:inline">Bag</span>
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-white" aria-hidden>
                {count}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="p-2 text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-gold lg:hidden"
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Menu className="h-6 w-6" aria-hidden />
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ink text-ivory lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex items-center justify-between px-5 py-4">
              <span className="font-display text-2xl tracking-[0.18em]">QUATRÉA</span>
              <button type="button" onClick={() => setOpen(false)} className="p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold" aria-label="Close menu">
                <X className="h-6 w-6" aria-hidden />
              </button>
            </div>
            <ul className="mt-10 space-y-2 px-6">
              {[{ to: '/', label: 'Home' }, ...LINKS].map((l, i) => (
                <motion.li key={l.to} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 * i }}>
                  <Link to={l.to} onClick={() => setOpen(false)} className="block py-3 font-display text-4xl tracking-wide focus:outline-none focus-visible:ring-2 focus-visible:ring-gold">
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <p className="mt-12 px-6 font-serif text-xl italic text-ivory/60">Four seasons. Four expressions of you.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
