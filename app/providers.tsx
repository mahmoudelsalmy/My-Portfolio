'use client'

import { ThemeProvider } from 'next-themes'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      <AnimatePresence mode="wait">
        {children}
      </AnimatePresence>
    </ThemeProvider>
  )
}
