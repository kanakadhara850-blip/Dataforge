import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CustomCursor from './components/ui/CustomCursor'
import ParticleCanvas from './components/ui/ParticleCanvas'
import LoadingScreen from './components/ui/LoadingScreen'
import ScrollProgress from './components/ui/ScrollProgress'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import EventsPage from './pages/EventsPage'
import EventDetailPage from './pages/EventDetailPage'

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Router>
      <AnimatePresence>
        {loading && <LoadingScreen key="loader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      {!loading && (
        <>
          <CustomCursor />
          <ParticleCanvas />
          <ScrollProgress />
          <div className="relative z-10">
            <Navbar />
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/events/:slug" element={<EventDetailPage />} />
              </Routes>
            </AnimatePresence>
            <Footer />
          </div>
        </>
      )}
    </Router>
  )
}
