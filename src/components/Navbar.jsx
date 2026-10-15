import { useState, useEffect, useRef } from 'react'
import logoWordmark from '../assets/images/simulacao/logo-wordmark.png'
import LanguageSwitcher from './LanguageSwitcher'
import { useT } from '../i18n/LanguageContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const sentinel = useRef(null)
  const t = useT()

  useEffect(() => {
    // Sentinel 48px below the top of the document: once it leaves the viewport, the bar condenses
    const obs = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting))
    if (sentinel.current) obs.observe(sentinel.current)
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <div ref={sentinel} className="absolute top-12 left-0 h-px w-px" aria-hidden="true" />
      <nav
        className="fixed top-0 left-0 right-0 z-[100] transition-[background-color,border-color,padding] duration-500"
        style={{
          padding: scrolled ? '10px 0' : '18px 0',
          background: scrolled ? 'rgba(10,10,11,0.78)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(140%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(140%)' : 'none',
          borderBottom: `1px solid ${scrolled ? 'var(--line)' : 'transparent'}`,
        }}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 flex items-center justify-between">
          <a href="#hero" className="flex items-center" aria-label="EXYO">
            <img src={logoWordmark} alt="EXYO" width="900" height="332" className="h-8 sm:h-9 w-auto" />
          </a>

          <div className="flex items-center gap-3 sm:gap-4">
            <LanguageSwitcher />
            <a
              href="#form-section"
              className="cta-btn hidden md:inline-flex"
              style={{ padding: '10px 20px', fontSize: '0.85rem' }}
            >
              {t('nav.cta')}
            </a>
          </div>
        </div>
      </nav>
    </>
  )
}
