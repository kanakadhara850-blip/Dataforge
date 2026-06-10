import { useEffect, useRef } from 'react'

export default function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let W = window.innerWidth
    let H = window.innerHeight
    canvas.width = W
    canvas.height = H

    const NUM_STARS = 150
    const NUM_NODES = 40
    const CONNECTION_DIST = 150

    // Stars
    const stars = Array.from({ length: NUM_STARS }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      opacity: Math.random() * 0.7 + 0.1,
      speed: Math.random() * 0.3 + 0.05,
      twinkle: Math.random() * Math.PI * 2,
    }))

    // Data nodes
    const nodes = Array.from({ length: NUM_NODES }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
      color: ['#00f5ff', '#0080ff', '#8b5cf6'][Math.floor(Math.random() * 3)],
      pulse: Math.random() * Math.PI * 2,
    }))

    const resize = () => {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = W
      canvas.height = H
    }

    window.addEventListener('resize', resize)

    let t = 0
    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      t += 0.008

      // Stars
      stars.forEach(star => {
        star.twinkle += 0.02
        const op = star.opacity * (0.7 + 0.3 * Math.sin(star.twinkle))
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${op})`
        ctx.fill()
        star.y += star.speed
        if (star.y > H) {
          star.y = 0
          star.x = Math.random() * W
        }
      })

      // Nodes
      nodes.forEach(node => {
        node.x += node.vx
        node.y += node.vy
        node.pulse += 0.03
        if (node.x < 0 || node.x > W) node.vx *= -1
        if (node.y < 0 || node.y > H) node.vy *= -1

        const pulseR = node.r * (1 + 0.3 * Math.sin(node.pulse))
        ctx.beginPath()
        ctx.arc(node.x, node.y, pulseR, 0, Math.PI * 2)
        ctx.fillStyle = node.color
        ctx.shadowColor = node.color
        ctx.shadowBlur = 8
        ctx.fill()
        ctx.shadowBlur = 0
      })

      // Neural connections
      nodes.forEach((a, i) => {
        nodes.slice(i + 1).forEach(b => {
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECTION_DIST) {
            const op = (1 - dist / CONNECTION_DIST) * 0.25
            const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y)
            grad.addColorStop(0, a.color.replace(')', `, ${op})`).replace('rgb', 'rgba').replace('#00f5ff', `rgba(0,245,255,${op})`).replace('#0080ff', `rgba(0,128,255,${op})`).replace('#8b5cf6', `rgba(139,92,246,${op})`))
            grad.addColorStop(1, `rgba(0,0,0,0)`)
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(0, 200, 255, ${op})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      id="particle-canvas"
      style={{ position: 'fixed', top: 0, left: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  )
}
