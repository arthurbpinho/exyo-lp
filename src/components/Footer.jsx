import logoWordmark from '../assets/images/simulacao/logo-wordmark.png'
import { useT } from '../i18n/LanguageContext'

export default function Footer() {
  const t = useT()
  return (
    <footer className="px-5 sm:px-8 lg:px-10 py-12 border-t border-[var(--line)]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 text-center sm:text-left">
        <div>
          <img src={logoWordmark} alt="EXYO" className="mx-auto sm:mx-0 mb-4" style={{ width: 120 }} />
          <p className="text-exyo-gray text-sm">{t('footer.meta')}</p>
        </div>
        <div className="flex flex-col items-center sm:items-end gap-2 text-sm">
          <a href="mailto:contato@exyo.com.br" className="text-[var(--text)] hover:text-exyo-cyan transition-colors">contato@exyo.com.br</a>
          <p className="text-exyo-gray">{t('footer.copy')}</p>
        </div>
      </div>
    </footer>
  )
}
