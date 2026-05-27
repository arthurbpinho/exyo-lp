import { useT } from '../i18n/LanguageContext'

export default function Footer() {
  const t = useT()
  return (
    <footer className="text-center" style={{ padding: '32px 24px', borderTop: '1px solid var(--gray-border)' }}>
      <p className="text-exyo-gray text-[0.8rem]">
        {t('footer.copy_part1')} <span className="text-exyo-cyan">{t('footer.copy_brand')}</span> {t('footer.copy_part2')}
      </p>
    </footer>
  )
}
