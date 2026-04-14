'use client'

import Image from 'next/image'
import { useTheme } from 'next-themes'

interface LogoSvgProps {
  /** compact = navbar size, full = hero / footer */
  size?: 'compact' | 'full'
}

export function LogoSvg({ size = 'compact' }: LogoSvgProps) {
  const { resolvedTheme } = useTheme()

  if (size === 'full') {
    return (
      <div className="relative w-48 h-20 select-none">
        <Image
          src="/logo.png"
          alt="Mahmoud Elsalmy Logo"
          fill
          className="object-contain object-left"
          priority
        />
      </div>
    )
  }

  // Navbar compact view — just the logo mark, no wordmark
  return (
    <div className="relative flex items-center gap-2.5 select-none">
      {/* Icon – only the ME shield mark */}
      <div className="relative w-9 h-9 flex-shrink-0">
        <Image
          src="/logo.png"
          alt="ME"
          fill
          className="object-contain"
          priority
        />
      </div>
      {/* Wordmark */}
      <div className="flex flex-col leading-none">
        <span className="text-sm font-bold tracking-wide text-gray-900 dark:text-white">
          Mahmoud
        </span>
        <span className="text-[10px] font-semibold tracking-widest uppercase text-accent">
          Elsalmy
        </span>
      </div>
    </div>
  )
}
