import { useT } from '../i18n/LanguageContext'

export default function UniversityDiagnosis() {
  const t = useT()
  const solutions = t('diagnosis.solutions')

  return (
    <section className="relative z-[1] text-center py-24 sm:py-28 lg:py-32 px-6 lg:px-10" style={{ background: 'var(--bg2)' }}>
      <div className="max-w-6xl mx-auto">
        <h2
          className="font-heading font-semibold text-exyo-cyan mb-5 uppercase tracking-[0.2em] reveal d1"
          style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', lineHeight: 1.2 }}
        >
          {t('diagnosis.title')}
        </h2>

        {/* Solution table */}
        <div
          className="max-w-[760px] mx-auto my-10 overflow-hidden rounded-[14px] reveal d2"
          style={{ border: '1px solid var(--gray-border)', background: 'rgba(255,255,255,0.012)' }}
        >
          {solutions.map((sol, i) => (
            <div
              key={i}
              className="grid grid-cols-1 sm:grid-cols-[1fr_1.5fr] transition-colors duration-300 hover:bg-[rgba(112,206,211,0.02)]"
              style={{ borderBottom: i < solutions.length - 1 ? '1px solid var(--gray-border)' : 'none' }}
            >
              <div
                className="px-5 py-4 font-display font-semibold text-sm sm:text-[0.9rem] text-left flex items-center"
                style={{ borderRight: '1px solid var(--gray-border)' }}
              >
                {sol.label}
              </div>
              <div className="px-5 py-4 text-exyo-gray text-sm sm:text-[0.9rem] text-left flex items-center">
                {sol.desc}
              </div>
            </div>
          ))}
        </div>

        {/* End quote */}
        <div
          className="max-w-[660px] mx-auto text-left p-5 sm:p-6 rounded-r-[10px] reveal d3"
          style={{ borderLeft: '3px solid var(--cyan)', background: 'linear-gradient(90deg, rgba(112,206,211,0.035), transparent)' }}
        >
          <p className="text-exyo-gray text-sm sm:text-base leading-relaxed">
            {t('diagnosis.quote_part1')} <strong className="text-exyo-white">{t('diagnosis.quote_strong')}</strong> {t('diagnosis.quote_part2')} <span className="text-exyo-cyan">{t('diagnosis.quote_highlight')}</span>{t('diagnosis.quote_end')}
          </p>
        </div>
      </div>
    </section>
  )
}
