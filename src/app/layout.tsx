import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { LanguageProvider } from '@/lib/i18n'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'OpenClaw How - Real Cases & Scene Solutions',
    template: '%s | OpenClaw How',
  },
  description:
    'Discover real-world cases and ready-to-use scene solutions built with OpenClaw. Learn how people automate workflows, build SaaS products, and grow revenue with AI agents.',
  openGraph: {
    title: 'OpenClaw How - Real Cases & Scene Solutions',
    description:
      'Discover real-world cases and ready-to-use scene solutions built with OpenClaw.',
    type: 'website',
    locale: 'en_US',
    siteName: 'OpenClaw How',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OpenClaw How - Real Cases & Scene Solutions',
    description:
      'Discover real-world cases and ready-to-use scene solutions built with OpenClaw.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
