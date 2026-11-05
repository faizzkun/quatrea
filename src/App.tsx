import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Lenis from 'lenis'
import { CartProvider, useCart } from './context/CartContext'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { CartDrawer } from './components/CartDrawer'
import { Home } from './pages/Home'
import { Collection } from './pages/Collection'
import { ProductDetail } from './pages/ProductDetail'
import { OurStory } from './pages/OurStory'
import { Journal } from './pages/Journal'
import { Article } from './pages/Article'
import { Contact } from './pages/Contact'
import { Cart } from './pages/Cart'

function Toast() {
  const { toast } = useCart()
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 left-1/2 z-[90] -translate-x-1/2 whitespace-nowrap bg-ink px-6 py-3 text-sm text-ivory shadow-xl"
          role="status"
        >
          {toast}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/products/:slug" element={<ProductDetail />} />
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/journal/:slug" element={<Article />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

function CustomCursor() {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const dot = document.createElement('div')
    dot.setAttribute('aria-hidden', 'true')
    dot.style.cssText =
      'position:fixed;top:0;left:0;width:10px;height:10px;border-radius:9999px;background:#B9975B;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:width .2s,height .2s,opacity .2s;opacity:0.9'
    document.body.appendChild(dot)
    const move = (e: MouseEvent) => {
      dot.style.left = `${e.clientX}px`
      dot.style.top = `${e.clientY}px`
      const target = e.target as HTMLElement | null
      const interactive = target?.closest('a,button,select,input,textarea,[role="button"]')
      dot.style.width = interactive ? '28px' : '10px'
      dot.style.height = interactive ? '28px' : '10px'
      dot.style.opacity = interactive ? '0.45' : '0.9'
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => {
      window.removeEventListener('mousemove', move)
      dot.remove()
    }
  }, [])
  return null
}

export default function App() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 768) return
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true })
    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])

  return (
    <CartProvider>
      <BrowserRouter>
        <CustomCursor />
        <div className="min-h-screen bg-ivory font-sans text-ink antialiased">
          <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-ivory">
            Skip to content
          </a>
          <Navbar />
          <div id="main">
            <AnimatedRoutes />
          </div>
          <Footer />
          <CartDrawer />
          <Toast />
        </div>
      </BrowserRouter>
    </CartProvider>
  )
}
