'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Screen3() {
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="h-full flex flex-col justify-center items-center px-4">
      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-center"
        >
          <div className="mb-4">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
          <h2 className="text-xl font-bold mb-2">Calculating how good you are</h2>
          <p className="text-sm text-gray-600">This should take a couple seconds</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold mb-4">You are in the top 5% of devs</h2>
          <p className="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="text-blue-600 font-semibold underline"
          >
            Share on social
          </button>
        </motion.div>
      )}

      {showModal && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 bg-white p-4 rounded-t-2xl shadow-lg"
        >
          <h2 className="text-xl font-bold mb-2">Share your results</h2>
          <p className="mb-4">
            Share your developer rank on social media to show off your skills!
          </p>
          <button
            onClick={() => setShowModal(false)}
            className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
        </motion.div>
      )}
    </div>
  )
}

