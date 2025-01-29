import { type ReactNode } from 'react'

interface AppContextProps {
  children: ReactNode
  cookies: string | null
}

export default function AppContext({ children, cookies }: AppContextProps) {
  return children
}