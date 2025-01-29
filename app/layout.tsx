import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { headers } from "next/headers"
import { Analytics } from "@vercel/analytics/react"
import AppContext from './context'
import ErrorBoundary from './components/ErrorBoundary'
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Tele-App",
  description: "Telegram Mini Application Bot assist"
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const cookies = headers().get('cookie') ?? null

  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <AppContext cookies={cookies}>
            {children}
          </AppContext>
          <Analytics />
        </ErrorBoundary>
      </body>
    </html>
  )
}