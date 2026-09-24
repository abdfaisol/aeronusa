import { useState } from 'react'
import Icon from './ui/Icon.jsx'
import Reveal from './ui/Reveal.jsx'
import { certifications, company, serviceOptions } from '../data/site.js'

const EMPTY = { name: '', company: '', email: '', service: serviceOptions[0], message: '' }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function Field({ label, id, error, children }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block font-display text-[11px] font-bold uppercase tracking-[0.12em] text-ink-soft"
      >
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-[11.5px] font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

const inputClass =
  'w-full rounded-xl border border-mist-2 bg-mist/50 px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-ink-soft/60 focus:border-ink focus:bg-white'

export default function Contact() {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const update = (key) => (event) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const next = {}
    if (form.name.trim().length < 2) next.name = 'Mohon isi nama lengkap Anda.'
    if (form.company.trim().length < 2) next.company = 'Mohon isi nama perusahaan.'
    if (!EMAIL_RE.test(form.email)) next.email = 'Format email belum benar.'
    if (form.message.trim().length < 12) next.message = 'Ceritakan kebutuhan proyek minimal 12 karakter.'

    setErrors(next)
    if (Object.keys(next).length > 0) return

    // Frontend-only: no API call. Swap this for your endpoint later.
    setSent(true)
  }

  const details = [
    { icon: 'mail', label: 'Email', value: company.email, href: `mailto:${company.email}` },
    { icon: 'phone', label: 'Telepon / WhatsApp', value: company.phone, href: `tel:${company.phoneHref}` },
    { icon: 'pin', label: 'Basis operasi', value: company.address },
    { icon: 'clock', label: 'Jam operasional', value: company.hours },
  ]

  return (
    <section id="kontak" className="relative isolate overflow-hidden bg-ink py-16 text-white md:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-volt/12 blur-3xl"
      />

      <div className="shell relative grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <Reveal>
          <div>
            <p className="eyebrow text-volt">Minta penawaran</p>
            <h2 className="mt-4 max-w-lg font-display text-[1.9rem] font-extrabold uppercase leading-[1.06] sm:text-4xl md:text-[2.6rem]">
              Ceritakan kebutuhan proyek Anda
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/65">
              Isi lokasi, luas area, dan hasil data yang Anda butuhkan. Tim kami membalas dengan
              rencana kerja, ketersediaan unit, dan harga tetap dalam 1×24 jam kerja.
            </p>

            <dl className="mt-10 space-y-5">
              {details.map((item) => (
                <div key={item.label} className="flex gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/8 text-volt">
                    <Icon name={item.icon} className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <div>
                    <dt className="font-display text-[11px] font-bold uppercase tracking-[0.14em] text-white/45">
                      {item.label}
                    </dt>
                    <dd className="mt-1 text-sm text-white/90">
                      {item.href ? (
                        <a href={item.href} className="transition-colors hover:text-volt">
                          {item.value}
                        </a>
                      ) : (
                        item.value
                      )}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>

            <ul className="mt-10 flex flex-wrap gap-2 border-t border-white/10 pt-6">
              {certifications.map((badge) => (
                <li
                  key={badge}
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.1em] text-white/60"
                >
                  <Icon name="check" className="h-3.5 w-3.5 text-volt" strokeWidth={2.2} />
                  {badge}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="rounded-3xl bg-white p-5 text-ink shadow-float sm:p-7">
            {sent ? (
              <div className="flex min-h-[420px] flex-col items-start justify-center">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-volt text-ink">
                  <Icon name="check" className="h-7 w-7" strokeWidth={2.2} />
                </span>
                <h3 className="mt-6 font-display text-2xl font-extrabold uppercase">
                  Permintaan diterima
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
                  Terima kasih {form.name.split(' ')[0]} — kebutuhan{' '}
                  <strong className="font-semibold text-ink">{form.service}</strong> sudah masuk
                  antrean kami. Penawaran akan dikirim ke {form.email} dalam 1×24 jam kerja.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setForm(EMPTY)
                    setSent(false)
                  }}
                  className="btn btn-ghost mt-7 px-5 py-2.5"
                >
                  Ajukan permintaan lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Nama lengkap" id="name" error={errors.name}>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={update('name')}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      placeholder="Nadia Putri"
                      className={inputClass}
                    />
                  </Field>

                  <Field label="Perusahaan" id="company" error={errors.company}>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      value={form.company}
                      onChange={update('company')}
                      aria-invalid={Boolean(errors.company)}
                      aria-describedby={errors.company ? 'company-error' : undefined}
                      placeholder="PT Nusantara Energi"
                      className={inputClass}
                    />
                  </Field>
                </div>

                <Field label="Email kerja" id="email" error={errors.email}>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={update('email')}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    placeholder="anda@perusahaan.co.id"
                    className={inputClass}
                  />
                </Field>

                <Field label="Layanan yang dibutuhkan" id="service">
                  <select
                    id="service"
                    name="service"
                    value={form.service}
                    onChange={update('service')}
                    className={`${inputClass} appearance-none bg-[length:14px] bg-[right_0.9rem_center] bg-no-repeat pr-10`}
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230a0a0a' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
                    }}
                  >
                    {serviceOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Detail kebutuhan" id="message" error={errors.message}>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={update('message')}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    placeholder="Area survey 120 ha, butuh orthomosaic + DSM, deadline akhir bulan."
                    className={`${inputClass} resize-none`}
                  />
                </Field>

                <button type="submit" className="btn btn-ink w-full px-5 py-3.5 text-sm">
                  <Icon name="send" className="h-4 w-4" />
                  Kirim Permintaan
                </button>

                <p className="text-center text-[11.5px] leading-relaxed text-ink-soft">
                  Dengan mengirim formulir ini Anda menyetujui pemrosesan data sesuai{' '}
                  <a href="#kontak" className="font-medium text-ink underline decoration-volt decoration-2 underline-offset-2">
                    kebijakan privasi
                  </a>{' '}
                  kami. Kami tidak membagikan data Anda ke pihak lain.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
