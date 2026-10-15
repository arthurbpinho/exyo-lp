import { ArrowRight } from '@phosphor-icons/react'
import logoWordmark from '../assets/images/simulacao/logo-wordmark.png'
import wavesBg from '../assets/images/simulacao/background.jpg'
import { useT } from '../i18n/LanguageContext'
import PitchVideo from './PitchVideo'

export default function Hero() {
  const t = useT()
  return (
    <section
      id="hero"
      className="relative overflow-hidden text-center px-5 sm:px-8 lg:px-10 pt-32 sm:pt-36 lg:pt-40 pb-24 sm:pb-32"
    >
      <div className="waves-bg" style={{ backgroundImage: `url(${wavesBg})`, opacity: 0.5 }} />
      <div className="hero-fade" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <img
          src={logoWordmark}
          alt="EXYO"
          width="900"
          height="332"
          className="mx-auto mb-10 reveal"
          style={{ width: 'min(220px, 52vw)', height: 'auto' }}
        />

        <h1
          className="t-display text-exyo-white reveal d1"
          style={{ fontSize: 'clamp(2.4rem, 6vw, 4.75rem)' }}
        >
          <span className="block">{t('hero.title_a')}</span>
          <span className="block text-exyo-cyan">{t('hero.title_b')}</span>
        </h1>

        <div className="mt-12 sm:mt-14">
          <PitchVideo />
        </div>

        <p className="t-lead mt-12 sm:mt-14 max-w-xl mx-auto reveal d3">{t('hero.subtitle')}</p>

        <div className="mt-8 reveal d4">
          <a href="#form-section" className="cta-btn">
            {t('hero.cta')}
            <ArrowRight weight="bold" className="cta-arrow w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
