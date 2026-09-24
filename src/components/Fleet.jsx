import Icon from './ui/Icon.jsx'
import Media from './ui/Media.jsx'
import Reveal from './ui/Reveal.jsx'
import { fleet, fleetNote } from '../data/site.js'

function FleetCard({ item, delay }) {
  return (
    <Reveal delay={delay} className="h-full">
      <article className="fleet-card tile group flex h-full flex-col bg-mist p-4 transition-[box-shadow,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-tile md:p-5">
        <div className="relative overflow-hidden rounded-xl bg-white">
          <span className="eyebrow absolute left-3 top-3 z-10 rounded-full bg-volt px-2.5 py-1 text-[10px] text-ink">
            {item.category}
          </span>

          {/* Tinggi tetap supaya framing semua foto konsisten antar baris. */}
          <Media
            src={item.image}
            alt={item.alt}
            tone={0}
            className="h-[190px] w-full sm:h-[210px]"
            imgClassName="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />
        </div>

        <h3 className="mt-5 font-display text-base font-extrabold uppercase leading-tight tracking-[0.01em] text-ink">
          {item.name}
        </h3>
        <p className="mt-2 text-[12.5px] leading-relaxed text-ink-soft">{item.copy}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {item.specs.map((spec) => (
            <li
              key={spec}
              className="rounded-full border border-mist-2 bg-white px-2.5 py-1 text-[11px] font-medium text-ink-soft"
            >
              {spec}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-mist-2 pt-4 md:mt-6">
          <p className="flex items-baseline gap-1">
            <span className="font-display text-lg font-extrabold text-ink">{item.price}</span>
            <span className="text-[11px] font-medium text-ink-soft">{item.unit}</span>
          </p>
          <a
            href="#kontak"
            className="inline-flex items-center gap-1 text-[11.5px] font-semibold uppercase tracking-[0.08em] text-ink transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5"
          >
            Sewa unit
            <Icon name="arrowUpRight" className="h-3.5 w-3.5" strokeWidth={2} />
          </a>
        </div>
      </article>
    </Reveal>
  )
}

export default function Fleet() {
  return (
    <section id="armada" className="bg-white py-16 md:py-24">
      <div className="shell">
        <Reveal>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <span className="eyebrow text-ink-soft">Armada Sewa</span>
              <h2 className="mt-3 font-display text-[1.9rem] font-extrabold uppercase leading-[1.04] text-ink sm:text-4xl md:text-[2.6rem]">
                Pilih drone yang
                <br className="hidden sm:block" /> sesuai medan Anda
              </h2>
            </div>
            <p className="max-w-sm text-[13px] leading-relaxed text-ink-soft md:text-right">
              Lima kelas unit siap sewa harian maupun bulanan. Bingung memilih? Tim kami bantu
              cocokkan armada dengan luas area dan hasil data yang Anda butuhkan.
            </p>
          </div>
        </Reveal>

        {/* Baris 1: tiga kartu sejajar. Baris 2: dua kartu lebih lebar. */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {fleet.map((item, i) => (
            <div
              key={item.id}
              className={i < 3 ? 'lg:col-span-2' : 'lg:col-span-3'}
            >
              <FleetCard item={item} delay={(i % 3) * 70} />
            </div>
          ))}
        </div>

        <Reveal delay={140}>
          <div className="mt-8 flex flex-col items-start gap-2 rounded-2xl bg-mist px-5 py-4 text-[12.5px] text-ink-soft sm:flex-row sm:items-center sm:gap-3">
            <Icon name="check" className="h-4 w-4 shrink-0 text-ink" strokeWidth={2.2} />
            <p>{fleetNote}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
