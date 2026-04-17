'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Heart, ArrowUp, Code2, MessageCircle } from 'lucide-react'
import { LogoSvg } from './LogoSvg'

const socialLinks = [
  { icon: Github, label: 'GitHub', url: 'https://github.com/mahmoudelsalmy', color: '#a78bfa' },
  { icon: Linkedin, label: 'LinkedIn', url: 'https://linkedin.com/in/mahmoudelsalmy', color: '#60a5fa' },
  { icon: MessageCircle, label: 'WhatsApp', url: 'https://wa.me/201097128423', color: '#22c55e' },
  { icon: Mail, label: 'Email', url: 'mailto:mahmoudelsalmy1@gmail.com', color: '#a78bfa' },
]

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative overflow-hidden border-t border-gray-200/50 dark:border-white/5">
      {/* Removed subtle gradient background to unify site background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      <div className="relative container mx-auto px-4 md:px-6 pt-12 pb-6">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <LogoSvg size="full" />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs">
              Software & AI and Embedded Systems Engineer building scalable solutions that bridge software and hardware.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 pt-1">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-dark-border flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-accent dark:hover:text-accent hover:bg-accent/10 transition-colors"
                >
                  <social.icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-text dark:text-text-dark uppercase tracking-widest">
              Navigation
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-accent dark:hover:text-accent transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-accent transition-all duration-300" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-text dark:text-text-dark uppercase tracking-widest">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:mahmoudelsalmy1@gmail.com"
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-accent transition-colors flex items-center gap-2"
                >
                  <Mail size={14} className="text-accent shrink-0" />
                  mahmoudelsalmy1@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Code2 size={14} className="text-accent shrink-0 mt-0.5" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Open to remote opportunities & collaborations
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/5 to-transparent mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
            © 2026 Mahmoud Elsalmy · All rights reserved.
            <Heart size={11} className="text-accent fill-accent" />

          </p>

          {/* Scroll to top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 hover:text-accent dark:hover:text-accent transition-colors group"
          >
            Back to top
            <span className="w-6 h-6 rounded-lg bg-gray-100 dark:bg-dark-border flex items-center justify-center group-hover:bg-accent/10 transition-colors">
              <ArrowUp size={12} />
            </span>
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
