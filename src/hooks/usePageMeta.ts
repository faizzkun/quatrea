import { useEffect } from 'react'

export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title
    let meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', description)
    window.scrollTo(0, 0)
  }, [title, description])
}
