import { useEffect, useState } from 'react'
import Icon from './Icon.jsx'

/** Floating scroll-to-top control that appears after the hero. */
export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 640)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Kembali ke atas"
      className={`fixed bottom-5 right-5 z-40 grid h-11 w-11 place-items-center rounded-full bg-ink text-white shadow-tile transition-all duration-300 hover:-translate-y-1 hover:bg-ink-2 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <Icon name="arrowDown" className="h-4 w-4 rotate-180" strokeWidth={1.9} />
    </button>
  )
}
