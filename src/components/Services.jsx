import { useCallback, useEffect, useRef, useState } from 'react'
import Icon from './ui/Icon.jsx'
import Media from './ui/Media.jsx'
import Reveal from './ui/Reveal.jsx'
import { industries } from '../data/site.js'

const pad = (n) => String(n).padStart(2, '0')

export default function Services() {
  const trackRef = useRef(null)
  const [index, setIndex] = useState(1)
  const total = industries.length

  const sync = useCallback(() => {
    const track = trackRef.current
    const first = track?.firstElementChild
    if (!track || !first) return
    const gap = parseFloat(getComputedStyle(track).columnGap) || 16
    const step = first.getBoundingClientRect().width + gap
    const next = Math.round(track.scrollLeft / step) + 1
    setIndex(Math.max(1, Math.min(total, next)))
  }, [total])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    track.addEventListener('scroll', sync, { passive: true })
    window.addEventListener('resize', sync)
    return () => {
      track.removeEventListener('scroll', sync)
      window.removeEventListener('resize', sync)
    }
  }, [sync])

  const goTo = (target) => {
    const track = trackRef.current
    const card = track?.children[Math.max(0, Math.min(total - 1, target))]
    if (!track || !card) return
    const left =
      card.getBoundingClientRect().left -
      track.getBoundingClientRect().left +
      track.scrollLeft
    track.scrollTo({ left, behavior: 'smooth' })
  }

  const progress = (index / total) * 100

  return (
    <section id="layanan" className="bg-white py-14 md:py-20">
      <div className="shell">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-center font-display text-[1.9rem] font-extrabold uppercase leading-[1.06] text-ink sm:text-4xl md:text-[2.6rem]">
            Layanan sewa drone
            <br className="hidden sm:block" /> untuk setiap industri
          </h2>
        </Reveal>

        <Reveal delay={80} className="mt-10 md:mt-12">
          <ul
            ref={trackRef}
            className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:-mx-10 md:px-10"
            aria-label="Daftar layanan sewa drone"
          >
            {industries.map((item, i) => (
              <li
                key={item.id}
                className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[31.4%]"
              >
                <article className="group relative">
                  <Media
                    src={item.image}
                    alt={item.alt}
                    tone={i}
                    className="aspect-[4/5] w-full rounded-2xl"
                    imgClassName="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                  />
                  <span className="absolute inset-0 rounded-2xl bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" />

                  <span className="absolute left-3.5 top-3.5 rounded-md bg-volt px-2.5 py-1 font-display text-[10px] font-bold uppercase tracking-[0.12em] text-ink">
                    {item.tag}
                  </span>

                  <div className="absolute inset-x-4 bottom-4">
                    <h3 className="font-display text-[15px] font-extrabold uppercase leading-[1.25] text-white md:text-base">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-[92%] text-[12px] leading-relaxed text-white/70">
                      {item.copy}
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-8 flex items-center gap-5 md:gap-8">
          <span className="font-display text-sm font-bold tabular-nums text-ink">
            {pad(index)}/{pad(total)}
          </span>

          <div
            className="relative h-px flex-1 bg-mist-2"
            role="progressbar"
            aria-valuemin={1}
            aria-valuemax={total}
            aria-valuenow={index}
            aria-label="Posisi layanan"
          >
            <span
              className="absolute inset-y-0 left-0 bg-ink transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => goTo(index - 2)}
              disabled={index === 1}
              aria-label="Layanan sebelumnya"
              className="grid h-10 w-10 place-items-center rounded-full border border-mist-2 text-ink transition-colors hover:border-ink disabled:cursor-not-allowed disabled:opacity-35"
            >
              <Icon name="arrowLeft" className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => goTo(index)}
              disabled={index === total}
              aria-label="Layanan berikutnya"
              className="grid h-10 w-10 place-items-center rounded-full bg-ink text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-35"
            >
              <Icon name="arrowRight" className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
