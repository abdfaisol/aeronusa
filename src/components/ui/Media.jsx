import { useState } from 'react'

const TONES = [
  'from-sky-top via-sky-mid to-sky-low',
  'from-mist-2 via-mist to-white',
  'from-volt-soft via-volt/60 to-mist',
  'from-ink/80 via-ink/50 to-ink/20',
  'from-sky-mid via-mist to-volt-soft',
]

/**
 * Image with a designed gradient placeholder underneath.
 * Keeps the layout looking intentional while loading and if a remote
 * image ever fails to resolve.
 */
export function Media({
  src,
  alt = '',
  className = '',
  imgClassName = '',
  tone = 0,
  eager = false,
  overlay = null,
}) {
  const [status, setStatus] = useState('loading') // loading | ready | error

  return (
    <div className={`relative isolate overflow-hidden bg-mist ${className}`}>
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-gradient-to-br ${TONES[tone % TONES.length]}`}
      />
      {status !== 'error' && (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setStatus('ready')}
          onError={() => setStatus('error')}
          className={`relative h-full w-full object-cover transition-[opacity,transform] duration-700 ${
            status === 'ready' ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
        />
      )}
      {overlay}
    </div>
  )
}

export default Media
