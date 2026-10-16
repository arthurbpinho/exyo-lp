import { useState } from 'react'
import { Play } from '@phosphor-icons/react'
import poster from '../assets/images/simulacao/pitch-poster.jpg'
import { useLanguage } from '../i18n/LanguageContext'

const VIMEO_ID = '1236225522'
const YOUTUBE_ID_PT = 'HmyVsokWirk'

// English plays the Vimeo cut; Portuguese plays the YouTube version
const VIDEO_SRC = {
  en: `https://player.vimeo.com/video/${VIMEO_ID}?autoplay=1&title=0&byline=0&portrait=0&badge=0&autopause=0&dnt=1&color=70CED3`,
  pt: `https://www.youtube-nocookie.com/embed/${YOUTUBE_ID_PT}?autoplay=1&rel=0&modestbranding=1&playsinline=1`,
}

// Poster facade: the player only loads after the visitor presses play,
// so the page stays light and the frame keeps the site's look until then.
export default function PitchVideo() {
  const { lang, t } = useLanguage()
  // Tracking the language that was playing resets to the poster when the language changes
  const [playingLang, setPlayingLang] = useState(null)
  const [loadedLang, setLoadedLang] = useState(null)
  const playing = playingLang === lang
  const loaded = loadedLang === lang

  return (
    <div id="video" className="relative">
      <div className="ambient w-[110%] h-[90%] left-1/2 -translate-x-1/2 top-[5%]" aria-hidden="true" />

      <figure className="relative text-left reveal d2">
        <div className="video-frame">
          {playing && (
            <iframe
              key={lang}
              src={VIDEO_SRC[lang] ?? VIDEO_SRC.en}
              title={t('video.iframe_title')}
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              onLoad={() => setLoadedLang(lang)}
              className="absolute inset-0 w-full h-full"
            />
          )}

          {!loaded && (
            <button
              type="button"
              onClick={() => setPlayingLang(lang)}
              disabled={playing}
              aria-label={`${t('video.play')}: ${t('video.title')} (${t('video.duration')})`}
              className="video-trigger group absolute inset-0 w-full h-full text-left cursor-pointer disabled:cursor-progress"
            >
              <img
                src={poster}
                alt=""
                width="1920"
                height="1080"
                fetchPriority="high"
                className="video-poster"
              />
              <span className="video-scrim" />

              <span className="absolute inset-0 grid place-items-center">
                <span className={`play-btn ${playing ? 'opacity-60' : ''}`}>
                  <Play weight="fill" className="w-7 h-7 translate-x-[2px]" />
                </span>
              </span>

              <span className="hidden sm:flex absolute left-9 right-9 bottom-8 items-end justify-between gap-6">
                <span className="block">
                  <span className="block font-display font-semibold text-exyo-white tracking-tight text-2xl lg:text-[1.75rem] leading-tight">
                    {t('video.title')}
                  </span>
                  <span className="block text-[rgba(245,245,247,0.72)] text-base mt-1.5">
                    {t('video.name')}, {t('video.role')}
                  </span>
                </span>
                <span className="inline-flex items-center gap-2 shrink-0 rounded-full border border-[rgba(255,255,255,0.22)] bg-[rgba(10,10,11,0.45)] backdrop-blur-md px-4 py-2 text-sm text-exyo-white">
                  <Play weight="fill" className="w-3.5 h-3.5 text-exyo-cyan" />
                  {t('video.play')}
                  <span className="text-exyo-gray">{t('video.duration')}</span>
                </span>
              </span>
            </button>
          )}
        </div>

        {/* On phones the caption sits under the frame so it never collides with the play button */}
        <figcaption className="sm:hidden flex items-start justify-between gap-4 mt-4 px-1">
          <span>
            <span className="block font-display font-semibold text-exyo-white tracking-tight text-lg leading-tight">{t('video.title')}</span>
            <span className="block text-exyo-gray text-sm mt-1">{t('video.name')}, {t('video.role')}</span>
          </span>
          <span className="text-exyo-gray text-sm shrink-0 pt-0.5">{t('video.duration')}</span>
        </figcaption>
      </figure>
    </div>
  )
}
