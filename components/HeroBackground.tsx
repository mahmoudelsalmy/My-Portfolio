'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

/* ─── Canvas particle layer ─── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = window.innerHeight)

    const onResize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    // Small floating dots
    const DOTS = 55
    const dots = Array.from({ length: DOTS }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.4 + 0.4,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      alpha: Math.random() * 0.35 + 0.08,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      // Draw connection lines between nearby dots
      for (let i = 0; i < DOTS; i++) {
        for (let j = i + 1; j < DOTS; j++) {
          const dx = dots[i].x - dots[j].x
          const dy = dots[i].y - dots[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 130) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(124,58,237,${0.06 * (1 - dist / 130)})`
            ctx.lineWidth = 0.7
            ctx.moveTo(dots[i].x, dots[i].y)
            ctx.lineTo(dots[j].x, dots[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw dots
      for (const d of dots) {
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(124,58,237,${d.alpha})`
        ctx.fill()

        d.x += d.vx
        d.y += d.vy
        if (d.x < 0 || d.x > w) d.vx *= -1
        if (d.y < 0 || d.y > h) d.vy *= -1
      }

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-60 dark:opacity-80"
    />
  )
}

/* ─── Main background ─── */
export function HeroBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">

      {/* ── Base gradient ── */}
      <div className="absolute inset-0 bg-[#F9FAFB] dark:bg-[#0B0F19]" />

      {/* ── Subtle dot-grid overlay ── */}
      <div
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(124,58,237,0.8) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* ── Canvas particles + network lines ── */}
      <ParticleCanvas />

      {/* ── Primary ambient glow — violet, top-left ── */}
      <motion.div
        className="absolute -top-32 -left-32 w-[700px] h-[700px] rounded-full"
        style={{
          background:
            'radial-gradient(circle at center, rgba(124,58,237,0.13) 0%, transparent 70%)',
        }}
        animate={{ x: [0, 40, -20, 0], y: [0, 30, -30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── Secondary ambient glow — blue, bottom-right ── */}
      <motion.div
        className="absolute -bottom-32 -right-20 w-[600px] h-[600px] rounded-full"
        style={{
          background:
            'radial-gradient(circle at center, rgba(37,99,235,0.10) 0%, transparent 70%)',
        }}
        animate={{ x: [0, -40, 20, 0], y: [0, -30, 40, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* ── Mid accent glow ── */}
      <motion.div
        className="absolute top-[35%] right-[15%] w-[350px] h-[350px] rounded-full"
        style={{
          background:
            'radial-gradient(circle at center, rgba(124,58,237,0.07) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.12, 0.96, 1], opacity: [0.5, 0.9, 0.6, 0.5] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* ── Thin gradient line across top ── */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
    </div>
  )
}
