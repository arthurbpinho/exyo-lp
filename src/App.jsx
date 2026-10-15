import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import { Context, Vision, About, Differentiators, Philosophy, PitchQuestion } from './components/Intro'
import Problem from './components/Problem'
import Solution from './components/Solution'
import Team from './components/Team'
import FormSection from './components/FormSection'
import Footer from './components/Footer'

function App() {
  useEffect(() => {
    // ===== GLOBAL REVEAL OBSERVER =====
    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('vis')
            // Animate rings inside
            e.target.querySelectorAll('.rk-fill').forEach((r) => {
              setTimeout(() => r.classList.add('go'), 200)
            })
            revealObs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -20px 0px' }
    )

    document.querySelectorAll('.reveal').forEach((el) => revealObs.observe(el))

    return () => revealObs.disconnect()
  }, [])

  return (
    <div className="min-h-[100dvh]" style={{ background: 'var(--bg)' }}>
      <Navbar />
      <main>
        <Hero />
        <Context />
        <Vision />
        <About />
        <Differentiators />
        <Philosophy />
        <PitchQuestion />
        <Problem />
        <Solution />
        <Team />
        <FormSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
