'use client'

import { useEffect, useState, useRef } from 'react'
import Lenis from 'lenis'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { ScrollProgress } from '@/components/ScrollProgress'
import { Footer } from '@/components/Footer'
import { AnimatedBackground } from '@/components/AnimatedBackground'
import {
  Github,
  ExternalLink,
  Zap,
  AlignJustify,
  Send,
  Loader2,
  CheckCircle,
  Mail,
  Github as GithubIcon,
  Linkedin,
  MessageCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'

/* ─────────────────────────── DATA ─────────────────────────── */

const techStack = [
  { label: 'C# / .NET', col: 1 },
  { label: 'ASP.NET Core MVC', col: 2 },
  { label: 'Java / JavaFX', col: 1 },
  { label: 'C / C++', col: 2 },
  { label: 'Python', col: 1 },
  { label: 'ESP8266 / PIC MCU', col: 2 },
  { label: 'SQL Server', col: 1 },
  { label: 'VHDL / FPGA', col: 2 },
  { label: 'Git / GitHub', col: 1 },
  { label: 'Next.js / React', col: 2 },
]

// All 8 real projects from GitHub
const projects = [
  {
    id: 1,
    badge: 'IoT · Smart Home',
    title: 'Smart Home Automation',
    description:
      'Full IoT smart home system enabling remote control of appliances, lights, and security sensors via ESP8266 Wi-Fi. Firmware written in C++ with real-time MQTT messaging and mobile dashboard.',
    tech: ['C++', 'ESP8266', 'MQTT', 'IoT'],
    github: 'https://github.com/mahmoudelsalmy/Smart-Home-Automation-System-IoT',
    demo: null,
    featured: false,
    gradient: 'from-green-50 via-white to-gray-50 dark:from-green-900/40 dark:via-slate-900 dark:to-slate-950',
    accent: '#16a34a',
    image: '/hero-tech.png',
  },
  {
    id: 2,
    badge: 'Backend · Enterprise',
    title: 'Smart Inventory Management',
    description:
      'Full-featured inventory management system built with ASP.NET Core MVC. Supports product tracking, stock alerts, vendor management, and real-time reporting — live and deployed.',
    tech: ['C#', 'ASP.NET Core MVC', 'SQL Server', 'HTML/CSS'],
    github: 'https://github.com/mahmoudelsalmy/Smart-Inventory-Managment-System',
    demo: 'http://smart-inventory-management-system.runasp.net/',
    featured: true,
    gradient: 'from-violet-50 via-white to-gray-50 dark:from-violet-900/60 dark:via-slate-900 dark:to-slate-950',
    accent: '#7C3AED',
    image: '/Inventory.png',
  },
  {
    id: 3,
    badge: 'IoT · Embedded',
    title: 'Automated Plant Watering System',
    description:
      'IoT-based smart irrigation system using PIC16F877A microcontroller and ESP8266 Wi-Fi module. Monitors soil moisture in real-time and automatically controls water pump via relay.',
    tech: ['C++', 'PIC16F877A', 'ESP8266', 'IoT'],
    github: 'https://github.com/mahmoudelsalmy/Automated-Plant-Watering-System-IoT',
    demo: null,
    featured: true,
    gradient: 'from-emerald-50 via-white to-gray-50 dark:from-emerald-900/40 dark:via-slate-900 dark:to-slate-950',
    accent: '#10b981',
    image: '/Plant_Watering.png',
  },
  {
    id: 4,
    badge: 'Machine Learning · Python',
    title: 'Predictive Maintenance ML',
    description:
      'Machine learning system that predicts equipment failures before they occur, reducing downtime. Built with scikit-learn classifiers and a Streamlit web dashboard for real-time inference.',
    tech: ['Python', 'scikit-learn', 'Streamlit', 'Pandas'],
    github: 'https://github.com/mahmoudelsalmy/Predictive-Maintenance-ML',
    demo: 'https://predictive-maintenance-system-ml.streamlit.app/',
    featured: true,
    gradient: 'from-blue-50 via-white to-gray-50 dark:from-blue-900/60 dark:via-slate-900 dark:to-slate-950',
    accent: '#2563EB',
    image: '/Predictive_Maintenance.png',
  },
  {
    id: 5,
    badge: 'Desktop · Health',
    title: 'Clinic Management System',
    description:
      'C# desktop clinic management application built with .NET WinForms. Covers appointment scheduling, patient records, doctor management, and financial reporting.',
    tech: ['C#', '.NET WinForms', 'SQL Server'],
    github: 'https://github.com/mahmoudelsalmy/Clinic-System',
    demo: null,
    featured: true,
    gradient: 'from-pink-50 via-white to-gray-50 dark:from-pink-900/40 dark:via-slate-900 dark:to-slate-950',
    accent: '#ec4899',
    image: '/Clinic.png',
  },
  {
    id: 6,
    badge: 'Desktop · OOP',
    title: 'University Management System',
    description:
      'Java desktop application with JavaFX GUI managing full university operations — students, staff, courses, and grades with role-based access control for admins, staff, and students.',
    tech: ['Java', 'JavaFX', 'OOP', 'SQL'],
    github: 'https://github.com/mahmoudelsalmy/University-Management-System',
    demo: null,
    featured: true,
    gradient: 'from-orange-50 via-white to-gray-50 dark:from-orange-900/40 dark:via-slate-900 dark:to-slate-950',
    accent: '#f59e0b',
    image: '/University.png',
  },
  // --- shown only after "Show More" ---
  {
    id: 7,
    badge: 'Frontend · Web',
    title: 'Car Showcase Website',
    description:
      'Responsive web application for browsing luxury car brands and models, featuring detailed specs and pricing. Clean HTML/CSS/JS with a focus on UI polish.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/mahmoudelsalmy/Car-Showcase-Website',
    demo: 'https://mahmoudelsalmy.github.io/Car-Showcase-Website',
    featured: false,
    gradient: 'from-sky-50 via-white to-gray-50 dark:from-sky-900/40 dark:via-slate-900 dark:to-slate-950',
    accent: '#0ea5e9',
    image: '/Car.png',
  },
  {
    id: 8,
    badge: 'Systems · Data Structures',
    title: 'Queue-Based Ticketing System',
    description:
      'Efficient queue-based customer service ticketing system in C++. Implements priority queues, agent pools, and service-time simulation — demonstrating core data-structure mastery.',
    tech: ['C++', 'Data Structures', 'OOP', 'CLI'],
    github: 'https://github.com/mahmoudelsalmy/Queue-based-Ticketing-System',
    demo: null,
    featured: false,
    gradient: 'from-teal-50 via-white to-gray-50 dark:from-teal-900/40 dark:via-slate-900 dark:to-slate-950',
    accent: '#0d9488',
    image: '/Queue.png',
  },
  {
    id: 9,
    badge: 'Game · C++',
    title: 'Multiplayer Hangman Game',
    description:
      'Multiplayer Hangman game in C++ supporting up to 5 players. Words are randomly selected from a predefined dictionary, featuring score tracking and turn management.',
    tech: ['C++', 'OOP', 'CLI'],
    github: 'https://github.com/mahmoudelsalmy/Hangman-game',
    demo: null,
    featured: false,
    gradient: 'from-amber-50 via-white to-gray-50 dark:from-amber-900/40 dark:via-slate-900 dark:to-slate-950',
    accent: '#d97706',
    image: '/Hangman.png',
  },
  {
    id: 10,
    badge: 'Hardware · VHDL',
    title: 'Traffic Light Controller',
    description:
      '4-way traffic light controller implemented in VHDL using a Finite State Machine (FSM) architecture. Designed and simulated using Xilinx ISE + ISim.',
    tech: ['VHDL', 'FSM', 'Xilinx ISE'],
    github: 'https://github.com/mahmoudelsalmy/Traffic-Light-Controller',
    demo: null,
    featured: false,
    gradient: 'from-red-50 via-white to-gray-50 dark:from-red-900/40 dark:via-slate-900 dark:to-slate-950',
    accent: '#ef4444',
    image: '/Traffic.png',
  },
]

const socialContact = [
  { icon: GithubIcon, label: 'GitHub', url: 'https://github.com/mahmoudelsalmy', color: '#a78bfa' },
  { icon: Linkedin, label: 'LinkedIn', url: 'https://linkedin.com/in/mahmoudelsalmy', color: '#60a5fa' },
  { icon: MessageCircle, label: 'WhatsApp', url: 'https://wa.me/201097128423', color: '#22c55e' },
  { icon: Mail, label: 'Email', url: 'mailto:mahmoudelsalmy1@gmail.com', color: '#a78bfa' },
]

/* ──────────────────────── PROJECT CARD ─────────────────────── */

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg'])

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: 'easeOut' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`relative flex flex-col h-full rounded-2xl overflow-hidden border border-gray-200 dark:border-white/5 bg-gradient-to-br ${project.gradient} group shadow-lg dark:shadow-none cursor-pointer`}
    >
      {/* Glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
        style={{ boxShadow: `inset 0 0 40px ${project.accent}20` }}
      />

      {/* Project Image */}
      {project.image && (
        <div className="relative w-full h-52 overflow-hidden bg-gray-100 dark:bg-[#0A0A0A] border-b border-gray-200 dark:border-white/5">
          <Image
            src={project.image}
            alt={`${project.title} project preview`}
            fill
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none" />
        </div>
      )}

      <div className="relative p-6 flex flex-col flex-grow transform-gpu transition-all duration-300 z-20" style={{ transform: "translateZ(30px)" }}>
        {/* Badge */}
        <span
          className="self-start text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-4 border"
          style={{ color: project.accent, borderColor: `${project.accent}40`, background: `${project.accent}15` }}
        >
          {project.badge}
        </span>

        <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-2 leading-snug">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed flex-1">{project.description}</p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mt-4 mb-6">
          {project.tech.map(t => (
            <span
              key={t}
              className="text-[11px] px-2 py-0.5 rounded-md bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/5"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links / Buttons */}
        <div className="flex flex-wrap sm:flex-nowrap gap-3 mt-auto pt-5 border-t border-gray-200/50 dark:border-white/5">
          {project.demo && (
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl text-white shadow-md hover:shadow-lg transition-all"
              style={{ backgroundColor: project.accent }}
            >
              <ExternalLink size={16} />
              View Project
            </motion.a>
          )}
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-all"
            >
              <Github size={16} />
              Source Code
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

/* ───────────────────────── PAGE ──────────────────────────── */

export default function Home() {
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [showAllProjects, setShowAllProjects] = useState(false)

  const visibleProjects = showAllProjects ? projects : projects.slice(0, 5)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus('loading')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setFormStatus('success')
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setFormStatus('idle'), 3000)
      } else {
        setFormStatus('idle')
        alert('Failed to send message. Please try again.')
      }
    } catch (error) {
      console.error(error)
      setFormStatus('idle')
      alert('An error occurred while sending.')
    }
  }

  return (
    <>
      <AnimatedBackground />
      <ScrollProgress />
      <Navbar />

      <main className="overflow-x-hidden bg-transparent transition-colors duration-500">
        <Hero />

        {/* ──── ABOUT ──── */}
        <section id="about" className="py-24 md:py-32">
          <div className="container mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">

              {/* Left: Engineering Mindset */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-5 leading-tight">
                  The Engineering<br />Mindset
                </h2>

                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 max-w-md">
                  I am a Computer Systems Engineering student specializing in scalable systems that bridge hardware and software seamlessly.
                </p>

                <ul className="space-y-4 mb-10 text-gray-600 dark:text-gray-400 text-sm max-w-md">
                  <motion.li initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }} className="flex items-start gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span><strong className="text-gray-900 dark:text-white font-semibold">Frontend & Web:</strong> HTML, CSS, JavaScript, and modern UI/UX implementation.</span>
                  </motion.li>
                  <motion.li initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }} className="flex items-start gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span><strong className="text-gray-900 dark:text-white font-semibold">Backend & Desktop:</strong> C#, ASP.NET Core MVC, Java, and Python ML.</span>
                  </motion.li>
                  <motion.li initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} viewport={{ once: true }} className="flex items-start gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span><strong className="text-gray-900 dark:text-white font-semibold">Embedded Systems:</strong> C/C++, ESP32/ESP8266, Arduino, PIC MCU, and VHDL Firmware.</span>
                  </motion.li>
                </ul>

                {/* Stats */}
                <div className="flex gap-12">
                  {[
                    { value: '3+', label: 'Years Engineering' },
                    { value: '10+', label: 'Projects Delivered' },
                  ].map((s) => (
                    <div key={s.label}>
                      <div className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-1">{s.value}</div>
                      <div className="text-xs text-gray-500 uppercase tracking-widest">{s.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right: Hardware-Software Synergy */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-8"
              >
                {/* Synergy block */}
                <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-200 dark:border-dark-border p-6 shadow-sm dark:shadow-none">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap size={18} className="text-accent" />
                    <h3 className="text-gray-900 dark:text-white font-bold text-lg">Hardware-Software Synergy</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    My core competency lies in bridging physical sensors and digital logic.
                    From ASP.NET Core MVC web backends to PIC microcontroller firmware,
                    from Streamlit ML dashboards to VHDL hardware description —
                    I ensure performance and reliability are baked into every layer.
                  </p>
                </div>

                {/* Tech Stack */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <AlignJustify size={16} className="text-gray-500" />
                    <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-widest">
                      Core Technical Stack
                    </h4>
                  </div>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2.5">
                    {techStack.map((item, i) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.04 }}
                        className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                      >
                        <span className="w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                        {item.label}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ──── SKILLS ──── */}
        <section id="skills" className="py-24 md:py-32 border-t border-gray-200 dark:border-dark-border/50">
          <div className="container mx-auto px-6 md:px-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">Proficiency</p>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">Technical Expertise</h2>
              </div>
            </div>
            {/* Categorized skill cards */}
            <div className="space-y-8">
              {[
                {
                  category: 'Programming Languages',
                  accent: '#7C3AED',
                  skills: ['C / C++', 'C#', 'Java', 'Python', 'SQL', 'VHDL', 'HTML / CSS'],
                },
                {
                  category: 'Frameworks & Platforms',
                  accent: '#2563EB',
                  skills: ['ASP.NET Core MVC', '.NET WinForms', 'JavaFX', 'Streamlit', 'Bootstrap'],
                },
                {
                  category: 'Embedded & Hardware',
                  accent: '#10b981',
                  skills: ['Arduino', 'ESP8266 / ESP32', 'PIC Microcontrollers', 'Xilinx ISE / ISim', 'FPGA / FSM Design', 'IoT Protocols', 'Sensor Integration'],
                },
                {
                  category: 'Tools & Practices',
                  accent: '#f59e0b',
                  skills: ['Git / GitHub', 'Visual Studio', 'VS Code', 'Netbeans', 'SQL Server', 'OOP / Design Patterns'],
                },
              ].map((group, gi) => (
                <motion.div
                  key={group.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: gi * 0.1 }}
                  className="bg-white dark:bg-dark-card rounded-2xl border border-gray-200 dark:border-dark-border p-6 shadow-sm dark:shadow-none"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: group.accent }}
                    />
                    <h3
                      className="text-sm font-bold uppercase tracking-widest"
                      style={{ color: group.accent }}
                    >
                      {group.category}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill, si) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: gi * 0.1 + si * 0.04 }}
                        whileHover={{ scale: 1.06, y: -2 }}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-default"
                        style={{
                          color: group.accent,
                          borderColor: `${group.accent}40`,
                          background: `${group.accent}12`,
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ──── PROJECTS ──── */}
        <section id="projects" className="relative py-24 md:py-32 border-t border-gray-200 dark:border-dark-border/50 overflow-hidden">
          {/* Animated 3D/ambient background for projects */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <motion.div
              className="absolute top-[-20%] left-[10%] w-[500px] h-[500px] rounded-full bg-accent/5 dark:bg-accent/10 blur-[120px]"
              animate={{ x: [-30, 30, -30], y: [-30, 30, -30] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-[-20%] right-[10%] w-[400px] h-[400px] rounded-full bg-blue-500/5 dark:bg-blue-500/10 blur-[100px]"
              animate={{ x: [30, -30, 30], y: [30, -30, 30] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="container relative z-10 mx-auto px-6 md:px-10">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">
                  Portfolio
                </p>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
                  Technical Projects
                </h2>
              </div>
              <p className="text-gray-500 text-sm max-w-xs leading-relaxed md:text-right">
                Real-world systems engineering — from embedded IoT firmware to full-stack web applications.
              </p>
            </div>

            {/* Top 3 featured — full-width 3-col grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
              {visibleProjects.slice(0, 3).map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} />
              ))}
            </div>

            {/* Projects 4-5 in a 2-col grid */}
            {visibleProjects.length > 3 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                {visibleProjects.slice(3, 5).map((p, i) => (
                  <ProjectCard key={p.id} project={p} index={i + 3} />
                ))}
              </div>
            )}

            {/* Extra projects shown after Show More */}
            <AnimatePresence>
              {showAllProjects && visibleProjects.length > 5 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                    {visibleProjects.slice(5).map((p, i) => (
                      <ProjectCard key={p.id} project={p} index={i + 5} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Show More / Show Less toggle */}
            <div className="flex justify-center mt-8">
              <motion.button
                onClick={() => setShowAllProjects(!showAllProjects)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-300 dark:border-dark-border text-gray-700 dark:text-gray-300 font-semibold text-sm hover:border-accent hover:text-accent transition-all group"
              >
                {showAllProjects ? (
                  <><ChevronUp size={16} className="group-hover:text-accent transition-colors" /> Show Less</>
                ) : (
                  <><ChevronDown size={16} className="group-hover:text-accent transition-colors" /> Show More Projects </>
                )}
              </motion.button>
            </div>
          </div>
        </section>

        {/* ──── CONTACT ──── */}
        <section id="contact" className="py-24 md:py-32 border-t border-gray-200 dark:border-dark-border/50">
          <div className="container mx-auto px-6 md:px-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-14">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">Get In Touch</p>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
                  Let&apos;s Work Together
                </h2>
                <p className="text-gray-500 max-w-md mx-auto text-sm leading-relaxed">
                  Open to Software, Embedded systems opportunities and interesting collaborations.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Form */}
                <motion.form
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  onSubmit={handleSubmit}
                  className="bg-white dark:bg-dark-card rounded-2xl border border-gray-200 dark:border-dark-border p-6 space-y-4 shadow-sm dark:shadow-none"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-dark-border bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:border-accent focus:ring-1 focus:ring-accent/30 outline-none transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-dark-border bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:border-accent focus:ring-1 focus:ring-accent/30 outline-none transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-dark-border bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:border-accent focus:ring-1 focus:ring-accent/30 outline-none transition-all text-sm resize-none"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={formStatus !== 'idle'}
                    whileHover={{ scale: formStatus === 'idle' ? 1.03 : 1 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-3 rounded-xl bg-accent text-white font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-70 transition-all"
                  >
                    {formStatus === 'idle' && <><Send size={16} /> Send Message</>}
                    {formStatus === 'loading' && <><Loader2 size={16} className="animate-spin" /> Sending...</>}
                    {formStatus === 'success' && <><CheckCircle size={16} /> Sent!</>}
                  </motion.button>
                </motion.form>

                {/* Connect */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-dark-card rounded-2xl border border-gray-200 dark:border-dark-border p-6 shadow-sm dark:shadow-none"
                >
                  <h3 className="text-gray-900 dark:text-white font-bold mb-6">Connect With Me</h3>
                  <div className="space-y-3">
                    {socialContact.map((s, i) => (
                      <motion.a
                        key={s.label}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-dark-border transition-all group"
                      >
                        <div className="w-9 h-9 rounded-lg bg-gray-50 dark:bg-dark-border border border-gray-200 dark:border-transparent flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                          <s.icon size={16} className="text-gray-500 dark:text-gray-400 group-hover:text-accent transition-colors" />
                        </div>
                        <span className="text-gray-600 dark:text-gray-400 text-sm group-hover:text-gray-900 dark:group-hover:text-white transition-colors font-medium">
                          {s.label}
                        </span>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}
