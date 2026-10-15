import { useMemo, useState } from 'react'
import { ArrowRight, CheckCircle, EnvelopeSimple, Globe } from '@phosphor-icons/react'
import { useLanguage, useT } from '../i18n/LanguageContext'
import { countries } from '../data/countries'

export default function FormSection() {
  const t = useT()
  const { lang } = useLanguage()
  const sortedCountries = useMemo(
    () => [...countries].sort((a, b) => a[lang].localeCompare(b[lang], lang)),
    [lang]
  )
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    ddi: 'BR',
    telefone: '',
    data: '',
    horario: '',
  })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    const country = countries.find(c => c.iso === formData.ddi)
    const ddi = country ? country.dial : ''
    const telefoneCompleto = `${ddi} ${formData.telefone.trim()}`.trim()

    const payload = {
      Nome: formData.nome,
      'E-mail': formData.email,
      Telefone: telefoneCompleto,
      'Data preferida': formData.data || '—',
      'Horário preferido': formData.horario || '—',
      _subject: 'Reunião agendada com Equipe EXYO',
      _replyto: formData.email,
      _template: 'table',
      _captcha: 'false',
    }

    try {
      const res = await fetch('https://formsubmit.co/ajax/contato@exyo.com.br', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        setStatus('sent')
        setFormData({ nome: '', email: '', ddi: 'BR', telefone: '', data: '', horario: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const optional = <span className="text-exyo-gray font-normal"> ({t('form.optional')})</span>

  return (
    <section
      id="form-section"
      className="relative z-[1] overflow-hidden py-24 sm:py-28 lg:py-36 px-5 sm:px-8 lg:px-10"
    >
      <div className="ambient w-[60vw] h-[60vw] -left-[20vw] top-0" aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-20 items-start">
        {/* Pitch column */}
        <div className="lg:pt-6">
          <h2 className="t-h2 reveal" style={{ fontSize: 'clamp(2rem, 4.6vw, 3.5rem)' }}>
            {t('form.title_part1')} <span className="text-exyo-cyan">{t('form.title_brand')}</span>{t('form.title_part2') && ` ${t('form.title_part2')}`}
          </h2>
          <p className="t-lead mt-6 max-w-md reveal d1">{t('form.subtitle')}</p>

          <div className="mt-12 pt-8 border-t border-[var(--line)] flex flex-col gap-5 max-w-md reveal d2">
            <div className="flex items-center gap-4">
              <EnvelopeSimple weight="light" className="w-6 h-6 text-exyo-cyan shrink-0" />
              <p className="text-exyo-gray text-[0.95rem]">
                {t('form.email_alt')}{' '}
                <a href="mailto:contato@exyo.com.br" className="text-exyo-white hover:text-exyo-cyan underline decoration-[var(--line-strong)] underline-offset-4 transition-colors">
                  contato@exyo.com.br
                </a>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Globe weight="light" className="w-6 h-6 text-exyo-cyan shrink-0" />
              <p className="text-exyo-gray text-[0.95rem]">{t('form.timezone_note')}</p>
            </div>
          </div>
        </div>

        {/* Form card */}
        <div className="panel p-6 sm:p-10 reveal d1">
          {status === 'sent' ? (
            <div className="text-center py-10 sm:py-16" role="status">
              <CheckCircle weight="light" className="w-14 h-14 text-exyo-cyan mx-auto mb-6" />
              <p className="font-display font-semibold text-exyo-white text-xl tracking-tight mb-2">
                {t('form.thanks_title')}
              </p>
              <p className="text-exyo-gray">
                {t('form.thanks_body')}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <input type="text" style={{ display: 'none' }} name="_honey" tabIndex={-1} autoComplete="off" />

              <div>
                <label htmlFor="f-nome" className="form-label">{t('form.name')}</label>
                <input id="f-nome" type="text" name="nome" required autoComplete="name" value={formData.nome} onChange={handleChange} className="form-input" />
              </div>

              <div>
                <label htmlFor="f-email" className="form-label">{t('form.email')}</label>
                <input id="f-email" type="email" name="email" required autoComplete="email" value={formData.email} onChange={handleChange} className="form-input" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-[11rem_1fr] gap-5 sm:gap-4">
                <div>
                  <label htmlFor="f-ddi" className="form-label">{t('form.phone_ddi_label')}</label>
                  <select
                    id="f-ddi"
                    name="ddi"
                    required
                    value={formData.ddi}
                    onChange={handleChange}
                    title={t('form.phone_ddi_hint')}
                    autoComplete="tel-country-code"
                    className="form-input"
                  >
                    {sortedCountries.map(c => (
                      <option key={c.iso} value={c.iso}>
                        {c.flag} {c.dial} {c[lang]}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="f-tel" className="form-label">{t('form.phone_label')}</label>
                  <input
                    id="f-tel"
                    type="tel"
                    name="telefone"
                    placeholder={t('form.phone_placeholder')}
                    required
                    value={formData.telefone}
                    onChange={handleChange}
                    pattern="^[\d\s\-()]{6,}$"
                    title={t('form.phone_hint')}
                    autoComplete="tel-national"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="f-data" className="form-label">{t('form.date_label')}{optional}</label>
                  <input id="f-data" type="date" name="data" value={formData.data} onChange={handleChange} className="form-input" />
                </div>
                <div>
                  <label htmlFor="f-hora" className="form-label">{t('form.time_label')}{optional}</label>
                  <input id="f-hora" type="time" name="horario" value={formData.horario} onChange={handleChange} className="form-input" />
                </div>
              </div>

              <button type="submit" disabled={status === 'sending'} className="cta-btn w-full mt-2 disabled:opacity-60 disabled:cursor-progress">
                {status === 'sending' ? t('form.sending') : t('form.submit')}
                {status !== 'sending' && <ArrowRight weight="bold" className="cta-arrow w-4 h-4" />}
              </button>

              {status === 'error' && (
                <p className="text-[#FF8A8A] text-sm" role="alert">{t('form.error')}</p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
