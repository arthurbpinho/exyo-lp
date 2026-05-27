import logoExyo from '../assets/images/logo-exyo.png'
import exyoGif from '../assets/images/exyo.gif'
import { useT } from '../i18n/LanguageContext'

export default function Hero() {
  const t = useT()
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center text-center overflow-hidden hero-bg py-20 sm:py-24 px-6 lg:px-10"
      style={{ paddingTop: 100 }}
    >
      {/* Ambient orbs */}
      <div className="orb" style={{ width: 420, height: 420, top: '8%', left: '55%', background: 'var(--cyan)' }} />
      <div className="orb" style={{ width: 280, height: 280, bottom: '15%', left: '8%', background: '#2ECEC6' }} />

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        {/* Logo + GIF side by side */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mb-10 reveal">
          <img
            src={logoExyo}
            alt="Exyo"
            className="drop-shadow"
            style={{ width: 'min(220px, 40vw)', filter: 'drop-shadow(0 0 24px rgba(112,206,211,0.1))' }}
          />
          <img
            src={exyoGif}
            alt={t('hero.gifAlt')}
            className="rounded-2xl"
            style={{ width: 'min(140px, 28vw)' }}
          />
        </div>

        {/* Hero box */}
        <div className="hero-box reveal d1">
          <h1
            className="font-display font-bold text-exyo-white"
            style={{ fontSize: 'clamp(1.9rem, 4.8vw, 3rem)', lineHeight: 1.15, letterSpacing: '-0.02em' }}
          >
            {t('hero.title_part1')} <span className="text-exyo-cyan">{t('hero.title_brand')}</span> {t('hero.title_part2')}
          </h1>
          <p className="text-exyo-gray text-sm mt-3 font-light tracking-wide">
            {t('hero.subtitle')}
          </p>
        </div>

        {/* CTA */}
        <div className="reveal d2">
          <a href="#form-section" className="cta-btn">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {t('hero.cta')}
          </a>
        </div>
      </div>
    </section>
  )
}
