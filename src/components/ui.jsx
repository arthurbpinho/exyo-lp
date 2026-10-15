import { Fragment } from 'react'
import wavesBg from '../assets/images/simulacao/background.jpg'
import logoSymbol from '../assets/images/simulacao/logo-symbol.png'

// Renders translation strings with **bold**, __accent__ and \n line breaks
export function Rich({ text, strongClass = 'text-exyo-white font-semibold', accentClass = 'text-exyo-cyan' }) {
  return text.split(/(\*\*[^*]+\*\*|__[^_]+__|\n)/).map((part, i) => {
    if (part === '\n') return <br key={i} />
    if (part.startsWith('**')) return <strong key={i} className={strongClass}>{part.slice(2, -2)}</strong>
    if (part.startsWith('__')) return <span key={i} className={accentClass}>{part.slice(2, -2)}</span>
    return <Fragment key={i}>{part}</Fragment>
  })
}

export function Section({ children, alt = false, waves, className = '', inner = 'max-w-6xl', id }) {
  return (
    <section
      id={id}
      className={`relative z-[1] overflow-hidden py-24 sm:py-28 lg:py-36 px-5 sm:px-8 lg:px-10 ${className}`}
      style={alt ? { background: 'var(--bg2)' } : undefined}
    >
      {waves && <div className="waves-bg" style={{ backgroundImage: `url(${wavesBg})`, opacity: waves }} />}
      <div className={`relative z-10 w-full ${inner} mx-auto`}>{children}</div>
    </section>
  )
}

export function SectionHeader({ eyebrow, title, lead, center = false, className = '' }) {
  return (
    <div className={`mb-12 sm:mb-16 ${center ? 'text-center mx-auto' : ''} max-w-3xl ${className}`}>
      {eyebrow && <div className="eyebrow mb-5 reveal">{eyebrow}</div>}
      <h2 className="t-h2 reveal d1">
        <Rich text={title} />
      </h2>
      {lead && <p className={`t-lead mt-5 max-w-[60ch] reveal d2 ${center ? 'mx-auto' : ''}`}>{lead}</p>}
    </div>
  )
}

// Transitional narrative beat: brand sticker + large statement, no container
export function Interlude({ icon, text, children }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] items-center justify-items-center md:justify-items-start text-center md:text-left gap-8 md:gap-14 max-w-5xl mx-auto md:mx-0">
      <img src={icon} alt="" className="w-28 h-28 md:w-36 md:h-36 object-contain reveal" />
      <div>
        <p className="t-statement reveal d1">
          <Rich text={text} strongClass="text-exyo-white font-medium" />
        </p>
        {children}
      </div>
    </div>
  )
}

export function ChapterDivider({ eyebrow, title, meta }) {
  return (
    <Section waves={0.4} className="min-h-[72vh] flex items-center">
      {/* Phones: centered stack. Desktop: larger symbol to the left of the text block */}
      <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left md:gap-12 lg:gap-16">
        <img src={logoSymbol} alt="" className="w-14 sm:w-16 md:w-40 lg:w-52 mb-10 md:mb-0 shrink-0 reveal" />
        <div className="flex flex-col items-center md:items-start">
          <div className="eyebrow mb-6 reveal d1">{eyebrow}</div>
          <h2
            className="t-display text-exyo-white reveal d2"
            style={{ fontSize: 'clamp(3rem, 10vw, 7.5rem)' }}
          >
            {title}
          </h2>
          <p className="text-exyo-gray text-base sm:text-lg font-light mt-8 reveal d3">{meta}</p>
        </div>
      </div>
    </Section>
  )
}

const RING_CIRCUMFERENCE = 326.73 // 2π × r52

export function RingStats({ stats, max }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8">
      {stats.map((stat, i) => (
        <div key={i} className={`text-center reveal d${i + 1}`}>
          <div className="ring-box">
            <svg viewBox="0 0 120 120">
              <circle className="rk-track" cx="60" cy="60" r="52" />
              <circle
                className="rk-fill"
                cx="60" cy="60" r="52"
                style={{
                  '--da': RING_CIRCUMFERENCE,
                  '--off': RING_CIRCUMFERENCE * (1 - stat.value / max),
                  strokeDasharray: RING_CIRCUMFERENCE,
                }}
              />
            </svg>
            <div className="ring-num">
              {stat.value}<span className="text-exyo-gray text-base font-medium ml-0.5">{stat.suffix}</span>
            </div>
          </div>
          <p className="text-exyo-gray text-[0.95rem] leading-relaxed max-w-[280px] mx-auto">{stat.desc}</p>
        </div>
      ))}
    </div>
  )
}

// Large figures separated by hairlines, no rings
export function FigureStats({ stats }) {
  return (
    <div className="hair-grid grid-cols-1 md:grid-cols-3">
      {stats.map((stat, i) => (
        <div key={i} className={`p-8 sm:p-10 reveal d${i + 1}`}>
          <div className="t-display text-exyo-white" style={{ fontSize: 'clamp(3.5rem, 7vw, 5.5rem)' }}>
            {stat.value}<span className="text-exyo-cyan">{stat.suffix}</span>
          </div>
          <p className="text-exyo-gray leading-relaxed mt-4 max-w-[30ch]">{stat.desc}</p>
        </div>
      ))}
    </div>
  )
}

// Numbered columns: top hairline, big index, short text
export function NumberedColumns({ items }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
      {items.map((text, i) => (
        <div key={i} className={`pt-7 border-t border-[var(--line-strong)] reveal d${i + 1}`}>
          <div className="font-display text-exyo-cyan text-sm font-semibold tabular-nums mb-6">
            {String(i + 1).padStart(2, '0')}
          </div>
          <p className="text-lg sm:text-xl leading-snug text-[var(--text)] font-light">{text}</p>
        </div>
      ))}
    </div>
  )
}

// Numbered rows: index on the left, statement on the right
export function NumberedRows({ items }) {
  return (
    <ol className="border-t border-[var(--line)]">
      {items.map((text, i) => (
        <li
          key={i}
          className={`grid grid-cols-[3rem_1fr] sm:grid-cols-[6rem_1fr] items-baseline gap-4 py-8 sm:py-10 border-b border-[var(--line)] reveal d${i + 1}`}
        >
          <span className="font-display text-exyo-gray text-base sm:text-lg tabular-nums">{String(i + 1).padStart(2, '0')}</span>
          <span className="font-display font-light text-exyo-white tracking-tight" style={{ fontSize: 'clamp(1.35rem, 3vw, 2.1rem)', lineHeight: 1.25 }}>
            {text}
          </span>
        </li>
      ))}
    </ol>
  )
}
