'use client'

import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <motion.button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="relative p-2 rounded-lg bg-gray-100 dark:bg-dark-card hover:bg-gray-200 dark:hover:bg-dark-border transition-colors overflow-hidden"
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: theme === 'dark' ? 0 : 180,
          scale: theme === 'dark' ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Moon size={20} className="text-accent" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          rotate: theme === 'dark' ? -180 : 0,
          scale: theme === 'dark' ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="flex items-center justify-center"
      >
        <Sun size={20} className="text-accent-blue" />
      </motion.div>
    </motion.button>
  )
}
