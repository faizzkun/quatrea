import { useState } from 'react'
import { CheckCircle2, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-react'
import { usePageMeta } from '../hooks/usePageMeta'
import { Reveal } from '../components/Reveal'

interface Errors { name?: string; email?: string; subject?: string; message?: string }

export function Contact() {
  usePageMeta('Contact — QUATRÉA', 'Contact the QUATRÉA maison: enquiries, press, and stockists. We reply within two working days.')
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [saved, setSaved] = useState(false)

  const validate = (): boolean => {
    const e: Errors = {}
    if (form.name.trim().length < 2) e.name = 'Please enter your name (at least 2 characters).'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = 'Please enter a valid email address.'
    if (form.subject.trim().length < 3) e.subject = 'Please enter a subject (at least 3 characters).'
    if (form.message.trim().length < 20) e.message = 'Please write a message of at least 20 characters so we can help properly.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validate()) return
    try {
      const drafts = JSON.parse(localStorage.getItem('quatrea-contact-drafts') || '[]') as unknown[]
      drafts.push({ ...form, savedAt: new Date().toISOString() })
      localStorage.setItem('quatrea-contact-drafts', JSON.stringify(drafts))
    } catch {
      /* storage unavailable */
    }
    setSaved(true)
  }

  const field = 'w-full border border-ink/25 bg-white px-4 py-3 text-[15px] text-ink placeholder:text-ink/40 focus:border-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold'
  const label = 'mb-2 block text-[11px] font-semibold uppercase tracking-[0.25em] text-ink/70'

  return (
    <main className="bg-cream pt-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-5 pb-20 sm:px-8 lg:grid-cols-5">
        <Reveal className="lg:col-span-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-gold">Contact</p>
          <h1 className="mt-4 font-display text-5xl leading-[1.02] tracking-wide text-ink sm:text-6xl">Write to the Maison.</h1>
          <p className="mt-5 max-w-md font-serif text-xl italic leading-relaxed text-ink/65">
            Enquiries, press, stockists, or a question about finding your season — we read every letter.
          </p>
          <ul className="mt-10 space-y-5 text-[15px] text-ink/80">
            <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden /><span>Atelier QUATRÉA — Grasse, France<br /><span className="text-ink/55">Visits by appointment only.</span></span></li>
            <li className="flex items-start gap-3"><Mail className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden /><a href="mailto:maison@quatrea.example" className="hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold">maison@quatrea.example</a></li>
            <li className="flex items-start gap-3"><Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden /><a href="tel:+33493000000" className="hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold">+33 4 93 00 00 00</a></li>
          </ul>
          <div className="mt-8 flex gap-3">
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="QUATRÉA on Instagram" className="p-3 ring-1 ring-ink/20 transition-colors hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"><Instagram className="h-5 w-5" aria-hidden /></a>
            <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="QUATRÉA on X" className="p-3 ring-1 ring-ink/20 transition-colors hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"><Twitter className="h-5 w-5" aria-hidden /></a>
          </div>
          <p className="mt-10 border-t border-ink/10 pt-6 text-sm text-ink/60">
            Website crafted by{' '}
            <a href="https://faizankhan.pages.dev/" target="_blank" rel="noreferrer" className="font-semibold text-ink underline decoration-gold underline-offset-4 hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold">Faizan Khan</a>
            {' '}· <a href="tel:+923164438828" className="font-semibold text-ink underline decoration-gold underline-offset-4 hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold">+92 316 443 8828</a>
          </p>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-3">
          {saved ? (
            <div className="border border-gold/50 bg-white p-8 sm:p-10" role="status">
              <CheckCircle2 className="h-10 w-10 text-gold" aria-hidden />
              <h2 className="mt-4 font-display text-3xl tracking-wide text-ink">Message validated &amp; saved locally.</h2>
              <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-ink/75">
                No email service is connected yet — your message has <strong>not</strong> been sent. It is validated and saved locally as a draft in this browser. Connect an email service (for example a form endpoint or transactional email provider) to enable sending.
              </p>
              <button type="button" onClick={() => { setSaved(false); setForm({ name: '', email: '', subject: '', message: '' }) }} className="mt-6 bg-ink px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-ivory hover:bg-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold">
                Write Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="bg-white p-7 shadow-[0_2px_30px_rgba(20,18,16,0.06)] sm:p-10">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="c-name" className={label}>Name *</label>
                  <input id="c-name" className={field} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" autoComplete="name" />
                  {errors.name && <p className="mt-2 text-sm text-red-700" role="alert">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="c-email" className={label}>Email *</label>
                  <input id="c-email" type="email" className={field} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" autoComplete="email" />
                  {errors.email && <p className="mt-2 text-sm text-red-700" role="alert">{errors.email}</p>}
                </div>
              </div>
              <div className="mt-6">
                <label htmlFor="c-subject" className={label}>Subject *</label>
                <input id="c-subject" className={field} value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="What is your message about?" />
                {errors.subject && <p className="mt-2 text-sm text-red-700" role="alert">{errors.subject}</p>}
              </div>
              <div className="mt-6">
                <label htmlFor="c-message" className={label}>Message *</label>
                <textarea id="c-message" rows={6} className={`${field} resize-y`} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us what you are looking for…" />
                {errors.message && <p className="mt-2 text-sm text-red-700" role="alert">{errors.message}</p>}
              </div>
              <button type="submit" className="mt-8 w-full bg-ink py-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-ivory transition-colors hover:bg-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:w-auto sm:px-10">
                Send Message
              </button>
              <p className="mt-4 text-xs leading-relaxed text-ink/55">
                We reply within two working days. This form validates your message in the browser; sending requires an email service, which is not connected yet.
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </main>
  )
}
