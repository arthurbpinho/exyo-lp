import { useT } from '../i18n/LanguageContext'

export default function TheProblem() {
  const t = useT()
  return (
    <section className="relative z-[1] py-24 sm:py-28 lg:py-32 px-6 lg:px-10">
      <div className="max-w-5xl mx-auto text-center">
        <h2
          className="font-heading font-semibold text-exyo-cyan mb-5 uppercase tracking-[0.2em] reveal d1"
          style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', lineHeight: 1.2 }}
        >
          {t('problem.title')}
        </h2>

        <p className="text-exyo-gray max-w-[640px] mx-auto mb-12 text-base leading-relaxed reveal d2">
          {t('problem.body_part1')} <span className="text-exyo-cyan">{t('problem.body_brand')}</span>{t('problem.body_part2')}
        </p>

      </div>
    </section>
  )
}
