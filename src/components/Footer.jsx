import { useState } from 'react'
import Icon from './ui/Icon.jsx'
import { Logo } from './Header.jsx'
import { company, footerColumns } from '../data/site.js'

const socials = [
  { label: 'LinkedIn', href: '#', glyph: 'in' },
  { label: 'Instagram', href: '#', glyph: 'ig' },
  { label: 'YouTube', href: '#', glyph: 'yt' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [joined, setJoined] = useState(false)

  const handleSubscribe = (event) => {
    event.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return
    setJoined(true)
    setEmail('')
  }

  return (
    <footer className="border-t border-white/10 bg-ink pb-8 pt-14 text-white">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr_1.4fr]">
          <div>
            <Logo dark />
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-white/55">
              {company.legal} — penyedia jasa sewa drone enterprise untuk infrastruktur,
              konstruksi, logistik, energi, dan pertanian presisi di Indonesia.
            </p>

            <form onSubmit={handleSubscribe} className="mt-6 max-w-xs">
              <label
                htmlFor="newsletter"
                className="mb-2 block font-display text-[11px] font-bold uppercase tracking-[0.14em] text-white/45"
              >
                Buletin armada &amp; studi kasus
              </label>
              <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 p-1 pl-4 focus-within:border-volt">
                <input
                  id="newsletter"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="anda@perusahaan.co.id"
                  className="w-full bg-transparent py-2 text-[13px] text-white outline-none placeholder:text-white/35"
                />
                <button
                  type="submit"
                  aria-label="Daftar buletin"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-volt text-ink transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5"
                >
                  <Icon name="arrowUpRight" className="h-4 w-4" strokeWidth={2} />
                </button>
              </div>
              {joined && (
                <p className="mt-2 text-[11.5px] font-medium text-volt">
                  Terima kasih! Silakan cek inbox untuk konfirmasi.
                </p>
              )}
            </form>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h2 className="font-display text-[11px] font-bold uppercase tracking-[0.14em] text-white/45">
                  {column.title}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href={column.href}
                        className="text-[13px] text-white/75 transition-colors duration-300 hover:text-volt"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
            <h2 className="font-display text-[11px] font-bold uppercase tracking-[0.14em] text-white/45">
              Hubungi Kami
            </h2>
            <ul className="mt-4 space-y-3 text-[13px] text-white/75">
              <li className="flex items-start gap-2.5">
                <Icon name="mail" className="mt-0.5 h-4 w-4 shrink-0 text-volt" />
                <a href={`mailto:${company.email}`} className="hover:text-volt">
                  {company.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="phone" className="mt-0.5 h-4 w-4 shrink-0 text-volt" />
                <a href={`tel:${company.phoneHref}`} className="hover:text-volt">
                  {company.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-volt" />
                {company.address}
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="clock" className="mt-0.5 h-4 w-4 shrink-0 text-volt" />
                {company.hours}
              </li>
            </ul>

            <ul className="mt-6 flex gap-2">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className="grid h-9 w-9 place-items-center rounded-full border border-white/15 font-display text-[10px] font-bold uppercase text-white/70 transition-colors hover:border-volt hover:text-volt"
                  >
                    {social.glyph}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-[11.5px] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {company.name}. Seluruh hak cipta dilindungi.
          </p>
          <ul className="flex flex-wrap items-center gap-5">
            <li>
              <a href="#kontak" className="transition-colors hover:text-volt">
                Kebijakan Privasi
              </a>
            </li>
            <li>
              <a href="#kontak" className="transition-colors hover:text-volt">
                Syarat &amp; Ketentuan
              </a>
            </li>
            <li>
              <a href="#kontak" className="transition-colors hover:text-volt">
                Keselamatan &amp; Perizinan
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
