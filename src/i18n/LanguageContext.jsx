import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { translations } from './translations'

const STORAGE_KEY = 'exyo-lang'
const DEFAULT_LANG = 'en'

const LanguageContext = createContext({
  lang: DEFAULT_LANG,
  setLang: () => {},
  t: (key) => key,
})

function getInitialLang() {
  if (typeof window === 'undefined') return DEFAULT_LANG
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'en' || stored === 'pt') return stored
  return DEFAULT_LANG
}

function resolve(dict, path) {
  return path.split('.').reduce((acc, part) => (acc == null ? acc : acc[part]), dict)
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLang)

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
    window.localStorage.setItem(STORAGE_KEY, lang)
  }, [lang])

  const setLang = useCallback((next) => {
    if (next === 'en' || next === 'pt') setLangState(next)
  }, [])

  const t = useCallback(
    (key) => {
      const value = resolve(translations[lang], key)
      if (value !== undefined) return value
      return resolve(translations[DEFAULT_LANG], key) ?? key
    },
    [lang]
  )

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}

export function useT() {
  return useContext(LanguageContext).t
}
