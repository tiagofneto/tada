'use client'

import { calculateGithubPercentile } from '@/lib/utils'

export default function Screen3({ contributions, followers }: { contributions: string, followers: string }) {

  return (
    <div className="h-full flex flex-col justify-center items-center px-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">
          You are in the top {100 - calculateGithubPercentile(parseInt(contributions), parseInt(followers))}% of developers
        </h2>
        <button
          onClick={() => navigator.share({
            title: 'I am in the top ' + (100 - calculateGithubPercentile(parseInt(contributions), parseInt(followers))) + '% of developers on GitHub',
            text: 'Check out my developer rank'
          })}
          className="text-blue-600 font-semibold underline"
        >
          Share on social
        </button>
      </div>

    </div>
  )
}

