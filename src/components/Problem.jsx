import iconUniversities from '../assets/images/simulacao/stickers/icone-slide-04.png'
import iconBeyond from '../assets/images/simulacao/stickers/icon-slide-07.png'
import iconWhoPays from '../assets/images/simulacao/stickers/quem-paga.png'
import { useT } from '../i18n/LanguageContext'
import { ChapterDivider, Interlude, NumberedColumns, NumberedRows, Rich, RingStats, Section, SectionHeader } from './ui'

export default function Problem() {
  const t = useT()
  return (
    <>
      <ChapterDivider
        eyebrow={t('problemDivider.eyebrow')}
        title={t('problemDivider.title')}
        meta={t('problemDivider.meta')}
      />

      <Section alt>
        <SectionHeader title={t('signs.title')} center />
        <RingStats stats={t('signs.stats')} max={10} />
      </Section>

      <Section waves={0.25}>
        <Interlude icon={iconUniversities} text={t('universities.text')} />
      </Section>

      <Section alt>
        <div>
          <SectionHeader title={t('alternatives.title')} />
          <dl className="border-t border-[var(--line)]">
            {t('alternatives.rows').map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] gap-1 sm:gap-8 py-6 border-b border-[var(--line)] reveal d${(i % 4) + 1}`}
              >
                <dt className="font-display font-semibold text-exyo-white text-base sm:text-lg tracking-tight">{row.term}</dt>
                <dd className="text-exyo-gray text-base sm:text-lg font-light">{row.desc}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section waves={0.25}>
        <p
          className="font-display font-light tracking-tight max-w-5xl pl-6 sm:pl-10 border-l-2 border-exyo-cyan reveal"
          style={{ fontSize: 'clamp(1.4rem, 3.2vw, 2.4rem)', lineHeight: 1.3, color: 'var(--text)' }}
        >
          <Rich text={t('gap.text')} strongClass="text-exyo-white font-normal" />
        </p>
      </Section>

      <Section alt>
        <Interlude icon={iconBeyond} text={t('beyond.text')} />
      </Section>

      <Section>
        <SectionHeader title={t('otherProblems.title')} />
        <NumberedColumns items={t('otherProblems.items')} />
      </Section>

      <Section alt waves={0.25}>
        <Interlude icon={iconWhoPays} text={t('whoPays.text')} />
      </Section>

      <Section>
        <SectionHeader title={t('consequences.title')} />
        <NumberedRows items={t('consequences.items')} />
      </Section>
    </>
  )
}
