import { useEffect, useState } from 'react'
import Icon from './ui/Icon.jsx'
import { company, navLinks } from '../data/site.js'

/** Logo AERONUSA — quadcopter minimal di dalam kotak lime. */
export function LogoMark({ className = 'h-9 w-9' }) {
  return (
    <span className={`grid shrink-0 place-items-center rounded-xl bg-volt text-ink ${className}`}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        className="h-[58%] w-[58%]"
        aria-hidden="true"
      >
        <circle cx="5" cy="5" r="2.5" />
        <circle cx="19" cy="5" r="2.5" />
        <circle cx="5" cy="19" r="2.5" />
        <circle cx="19" cy="19" r="2.5" />
        <path d="M6.9 6.9 9.3 9.3M17.1 6.9 14.7 9.3M6.9 17.1l2.4-2.4M17.1 17.1l-2.4-2.4" />
        <rect x="9.5" y="9.5" width="5" height="5" rx="1.5" fill="currentColor" stroke="none" />
      </svg>
    </span>
  )
}

export function Logo({ dark = false, href = '#beranda' }) {
  return (
    <a href={href} className="flex items-center gap-2.5" aria-label={`${company.name} — beranda`}>
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-xl font-extrabold leading-none tracking-[-0.01em] ${
            dark ? 'text-white' : 'text-ink'
          }`}
        >
          {company.name}
        </span>
        <span
          className={`mt-1 text-[9px] font-semibold uppercase tracking-[0.22em] ${
            dark ? 'text-white/45' : 'text-ink-soft'
          }`}
        >
          Sewa Drone
        </span>
      </span>
    </a>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow duration-300 ${
        scrolled ? 'bg-white/95 shadow-[0_1px_0_rgba(10,10,10,0.08)] backdrop-blur' : 'bg-white'
      }`}
    >
      <div className="shell flex h-16 items-center justify-between gap-6 md:h-[72px]">
        <Logo />

        <nav aria-label="Navigasi utama" className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-[13px] font-medium text-ink-soft transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href="#kontak" className="btn btn-volt hidden sm:inline-flex">
            Minta Penawaran
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Tutup menu' : 'Buka menu'}
            className="grid h-10 w-10 place-items-center rounded-xl border border-mist-2 text-ink lg:hidden"
          >
            <Icon name={open ? 'close' : 'menu'} className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-mist-2 bg-white lg:hidden"
      >
        <nav aria-label="Navigasi mobile" className="shell flex flex-col py-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-mist py-3.5 font-display text-base font-bold uppercase tracking-wide text-ink last:border-0"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#kontak"
            onClick={() => setOpen(false)}
            className="btn btn-volt mt-4 w-full"
          >
            Minta Penawaran
          </a>
        </nav>
      </div>
    </header>
  )
}
