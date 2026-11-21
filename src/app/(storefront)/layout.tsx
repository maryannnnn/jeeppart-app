import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { ThemeProvider } from '@/providers/Theme'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import '@/design-system/styles.css'
import '../(app)/globals.css'

export const metadata: Metadata = {
  description: 'Демонстрационная витрина магазина запчастей Jeep.',
  robots: {
    follow: false,
    googleBot: {
      follow: false,
      index: false,
      noarchive: true,
      noimageindex: true,
      nosnippet: true,
    },
    index: false,
    noarchive: true,
    noimageindex: true,
    nosnippet: true,
  },
  title: {
    default: 'Jeep-Part',
    template: '%s',
  },
}

export default function StorefrontLayout({ children }: { children: ReactNode }) {
  return (
    <html
      className={[GeistSans.variable, GeistMono.variable].filter(Boolean).join(' ')}
      lang="ru"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
