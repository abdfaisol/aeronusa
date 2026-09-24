import { useState } from 'react'
import Icon from './ui/Icon.jsx'
import Reveal from './ui/Reveal.jsx'
import DronePlate from './ui/DronePlate.jsx'
import { steps } from '../data/site.js'

export default function Process() {
  const [active, setActive] = useState(0)

  return (
    <section id="cara-sewa" className="relative isolate overflow-hidden bg-volt">
      {/* decorative blocks */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
        <div className="absolute right-[12%] top-12 h-14 w-14 bg-ink" />
        <div className="absolute right-[9%] top-[92px] h-5 w-5 bg-ink" />
        <div className="absolute bottom-16 left-8 h-9 w-9 bg-ink" />
        <div className="absolute bottom-8 left-[74px] h-3 w-3 bg-ink" />
      </div>

      <div className="shell relative py-16 md:py-24">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <div>
              <h2 className="max-w-xl font-display text-[1.9rem] font-extrabold uppercase leading-[1.06] text-ink sm:text-4xl md:text-[2.6rem]">
                Sewa drone dalam empat langkah
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/70">
                Dari permintaan sampai data diterima — semuanya kami urus.
              </p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <a href="#kontak" className="btn btn-ink px-5 py-3">
              Mulai Sewa Sekarang
              <Icon name="arrowUpRight" className="h-4 w-4" />
            </a>
          </Reveal>
        </div>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <Reveal>
            <ol className="space-y-3">
              {steps.map((step, i) => {
                const isActive = active === i
                return (
                  <li
                    key={step.id}
                    className={`overflow-hidden rounded-2xl border-l-[3px] transition-[background-color,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isActive
                        ? 'border-ink bg-white shadow-tile'
                        : 'border-transparent bg-white/25 hover:bg-white/40'
                    }`}
                  >
                    <h3>
                      <button
                        type="button"
                        onClick={() => setActive(i)}
                        aria-expanded={isActive}
                        aria-controls={`step-${step.id}`}
                        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                      >
                        <span className="flex items-baseline gap-4">
                          <span
                            className={`font-display text-sm font-bold tabular-nums transition-colors ${
                              isActive ? 'text-ink' : 'text-ink/50'
                            }`}
                          >
                            {step.number}
                          </span>
                          <span className="font-display text-[15px] font-extrabold uppercase tracking-tight text-ink md:text-lg">
                            {step.title}
                          </span>
                        </span>
                        <Icon
                          name={isActive ? 'minus' : 'plus'}
                          className="h-4 w-4 shrink-0 text-ink"
                          strokeWidth={2}
                        />
                      </button>
                    </h3>

                    <div
                      id={`step-${step.id}`}
                      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-5 pb-5 pl-[52px] text-[13px] leading-relaxed text-ink-soft md:text-sm">
                          {step.copy}
                        </p>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ol>
          </Reveal>

          <Reveal delay={120} className="relative">
            <DronePlate
              alt="Drone AERONUSA dalam misi pemetaan"
              className="mx-auto w-full max-w-[720px]"
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
