import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState('loading') // loading | reveal
  const intervalRef = useRef(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(intervalRef.current)
          setTimeout(() => setPhase('reveal'), 200)
          setTimeout(onComplete, 900)
          return 100
        }
        return prev + Math.random() * 4 + 1
      })
    }, 40)
    return () => clearInterval(intervalRef.current)
  }, [])

  return (
    <motion.div
      className="loader flex flex-col items-center justify-center gap-8"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Logo */}
      <motion.div
        className="relative flex flex-col items-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative">
          <motion.div
            className="w-20 h-20 rounded-full border-2 border-forge-cyan/30 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            <div className="w-3 h-3 rounded-full bg-forge-cyan" style={{ boxShadow: '0 0 20px #00f5ff' }} />
          </motion.div>
          <motion.div
            className="absolute inset-0 w-20 h-20 rounded-full border border-forge-violet/20"
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            style={{ margin: '-8px', width: 'calc(100% + 16px)', height: 'calc(100% + 16px)' }}
          />
        </div>

        <div className="text-center">
          <h1
            className="text-4xl font-display font-black tracking-[0.3em] gradient-text"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            DATA FORGE
          </h1>
          <p className="text-forge-cyan/60 text-xs tracking-[0.5em] uppercase mt-1 font-mono">
            Initializing Systems
          </p>
        </div>
      </motion.div>

      {/* Progress bar */}
      <div className="w-64 flex flex-col gap-2">
        <div className="flex justify-between text-xs font-mono text-forge-cyan/40">
          <span>LOADING</span>
          <span>{Math.min(Math.round(progress), 100)}%</span>
        </div>
        <div className="h-px bg-forge-border/50 relative overflow-hidden rounded">
          <motion.div
            className="h-full"
            style={{
              width: `${Math.min(progress, 100)}%`,
              background: 'linear-gradient(90deg, #00f5ff, #8b5cf6)',
              boxShadow: '0 0 10px #00f5ff',
              transition: 'width 0.1s ease',
            }}
          />
        </div>
      </div>

      {/* Status text */}
      <motion.p
        className="text-xs font-mono text-white/20 tracking-widest"
        animate={{ opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {progress < 30 ? 'CALIBRATING FORGE MATRIX...' :
         progress < 60 ? 'LOADING DATA STREAMS...' :
         progress < 90 ? 'INITIALIZING AI CORES...' :
         'SYSTEMS ONLINE'}
      </motion.p>
    </motion.div>
  )
}
