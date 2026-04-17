import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://mahmoudelsalmy-portfolio.vercel.app'),
  title: 'Mahmoud Elsalmy | Software & AI and Embedded Systems Engineer',
  description:
    'Computer Systems Engineering student specializing in Software Engineering, Embedded Systems, and AI. Building scalable backends, IoT firmware, and ML systems.',
  keywords: [
    'Software Engineer',
    'Embedded Systems',
    'Backend Developer',
    'Cybersecurity',
    'AI',
    'C++',
    'C',
    'C#',
    'ASP.NET',
    'IoT',
    'Python',
    'Machine Learning',
    'Java',
    'Portfolio',
  ],
  authors: [{ name: 'Mahmoud Elsalmy' }],
  icons: {
    icon: [
      { url: '/logo.png', type: 'image/png' },
    ],
    apple: '/logo.png',
  },
  openGraph: {
    title: 'Mahmoud Elsalmy | Software & Embedded Systems Engineer',
    description:
      'Computer Systems Engineering student specializing in Software Engineering, Embedded Systems, and AI.',
    url: 'https://mahmoudelsalmy-portfolio.vercel.app',
    siteName: 'Mahmoud Elsalmy Portfolio',
    images: [{ url: '/logo.png', width: 1024, height: 512, alt: 'Mahmoud Elsalmy Portfolio' }],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
