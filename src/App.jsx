import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import ChatWidget from './components/ChatWidget'

import Home from './pages/Home'
import FeaturesPage from './pages/FeaturesPage'
import PricingPage from './pages/PricingPage'
import HowItWorksPage from './pages/HowItWorksPage'
import CommunityPage from './pages/CommunityPage'
import FAQPage from './pages/FAQPage'
import AboutPage from './pages/AboutPage'
import SupportPage from './pages/SupportPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import TermsPage from './pages/TermsPage'
import JoinRoomPage from './pages/JoinRoomPage'
import VerifyCertificatePage from './pages/VerifyCertificatePage'

function App() {
  const [showChat, setShowChat] = useState(false)
  const location = useLocation()
  
  const [mousePos, setMousePos] = useState({ 
      x: typeof window !== 'undefined' ? window.innerWidth / 2 : 600, 
      y: 400 
  })

  const handleMouseMove = (e) => {
      setMousePos({
          x: e.clientX,
          y: e.clientY,
      })
  }

  useEffect(() => {
    window.scrollTo(0, 0)

    // Reveal on scroll animation
    const handleReveal = () => {
      const revealElements = document.querySelectorAll('.reveal')
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active')
          }
        })
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      })
      revealElements.forEach(el => revealObserver.observe(el))
    }

    // Small timeout to ensure DOM is ready after route transition
    setTimeout(handleReveal, 100)

  }, [location])

  return (
    <div className="App" onMouseMove={handleMouseMove}>
      <div 
          className="global-grid-bg"
          style={{
              WebkitMaskImage: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 0, 0, 1) 0%, transparent 80%)`,
              maskImage: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 0, 0, 1) 0%, transparent 80%)`
          }}
      />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/join/:roomId" element={<JoinRoomPage />} />
        <Route path="/verify" element={<VerifyCertificatePage />} />
      </Routes>
      <Footer />
      <ChatWidget show={showChat} onToggle={() => setShowChat(!showChat)} />
    </div>
  )
}

export default App
