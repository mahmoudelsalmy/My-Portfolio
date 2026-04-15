'use client'

import { useTheme } from 'next-themes'

interface LogoSvgProps {
  /** compact = navbar size, full = hero / footer */
  size?: 'compact' | 'full'
}

export function LogoSvg({ size = 'compact' }: LogoSvgProps) {
  // A sleek, minimal monogram representing "Mahmoud Elsalmy"
  const LogoIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="primaryGradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7C3AED" />
          <stop offset="1" stopColor="#2563EB" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="22" fill="url(#primaryGradient)" fillOpacity="0.1" />
      <rect x="2" y="2" width="96" height="96" rx="20" stroke="url(#primaryGradient)" strokeWidth="4" strokeOpacity="0.5" />
      <path d="M 28 68 V 32 L 50 52 L 72 32 V 68" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900 dark:text-white" />
      <circle cx="50" cy="74" r="5" fill="#7C3AED" />
    </svg>
  )

  if (size === 'full') {
    return (
      <div className="relative flex items-center gap-4 select-none">
        <div className="w-16 h-16 flex-shrink-0 relative">
          <LogoIcon />
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-2xl font-bold tracking-wide text-gray-900 dark:text-white mb-1">
            Mahmoud
          </span>
          <span className="text-sm font-semibold tracking-[0.3em] uppercase text-accent">
            Elsalmy
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex items-center gap-2.5 select-none">
      <div className="relative w-9 h-9 flex-shrink-0">
         <LogoIcon />
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-sm font-bold tracking-wide text-gray-900 dark:text-white mb-1">
          Mahmoud
        </span>
        <span className="text-[10px] font-semibold tracking-widest uppercase text-accent">
          Elsalmy
        </span>
      </div>
    </div>
  )
}
