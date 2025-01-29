import { defaultWagmiConfig } from '@web3modal/wagmi'
import { WebSocketTransport } from '@web3modal/core'
import { cookieStorage, createStorage } from 'wagmi'
import { mainnet, arbitrum } from '@reown/appkit/networks'

if (!process.env.NEXT_PUBLIC_PROJECT_ID) {
  throw new Error('Project ID is required')
}

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

export const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

export const wagmiConfig = defaultWagmiConfig({
  projectId,
  metadata,
  chains: [mainnet, arbitrum],
  transports: {
    [1]: new WebSocketTransport('wss://relay.walletconnect.org'),
    [42161]: new WebSocketTransport('wss://relay.walletconnect.org')
  },
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  })
})