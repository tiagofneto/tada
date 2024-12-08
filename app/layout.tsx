import MiniKitProvider from '@/components/minikit-provider'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Tada',
  description: 'Find out how cracked of a dev you are!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MiniKitProvider>
          {children}
        </MiniKitProvider>
      </body>
    </html>
  )
}

