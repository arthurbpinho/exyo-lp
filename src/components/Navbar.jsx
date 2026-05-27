import { useState, useEffect } from 'react'
import logoExyo from '../assets/images/logo-exyo.png'
import LanguageSwitcher from './LanguageSwitcher'
import { useT } from '../i18n/LanguageContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const t = useT()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled ? 'py-2' : 'py-3 sm:py-4'
      }`}
      style={{
        background: scrolled ? 'rgba(10,10,10,0.92)' : 'rgba(10,10,10,0.6)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: `1px solid ${scrolled ? 'rgba(112,206,211,0.08)' : 'rgba(255,255,255,0.03)'}`,
      }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <img
            src={logoExyo}
            alt="Exyo"
            className={`transition-all duration-500 ${scrolled ? 'h-10 sm:h-12' : 'h-12 sm:h-14'}`}
          />
        </a>

        <div className="flex items-center gap-3 sm:gap-4">
          <LanguageSwitcher />
          <a
            href="#form-section"
            className="cta-btn hidden md:inline-flex"
            style={{ padding: '11px 28px', fontSize: '0.85rem' }}
          >
            {t('nav.cta')}
          </a>
        </div>
      </div>
    </nav>
  )
}
