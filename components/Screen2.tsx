'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ReclaimDemo from './reclaim'

export default function Screen2({ onNext }: { onNext: () => void }) {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="h-full flex flex-col justify-center items-center px-4">
      <h1 className="text-2xl font-bold text-center mb-8">
        Log into Github to prove how good of a dev you are
      </h1>
      <ReclaimDemo onSuccess={onNext} />
      <button
        onClick={() => setShowModal(true)}
        className="text-blue-600 font-semibold underline pt-4"
      >
        How it works
      </button>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 bg-white p-4 rounded-t-2xl shadow-lg"
          >
            <h2 className="text-xl font-bold mb-2">How it works</h2>
            <p className="mb-4">
              We analyze your GitHub contributions to determine your developer rank.
              This includes factors such as commit frequency, project diversity,
              and collaboration with other developers.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
