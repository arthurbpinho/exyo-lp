import { useLanguage } from '../i18n/LanguageContext'

export default function LanguageSwitcher({ className = '' }) {
  const { lang, setLang } = useLanguage()

  const baseBtn =
    'px-2 py-1 rounded-md text-[0.72rem] font-display font-semibold tracking-wide transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-exyo-cyan'
  const active = 'text-exyo-cyan bg-[rgba(112,206,211,0.1)]'
  const inactive = 'text-exyo-gray hover:text-exyo-white'

  return (
    <div
      className={`inline-flex items-center gap-0.5 rounded-full p-0.5 ${className}`}
      style={{
        border: '1px solid rgba(112,206,211,0.18)',
        background: 'rgba(255,255,255,0.025)',
      }}
      role="group"
      aria-label="Language switcher"
    >
      <button
        type="button"
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
        className={`${baseBtn} ${lang === 'en' ? active : inactive}`}
      >
        EN
      </button>
      <span className="w-px h-3 bg-[rgba(255,255,255,0.08)]" aria-hidden="true" />
      <button
        type="button"
        onClick={() => setLang('pt')}
        aria-pressed={lang === 'pt'}
        className={`${baseBtn} ${lang === 'pt' ? active : inactive}`}
      >
        PT
      </button>
    </div>
  )
}
