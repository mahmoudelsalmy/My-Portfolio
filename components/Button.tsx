'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { forwardRef } from 'react'

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', children, className = '', ...props }, ref) => {
    const baseStyles = 'rounded-xl font-medium transition-all duration-300 inline-flex items-center justify-center'

    const variants = {
      primary: 'bg-accent text-white hover:shadow-lg hover:shadow-accent/30',
      secondary: 'border-2 border-accent text-accent hover:bg-accent hover:text-white',
    }

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    }

    return (
      <motion.button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        {...props}
      >
        {children}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'
