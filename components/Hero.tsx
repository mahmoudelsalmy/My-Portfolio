'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, MessageCircle, Download } from 'lucide-react'
import Image from 'next/image'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { y: 28, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 80, damping: 18 },
  },
}

const socialLinks = [
  { icon: Github, href: 'https://github.com/mahmoudelsalmy', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/mahmoudelsalmy', label: 'LinkedIn' },
  { icon: MessageCircle, href: 'https://wa.me/201097128423', label: 'WhatsApp' },
  { icon: Mail, href: 'mailto:mahmoudelsalmy1@gmail.com', label: 'Email' },
]

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden transition-colors duration-500"
    >
      <div className="absolute top-[-15%] left-[-5%] w-[500px] h-[500px] rounded-full bg-accent/8 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[5%] w-[400px] h-[400px] rounded-full bg-accent-blue/8 blur-[120px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6 md:px-10 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left Column ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.p
              variants={itemVariants}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 mb-5"
            >
              Computer Systems Engineer Student
            </motion.p>

            {/* Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1] mb-6"
            >
              <span className="text-gray-900 dark:text-white">Software &amp;</span>
              <br />
              <span className="text-accent">Embedded </span>
              <br />
              <span className="text-accent">Systems</span>
              <br />
              <span className="text-gray-900 dark:text-white">Engineer</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-gray-600 dark:text-gray-400 text-base leading-relaxed max-w-md mb-8"
            >
              I build scalable systems and intelligent solutions that bridge
              software and hardware, turning complex requirements into elegant
              architecture.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <a
                href="/api/download"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-xl bg-accent text-white font-semibold text-sm hover:bg-accent/90 focus:scale-95 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-accent/20 flex items-center gap-2"
              >
                <Download size={16} />
                Download CV
              </a>
              <motion.button
                onClick={() =>
                  document
                    .querySelector('#contact')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold text-sm hover:border-accent hover:text-accent transition-colors flex items-center gap-2"
              >
                <MessageCircle size={16} />
                Contact Me
              </motion.button>
            </motion.div>
          </motion.div>

          {/* ── Right Column ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
            className="flex flex-col items-center gap-5"
          >
            {/* Tech image card */}
            <div className="relative w-full max-w-[480px] aspect-[4/3] rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
              <Image
                src="/hero-tech.png"
                alt="Embedded Systems Circuit Board"
                fill
                className="object-cover"
                priority
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark-bg/60" />
              {/* Glow border */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-accent/20" />
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ y: -3, scale: 1.12 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-xl bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-accent dark:hover:text-accent hover:border-accent/50 transition-all"
                >
                  <s.icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
