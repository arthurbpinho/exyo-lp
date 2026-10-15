import { Brain, Code, GraduationCap, Heartbeat, PersonArmsSpread, Sparkle, Tag, UserFocus, ArrowRight } from '@phosphor-icons/react'
import logoAllos from '../assets/images/simulacao/logo-allos.png'
import logoLucas from '../assets/images/simulacao/logo-lucas.png'
import logoWordmark from '../assets/images/simulacao/logo-wordmark.png'
import { useT } from '../i18n/LanguageContext'
import { Rich, Section, SectionHeader } from './ui'

const iconProps = { weight: 'light', className: 'w-9 h-9 text-exyo-cyan' }

export function Context() {
  const t = useT()
  return (
    <Section alt waves={0.25}>
      <div className="eyebrow mb-8 reveal">{t('context.label')}</div>
      <p
        className="t-h2 max-w-4xl reveal d1"
        style={{ fontSize: 'clamp(1.7rem, 4vw, 3rem)' }}
      >
        <Rich text={t('context.highlight')} />
      </p>
      <div className="flex flex-col gap-4 sm:gap-5 max-w-4xl mt-14 sm:mt-16 pt-10 border-t border-[var(--line-strong)]">
        {t('context.statements').map((s, i) => (
          <p
            key={i}
            className={`font-display font-light text-exyo-gray tracking-tight reveal d${i + 2}`}
            style={{ fontSize: 'clamp(1.6rem, 4vw, 2.9rem)', lineHeight: 1.2 }}
          >
            <Rich text={s} strongClass="text-exyo-white font-normal" />
          </p>
        ))}
      </div>
    </Section>
  )
}

export function Vision() {
  const t = useT()
  const pillarIcons = [PersonArmsSpread, Sparkle, Brain, Heartbeat]
  return (
    <Section>
      <SectionHeader title={t('vision.title')} lead={<Rich text={t('vision.note')} />} />
      <div className="hair-grid grid-cols-2 lg:grid-cols-4">
        {t('vision.pillars').map((name, i) => {
          const Icon = pillarIcons[i]
          return (
            <div key={i} className={`flex flex-col justify-between gap-12 p-6 sm:p-8 min-h-[200px] sm:min-h-[240px] reveal d${i + 1}`}>
              <Icon {...iconProps} />
              <div className="font-display font-semibold text-exyo-white text-lg sm:text-xl leading-tight tracking-tight">
                <Rich text={name} />
              </div>
            </div>
          )
        })}
      </div>
    </Section>
  )
}

export function About() {
  const t = useT()
  return (
    <Section alt waves={0.18}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-14 lg:gap-20">
        <div>
          <div className="eyebrow mb-5 reveal">{t('about.label')}</div>
          <h2 className="t-h2 reveal d1">
            <Rich text={t('about.title')} />
          </h2>
          <div className="flex items-center gap-4 mt-12 reveal d2">
            <div className="logo-tile"><img src={logoAllos} alt="Associação Allos" /></div>
            <span className="text-exyo-gray font-light" aria-hidden="true">+</span>
            <div className="logo-tile"><img src={logoLucas} alt="Lucas Albertoni Psicologia" /></div>
          </div>
          <p className="text-exyo-gray leading-relaxed mt-6 max-w-sm reveal d2">
            <Rich text={t('about.venture')} strongClass="text-exyo-white font-medium" />
          </p>
        </div>

        <div className="lg:pt-12">
          <p className="t-statement reveal d2">
            <Rich text={t('about.quote')} strongClass="text-exyo-cyan font-normal" />
          </p>
          <ul className="flex flex-wrap gap-2.5 mt-10 reveal d3">
            {t('about.chips').map((chip) => (
              <li key={chip} className="px-4 py-2 rounded-full border border-[var(--line-strong)] text-sm text-[var(--text)]">
                {chip}
              </li>
            ))}
          </ul>
          <p className="text-exyo-gray leading-relaxed mt-10 pt-8 border-t border-[var(--line)] reveal d4">
            <Rich text={t('about.note')} strongClass="text-exyo-white font-medium" />
          </p>
        </div>
      </div>
    </Section>
  )
}

export function Differentiators() {
  const t = useT()
  const itemIcons = [UserFocus, Tag, Brain, Heartbeat, GraduationCap, Code]
  return (
    <Section>
      <SectionHeader title={t('differentiators.title')} />
      <div className="hair-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {t('differentiators.items').map((item, i) => {
          const Icon = itemIcons[i]
          return (
            <div key={i} className={`p-7 sm:p-9 reveal d${(i % 3) + 1}`}>
              <Icon {...iconProps} className="w-8 h-8 text-exyo-cyan mb-10" />
              <h3 className="font-display text-lg font-semibold text-exyo-white tracking-tight mb-2">{item.title}</h3>
              <p className="text-exyo-gray text-[0.95rem] leading-relaxed">{item.desc}</p>
            </div>
          )
        })}
      </div>
    </Section>
  )
}

export function Philosophy() {
  const t = useT()
  const flow = t('philosophy.flow')
  return (
    <Section alt waves={0.3} className="text-center">
      <div className="eyebrow mb-8 reveal">{t('philosophy.label')}</div>
      <p
        className="font-display font-light tracking-tight max-w-4xl mx-auto mb-14 reveal d1"
        style={{ fontSize: 'clamp(1.75rem, 4.6vw, 3.5rem)', lineHeight: 1.18, color: 'var(--text)' }}
      >
        <Rich text={t('philosophy.quote')} accentClass="text-exyo-cyan font-normal" />
      </p>
      <div className="flex flex-col md:flex-row items-center justify-center gap-3 reveal d2">
        {flow.map((step, i) => (
          <div key={step} className="contents">
            <div className={`flow-step ${i === flow.length - 1 ? 'is-last' : ''}`}>{step}</div>
            {i < flow.length - 1 && (
              <ArrowRight weight="light" className="w-5 h-5 text-exyo-gray rotate-90 md:rotate-0" aria-hidden="true" />
            )}
          </div>
        ))}
      </div>
    </Section>
  )
}

export function PitchQuestion() {
  const t = useT()
  return (
    <Section waves={0.45} className="text-center">
      <img src={logoWordmark} alt="EXYO" className="mx-auto mb-12 reveal" style={{ width: 'min(180px, 45vw)' }} />
      <p
        className="font-display font-light tracking-tight max-w-4xl mx-auto reveal d1"
        style={{ fontSize: 'clamp(1.5rem, 3.6vw, 2.6rem)', lineHeight: 1.3, color: 'var(--text)' }}
      >
        <Rich text={t('question.text')} strongClass="text-exyo-white font-normal" accentClass="text-exyo-cyan" />
      </p>
    </Section>
  )
}
