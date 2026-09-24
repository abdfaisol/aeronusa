import Icon from './ui/Icon.jsx'
import Reveal from './ui/Reveal.jsx'
import DronePlate from './ui/DronePlate.jsx'

const signals = [
  { icon: 'clock', label: 'Data siap 24–72 jam' },
  { icon: 'shield', label: 'Armada berasuransi' },
  { icon: 'leaf', label: 'Pilot & izin diurus' },
]

export default function Intro() {
  return (
    <section id="tentang" className="relative bg-white py-16 md:py-24">
      <div className="shell">
        <Reveal className="relative mx-auto max-w-3xl">
          <DronePlate
            alt="Drone pemetaan dengan kamera gimbal"
            className="mx-auto w-full max-w-[680px]"
          />
        </Reveal>

        <Reveal delay={120}>
          <p className="mx-auto mt-8 max-w-3xl text-center font-display text-[1.35rem] font-bold leading-[1.45] text-ink sm:text-[1.6rem] md:text-[2rem] md:leading-[1.4]">
            Satu paket sewa sudah mencakup{' '}
            <mark className="mark-volt">unit terawat,</mark>{' '}
            <mark className="mark-volt">pilot bersertifikat,</mark> dan{' '}
            <mark className="mark-volt">hasil data</mark> siap dipakai tim Anda
          </p>
        </Reveal>

        <Reveal delay={200}>
          <ul className="mx-auto mt-12 flex max-w-3xl flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
            {signals.map((item) => (
              <li
                key={item.label}
                className="flex items-center justify-center gap-2.5 rounded-full border border-mist-2 bg-mist/60 px-4 py-2.5 text-[13px] font-medium text-ink-soft"
              >
                <Icon name={item.icon} className="h-4 w-4 text-ink" strokeWidth={1.7} />
                {item.label}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
