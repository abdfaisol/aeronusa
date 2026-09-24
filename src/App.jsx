import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Intro from './components/Intro.jsx'
import WhyUs from './components/WhyUs.jsx'
import Fleet from './components/Fleet.jsx'
import Services from './components/Services.jsx'
import Process from './components/Process.jsx'
import Capabilities from './components/Capabilities.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import BackToTop from './components/ui/BackToTop.jsx'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Lewati ke konten utama
      </a>

      <Header />

      <main id="main" className="flex-1">
        <Hero />
        <Intro />
        <WhyUs />
        <Fleet />
        <Services />
        <Process />
        <Capabilities />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </div>
  )
}
