import { useT } from '../i18n/LanguageContext'

const numbers = ['01', '02', '03']

export default function Pillars() {
  const t = useT()
  const items = t('pillars.items')

  return (
    <section className="relative z-[1] text-center py-24 sm:py-28 lg:py-32 px-6 lg:px-10">
      <div className="max-w-6xl mx-auto">
        <h2
          className="font-heading font-semibold text-exyo-cyan mb-5 uppercase tracking-[0.2em] reveal d1"
          style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', lineHeight: 1.2 }}
        >
          {t('pillars.title')}
        </h2>
        <p className="text-exyo-gray max-w-[560px] mx-auto text-base reveal d2">
          {t('pillars.subtitle')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
          {items.map((pillar, i) => (
            <div
              key={i}
              className={`glass-card text-left p-6 sm:p-8 relative overflow-hidden group reveal d${i + 1}`}
            >
              {/* Top glow line on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-exyo-cyan to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="font-display text-[2.6rem] font-extrabold text-exyo-cyan opacity-10 leading-none mb-3">
                {numbers[i]}
              </div>
              <h3 className="font-display text-[1.12rem] font-bold text-exyo-white mb-3">
                {pillar.title}
              </h3>
              <p className="text-exyo-gray text-[0.9rem] leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
