'use client'

import { projectId } from '@/config'
import { WagmiAdapter } from '@reown/appkit/adapters'
import { createAppKit } from '@reown/appkit/react' 
import { mainnet, arbitrum, scroll, morph, berachainTestnetbArtio, mantle, soneium, zircuit, rootstock, abstractTestnet, viction} from '@reown/appkit/networks'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { type ReactNode } from 'react'
import { cookieToInitialState, WagmiProvider, WagmiConfig, type Config } from 'wagmi'

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";  // Add this import
const inter = Inter({ subsets: ["latin"] });

import { headers } from "next/headers";
import { default as AppContextProvider } from '@/context'

// Set up queryClient
const queryClient = new QueryClient()

if (!projectId) {
  throw new Error('Project ID is not defined')
}

// Set up metadata
const metadata = { //this is optional
  name: "Tele-App",
  description: "Telegram mini application bot assist",
  url: "https://reown-appkit-evm.vercel.app", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/179229932"]
}

// Create the modal
const modal = createAppKit({
  adapters: [wagmiAdapter],
  chainImages: { // Customize networks' logos
    5000: '/mantle.png', // <chainId>: 'www.network.com/logo.png'
    534_352: '/scroll.png',
    80084: '/berachain.png',
    2818: '/morph.png',
    1868: '/soneium.png',
    48900: '/zircuit.svg',
    11_124: '/abstract.png',
    30: '/rootstock.png',
  },
  projectId,
  networks: [mainnet, arbitrum, scroll, morph, berachainTestnetbArtio, mantle, soneium, zircuit, rootstock, abstractTestnet, viction],
  defaultNetwork: mainnet,
  metadata: metadata,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
    email: true, // default to true
    socials: ['google', 'x', 'github', 'discord', 'apple', 'facebook', 'farcaster'],
    emailShowWallets: true, // default to true
  },
  themeMode: 'light'
})

function ContextProvider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
  const initialState = cookieToInitialState(WagmiConfig as Config, cookies)

  return (
    <WagmiProvider config={WagmiConfig as Config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}

export const layoutMetadata: Metadata = {
  title: "Tele-App",
  description: "Telegram Mini Applicationt Bot assist"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookies = headers().get('cookie')

  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider cookies={cookies}>{children}</ContextProvider>
        <Analytics /> {/* Add the Analytics component here */}
      </body>
    </html>
  )
}