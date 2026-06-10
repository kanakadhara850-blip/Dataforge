import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const trailRef = useRef(null)
  const particlesRef = useRef([])
  const rafRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const trailPosRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const cursor = cursorRef.current
    const trail = trailRef.current

    const colors = ['#00f5ff', '#0080ff', '#8b5cf6', '#d946ef', '#ffffff']

    const createParticle = (x, y) => {
      const particle = document.createElement('div')
      const color = colors[Math.floor(Math.random() * colors.length)]
      const size = Math.random() * 4 + 2
      const angle = Math.random() * Math.PI * 2
      const speed = Math.random() * 3 + 1
      const life = Math.random() * 500 + 300

      particle.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        pointer-events: none;
        z-index: 9997;
        left: ${x}px;
        top: ${y}px;
        box-shadow: 0 0 ${size * 2}px ${color};
        transform: translate(-50%, -50%);
      `
      document.body.appendChild(particle)

      const startTime = Date.now()
      const vx = Math.cos(angle) * speed
      const vy = Math.sin(angle) * speed

      const animateParticle = () => {
        const elapsed = Date.now() - startTime
        const progress = elapsed / life
        if (progress >= 1) {
          particle.remove()
          return
        }
        const currentX = x + vx * elapsed * 0.1
        const currentY = y + vy * elapsed * 0.1
        particle.style.left = `${currentX}px`
        particle.style.top = `${currentY}px`
        particle.style.opacity = `${1 - progress}`
        particle.style.transform = `translate(-50%, -50%) scale(${1 - progress * 0.5})`
        requestAnimationFrame(animateParticle)
      }
      requestAnimationFrame(animateParticle)
    }

    let lastX = 0, lastY = 0, particleThrottle = 0

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      cursor.style.left = `${e.clientX}px`
      cursor.style.top = `${e.clientY}px`

      particleThrottle++
      if (particleThrottle % 3 === 0) {
        const dx = e.clientX - lastX
        const dy = e.clientY - lastY
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist > 5) {
          createParticle(e.clientX, e.clientY)
          lastX = e.clientX
          lastY = e.clientY
        }
      }
    }

    const animateTrail = () => {
      trailPosRef.current.x += (mouseRef.current.x - trailPosRef.current.x) * 0.12
      trailPosRef.current.y += (mouseRef.current.y - trailPosRef.current.y) * 0.12
      trail.style.left = `${trailPosRef.current.x}px`
      trail.style.top = `${trailPosRef.current.y}px`
      rafRef.current = requestAnimationFrame(animateTrail)
    }

    const onMouseDown = () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(0.7)'
      trail.style.transform = 'translate(-50%, -50%) scale(0.7)'
      for (let i = 0; i < 12; i++) {
        createParticle(mouseRef.current.x, mouseRef.current.y)
      }
    }

    const onMouseUp = () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)'
      trail.style.transform = 'translate(-50%, -50%) scale(1)'
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)
    rafRef.current = requestAnimationFrame(animateTrail)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="custom-cursor"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <div
        ref={trailRef}
        className="cursor-trail"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  )
}
