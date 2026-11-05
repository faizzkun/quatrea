import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react'
import { ARTICLES, getArticle } from '../data/journal'
import { usePageMeta } from '../hooks/usePageMeta'
import { Reveal } from '../components/Reveal'

export function Article() {
  const { slug } = useParams<{ slug: string }>()
  const article = slug ? getArticle(slug) : undefined
  usePageMeta(
    article ? `${article.title} — QUATRÉA Journal` : 'Journal — QUATRÉA',
    article ? article.excerpt : 'The QUATRÉA Journal.',
  )
  if (!article) return <Navigate to="/journal" replace />
  const next = ARTICLES.find((a) => a.slug !== article.slug)

  return (
    <main className="bg-cream pt-28">
      <article className="mx-auto max-w-3xl px-5 pb-20 sm:px-8">
        <Link to="/journal" className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-ink/60 transition-colors hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold">
          <ArrowLeft className="h-4 w-4" aria-hidden /> Back to Journal
        </Link>
        <Reveal>
          <p className="mt-10 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">QUATRÉA Journal</p>
          <h1 className="mt-4 font-display text-4xl leading-[1.05] tracking-wide text-ink sm:text-6xl">{article.title}</h1>
          <p className="mt-4 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-ink/55">
            <span>{article.date}</span><span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" aria-hidden /> {article.readingTime}</span>
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <img src={article.image} alt={article.imageAlt} className="mt-10 aspect-[16/9] w-full object-cover" />
        </Reveal>
        <div className="mt-10 space-y-6">
          {article.body.map((para, i) => (
            <p key={i} className={i === 0 ? 'font-serif text-2xl italic leading-relaxed text-ink/85' : 'text-[17px] leading-[1.85] text-ink/80'}>
              {para}
            </p>
          ))}
        </div>
        <div className="mt-14 border-t border-ink/15 pt-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">Continue Reading</p>
          {next && (
            <Link to={`/journal/${next.slug}`} className="group mt-3 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold">
              <span className="font-display text-2xl tracking-wide text-ink transition-colors group-hover:text-gold sm:text-3xl">{next.title}</span>
              <ArrowRight className="h-6 w-6 shrink-0 text-ink transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          )}
          <Link to="/collection" className="mt-8 inline-flex items-center gap-3 bg-ink px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-ivory transition-colors hover:bg-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold">
            Discover the Collection
          </Link>
        </div>
      </article>
    </main>
  )
}
