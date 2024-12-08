'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Screen1 from '@/components/Screen1'
import Screen2 from '@/components/Screen2'
import Screen3 from '@/components/Screen3'
import Header from '@/components/Header'
import { MiniKit } from '@worldcoin/minikit-js'

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState(1)
  const [contributions, setContributions] = useState('')
  const [followers, setFollowers] = useState('')

  const nextScreen = () => {
    setCurrentScreen((prev) => Math.min(prev + 1, 3))
  }

  return (
    <main className="h-screen w-screen overflow-hidden text-black px-4">
      <Header username={MiniKit.user?.username ?? 'Human'} />
      <AnimatePresence mode="wait">
        {currentScreen === 1 && (
          <motion.div
            key="screen1"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            <Screen1 onNext={nextScreen} />
          </motion.div>
        )}
        {currentScreen === 2 && (
          <motion.div
            key="screen2"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            <Screen2 onNext={(contributions: { contributions: string | undefined; followers: string | undefined }) => {
              nextScreen()
              setContributions(contributions.contributions ?? '')
              setFollowers(contributions.followers ?? '')
            }} />
          </motion.div>
        )}
        {currentScreen === 3 && (
          <motion.div
            key="screen3"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            <Screen3 contributions={contributions} followers={followers}/>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

