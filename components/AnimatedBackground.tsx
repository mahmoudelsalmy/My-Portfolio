// components/AnimatedBackground.tsx
'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export function AnimatedBackground() {
  const [mounted, setMounted] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Extremely subtle parallax (barely noticeable)
  const springConfig = { damping: 50, stiffness: 400 } // Tighter spring for subtle feel
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  const parallaxX = useTransform(springX, [-1, 1], [-15, 15])
  const parallaxY = useTransform(springY, [-1, 1], [-15, 15])

  useEffect(() => {
    setMounted(true)
    
    // Low performance impact mouse listener
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = (e.clientY / window.innerHeight) * 2 - 1
      mouseX.set(x)
      mouseY.set(y)
    }
    
    // Only add listener on non-touch devices for better mobile performance
    if (window.matchMedia('(hover: hover)').matches) {
       window.addEventListener('mousemove', handleMouseMove, { passive: true })
       return () => window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [mouseX, mouseY])

  if (!mounted) return null

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-white dark:bg-[#030014] transition-colors duration-700" 
    >
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes subtle-drift-1 {
          0% { transform: translate(0, 0) scale(1); opacity: 0.05; }
          33% { transform: translate(2%, 3%) scale(1.05); opacity: 0.08; }
          66% { transform: translate(-2%, 1%) scale(0.95); opacity: 0.06; }
          100% { transform: translate(0, 0) scale(1); opacity: 0.05; }
        }
        @keyframes subtle-drift-2 {
          0% { transform: translate(0, 0) scale(1); opacity: 0.04; }
          33% { transform: translate(-3%, -2%) scale(0.95); opacity: 0.06; }
          66% { transform: translate(1%, -3%) scale(1.05); opacity: 0.03; }
          100% { transform: translate(0, 0) scale(1); opacity: 0.04; }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}} />

      {/* Subtle animated gradient background shifting */}
      <div 
        className="absolute inset-0 opacity-30 dark:opacity-20 mix-blend-multiply dark:mix-blend-screen"
        style={{
          background: 'radial-gradient(120% 120% at 50% 50%, rgba(124, 58, 237, 0.05) 0%, rgba(59, 130, 246, 0.05) 50%, rgba(0, 0, 0, 0) 100%)',
          backgroundSize: '200% 200%',
          animation: 'gradient-shift 30s ease-in-out infinite'
        }}
      />
      
      {/* Motion wrapper for subtle parallax */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{ x: parallaxX, y: parallaxY }}
      >
        {/* Blob 1 - Purple/Indigo */}
        <div
          className="absolute w-[80vw] h-[80vw] max-w-[1200px] max-h-[1200px] rounded-full blur-[150px] bg-indigo-500 will-change-transform mix-blend-normal transform-gpu"
          style={{ 
            top: '-20%', left: '-10%', 
            animation: 'subtle-drift-1 25s ease-in-out infinite' 
          }}
        />

        {/* Blob 2 - Blue */}
        <div
          className="absolute w-[70vw] h-[70vw] max-w-[1000px] max-h-[1000px] rounded-full blur-[120px] bg-blue-600 will-change-transform mix-blend-normal transform-gpu"
          style={{ 
            bottom: '-20%', right: '-20%', 
            animation: 'subtle-drift-2 30s ease-in-out infinite' 
          }}
        />
        
        {/* Blob 3 - Violet minimal center highlight */}
        <div
          className="absolute w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[180px] bg-violet-600 will-change-transform mix-blend-normal transform-gpu"
          style={{ 
            animation: 'subtle-drift-1 40s ease-in-out infinite reverse',
            opacity: 0.03
          }}
        />
      </motion.div>
      
      {/* Soft noise texture overlay for premium matte finish */}
      <div 
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
        }}
      />
    </div>
  )
}