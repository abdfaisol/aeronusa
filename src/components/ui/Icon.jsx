/**
 * Single inline icon set — keeps the bundle free of icon dependencies.
 * All glyphs share a 24x24 viewBox and inherit `currentColor`.
 */

const paths = {
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2.5" />
      <path d="M3 10h18M8 3v4M16 3v4" />
      <path d="M8 14h3v3H8z" opacity=".35" />
    </>
  ),
  drone: (
    <>
      <rect x="9" y="9" width="6" height="6" rx="1.4" />
      <path d="M9 11H5.5M15 11h3.5M9 13H5.5M15 13h3.5" />
      <circle cx="4" cy="11" r="1.8" />
      <circle cx="20" cy="11" r="1.8" />
      <circle cx="4" cy="14" r="1.8" />
      <circle cx="20" cy="14" r="1.8" />
    </>
  ),
  arrowUpRight: <path d="M7 17 17 7M9 7h8v8" />,
  arrowLeft: <path d="M19 12H5m0 0 6-6m-6 6 6 6" />,
  arrowRight: <path d="M5 12h14m0 0-6-6m6 6-6 6" />,
  arrowDown: <path d="M12 5v14m0 0 6-6m-6 6-6-6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  check: <path d="m5 13 4 4L19 7" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  cube: (
    <>
      <path d="M12 3 20 7.5v9L12 21l-8-4.5v-9z" />
      <path d="M12 12 20 7.5M12 12v9M12 12 4 7.5" />
    </>
  ),
  layers: <path d="m12 3 9 4.8-9 4.8-9-4.8zM3 12.4l9 4.8 9-4.8M3 17l9 4.8L21 17" />,
  camera: (
    <>
      <path d="M3 8.5h3.2l1.6-2.2h8.4l1.6 2.2H21v9.7H3z" />
      <circle cx="12" cy="13.3" r="3.2" />
    </>
  ),
  thermal: (
    <>
      <path d="M10 13.6V5.5a2 2 0 1 1 4 0v8.1a4 4 0 1 1-4 0Z" />
      <path d="M12 11v6" />
    </>
  ),
  shield: <path d="M12 3l7 3v5.5c0 4.2-2.8 7.6-7 9.5-4.2-1.9-7-5.3-7-9.5V6z" />,
  leaf: (
    <>
      <path d="M20 4c-9 0-15 4.2-15 10.5A5.5 5.5 0 0 0 10.5 20C17 20 20 13.6 20 4Z" />
      <path d="M4.5 20c2.6-5.2 6.2-8.6 10.5-11" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  chart: <path d="M4 19h16M7 19V9m5 10V5m5 14v-7" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7.5 8 5.5 8-5.5" />
    </>
  ),
  phone: (
    <path d="M6.5 3.5h3l1.5 4-2 1.4a11 11 0 0 0 5.6 5.6l1.4-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5Z" />
  ),
  pin: (
    <>
      <path d="M12 21s6.5-5.6 6.5-10.5a6.5 6.5 0 1 0-13 0C5.5 15.4 12 21 12 21Z" />
      <circle cx="12" cy="10.5" r="2.4" />
    </>
  ),
  send: <path d="M21 3 10.5 13.5M21 3l-7 18-3.5-7.5L3 10z" />,
  spark: <path d="M12 3v5m0 8v5M3 12h5m8 0h5M6 6l3 3m6 6 3 3m0-12-3 3m-6 6-3 3" />,
  quote: (
    <path d="M9.5 6C6.5 7.4 5 9.7 5 12.9V18h5.4v-5.4H8.1c0-2 .8-3.2 2.4-4zm9 0c-3 1.4-4.5 3.7-4.5 6.9V18h5.4v-5.4h-2.3c0-2 .8-3.2 2.4-4z" />
  ),
}

export function Icon({ name, className = 'h-5 w-5', strokeWidth = 1.6, ...rest }) {
  const glyph = paths[name]
  if (!glyph) return null

  const isFilled = name === 'quote' || name === 'spark'

  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={isFilled ? 'currentColor' : 'none'}
      stroke={isFilled ? 'none' : 'currentColor'}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {glyph}
    </svg>
  )
}

export default Icon
