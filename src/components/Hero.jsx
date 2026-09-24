import Icon from './ui/Icon.jsx'
import Reveal from './ui/Reveal.jsx'
import DronePlate from './ui/DronePlate.jsx'
import { heroStats } from '../data/site.js'

function SkyBackdrop() {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-sky-top via-sky-mid to-white" />

      {/* sun glow */}
      <div className="absolute -top-24 left-1/2 h-[420px] w-[620px] -translate-x-1/2 rounded-full bg-white/50 blur-3xl" />

      {/* soft clouds */}
      <div className="absolute left-[6%] top-[22%] h-16 w-56 rounded-full bg-white/60 blur-2xl" />
      <div className="absolute right-[8%] top-[16%] h-20 w-72 rounded-full bg-white/45 blur-3xl" />
      <div className="absolute left-[28%] top-[46%] h-12 w-48 rounded-full bg-white/40 blur-2xl" />

      {/* horizon dunes */}
      <svg
        viewBox="0 0 1440 420"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-[52%] w-full"
      >
        <defs>
          <linearGradient id="dune-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#eef1f4" />
          </linearGradient>
        </defs>
        <path
          d="M0 268C170 214 330 300 520 262 700 226 862 306 1040 258 1200 214 1330 258 1440 232V420H0Z"
          fill="url(#dune-fill)"
        />
        <path
          d="M0 268C170 214 330 300 520 262 700 226 862 306 1040 258 1200 214 1330 258 1440 232"
          fill="none"
          stroke="#dde3e8"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="beranda" className="relative isolate overflow-hidden">
      <SkyBackdrop />

      <div className="shell relative pt-14 text-center md:pt-20">
        <Reveal>
          <p className="eyebrow mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/60 px-3.5 py-1.5 text-ink backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-volt-deep" />
            <span className="sm:hidden">Sewa Drone · Pilot Bersertifikat</span>
            <span className="hidden sm:inline">
              Penyewaan Drone Enterprise · Pilot & Izin Terbang Bersertifikat
            </span>
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mx-auto max-w-4xl font-display text-[2rem] font-extrabold uppercase leading-[1.03] text-ink sm:text-5xl md:text-[3.5rem] lg:text-[4.15rem]">
            Sewa Drone Siap Operasi
            <br className="hidden md:block" /> dalam 24 Jam
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-ink-soft md:text-[15px]">
            Armada terawat, pilot bersertifikat, dan hasil data siap pakai dalam satu paket sewa.
            Survei, inspeksi, dan pemetaan tanpa perlu membeli unit sendiri.
          </p>
        </Reveal>

        <Reveal delay={220}>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a href="#kontak" className="btn btn-volt px-6 py-3 text-sm shadow-tile">
              <Icon name="calendar" className="h-4 w-4" strokeWidth={1.8} />
              Minta Penawaran
            </a>
            <a
              href="#armada"
              className="btn border border-ink/10 bg-white/70 px-6 py-3 text-sm text-ink backdrop-blur hover:border-ink/30"
            >
              Lihat Armada
              <Icon name="arrowDown" className="h-4 w-4" strokeWidth={1.8} />
            </a>
          </div>
        </Reveal>
      </div>

      <Reveal delay={120} className="relative mt-10 md:mt-2">
        <DronePlate
          alt="Drone quadcopter AERONUSA siap terbang"
          float
          className="mx-auto w-[92%] max-w-[1080px]"
        />
      </Reveal>

      {/* stat strip */}
      <div className="relative mt-6 border-y border-mist-2 bg-white/70 backdrop-blur-sm md:mt-0">
        <dl className="shell grid grid-cols-2 gap-x-6 gap-y-6 py-6 md:grid-cols-4 md:py-7">
          {heroStats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 70} className="text-center md:text-left">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-display text-2xl font-extrabold text-ink md:text-3xl">
                  {stat.value}
                </span>
                <span className="mt-1 block text-[11px] font-medium uppercase tracking-[0.14em] text-ink-soft">
                  {stat.label}
                </span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
