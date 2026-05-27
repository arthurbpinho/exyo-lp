import { useMemo, useState } from 'react'
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

  return (
    <section
      id="form-section"
      className="relative z-[1] py-20 sm:py-24 px-6 lg:px-10"
      style={{ paddingBottom: 110, background: 'var(--bg2)' }}
    >
      <div className="max-w-[480px] mx-auto text-center">
        {/* Calendar icon */}
        <svg
          width="34" height="34" fill="none" stroke="#70CED3" strokeWidth="1.5" viewBox="0 0 24 24"
          className="mx-auto mb-4"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>

        <h2
          className="font-display font-bold text-exyo-white mb-2 reveal"
          style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', lineHeight: 1.2 }}
        >
          {t('form.title_part1')} <span className="text-exyo-cyan">{t('form.title_brand')}</span> {t('form.title_part2')}
        </h2>

        <p className="text-exyo-gray text-[0.9rem] mb-8 reveal d1">
          {t('form.subtitle')}
        </p>

        {status === 'sent' ? (
          <div className="reveal glass-card p-8 sm:p-10">
            <svg width="48" height="48" fill="none" stroke="#70CED3" strokeWidth="2" viewBox="0 0 24 24" className="mx-auto mb-4">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12l3 3 5-5" />
            </svg>
            <p className="font-display font-semibold text-exyo-white text-lg mb-2">
              {t('form.thanks_title')}
            </p>
            <p className="text-exyo-gray text-sm">
              {t('form.thanks_body')}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 reveal d2">
            <input type="text" style={{ display: 'none' }} name="_honey" tabIndex={-1} autoComplete="off" />
            <input type="text" name="nome" placeholder={t('form.name')} required value={formData.nome} onChange={handleChange} className="form-input" />
            <input type="email" name="email" placeholder={t('form.email')} required value={formData.email} onChange={handleChange} className="form-input" />
            <div className="grid grid-cols-[10rem_1fr] gap-3.5">
              <div className="flex flex-col">
                <select
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
                <span className="text-exyo-gray text-[0.7rem] mt-1 text-left">
                  {t('form.phone_ddi_label')}
                </span>
              </div>
              <div className="flex flex-col">
                <input
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
                <span className="text-exyo-gray text-[0.7rem] mt-1 text-left">
                  {t('form.phone_label')}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3.5">
              <input type="date" name="data" value={formData.data} onChange={handleChange} className="form-input" />
              <input type="time" name="horario" value={formData.horario} onChange={handleChange} className="form-input" />
            </div>
            <button type="submit" disabled={status === 'sending'} className="cta-btn justify-center mt-1 w-full disabled:opacity-60">
              {status === 'sending' ? t('form.sending') : t('form.submit')}
            </button>
            {status === 'error' && (
              <p className="text-red-400 text-sm mt-1">{t('form.error')}</p>
            )}
            <p className="text-exyo-gray text-xs mt-2 text-left">
              {t('form.timezone_note')}
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
