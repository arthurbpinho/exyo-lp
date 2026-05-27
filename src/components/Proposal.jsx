import { useT } from '../i18n/LanguageContext'

export default function Proposal() {
  const t = useT()
  return (
    <section
      className="relative z-[1] text-center py-32 sm:py-36 px-6 lg:px-10"
      style={{ background: 'var(--bg2)' }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(112,206,211,0.03) 0%, transparent 60%)' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <h2
          className="font-heading font-semibold text-exyo-cyan mb-5 uppercase tracking-[0.2em] reveal d1"
          style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', lineHeight: 1.2 }}
        >
          {t('proposal.title')}
        </h2>

        <p
          className="font-display font-normal max-w-[760px] mx-auto leading-[1.65] reveal d2"
          style={{ fontSize: 'clamp(1.05rem, 2.5vw, 1.4rem)', color: 'rgba(245,245,247,0.82)' }}
        >
          {t('proposal.body_part1')} <span className="text-exyo-cyan font-semibold">{t('proposal.body_highlight1')}</span> {t('proposal.body_part2')} <span className="text-exyo-cyan font-semibold">{t('proposal.body_highlight2')}</span> {t('proposal.body_part3')} <span className="text-exyo-cyan font-semibold">{t('proposal.body_highlight3')}</span>{t('proposal.body_end')}
        </p>

        {/* Cross axes SVG */}
        <div className="reveal d3">
        <svg
          className="mx-auto mt-8 opacity-30"
          width="56" height="56" viewBox="0 0 60 60" fill="none"
        >
          <line x1="30" y1="5" x2="30" y2="55" stroke="#70CED3" strokeWidth="1.5" />
          <line x1="5" y1="30" x2="55" y2="30" stroke="#70CED3" strokeWidth="1.5" />
          <circle cx="30" cy="30" r="3.5" fill="#70CED3" opacity="0.2" />
        </svg>
        </div>
      </div>
    </section>
  )
}
