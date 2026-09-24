import Icon from './ui/Icon.jsx'
import Reveal from './ui/Reveal.jsx'
import { capabilities } from '../data/site.js'

/* Deterministic decorative art — computed once at module scope. */
const cloudDots = Array.from({ length: 56 }, (_, i) => {
  const col = i % 8
  const row = Math.floor(i / 8)
  return {
    x: 20 + col * 23 + (row % 2) * 6,
    y: 18 + row * 12,
    r: 1.1 + ((i * 7) % 5) * 0.45,
    volt: i % 13 === 0,
  }
})

function CapabilityArt({ kind }) {
  if (kind === 'cube') {
    return (
      <svg viewBox="0 0 200 108" className="h-full w-full" aria-hidden="true">
        {cloudDots.map((d, i) => (
          <circle
            key={i}
            cx={d.x}
            cy={d.y}
            r={d.r}
            fill={d.volt ? '#c1e01a' : '#0a0a0a'}
            opacity={d.volt ? 1 : 0.42}
          />
        ))}
      </svg>
    )
  }

  if (kind === 'layers') {
    return (
      <svg viewBox="0 0 200 108" className="h-full w-full" aria-hidden="true">
        {[34, 60, 86, 112, 138, 164, 190].map((r, i) => (
          <circle
            key={r}
            cx="14"
            cy="104"
            r={r}
            fill="none"
            stroke="#0a0a0a"
            strokeWidth="1"
            opacity={0.28 - i * 0.02}
          />
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1="14"
            y1="104"
            x2={14 + Math.cos((i * 14 * Math.PI) / 180) * 195}
            y2={104 - Math.sin((i * 14 * Math.PI) / 180) * 195}
            stroke={i === 2 ? '#c1e01a' : '#0a0a0a'}
            strokeWidth={i === 2 ? 1.8 : 1}
            opacity={i === 2 ? 1 : 0.3}
          />
        ))}
      </svg>
    )
  }

  if (kind === 'camera') {
    return (
      <svg viewBox="0 0 200 108" className="h-full w-full" aria-hidden="true">
        <rect
          x="34"
          y="18"
          width="132"
          height="72"
          rx="6"
          fill="none"
          stroke="#0a0a0a"
          strokeWidth="1.4"
          opacity="0.35"
        />
        <path
          d="M34 32v-9a5 5 0 0 1 5-5h10M166 32v-9a5 5 0 0 0-5-5h-10M34 76v9a5 5 0 0 0 5 5h10M166 76v9a5 5 0 0 1-5 5h-10"
          stroke="#0a0a0a"
          strokeWidth="2.4"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="100" cy="54" r="17" fill="#c1e01a" />
        <path d="m95 46 14 8-14 8z" fill="#0a0a0a" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 200 108" className="h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id="thermal-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff4d2e" />
          <stop offset="45%" stopColor="#ffb347" />
          <stop offset="100%" stopColor="#2b6cff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="14" y="14" width="172" height="80" rx="8" fill="#101014" opacity="0.06" />
      <ellipse cx="72" cy="60" rx="46" ry="30" fill="url(#thermal-core)" />
      <ellipse cx="140" cy="46" rx="30" ry="22" fill="url(#thermal-core)" opacity="0.75" />
      <path
        d="M14 86h172"
        stroke="#0a0a0a"
        strokeWidth="1"
        opacity="0.18"
        strokeDasharray="3 4"
      />
    </svg>
  )
}

export default function Capabilities() {
  return (
    <section id="data" className="bg-white py-16 md:py-24">
      <div className="shell">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-center font-display text-[1.9rem] font-extrabold uppercase leading-[1.06] text-ink sm:text-4xl md:text-[2.6rem]">
            Hasil data siap
            <br className="hidden sm:block" /> dipakai tim Anda*
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((item, i) => (
            <Reveal key={item.id} delay={i * 70} className="h-full">
              <article className="tile flex h-full flex-col border-0 bg-mist p-5 transition-shadow duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-tile">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-white text-ink shadow-[0_1px_2px_rgba(10,10,10,0.08)]">
                  <Icon name={item.icon} className="h-5 w-5" strokeWidth={1.7} />
                </span>

                <div className="mt-5 aspect-[16/9] w-full overflow-hidden rounded-lg bg-white/70 p-2">
                  <CapabilityArt kind={item.icon} />
                </div>

                <h3 className="mt-5 min-h-[2.6em] font-display text-[13px] font-extrabold uppercase leading-[1.3] tracking-[0.04em] text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-[12.5px] leading-relaxed text-ink-soft">{item.copy}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mt-8 text-center text-[12px] text-ink-soft">
            *Format keluaran dan tingkat ketelitian disesuaikan dengan kebutuhan proyek Anda.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
