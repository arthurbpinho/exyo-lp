import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowCounterClockwise, Pause, PaperPlaneRight, Play } from '@phosphor-icons/react'
import { useLanguage, useT } from '../i18n/LanguageContext'
import { Rich } from './ui'

// Animated simulated session (ported from nova-aplicacao/index.html).
// Script lives in translations (demo.script): from 't' therapist · 'p' patient · 'd' divider.
const SPEEDS = [1, 1.5, 2]

function clock(index, total) {
  return `14:${String(Math.round((index / total) * 48)).padStart(2, '0')}`
}

export default function SessionDemo() {
  const t = useT()
  const { lang } = useLanguage()

  const [items, setItems] = useState([])
  const [patientTyping, setPatientTyping] = useState(false)
  const [draft, setDraft] = useState(null) // null = placeholder
  const [send, setSend] = useState('') // '' | 'ready' | 'fire'
  const [progress, setProgress] = useState(0)
  const [paused, setPaused] = useState(false)
  const [speed, setSpeed] = useState(0)

  const rootRef = useRef(null)
  const listRef = useRef(null)
  const runId = useRef(0)
  const pausedRef = useRef(false)
  const speedRef = useRef(0)
  const inView = useRef(false)

  pausedRef.current = paused
  speedRef.current = speed

  // Pausable, speed-aware delay; time only advances while visible and not paused.
  const wait = useCallback((ms, id) => new Promise((resolve, reject) => {
    let elapsed = 0
    let last = performance.now()
    const tick = (now) => {
      if (id !== runId.current) return reject(new Error('cancelled'))
      if (!pausedRef.current && inView.current && !document.hidden) {
        elapsed += (now - last) * SPEEDS[speedRef.current]
      }
      last = now
      if (elapsed >= ms) resolve()
      else requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }), [])

  const play = useCallback(async () => {
    const id = ++runId.current
    const script = t('demo.script')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setItems([])
    setPatientTyping(false)
    setDraft(null)
    setSend('')
    setProgress(0)

    try {
      await wait(700, id)
      for (let i = 0; i < script.length; i++) {
        const msg = script[i]
        if (msg.from === 'd') {
          setItems((prev) => [...prev, { kind: 'd', text: msg.text }])
          await wait(900, id)
        } else if (msg.from === 't') {
          await wait(700, id)
          if (reduced) {
            setDraft(msg.text)
          } else {
            for (let c = 1; c <= msg.text.length; c++) {
              setDraft(msg.text.slice(0, c))
              // Brief pauses after punctuation make the typing feel human
              const extra = /[,.?…]/.test(msg.text[c - 1]) ? 160 : 0
              await wait(28 + Math.random() * 30 + extra, id)
            }
          }
          setSend('ready')
          await wait(450, id)
          setSend('fire')
          await wait(140, id)
          setSend('')
          setDraft(null)
          setItems((prev) => [...prev, { kind: 't', text: msg.text, time: clock(i, script.length) }])
        } else {
          await wait(msg.think ? 0 : 500, id)
          setPatientTyping(true)
          await wait(msg.think ?? Math.min(900 + msg.text.length * 32, 3400), id)
          setPatientTyping(false)
          if (msg.think) {
            // A silence: the patient starts typing, stops, then answers
            await wait(900, id)
          } else {
            setItems((prev) => [...prev, { kind: 'p', text: msg.text, time: clock(i, script.length) }])
          }
        }
        setProgress(((i + 1) / script.length) * 100)
      }
      // Loop after a pause at the end of the session
      await wait(6000, id)
      play()
    } catch {
      // A newer run replaced this one
    }
  }, [t, wait])

  // (Re)start on mount and whenever the language changes; stop on unmount
  useEffect(() => {
    const run = runId
    play()
    return () => { run.current++ }
  }, [lang, play])

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { inView.current = e.isIntersecting }, { threshold: 0.25 })
    if (rootRef.current) obs.observe(rootRef.current)
    return () => obs.disconnect()
  }, [])

  // Keep the latest message in view (scrolls the chat only, never the page)
  useEffect(() => {
    const el = listRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [items, patientTyping])

  const restart = () => {
    setPaused(false)
    play()
  }

  return (
    // Phones: title, chat, then lead + controls. Desktop: chat on the left, text stacked on the right.
    <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] lg:grid-rows-[1fr_auto_1fr] gap-x-20 gap-y-10 lg:gap-y-0">
      <h2 className="t-h2 text-center lg:text-left lg:col-start-2 lg:row-start-1 self-end reveal">
        <Rich text={t('demo.title')} />
      </h2>

      <div className="text-center lg:text-left lg:col-start-2 lg:row-start-2 lg:pt-5 order-last lg:order-none">
        <p className="t-lead max-w-[60ch] mx-auto lg:mx-0 mb-8 reveal d1">{t('demo.lead')}</p>
        <div className="flex flex-wrap justify-center lg:justify-start gap-2.5 reveal d3">
          <button type="button" className={`demo-ctrl ${paused ? 'is-on' : ''}`} onClick={() => setPaused((p) => !p)}>
            {paused ? <Play weight="fill" className="w-3.5 h-3.5" /> : <Pause weight="fill" className="w-3.5 h-3.5" />}
            {paused ? t('demo.resume') : t('demo.pause')}
          </button>
          <button type="button" className="demo-ctrl" onClick={restart}>
            <ArrowCounterClockwise weight="bold" className="w-3.5 h-3.5" />
            {t('demo.restart')}
          </button>
          <button type="button" className={`demo-ctrl ${speed > 0 ? 'is-on' : ''}`} onClick={() => setSpeed((s) => (s + 1) % SPEEDS.length)}>
            {t('demo.speed')} {SPEEDS[speed]}×
          </button>
        </div>
        <p className="text-exyo-gray text-xs mt-6 reveal d4">{t('demo.caption')}</p>
      </div>

      <div ref={rootRef} className="chat lg:col-start-1 lg:row-start-1 lg:row-span-3 reveal d2" aria-label={t('demo.title').replace(/__/g, '')}>
        <div className="chat-head">
          <div className="chat-avatar" aria-hidden="true">A</div>
          <div className="flex-1 min-w-0 text-left">
            <div className="font-display font-semibold text-[0.95rem] text-exyo-white truncate">
              {t('demo.patient')} <span className="text-exyo-gray font-normal">· {t('demo.patient_tag')}</span>
            </div>
            <div className={`text-xs h-[18px] transition-colors ${patientTyping ? 'text-exyo-cyan' : 'text-exyo-gray'}`}>
              {patientTyping ? t('demo.typing') : t('demo.online')}
            </div>
          </div>
          <span className="chat-badge hidden sm:inline-flex">{t('demo.session')}</span>
        </div>
        <div className="h-[2px] bg-[var(--line)]">
          <div className="h-full bg-exyo-cyan transition-[width] duration-500" style={{ width: `${progress}%` }} />
        </div>

        <div ref={listRef} className="chat-list" aria-live="polite">
          {items.map((m, i) => m.kind === 'd' ? (
            <div key={i} className="chat-divider">{m.text}</div>
          ) : (
            <div key={i} className={`chat-row ${m.kind === 't' ? 'is-t' : 'is-p'}`}>
              <div className="chat-bubble">{m.text}</div>
              <div className="chat-meta">
                <span>{m.time}</span>
                {m.kind === 't' && <span className="text-exyo-cyan tracking-[-3px]">✓✓</span>}
              </div>
            </div>
          ))}
          {patientTyping && (
            <div className="chat-typing" aria-hidden="true"><span /><span /><span /></div>
          )}
        </div>

        <div className="chat-composer" aria-hidden="true">
          <div className={`chat-input ${draft !== null ? 'is-active' : ''}`}>
            {draft === null
              ? <span className="text-exyo-gray">{t('demo.placeholder')}</span>
              : <span>{draft}<span className="chat-caret" /></span>}
          </div>
          <span className={`chat-send ${send ? 'is-ready' : ''} ${send === 'fire' ? 'is-fire' : ''}`}>
            <PaperPlaneRight weight="fill" className="w-[18px] h-[18px]" />
          </span>
        </div>
      </div>
    </div>
  )
}

