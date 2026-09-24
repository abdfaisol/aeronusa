import Icon from './ui/Icon.jsx'
import Media from './ui/Media.jsx'
import Reveal from './ui/Reveal.jsx'
import { benefits } from '../data/site.js'

export default function WhyUs() {
  return (
    <section id="keunggulan" className="bg-white py-14 md:py-20">
      <div className="shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <h2 className="max-w-xl font-display text-[1.9rem] font-extrabold uppercase leading-[1.06] text-ink sm:text-4xl md:text-[2.6rem]">
              Kenapa menyewa di AERONUSA
            </h2>
          </Reveal>
          <Reveal delay={80} className="hidden md:block">
            <a href="#kontak" className="btn btn-ink px-5 py-3">
              Bicara dengan Tim Kami
              <Icon name="arrowUpRight" className="h-4 w-4" />
            </a>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {benefits.map((item, i) => (
            <Reveal key={item.id} delay={i * 90}>
              <article className="group tile flex h-full flex-col border-0 bg-mist p-4 transition-shadow duration-300 hover:shadow-tile sm:p-5">
                <p className="font-display text-[15px] font-bold leading-[1.5] text-ink md:text-base">
                  <mark className="mark-volt">{item.highlight}</mark> {item.copy}
                </p>

                <Media
                  src={item.image}
                  alt={item.alt}
                  tone={i + 1}
                  className="mt-5 aspect-[5/4] w-full rounded-xl md:mt-6"
                  imgClassName="transition-transform duration-700 group-hover:scale-[1.05]"
                />
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-8 md:hidden">
          <a href="#kontak" className="btn btn-ink w-full px-5 py-3.5">
            Bicara dengan Tim Kami
            <Icon name="arrowUpRight" className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
