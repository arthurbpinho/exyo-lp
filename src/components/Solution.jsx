import logoAllos from '../assets/images/simulacao/logo-allos.png'
import logoLucas from '../assets/images/simulacao/logo-lucas.png'
import logoSymbol from '../assets/images/simulacao/logo-symbol.png'
import logoWordmark from '../assets/images/simulacao/logo-wordmark.png'
import heart from '../assets/images/simulacao/stickers/heart.png'
import instituicao from '../assets/images/simulacao/stickers/instituicao.png'
import supervisor from '../assets/images/simulacao/stickers/supervisor.png'
import estudanteIa from '../assets/images/simulacao/stickers/estudante-ia.png'
import estudanteSupervisor from '../assets/images/simulacao/stickers/estudante-supervisor.png'
import interrogacao from '../assets/images/simulacao/stickers/interrogacao.png'
import estudantes from '../assets/images/simulacao/stickers/estudantes.png'
import preparado from '../assets/images/simulacao/stickers/preparado.png'
import supervisorEstudantes from '../assets/images/simulacao/stickers/supervisor-estudantes.png'
import { useT } from '../i18n/LanguageContext'
import { ChapterDivider, FigureStats, Interlude, Rich, Section, SectionHeader } from './ui'
import SessionDemo from './SessionDemo'

export default function Solution() {
  const t = useT()
  const cycleIcons = [estudanteIa, estudanteSupervisor, interrogacao, estudantes]
  const changeIcons = [preparado, supervisorEstudantes, heart, estudanteIa]
  const [methodLead, ...methodRest] = t('method.items')

  return (
    <>
      <ChapterDivider
        eyebrow={t('solutionDivider.eyebrow')}
        title={t('solutionDivider.title')}
        meta={t('solutionDivider.meta')}
      />

      {/* What it is */}
      <Section alt waves={0.25}>
        <div className="panel relative overflow-hidden px-6 py-12 sm:px-14 sm:py-20 lg:px-20 reveal">
          <div className="ambient w-[60%] h-[140%] -right-[15%] -top-[20%]" aria-hidden="true" />
          <p className="relative t-statement max-w-4xl" style={{ fontSize: 'clamp(1.5rem, 3.4vw, 2.5rem)' }}>
            <Rich text={t('solution.text')} strongClass="text-exyo-white font-normal" />
          </p>
        </div>
      </Section>

      {/* Animated simulated session */}
      <Section>
        <SessionDemo />
      </Section>

      {/* Traction */}
      <Section>
        <Interlude icon={heart} text={t('results.text')}>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-10 reveal d2">
            <span className="text-exyo-gray text-sm mr-2">{t('results.partners')}</span>
            <div className="logo-tile"><img src={logoAllos} alt="Associação Allos" /></div>
            <div className="logo-tile"><img src={logoLucas} alt="Lucas Albertoni Psicologia" /></div>
          </div>
        </Interlude>
      </Section>

      {/* Who drives the process: two equal roles */}
      <Section alt>
        <SectionHeader eyebrow={t('drivers.label')} title={t('drivers.title')} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {t('drivers.items').map((text, i) => (
            <div key={i} className={`panel panel-hover flex items-center gap-6 sm:gap-8 p-6 sm:p-10 reveal d${i + 1}`}>
              <img src={[instituicao, supervisor][i]} alt="" className="w-24 h-24 sm:w-32 sm:h-32 object-contain shrink-0" />
              <p className="font-display font-light text-exyo-white tracking-tight text-xl sm:text-2xl leading-snug">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Student cycle: a sequence */}
      <Section>
        <SectionHeader title={t('cycle.title')} />
        <ol className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6 md:gap-y-12">
          {/* Connector: vertical through the icons on phones, horizontal on desktop */}
          <span className="md:hidden absolute left-[44px] top-11 bottom-11 w-px bg-[var(--line-strong)]" aria-hidden="true" />
          <span className="hidden lg:block absolute top-[60px] left-[60px] right-[12%] h-px bg-[var(--line-strong)]" aria-hidden="true" />
          {t('cycle.items').map((text, i) => (
            <li key={i} className={`relative flex items-center gap-5 md:block reveal d${i + 1}`}>
              <div className="w-[88px] h-[88px] md:w-[120px] md:h-[120px] shrink-0 rounded-full grid place-items-center bg-[var(--bg)] border border-[var(--line-strong)] md:mb-7">
                <img src={cycleIcons[i]} alt="" className="w-14 h-14 md:w-20 md:h-20 object-contain" />
              </div>
              <div>
                <div className="font-display text-exyo-cyan text-sm font-semibold tabular-nums mb-1 md:mb-2">{String(i + 1).padStart(2, '0')}</div>
                <p className="text-base md:text-lg leading-snug text-[var(--text)] max-w-[24ch]">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* What changes */}
      <Section alt waves={0.2}>
        <SectionHeader title={t('changes.title')} />
        <div className="hair-grid grid-cols-1 md:grid-cols-2">
          {t('changes.items').map((text, i) => (
            <div key={i} className={`flex items-center gap-6 p-6 sm:p-9 reveal d${i + 1}`} style={{ background: 'var(--bg2)' }}>
              <img src={changeIcons[i]} alt="" className="w-20 h-20 sm:w-24 sm:h-24 object-contain shrink-0" />
              <p className="font-display font-light text-exyo-white tracking-tight text-lg sm:text-xl leading-snug">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Brand statement */}
      <Section waves={0.45} className="text-center">
        <img src={logoWordmark} alt="EXYO" className="mx-auto mb-12 reveal" style={{ width: 'min(180px, 45vw)' }} />
        <p
          className="font-display font-light tracking-tight max-w-4xl mx-auto reveal d1"
          style={{ fontSize: 'clamp(1.4rem, 3.2vw, 2.25rem)', lineHeight: 1.35, color: 'var(--text)' }}
        >
          <Rich text={t('intersection.text')} />
        </p>
      </Section>

      {/* Methodology: lead pillar + two supporting */}
      <Section alt>
        <SectionHeader eyebrow={t('method.label')} title={t('method.title')} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="panel relative overflow-hidden flex flex-col items-center text-center md:items-start md:text-left justify-between gap-8 md:gap-16 p-8 sm:p-12 lg:row-span-2 reveal d1">
            <div className="ambient w-[90%] h-[90%] -left-[30%] -top-[30%]" aria-hidden="true" />
            <img src={logoSymbol} alt="" className="relative w-24 h-24 md:w-16 md:h-16 object-contain" />
            <div className="relative">
              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-exyo-white tracking-tight mb-4">{methodLead.title}</h3>
              <p className="text-exyo-gray text-base sm:text-lg leading-relaxed max-w-md mx-auto md:mx-0">{methodLead.desc}</p>
            </div>
          </div>
          {methodRest.map((item, i) => (
            <div key={i} className={`panel panel-hover flex flex-col items-center text-center md:flex-row md:items-start md:text-left gap-5 md:gap-6 p-8 sm:p-9 reveal d${i + 2}`}>
              <img src={[estudanteIa, instituicao][i]} alt="" className="w-28 h-28 md:w-20 md:h-20 object-contain shrink-0" />
              <div>
                <h3 className="font-display text-lg sm:text-xl font-semibold text-exyo-white tracking-tight mb-2">{item.title}</h3>
                <p className="text-exyo-gray text-[0.95rem] leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Impact */}
      <Section>
        <SectionHeader title={t('impact.title')} />
        <FigureStats stats={t('impact.stats')} />
      </Section>
    </>
  )
}
